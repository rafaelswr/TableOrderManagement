import React, { useState } from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity,ScrollView, Image, Modal} from "react-native"; 
import { useImagePicker } from "../../services/imageService";
import Button_1 from "../../components/Button";
import { Ionicons } from "@expo/vector-icons";
import {Picker} from "@react-native-picker/picker";

const Info = ({establishmentUpdateFields, objEst, onPressForward, handlingImage}) => {
  
    const establishmentsTypes = ["Restaurante", "Cafetaria", "Bar"];

    const { modalVisible, ModalPress , openModal,removePhoto, selectedImage} = handlingImage; 


  return (
    <ScrollView keyboardDismissMode="on-drag" style={{backgroundColor:"#F9E9A2", flex:1, paddingBottom:10, paddingHorizontal:10}}>
          
        <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
            <Text style={{fontSize:15, fontWeight:"bold",color:"#56000c"}}>Dados do Estabelecimento</Text>
        </View>


        <View style={{width:"100%", height:95}}>
            <Text style={{fontSize:17, fontWeight:"500"}}>Nome</Text>
            <TextInput numberOfLines={1} autoCapitalize="none" autoComplete="off" onChangeText={(val)=>{
                establishmentUpdateFields("name", val);
            }} 
            autoCorrect={false} maxLength={50} placeholder="Nome do estabelecimento" value={objEst.name}
            style={styles.container}></TextInput>
        </View>

        <View style={{flexDirection:"row"}}>
            <View style={{flexDirection:"column", flex:0.5}}>
      
                <View style={{ flex:0.4,paddingVertical:10}}>
                    <Text style={{fontSize:17, fontWeight:500,}}>Logótipo</Text>
                        <Button_1 onPress={()=>{openModal()}} title="Upload Logo"  color="#3d5a5c"/>
                    </View>

                    <View style={{flex:0.6, height:95}}>
                        <Text style={{fontSize:17, fontWeight:"500"}}>Telefone</Text>
                        <TextInput numberOfLines={1} autoCapitalize="none" keyboardType="number-pad" autoComplete="off"
                         onChangeText={(val)=>{
                            establishmentUpdateFields("tel", val);
                         }} 
                        autoCorrect={false} maxLength={9} placeholder="" value={objEst.tel}
                        style={styles.container}></TextInput>
                    </View>
                  
            </View>
                
            { selectedImage && 
                <View style={{ flex:0.50,justifyContent:"center", alignItems:"center", }}>
                    <Image resizeMode="cover"  source={{ uri: selectedImage }} style={{ width: 130, height: 130 }}/>
                    <View>
                    <TouchableOpacity style={{marginTop:5}} onPress={()=>{removePhoto()}}>
                        <Ionicons name="close-outline" size={30} style={{color:"red", fontWeight:"bold"}}></Ionicons>
                    </TouchableOpacity> 
                    </View>
                </View>     
            }
        
        </View>

        <View style={{width:"100%", height:95}}>
            <Text style={{fontSize:17, fontWeight:"500"}}>Especialidade</Text>
            <TextInput numberOfLines={1} autoCapitalize="none" autoComplete="off" onChangeText={(val)=>{
                  establishmentUpdateFields("especiality", val);
            }} 
            autoCorrect={false} maxLength={50} placeholder="ex: cafetaria, pizzaria,..." value={objEst.especiality}
            style={styles.container}></TextInput>
        </View>


        <View style={{width:"100%", height:95}}>
            <Text style={{fontSize:17, fontWeight:"500"}}>Tipo de Estabelecimento</Text>
            <View style={[styles.container]}>
                <Picker mode="dropdown" 
                        selectedValue={objEst.type} onValueChange={(value)=>{
                                establishmentUpdateFields("type", value);
                        }}>
                    
                    <Picker.Item label="-" value="-"></Picker.Item>
                    
                    {establishmentsTypes.map(item => (
                        <Picker.Item key={item} label={item} value={item} />
                    ))}

                </Picker>
            </View>
        </View> 
                

        <View style={{paddingBottom:20}}> 
            <Button_1 title="Próximo" color="#308aa0" onPress={onPressForward}></Button_1>
        </View>


        {modalVisible && <ModalPress></ModalPress>}
    </ScrollView>
  
  )
};

export default Info;

const styles = StyleSheet.create({
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
    progressBar: {
        width:"100%",
        height: 10,
        backgroundColor: "#ddd",
        borderRadius: 10,
        overflow: 'hidden',
      },
      progressFill: {
        height: '100%',
        backgroundColor: "#275a01",
      },
});