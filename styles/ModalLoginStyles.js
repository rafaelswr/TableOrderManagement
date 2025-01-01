import {StyleSheet} from "react-native";

const modalStyles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F9E9A2",
        padding: 20,
      },
      Title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#fff",
      },
      Text: {
        fontSize: 18,
        marginBottom: 20,
        color: "#fff",
      },
      Button:{
        borderRadius:8,
        backgroundColor:"#56000c",
        padding:10,
        width:150,
        justifyContent:"center",
        alignItems:"center",
      }, 
    });

export {
    modalStyles
}