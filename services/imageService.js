import react,{ useState } from 'react';
import {Modal, View, TouchableWithoutFeedback} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button_1 from '../components/Button';
import defaultStyles from '../styles/defaultStyles';

export function useImagePicker() {


    const [selectedImage, setSelectedImage] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

  const pickImageAsync = async (option) => {
        let result;
        switch (option) {
            case 'camera': {
                result = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    quality: 1,
                });
                break;
            }
            case 'library': {
                result = await ImagePicker.launchImageLibraryAsync({
                    quality: 1,
                    allowsEditing: true,
                });
                break;
            }
        }

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        } else {
            alert('Nenhuma imagem inserida!');
            setSelectedImage(null);
        }
    }

    const openModal = () => setModalVisible(true);
    
    const closeModal = () => setModalVisible(false);
    
    const removePhoto = () => setSelectedImage(null);

    const ModalPress = ()=>{
        return (
            <Modal  visible={modalVisible} animationType="fade" transparent={true}>
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={defaultStyles.modal}>
                    
                    <View style={defaultStyles.modalContainerToPhotos}>
                    <View style={{flexDirection:"row"}}>
                        <View style={{flex:1}}>
                            <Button_1 onPress={()=>{closeModal(); return pickImageAsync("camera");}} title="Câmara" color="#1a6dc0"/>
                        </View>
                        <View style={{flex:1}}>
                            <Button_1 onPress={()=>{closeModal(); return pickImageAsync("library");}}  title="Galeria" color="#49a60f"/>
                        </View>
                    </View>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
    
    return { selectedImage,setSelectedImage, modalVisible, removePhoto, openModal, ModalPress };
}