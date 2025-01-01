import { Ionicons } from "@expo/vector-icons";
import React,{useState, useEffect} from "react";
import {View, Text, StyleSheet, Image,  TouchableOpacity} from "react-native";
import { HourOpenClose } from "../services/HourOpenClose";
import { downloadImageDoc } from "../services/firebaseService";

const geolib = require("geolib");

const EstablishmentCard = (props) => {
    

    const [distance, setDistance] = useState("");

    const {isOpen} = HourOpenClose({weekDays:props.item.weekDays}); 
   
    
    //const colors = LogoPalette("https://blog.emania.com.br/wp-content/uploads/2016/02/direitos-autorais-e-de-imagem.jpg");
    const [logo, setLogo] = useState();

    useEffect(()=>{
       downloadImageDoc((logo)=>{
        setLogo(logo);
      }, "establishments", props.item.id);
  
      return ()=>{
        setLogo();
      }
  
    }, [props.item]);

    useEffect(()=>{
        const distanceInMeters = geolib.getDistance(props.userLocation, {latitude:props.item.lat, longitude:props.item.long});
        if(distanceInMeters>=1000){
            const distanceKM = geolib.convertDistance(distanceInMeters, "km"); 
            setDistance(`${distanceKM}km `);
        }else{
            setDistance(`${distanceInMeters}m `);
        }
    },[]);
    


    return (
    <TouchableOpacity onPress={props.onPress}>
        <View style={styles.container}>
           <View style={{flexDirection:"row"}}>
                <View style={{flex:0.8, flexDirection:"row", justifyContent:"space-around"}}>
                    <Text style={{fontSize:16, fontWeight:"bold", padding:5}}>{props.item.name}</Text> 
                    
                    <Ionicons name="ellipse" size={5} style={{alignSelf:"center"}}></Ionicons>
                    
                    
                    <Text style={{fontSize:10, alignSelf:"center", fontWeight:"300"}}>{props.item.especiality}</Text>
                </View>



                <View style={{flex:0.5, alignItems:"flex-start", justifyContent:"center"}}>
                    
                    {
                        props.item.type==="Restaurante" ?
                            <Ionicons name="restaurant" size={20} style={{alignSelf:"flex-end", paddingRight:20}}></Ionicons>
                        : 
                            props.item.type==="Cafetaria" ? 
                                <Ionicons name="cafe" size={20} style={{alignSelf:"flex-end", paddingRight:20}}></Ionicons>
                            :  
                                <Ionicons name="wine" size={20} style={{alignSelf:"flex-end", paddingRight:20}}></Ionicons>
                        
                    }
                    
                </View>
           </View>
           <View style={{ flexDirection:"row"}}>
                <Image source={{uri:logo}} style={{width:80, height:80}}></Image>
                <View style={{flex:1}}>
                    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                        <Text>Preço médio: 25 €</Text>
                    </View>
                    <View style={{ flex:1, flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>
                        <Ionicons name="pin" size={15} ></Ionicons>
                        <Text>{distance} de distância</Text>
                        
                    </View>
                </View>
                <View style={{flex:0.7}}>
                    <View style={{ flex:1, flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                        <Ionicons name="star" size={15} style={{color:"#cdcdcd"}}></Ionicons>
                        <Text> 4</Text>
                        
                    </View>

                    {
                        isOpen ? 
                        (
                            <View style={{flex:1, backgroundColor:"#1C9C32",margin:10, flexDirection:"row",borderWidth:2, borderColor:"#2bea54", justifyContent:"center", alignItems:"center"}}>
                                <Text style={{alignSelf:"center", color:"white"}}>Aberto</Text>
                            </View>
                        ):(
                            <View style={{flex:1, backgroundColor:"#C14A4F",margin:10, flexDirection:"row",borderWidth:2, borderColor:"#E21f28", justifyContent:"center", alignItems:"center"}}>
                                <Text style={{alignSelf:"center", color:"white"}}>Fechado</Text>
                            </View>
                        )
                    }
                
                  
                </View>
           </View>
           
        </View>
   
</TouchableOpacity>
  )
};

export default EstablishmentCard;

const styles=StyleSheet.create({  
    container:{
        borderWidth: 1,
        backgroundColor:"#f8f8f0",
        borderColor: '#cdcdcd',
        borderWidth:2, 
        borderRadius: 10,
        marginBottom: 10,
        height:135,
        margin:10,
        paddingVertical:5,
        paddingHorizontal:10
    }
});
