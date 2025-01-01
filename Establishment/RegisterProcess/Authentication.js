import React from "react"
import {View, Text, StyleSheet, ScrollView, TextInput, Pressable, TouchableHighlight, TouchableOpacity} from "react-native"
import EmailPasswordReducer from "../../services/EmailPasswordReducer";
import { Ionicons } from "@expo/vector-icons";
import Button_1 from "../../components/Button";

const Authentication = ({objEst, establishmentUpdateFields, onPressRegister, onPressBack, handlingEmailPassword}) => {

    const {state, handleEmail, handlePassword, showConfirmPassword, 
        showPassword, toggleShowConfirmPassword, toggleShowPassword} = handlingEmailPassword ;

    return (
        <ScrollView keyboardDismissMode="on-drag" style={{backgroundColor:"#F9E9A2", flex:1, paddingBottom:10, paddingHorizontal:10}}>
            <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
                <Text style={{fontSize:16, fontWeight:"bold",color:"#56000c"}}>Dados de Autenticação</Text>
            </View>

            <View style={{width:"100%", height:95}}>
                    <Text style={{fontSize:17, fontWeight:"500"}}>Email *</Text>
                    <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false} keyboardType="email-address"
                       maxLength={50} value={objEst.email} autoCapitalize="none" onChangeText={(val)=>establishmentUpdateFields("email", val)}  placeholder="Email" 
                        style={[styles.container, {borderWidth:2, borderColor:state.emailValid===false ? "red":"transparent"}]} onEndEditing={()=>handleEmail(objEst.email)}></TextInput>
                        {state.emailValid===false  && <Text style={{color:"red",fontWeight:"bold"}}>{state.msgErrorEmail} </Text>}
                </View>
                <View style={{width:"100%", height:95}}>
                    <Text style={{padding:10,}}>A password deve ser composta por, pelo menos, 6 letras, com 1 maiúscula, 1 minúscula e caracteres especiais.</Text>
                    <Text style={{fontSize:17, fontWeight:"500"}}>Password *</Text>
                    <View style={[{flexDirection:"row", borderColor:"red", borderWidth:2, borderColor:(!state.passwordValid ) ?  "red":"transparent"}, styles.container  ]}>
                   
                    <TextInput secureTextEntry={showPassword ? false : true} numberOfLines={1} autoComplete="off" autoCorrect={false}
                       maxLength={40} value={objEst.password} autoCapitalize="none" onEndEditing={()=>handlePassword(objEst.password)} onChangeText={(val)=>establishmentUpdateFields("password",val)}  placeholder="Password" 
                       style={[{flex:0.9,fontSize:17}]}></TextInput>
                        <Pressable style={{flex:0.14, alignSelf:"center"}}  onPress={()=>toggleShowPassword()}>
                            <Ionicons name={showPassword ? "eye-off-outline":"eye-outline"} size={25} color="#A5A5A5" ></Ionicons>
                        </Pressable>
                    </View>
                        {state.passwordValid===false  && <Text style={{color:"red",fontWeight:"bold"}}>{state.msgErrorPass}</Text>}
                </View>
                <View style={{width:"100%", height:95, marginTop:75,}}>
                    <Text style={{fontSize:17, fontWeight:"500"}}> Repita a Password *</Text>
                    <View style={[{flexDirection:"row", borderColor:"red", borderWidth:2, borderColor:(objEst.password !== objEst.confirmPassword) ?  "red":"transparent"}, styles.container  ]}>
                        <TextInput secureTextEntry={showConfirmPassword ? false : true} autoCapitalize="none"  numberOfLines={1} autoComplete="off" autoCorrect={false}
                        maxLength={40} value={objEst.confirmPassword} onChangeText={(val)=>establishmentUpdateFields("confirmPassword",val)} placeholder="Insira de novo a Password" 
                            style={[{flex:0.9,fontSize:17}]}>
                        </TextInput>
                        <Pressable style={{flex:0.14, alignSelf:"center"}}  onPress={()=>toggleShowConfirmPassword}>
                            <Ionicons name={showConfirmPassword ? "eye-off-outline":"eye-outline"} size={25} color="#A5A5A5" ></Ionicons>
                        </Pressable>
                         </View> 
                     {objEst.password !== objEst.confirmPassword  && <Text style={{color:"red", fontWeight:"bold"}}>Passwords nao coincidem </Text>}
                </View> 
              {console.log("on Auuth", state.emailValid, state.passwordValid)}
             <View style={{flexDirection:"row"}}>
             <View style={{flex:1}}>
                    <Button_1 title="Voltar atrás" onPress={onPressBack} color="#d1863c"></Button_1>
                </View>
                <View style={{flex:1}}>
                    <Button_1 title="Concluir"  color="#3fa254" onPress={onPressRegister}></Button_1>
                </View>
              
            </View>
        </ScrollView>
  )
};

export default Authentication;

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