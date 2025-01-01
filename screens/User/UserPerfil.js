import React from "react"
import {View, Text, StyleSheet} from "react-native"
import Button_1 from "../../components/Button";
import { onPressLogout } from "../../services/firebaseService";
import HeaderNavbar from "../../components/HeaderNavbar";

const UserPerfil = (props) => {
  return (
    <>
        <HeaderNavbar title="Perfil" leftIconName="arrow-back-outline" onPressLeft={()=>{props.navigation.goBack()}}/>
    
        <View>  
            <Button_1 title="Histórico de pedidos" color="#308aa0" onPress={()=>{
                props.navigation.navigate("PerfilStack", {screen:"UserHistory"} );
            }}></Button_1>
            <Button_1 title="Terminar Sessão" color="#A06f30" onPress={()=>{
                onPressLogout();
            }}></Button_1>
        </View>
    </>
  )
};

export default UserPerfil;


