
import React, { useEffect, useState } from "react"
import {ScrollView, View,Image,  Text, StyleSheet} from "react-native"
import HeaderNavbar from "../../components/HeaderNavbar";
import { Ionicons } from "@expo/vector-icons";
import CategoryCard from "../../components/CategoryCard";
import { downloadImageDoc } from "../../services/firebaseService";
import { HourOpenClose } from "../../services/HourOpenClose";

const EstablishmentPage = (props) => {
  
  const item = props.route.params.item; 
  const [logo, setLogo] = useState();

  const {isOpen, currentDayInfo} = HourOpenClose({weekDays:item.weekDays}); 

  console.log("currentDayInfo", isOpen);

  useEffect(()=>{
     downloadImageDoc((logo)=>{
      setLogo(logo);
    }, "establishments", item.id);

    return ()=>{
      setLogo();
    }

  }, [item]);
  
  
  return (
    <ScrollView>
      <HeaderNavbar onPressLeft={()=>{props.navigation.navigate("Home")}} backgroundColor="white" leftIconName="arrow-back"></HeaderNavbar>  
        <View style={{ flex:0.5, backgroundColor:"#f8f8f0", padding:15}}>
            <View style={{flexDirection:"row"}}>  
                <Image source={{uri:logo}} style={{width:140, height:140}} ></Image>
                <Text style={{alignSelf:"center", flexWrap:"wrap", fontWeight:"bold", paddingHorizontal:20,  fontSize:25}}>{item.name}</Text>
            </View>
            <View style={{borderColor:"#ab0e0f", borderWidth:2,marginVertical:10}}></View>
            <View style={{flexDirection:"row", paddingVertical:5}}>
                <View style={{flexDirection:"row", flex:0.7}}>
                    <Ionicons name="mail-outline" size={25} style={{flex:0.14}}></Ionicons>
                    <Text style={{flex:0.9, fontSize:14}}>{item.email}</Text>
                </View>
                <View style={{flexDirection:"row", flex:0.4}}>
                    <Ionicons name="call" size={25}></Ionicons>
                    <Text style={{flex:0.8}}>{item.tel}</Text>
                </View>
            </View>
            <View style={{flexDirection:"row", paddingVertical:5}}>
                <View style={{flexDirection:"row", flex:1}}>
                    <Ionicons name="pin" size={25}></Ionicons>
                    <Text style={{flex:0.9, fontSize:14}}>{item.address}, {item.city}</Text>
                </View>
                
            </View>
          
            {isOpen ? (
              <View style={{paddingVertical:5, paddingHorizontal:25}}>
              <Text style={{fontSize:12, fontWeight:"900"}}>Aberto, fecha às {currentDayInfo.close}</Text>
          </View>
            ):(
              
                currentDayInfo.open === "" && currentDayInfo.close==="" ? 
              <View style={{paddingVertical:5, paddingHorizontal:25}}>
              <Text style={{fontSize:12, fontWeight:"900"}}>Fechado {currentDayInfo.open}</Text>
              </View>:
              <View style={{paddingVertical:5, paddingHorizontal:25}}>
              <Text style={{fontSize:12, fontWeight:"900"}}>Fechado, abre às  {currentDayInfo.open}</Text>
              </View>
            )
              
          
          }
        </View>
        <View style={{flex:0.2,  flexDirection:"row", }}>
            <View style={{flex:0.4, height:"100%", width:"100%", paddingHorizontal:20}}>
                <Ionicons name="qr-code-outline" size={80} style={{alignSelf:"flex-start", paddingTop:10}}></Ionicons>
            </View>
             <View  style={{flex:0.9, alignSelf:"center"}}>
                <Text>Encontre o QrCode na sua mesa, e faça o seu pedido pela aplicação.</Text>
    
            </View>
            
        </View>
        <View style={{flex:0.3,  margin:10,}}>
            <View style={{flex:1, paddingHorizontal:20, backgroundColor:"#cdcdcd", padding:20}}>
                <Text style={{fontSize:25}}>O que pedir ? </Text>
            </View>
            <View>
                <Text>Se estiver a 750m do estabelecimento, pode já fazer o seu pedido!</Text>
            </View>
            <View style={{ justifyContent:"flex-start", alignItems:"center", marginTop:10, flexWrap:"wrap", flexDirection:"row"}}>
                <CategoryCard></CategoryCard>
                <CategoryCard></CategoryCard>
                <CategoryCard></CategoryCard>
                <CategoryCard></CategoryCard>
            </View>
        </View>
        
    </ScrollView>

  )
};

export default EstablishmentPage;

const styles = StyleSheet.create({
    categoryCard: {
      backgroundColor: "#ffffff",
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    productCard: {
      backgroundColor: "#f2f2f2",
      borderRadius: 5,
      padding: 8,
      marginBottom: 5,
    },
    productInfo: {
        marginTop: 5,
        fontSize: 12,
        color: "#888",
      },
  });