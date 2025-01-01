import React,{useState} from "react";
import {Modal, View, Text, TouchableHighlight } from "react-native";
import {modalStyles} from "../styles/ModalLoginStyles";
import { Ionicons } from "@expo/vector-icons";

const ModalLogin = ()=> {

    const [modalVisible, setModalVisible] = useState(false);
    
    const [modalMessage, setModalMessage] = useState("");
    const [modalTitle, setModalTitle] = useState("");

    const showLoginModal = (title, msg) => {
        setModalTitle(title);
        setModalMessage(msg);
        setModalVisible(true);
    };

    const ModalPress = (prosp) => {
        return (
              <Modal visible={modalVisible} animationType="fade" transparent={true}>
                <View style={[modalStyles.Container]}>
                    <View style={{borderRadius:10, backgroundColor:"#d1873d",margin:5,padding:5, justifyContent:"center",alignItems:"center"}}>
                    <Text style={modalStyles.Title}>{modalTitle}</Text>
                    <Text style={modalStyles.Text}>{modalMessage}</Text>
                    <TouchableHighlight onPress={()=>
                        setModalVisible(false)
                    } style={modalStyles.Button} underlayColor="transparent">
                   
                   <View style={{flexDirection:"row",}}>
                        <Ionicons name="close-outline" size={25} color={"white"}></Ionicons> 
                        <Text style={{color:"white", alignSelf:"center",flex:0.6, fontSize:18}}>Fechar</Text>
                    </View>
                        
                    </TouchableHighlight>
                    </View>
                  
                </View>
            </Modal>
        );
       
    }

    return {modalVisible, ModalPress, setModalVisible, setModalMessage, setModalTitle, showLoginModal};
}

export default ModalLogin; 
