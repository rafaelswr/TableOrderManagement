import React, {useState} from "react";
import {View,Text, Image, StyleSheet,Pressable, TouchableWithoutFeedback, TextInput, TouchableHighlight, ScrollView, Alert} from "react-native";
import ModalLogin from "../components/ModalLogin";
import EmailPasswordReducer from "../services/EmailPasswordReducer";
import { Ionicons } from "@expo/vector-icons";
import { loginAsync } from "../services/firebaseService";
import AlertComponent from "../components/AlertComponent";

const Login = ({navigation}) => {
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const {ModalPress, modalVisible, setModalVisible, setModalMessage, setModalTitle} = ModalLogin();
   
    const {state, handleEmail, handlePassword, showPassword, toggleShowPassword} = EmailPasswordReducer(); 

    const {dispatch, stateError} = AlertComponent();

    const showLoginModal = (title, msg) => {
        setModalTitle(title);
        setModalMessage(msg);
        setModalVisible(true);
    };

    const onSubmitHandler = async () =>{
        console.log(email, password);
        if(!state.passwordValid || !state.emailValid){
            showLoginModal("Erro", "Erro ao tentar fazer o login. Dados inválidos.");
        }else {
            
            const data = {email, password};
            
            await loginAsync(data,(obj)=>{
                console.log(obj);
            }, ()=>{
                showLoginModal("Erro", "Verifique o Email e a password e tente novamente!");
            });
        }
    }
 
    return(
        <ScrollView style={{backgroundColor:"#F9E9A2"}} showsVerticalScrollIndicator={false} keyboardDismissMode="on-drag">
            <View style={{justifyContent:"flex-start", alignItems:"center",paddingTop:20}}>
                <Image source={require("../assets/logo2.jpg")} 
                 style={{resizeMode:"contain", width:320,height:350, paddingTop:2}}/>
            </View>
            <View style={{marginHorizontal:20, height:400}}>
                <View style={{width:"100%",height:95}}>
                    <Text style={{fontSize:17, fontWeight:"500"}}>Email </Text>
                    <TextInput inputMode="text" numberOfLines={1} autoComplete="off" autoCorrect={false}
                        maxLength={40} value={email} onChangeText={val=>{
                            setEmail(val);
                        }}  
                        onEndEditing={()=>handleEmail(email)}
                        placeholder="user@gmail.com" 
                        style={[styles.container,{
                            borderWidth:2,borderColor:state.emailValid===false ? "red": "transparent"}]} ></TextInput>
                        {state.emailValid===false && <Text style={{color: 'red', fontWeight:"bold"}}>{state.msgErrorEmail}</Text>}
                        
                </View>
                <View style={{width:"100%", height:95}}>
                    <Text style={styles.label}>Password </Text>
                    <View style={[{flexDirection:"row", borderColor:"red", borderWidth:2, borderColor:(!state.passwordValid ) ?  "red":"transparent"}, styles.container  ]}>
                   
                        <TextInput autoCapitalize="none" secureTextEntry={showPassword ? false : true}  numberOfLines={1} autoComplete="off" autoCorrect={false}
                            maxLength={40} value={password} onEndEditing={()=>handlePassword(password)} onChangeText={(val)=>{
                                setPassword(val);
                            }} placeholder="******" style={[{flex:0.9,fontSize:17}]}/>
                        <Pressable style={{flex:0.14, alignSelf:"center"}}  onPress={()=>toggleShowPassword()}>
                            <Ionicons name={showPassword ? "eye-off-outline":"eye-outline"} size={25} color="#A5A5A5" ></Ionicons>
                        </Pressable>
                   </View>
                       {state.passwordValid===false && <Text style={{color: 'red', fontWeight:"bold"}}>{state.msgErrorPass}</Text>}
                       
                </View>
                
                <View style={{justifyContent:"center",alignItems:"center", marginBottom:20}}> 
                    <Text>Esqueceu a senha ? </Text>
                    <TouchableWithoutFeedback onPress={()=>navigation.navigate("PasswordRecovery")}> 
                        <Text style={{fontSize:15,color:"#d1873d",fontWeight:"bold"}}>Redefinir uma nova password</Text>
                    </TouchableWithoutFeedback>
                </View>
            
                <TouchableHighlight onPress={onSubmitHandler} style={styles.button} underlayColor="transparent"><Text style={styles.buttonText}>Entrar</Text></TouchableHighlight>
                <View style={{marginTop:30}}>
                    <TouchableWithoutFeedback onPress={()=>{return navigation.navigate("UserRegister");}}>
                    <View style={{justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize:15}}>Ainda sem conta de utilizador ? <Text style={{color:"#56000c",fontWeight:"bold"}}>Registe-se!</Text> </Text>
                
                </View>
                    </TouchableWithoutFeedback>
                </View>
                
                {
                    modalVisible && <ModalPress></ModalPress>
                }
                
            </View>
           
        </ScrollView>
    );  
}




const styles = StyleSheet.create({
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
    button:{
        backgroundColor:"#6FCF97",
        padding:15,
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:8,
    },
    buttonText:{    
        fontSize:15,
        fontWeight:"bold",
        color:"white",
    }
});

export default Login;