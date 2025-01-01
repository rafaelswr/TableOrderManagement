import React,{useState, useReducer,useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity,TextInput, ScrollView} from "react-native"
import CheckBox from "expo-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button_1 from "../../components/Button";
import { Ionicons } from "@expo/vector-icons";

const reducer = (state, action) => {
    switch (action.type) {
      case 'updateValue':
        return state.map((item) =>
          item.day === action.payload.day
            ? { ...item, [action.payload.field]: action.payload.value }
            : item
        );
      default:
        return state;
    }
  };

  

  
const Address = ({establishmentUpdateFields, objEst, onPressForward, onPressBack}) => {

    const [postal1, setPostal1] = useState("");
    const [postal2, setPostal2] = useState("");


    const handlingCodPostal = () => {
        if(postal1.trim()!=0 && postal2.trim()!=0){
            const cod_postal = `${postal1}-${postal2}`;
            establishmentUpdateFields("codPostal", cod_postal);
        }
    }

    return (
        <ScrollView keyboardDismissMode="on-drag" style={{backgroundColor:"#F9E9A2", flex:1, paddingBottom:10, paddingHorizontal:10}}>
          
            <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
                <Text style={{fontSize:16, fontWeight:"bold",color:"#56000c"}}>Localização</Text>
            </View>
        <View>
            <View style={{width:"100%", height:95}}>
                <Text style={{fontSize:17, fontWeight:"500"}}>Morada</Text>
                <TextInput numberOfLines={1}  autoCapitalize="none" autoComplete="off" autoCorrect={false}
                        maxLength={50} placeholder="Rua, número de porta" value={objEst.address}
                        onChangeText={(val)=>establishmentUpdateFields("address", val)}
                        style={styles.container}></TextInput>
            </View>
            <View style={{flexDirection:"row"}}>
                <View style={{flex:0.40}}>
                    <Text style={{fontSize:17, fontWeight:"500"}}>Latitude</Text>
                    <TextInput numberOfLines={1} autoComaplete="off" autoCorrect={false}
                        maxLength={50} keyboardType="number-pad"  placeholder="ex: 49.1234" value={objEst.lat}
                        onChangeText={(val)=>establishmentUpdateFields("lat", val)}
                            style={styles.container}></TextInput>
                </View>
                <View style={{flex:0.60,paddingHorizontal:10, marginBottom:15}}>
                    <Text style={{fontSize:17, fontWeight:"500"}}>Longitude</Text>
                    <TextInput numberOfLines={1} keyboardType="number-pad" autoComplete="off" autoCorrect={false}
                        maxLength={50} placeholder="ex: -12.1230"  value={objEst.long}
                        onChangeText={(val)=>establishmentUpdateFields("long", val)}
                            style={styles.container}></TextInput>
                </View>
            </View>
            
            <View style={{flexDirection:"row", marginBottom:15}}>
                <View style={{flex:0.40}}>
                    <Text style={{fontSize:17, fontWeight:"500"}}>Cidade</Text>
                    <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
                        maxLength={50} placeholder="Cidade" value={objEst.city}
                        onChangeText={(val)=>establishmentUpdateFields("city", val)}
                            style={styles.container}></TextInput>
                </View>
                <View style={{flex:0.60,paddingHorizontal:10}}>
                    <Text style={{fontSize:17, fontWeight:"500"}}>Código Postal</Text>
                    <View style={{flexDirection:"row"}}>
                        <TextInput  numberOfLines={1} autoComplete="off" keyboardType="number-pad" autoCorrect={false}
                            maxLength={4} placeholder="0000" value={postal1} onChangeText={(val)=>setPostal1(val)}
                            style={[styles.container,{flex:0.6}]}  onEndEditing={handlingCodPostal}></TextInput>
                        <Text style={{alignSelf:"center", fontSize:14,paddingHorizontal:5}}>-</Text>
                        <TextInput numberOfLines={1} keyboardType="number-pad" autoComplete="off" autoCorrect={false}
                            maxLength={3} placeholder="000" value={postal2} onChangeText={(val)=>setPostal2(val)}
                            style={[styles.container,{flex:0.4}]} onEndEditing={handlingCodPostal}></TextInput>
                    </View>
                </View>
                
            </View>

             <View style={{flexDirection:"row"}}>
                <View style={{flex:1}}>
                    <Button_1 title="Voltar atrás" onPress={()=>onPressBack()} color="#d1863c"></Button_1>
                </View>
                <View style={{flex:1}}>
                    <Button_1 title="Próximo"  color="#308aa0" onPress={onPressForward}></Button_1>
                </View>
            </View>
        
        </View>
    </ScrollView>
    );
}

export default Address; 

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