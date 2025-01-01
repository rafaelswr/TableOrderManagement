import React,{useReducer } from "react";
import {View, Text,ScrollView,TouchableOpacity,TouchableHighlight,StyleSheet,TextInput, Pressable} from "react-native";
import { registerUserAsync } from "../../services/firebaseService";
import EmailPasswordReducer from "../../services/EmailPasswordReducer";
import { Ionicons } from "@expo/vector-icons";
import AlertComponent from "../../components/AlertComponent";


const newUser = (state, action)=>{
    switch(action.type){
        case "userValue":{
            return {...state, [action.payload.field]:action.payload.value}
        }
        default:
            return state; 
    }
}

const UserRegister = ({navigation})=>{

    const {handleShowAlert, AlertMsg, showAlert, stateError, dispatch} = AlertComponent(); 

    const {state, handleEmail, handlePassword, showConfirmPassword, 
        showPassword, toggleShowConfirmPassword, toggleShowPassword} = EmailPasswordReducer();    

 
    const [objUser, UserDispatch] = useReducer(newUser,{email:"", password:"", fname:"", lname:"", nif:"", phone:"", confirmPassword:""})


    const handleRegister = () => {

        if (objUser.password !== objUser.confirmPassword || !state.passwordValid) {
           dispatch({type:"error", payload:"Erro: Password inválida!"});
           handleShowAlert();
        } else if(!state.emailValid){
            dispatch({type:"error", payload:"Erro: Email inválido!"});
            handleShowAlert();
        }else {
            const newUser = {...objUser}
            registerUserAsync(newUser, (error)=>{
                dispatch({type:error.code});
                handleShowAlert();
            }, ()=>{
                dispatch({type:"register/success"});
                handleShowAlert();
                
                setTimeout(() => {
                    navigation.navigate("Login");
                  }, 1000);
            })
        }
    }   

    return(
        <>
        {showAlert && <AlertMsg errorCode={stateError.errorCode} errorMsg={stateError.errorMsg}></AlertMsg>}
        <ScrollView keyboardDismissMode="on-drag" style={{backgroundColor:"#F9E9A2", flex:1}}>
            <View style={{ marginBottom:15,}}>
                <TouchableOpacity onPress={()=>navigation.navigate("EstablishmentRegister")}>
                    <Text style={{fontSize:15,textAlign:"center",fontWeight:"bold", color:"#4990fb"}}>Clique Aqui para registar o seu estabelecimento</Text> 
                </TouchableOpacity> 
            </View>

            <View style={{marginHorizontal:15}}>

                <Text style={{color:"black", fontSize:45}}>Registar</Text>
                <View style={{borderBottomColor:"#275a01", borderBottomWidth:3, marginVertical:10}}></View>
                <View style={{width:"100%", height:95}}>
                    <Text style={{fontSize:17, fontWeight:"500"}}>Nome</Text>
                    <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
                       maxLength={50} value={objUser.fname} onChangeText={(val)=>UserDispatch({type:"userValue",payload:{field:"fname", value:val}})} placeholder="Insira o seu primeiro nome" 
                        style={styles.container}></TextInput>
                </View>
                <View style={{width:"100%", height:95,}}>
                    <Text style={{fontSize:17, fontWeight:"500"}}>Sobrenome</Text>
                    <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
                       maxLength={50} value={objUser.lname} onChangeText={(val)=>UserDispatch({type:"userValue",payload:{field:"lname", value:val}})} placeholder="Insira o seu último nome" 
                        style={styles.container}></TextInput>
                </View>
                <View style={{width:"100%", height:95}}>
                    <Text style={{fontSize:17, fontWeight:"500"}}>NIF <Text >(opcional, fins de faturamento)</Text></Text>
                    <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false} 
                       maxLength={9} keyboardType="numeric" value={objUser.nif} onChangeText={(val)=>UserDispatch({type:"userValue",payload:{field:"nif", value:val}})} placeholder="número de identificação fiscal" 
                        style={styles.container}></TextInput>
                </View> 
                <View style={{width:"100%", height:95}}>
                    <Text style={{fontSize:17, fontWeight:"500"}}>Telefone</Text>
                    <TextInput numberOfLines={1} autoComplete="off" keyboardType="phone-pad" autoCorrect={false}
                       maxLength={9} value={objUser.phone} onChangeText={(val)=>UserDispatch({type:"userValue",payload:{field:"phone", value:val}})} placeholder="número de telemóvel" 
                        style={styles.container}></TextInput>
                </View> 
                <View style={{width:"100%", height:95}}>
                    <Text style={{fontSize:17, fontWeight:"500"}}>Email *</Text>
                    <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false} keyboardType="email-address"
                       maxLength={50} value={objUser.email} autoCapitalize="none" onChangeText={(val)=>UserDispatch({type:"userValue",payload:{field:"email", value:val}})}  placeholder="Email" 
                        style={[styles.container, {borderWidth:2, borderColor:state.emailValid===false ? "red":"transparent"}]} onEndEditing={()=>handleEmail(objUser.email)}></TextInput>
                        {state.emailValid===false  && <Text style={{color:"red",fontWeight:"bold"}}>{state.msgErrorEmail} </Text>}
                </View>
                <View style={{width:"100%", height:95}}>
                    <Text style={{padding:10,}}>A password deve ser composta por, pelo menos, 6 letras, com 1 maiúscula, 1 minúscula e caracteres especiais.</Text>
                    <Text style={{fontSize:17, fontWeight:"500"}}>Password *</Text>
                    <View style={[{flexDirection:"row", borderColor:"red", borderWidth:2, borderColor:(!state.passwordValid ) ?  "red":"transparent"}, styles.container  ]}>
                   
                        <TextInput secureTextEntry={showPassword ? false : true} numberOfLines={1} autoComplete="off" autoCorrect={false}
                        maxLength={40} value={objUser.password} autoCapitalize="none" onEndEditing={()=>handlePassword(objUser.password)} onChangeText={(val)=>UserDispatch({type:"userValue",payload:{field:"password", value:val}})}  placeholder="Password" 
                        style={[{flex:0.9,fontSize:17}]}></TextInput>
                            <Pressable style={{flex:0.14, alignSelf:"center"}}  onPress={()=>toggleShowPassword()}>
                                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={25} color="#A5A5A5" ></Ionicons>
                            </Pressable>
                    </View>
                    {state.passwordValid===false  && <Text style={{color:"red",fontWeight:"bold"}}>{state.msgErrorPass}</Text>}
                </View>
                <View style={{width:"100%", height:95, marginTop:75,}}>
                    <Text style={{fontSize:17, fontWeight:"500"}}> Repita a Password *</Text>
                    <View style={[{flexDirection:"row", borderColor:"red", borderWidth:2, borderColor:(objUser.password !== objUser.confirmPassword) ?  "red":"transparent"}, styles.container  ]}>
                        <TextInput secureTextEntry={showConfirmPassword ? false : true} autoCapitalize="none"  numberOfLines={1} autoComplete="off" autoCorrect={false}
                        maxLength={40} value={objUser.confirmPassword} onChangeText={(val)=>UserDispatch({type:"userValue",payload:{field:"confirmPassword", value:val}})} placeholder="Insira de novo a Password" 
                            style={[{flex:0.9,fontSize:17}]}>
                        </TextInput>
                        <Pressable style={{flex:0.14, alignSelf:"center"}}  onPress={()=>toggleShowConfirmPassword}>
                            <Ionicons name={showConfirmPassword ? "eye-off-outline":"eye-outline"} size={25} color="#A5A5A5" ></Ionicons>
                        </Pressable>
                         </View> 
                     {objUser.password !== objUser.confirmPassword  && <Text style={{color:"red", fontWeight:"bold"}}>Passwords nao coincidem </Text>}
                </View> 
               <View style={{marginBottom:20}}>
                    <TouchableHighlight onPress={handleRegister} style={styles.button} underlayColor="transparent">
                        <Text style={styles.buttonText}>Concluir Registo</Text>
                    </TouchableHighlight>
               </View>
            </View>
    
        </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:"#6FCF97",
        padding:15,
        width:150,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:8,
    },
    buttonText:{
        fontSize:15,
        fontWeight:"bold",
        color:"white",
    },
    textInput:{
        paddingLeft:10,
        borderRadius:10, 
        height:45, 
        shadowColor: '#56000c',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        backgroundColor:"#fdf4cb",
        fontSize:17,
        borderWidth:2, 
        borderColor:"#cccccc",
    },
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
});

export default UserRegister; 