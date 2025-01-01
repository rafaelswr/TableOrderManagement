import React,{useState} from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import EmailPasswordReducer from "../services/EmailPasswordReducer";
import { handlePasswordReset, handleconfirmPasswordReset } from "../services/firebaseService";
import AlertComponent from "../components/AlertComponent";


const PasswordRecovery = (props) => {
    const [email, setEmail] = useState("");
    const [emailExists, setEmailExists] = useState(false);

    const {handleEmail, state }  = EmailPasswordReducer(); 

    const {handleShowAlert, AlertMsg, showAlert, stateError, dispatch } = AlertComponent(); 

    return (
    <>
       {showAlert && <AlertMsg errorCode={stateError.errorCode} errorMsg={stateError.errorMsg}></AlertMsg>}
        
    <View style={{paddingTop:15, backgroundColor:"#F9E9A2", flex:1, width:"100%", paddingHorizontal:15}}>
        <View style={{width:"100%", height:95}}>
            <Text style={styles.label}>Introduza email da conta </Text>
            <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
                maxLength={40} value={email} onChangeText={(val)=>setEmail(val)} 
                style={[styles.container,{
                borderWidth:2,borderColor:state.emailValid===false ? "red": "transparent"}]} ></TextInput>
                {state.emailValid===false  && <Text style={{color: 'red', fontWeight:"bold"}}>{state.msgErrorEmail}</Text>}
        </View>
        <View style={{marginBottom:20}}>
            <TouchableOpacity onPress={()=>{
                handleEmail(email);
                if(state.emailValid){
                    handlePasswordReset(email, (msg)=>{
                        dispatch({type:"error", payload:msg})
                        handleShowAlert();

                    }, (msg)=>{
                        dispatch({type:"success", payload:msg})
                        setEmailExists(true);
                        handleShowAlert();
                    })
                }  
            }} style={styles.button} underlayColor="transparent">
                <Text style={styles.buttonText}>Verificar Email</Text>
            </TouchableOpacity>
        </View>
        {
            (state.emailValid && emailExists) && 
            
                <View style={{width:"100%", height:95}}>
                 <Text style={styles.label}> Foi enviado um link para o seu email, clique nele e defina a nova Password! </Text>
                </View>          
            
        }
      
    </View>
    </>
  )
};

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
    label:{
        fontSize:17,
        fontWeight:"500",
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

export default PasswordRecovery;