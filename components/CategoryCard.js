import React from "react";
import {View, Text, StyleSheet, ImageBackground} from "react-native";

const CategoryCard = (props) => {
  return (
    /*<ImageBackground source={require('../assets/backgroundCategory.jpg')} style={{ margin: 5, width: 160, borderRadius: 20, height: 160, overflow: 'hidden' }}
                    imageStyle={{ opacity: 0.15}}>
        <View style={{margin:5, width:160, borderRadius:20, height:160 }}>
            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                <Text style={{fontSize:20, fontWeight:"bold"}}>Especialidades</Text>
            </View>
        </View>
        </ImageBackground>
  
 */ 
    <View >
        <View style={{margin:5, width:160, borderRadius:20, height:160, backgroundColor:"#EAEAEA"}}>
            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                <Text style={{fontSize:20, fontWeight:"bold"}}>Especialidades</Text>
            </View>
        </View>
        </View>



  );




};

export default CategoryCard;

const styles=StyleSheet.create({

});