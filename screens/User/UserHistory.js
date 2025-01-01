
import React from "react";
import {StyleSheet} from "react-native";
import HeaderNavbar from "../../components/HeaderNavbar";

const UserHistory = (props) => {
  return (
    <>
        <HeaderNavbar title="Histórico de Pedidos" leftIconName="arrow-back-outline" leftIcon onPressLeft={()=>{props.navigation.navigate("UserPerfil")}}/>
    
      
    </>
  )
};


export default UserHistory;
