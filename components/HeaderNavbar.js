import React from "react"
import {View, Text, StyleSheet, TouchableWithoutFeedback, ProgressViewIOSComponent} from "react-native"
import {Ionicons} from "@expo/vector-icons";

const HeaderNavbar = (props) => {

    const setBackgroundColor = {
        backgroundColor:props.backgroundColor ? props.backgroundColor : "#70cf97",
    }

  return (
    <View style={[styles.container, setBackgroundColor]}>
            {props.leftIconName && 
                <View style={{flex:0.3}}>
                    <TouchableWithoutFeedback onPress={props.onPressLeft}>
                        <Ionicons name={props.leftIconName} size={34} color={props.backgroundColor==="white" ? "black":"white"}></Ionicons>
                    </TouchableWithoutFeedback>
                </View>
            }
            <View style={{flex:2}}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            {props.rightIconName &&  
            <View style={{flex:0.3, justifyContent:"center", alignItems:"flex-end"}}>
                <TouchableWithoutFeedback onPress={props.onPressRight}>
                    <Ionicons name={props.rightIconName} size={36} color={"white"}></Ionicons>
                </TouchableWithoutFeedback>
            </View>
            }
           
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        height:90,
        borderBottomColor:"#cdcdcd", 
        borderBottomWidth:3, 
        flexDirection:"row",
        alignItems:"flex-end",
        paddingHorizontal:15,
        paddingBottom:10,
    }, 

    title:{
        color:"white",
        fontSize:23,
        marginBottom:5,
        fontWeight:500,
    }
})

export default HeaderNavbar;
