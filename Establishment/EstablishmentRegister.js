import React,{useState, useReducer} from "react";
import {View, Text,ScrollView, StyleSheet, TextInput, TouchableHighlight, TouchableOpacity, Pressable} from "react-native";
import Info from "./RegisterProcess/Info";
import Address from "./RegisterProcess/Address";
import WeekSchedule from "./RegisterProcess/WeekSchedule";
import Authentication from "./RegisterProcess/Authentication";
import {registerEstablishmentAsync} from "../services/firebaseService";
import AlertComponent from "../components/AlertComponent";
import EmailPasswordReducer from "../services/EmailPasswordReducer";
import { useImagePicker } from "../services/imageService";

const weekReducer = (state, action) => {
    switch (action.type) {
      case 'updateValue':
        return state.map((item) =>
          item.day === action.payload.day
            ? { ...item, [action.payload.field]: action.payload.value }
            : item
        );
      default:
        return state;
    }
};

const Estab_Reducer = (state, action)=>{
    switch (action.type) {
        case "establishmentValueUpdate":
          return { ...state, [action.payload.field]: action.payload.value };
        default:
          return state;
      }
}

const ProgressBar = ({ progress }) => {
    return (
        <View style={{paddingHorizontal:10,backgroundColor:"#F9E9A2"}}>
            <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${(progress/4)*100}%` }]} />
            </View>
            <View style={{justifyContent:"center", alignItems:"center", paddingBottom:10}}>
                <Text style={{ fontSize:15, paddingTop:10}}>{`${progress}/4`}</Text>
            </View>
        </View>
    );
  };



const EstablishmentRegister = (props) => {

    const [objEst, estab_Dispatch] = useReducer(Estab_Reducer, 
        {name:"",address:"", lat:"", long:"", codPostal:"", city:"", tel:"", especiality:"", 
        email:"", password:"", confirmPassword:"", type:""});
    
    const [weekDays, week_dispatch] = useReducer(weekReducer, [
        {day:"Segunda", open:"", close: "", status: false, openPicker: false, closePicker: false},
        {day:"Terça", open: "", close: '', status: false, openPicker: false, closePicker: false},
        {day:"Quarta", open: "", close: '', status: false, openPicker: false, closePicker: false},
        {day:"Quinta", open: "", close: '', status: false, openPicker: false, closePicker: false},
        {day:"Sexta", open: "", close: '', status: false, openPicker: false, closePicker:false},
        {day:"Sábado", open: "", close: '', status: false, openPicker: false, closePicker:false},
        {day:"Domingo", open: "", close: '', status: false , openPicker: false, closePicker:false},
    ]);
    
    
    const [progress, setProgress] = useState(1);

    const handlingEstablishmentUpdate = (field, value)=>{
        estab_Dispatch({type:"establishmentValueUpdate", payload:{field, value}});
    }

    const {handleShowAlert, AlertMsg, showAlert, stateError, dispatch} = AlertComponent(); 
  
    const {state, handleEmail, handlePassword, showConfirmPassword, 
        showPassword, toggleShowConfirmPassword, toggleShowPassword} = EmailPasswordReducer(); 
   
        
    const {modalVisible, ModalPress , openModal,removePhoto, selectedImage} = useImagePicker(); 
    
    const handleRegister = ()=>{ 

        if (objEst.password !== objEst.confirmPassword ) {
            dispatch({type:"error", payload:"Erro: Informações incorretas!"});
            handleShowAlert();
         } else {
            registerEstablishmentAsync({...objEst, photo:selectedImage, weekDays:weekDays},(error)=>{
                 dispatch({type:error.code});
                 handleShowAlert();
             }, ()=>{
                 dispatch({type:"register/success"});
                 handleShowAlert();
                 setTimeout(() => {
                    props.navigation.navigate("Login");
                    setProgress(1);
                }, 1000);
             });
         }
    }

    const handling = {
        state, handleEmail, handlePassword, showConfirmPassword, 
            showPassword, toggleShowConfirmPassword, toggleShowPassword
    }
    const handlingImage = {
        modalVisible, ModalPress , openModal,removePhoto, selectedImage
    }

    return(

        <>
          {showAlert && <AlertMsg errorCode={stateError.errorCode} errorMsg={stateError.errorMsg}></AlertMsg>}
       
         <ProgressBar progress={progress}/>
            {
                progress==1 && <Info handlingImage={handlingImage} onPressForward={()=>{
                   setProgress(2);
                }} objEst={objEst} establishmentUpdateFields={handlingEstablishmentUpdate}></Info>
            }
            {
                progress==2 && <WeekSchedule  onPressForward={()=>{
                    setProgress(3);
                 }} onPressBack={()=>{
                    setProgress(1);
                 }} objEst={objEst} weekDays={weekDays} week_dispatch={week_dispatch} establishmentUpdateFields={handlingEstablishmentUpdate}></WeekSchedule>
            }
           {
                progress==3 && <Address  onPressForward={()=>{
                    setProgress(4);
                 }} onPressBack={()=>{
                    setProgress(2);
                 }} objEst={objEst} establishmentUpdateFields={handlingEstablishmentUpdate}></Address>
            }
            {
                progress==4 && <Authentication handlingEmailPassword={handling}  onPressBack={()=>{
                    setProgress(3);
                 }} onPressRegister={handleRegister} objEst={objEst} establishmentUpdateFields={handlingEstablishmentUpdate}></Authentication>
            
            }
        </>
    );
}

const styles = StyleSheet.create({
    container:{       
        paddingLeft:10,
        borderRadius:8, 
        height:50, 
        shadowColor: '#56000c',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        backgroundColor:"white",
        fontSize:17,
    },
    progressBar: {
        width:"100%",
        height: 10,
        backgroundColor: "#ddd",
        borderRadius: 10,
        marginTop:20,
        overflow: 'hidden',
      },
      progressFill: {
        height: '100%',
        backgroundColor: "#3fa254",
      },
});

export default EstablishmentRegister; 