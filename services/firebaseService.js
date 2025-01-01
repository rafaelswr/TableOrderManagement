
import {auth, db} from "../firebase/firebaseConfig";
import { addDoc,setDoc,  collection,query, where, getDocs, doc, deleteDoc, getDoc,onSnapshot,  updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import {sendPasswordResetEmail,fetchSignInMethodsForEmail, confirmPasswordReset,createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import AlertComponent from "../components/AlertComponent";


const storage = getStorage(); 

const loginAsync = async (data, onError, onDataRetrieved)=>{
    try{
        const { email, password } = data;  
    
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user; 
    
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
    
        if(userDoc.exists()){
            const userData = userDoc.data(); 
            onDataRetrieved({...userData, id:userDoc.id});
        }else{
            const establishmentDocRef = doc(db, "establishments", user.uid);
            const establishmentDoc = await getDoc(establishmentDocRef);
    
            if(establishmentDoc.exists()){
                onDataRetrieved({...establishmentDoc.data(), id:establishmentDoc.id})
            }
        }
    }catch(error){
        onError();
    }
    
}

const subscribeOnAuthStateChanged = onChanged => {
    onAuthStateChanged(auth,(userCredential)=>{
        onChanged(userCredential);
    })
}

const loggedUserData = async (id, onDataRetrieved) =>{
    const userDocRef = doc(db, "users", id);
    const docRef = await getDoc(userDocRef);
    if(docRef.exists()){
        onDataRetrieved({...docRef.data(), id:id});
    }else{
        const establishmentDocRef = doc(db, "establishments", id);
        const estDocRef = await getDoc(establishmentDocRef);
        onDataRetrieved({...estDocRef.data(), id:id});
    }
}


const onPressLogout = ()=>{
    signOut(auth);
}



const registerUserAsync = async (data, onError, onSucess)=>{
    try {
    
        const { email, password, fname, lname, nif, phone } = data;  
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        if (userCredential.user) {
          const docRef = doc(db, "users", userCredential.user.uid);
          await setDoc(docRef, { fname, lname, email, nif, phone });
        }
        console.log("Current user: ", auth.currentUser);
        onSucess();
    } catch (error) {
        onError(error); 
    }
}

const registerEstablishmentAsync = async (data, onError, onSucess)=>{
    try {
        
        const { name, address, lat, long, codPostal, city, tel, weekDays, photo, especiality, email, password} = data;  

        const establishmentCredential = await createUserWithEmailAndPassword(auth, email, password);

        if (establishmentCredential.user) {
            
            const docRef = doc(db, "establishments", establishmentCredential.user.uid);
            await setDoc(docRef, {email, address, lat, long, codPostal, city,weekDays, especiality, tel, name});
            
            if(photo!=null || photo!=""){
                const response = await fetch(photo);
                const blob = await response.blob();
          
              const imagesRef = ref(storage, `establishments/${docRef.id}`);
              await uploadBytes(imagesRef, blob);
              console.log('Uploaded a blob or file!');
            
            }
       
        }

        console.log("Current Estabelecimento: ", auth.currentUser);
        onSucess();
    } catch (error) {
        onError(error); 
    }
}


const handlePasswordReset = async (email, onError, onSuccess) => {

    await fetchSignInMethodsForEmail(auth, email).then((signInMethods)=>{
        if (signInMethods.length === 0) {
            onError("O email não está associado a nenhuma conta de utilizador!");
          } else {
            sendPasswordResetEmail(auth, email).then(() => {
                onSuccess("Email de redefinição de senha enviado com sucesso!");
            })
        }
    }).catch((error) => {
        onError("Ocorreu um erro ao enviar o email de redefinição de senha");
 });
 
   
};

const downloadImageDoc = async (onDataRetrieved, nameCollection, id) => {
    try {
       const url = await getDownloadURL(ref(storage, `${nameCollection}/${id}`));
       onDataRetrieved(url);
    
      console.log('Imagem baixada com sucesso:', url);
    } catch (error) {
      console.log('Erro ao baixar a imagem:', error);
    }
}

const getAllfromCollection = async (nameCollection, onDataRetrieved, onError) =>{
    try {
        const unsub = onSnapshot(collection(db, nameCollection), (snapshot) => {
          const establishmentsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          onDataRetrieved(establishmentsData);
        });
    
        return unsub;
      } catch (error) {
        onError(error);
        return null;
      }
}

export {
    registerUserAsync,
    registerEstablishmentAsync,  
    handlePasswordReset,
    loginAsync,
    subscribeOnAuthStateChanged,
    onPressLogout,
    loggedUserData, 
    downloadImageDoc,
    getAllfromCollection, 

}