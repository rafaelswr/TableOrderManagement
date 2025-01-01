import React, {useState, useEffect, useContext} from "react";
import {View, Text, FlatList, Button, StyleSheet,Image, TextInput, ScrollView, PermissionsAndroid} from "react-native";
import { PROVIDER_GOOGLE } from "react-native-maps"; 
import Permissions from "expo";
import MapView,{Marker} from "react-native-maps";
import Button_1 from "../components/Button";
import { getAllfromCollection, onPressLogout } from "../services/firebaseService";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import EstablishmentCard from "../components/EstablishmentCard";
import * as Location from "expo-location";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={24} color="black" style={styles.icon} />
      <TextInput placeholder="Pesquisar endereço" style={styles.input} />
    </View>
  );
};


const CustomMarker = (props) => (
  <View style={styles.markerContainer}>
  {  /* 
  <Image source={require("../assets/silva.jpg")} style={styles.markerImage} />
  */}
    {

    
      props.type==="Restaurante" ?
                            <Ionicons name="restaurant-outline" size={15} style={styles.markerImage}></Ionicons>
                        : 
                            props.type==="Cafetaria" ? 
                                <Ionicons name="cafe-outline" size={15} style={styles.markerImage}></Ionicons>
                            :  
                                <Ionicons name="wine-outline" size={15} style={styles.markerImage}></Ionicons>
                        
    }
  </View>
);


const UserMarker = () => (
  <View style={styles.markerContainer}>
    <Ionicons name="locate-outline" size={15} style={styles.markerImage}></Ionicons>
  </View>
);


const Home = (props) =>{

  const {authDispatch, authState } = useContext(AuthContext);

  const [estabelecimentos, setEstabelecimentos] = useState([]);
 
  const [localizacao, setLocalizacao] = useState(null);


  useEffect(()=>{
    const unsub = getAllfromCollection("establishments",(data)=>{
      setEstabelecimentos(...estabelecimentos, data);
    }, (error)=>{
      console.log(error);
    });

    return () => {
      if (unsub) {
        unsub();
      }
    };
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocalizacao({latitude:location.coords.latitude,longitude:location.coords.longitude});
    })();

  },[]);


  //console.log("Estabelecimentos: ", estabelecimentos);
console.log("LOCALIZACAO:", localizacao);
  console.log("AUTH STATE -> ", authState);

    return(
      <>
        <View style={{flex:1}}>
            <View style={{justifyContent:"center", alignItems:"center", flex:0.5, backgroundColor:"#D9D9D9", flex:0.7}}>
              <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={{latitude:41.11995,longitude:-8.29347,
                          latitudeDelta: 0.0422, longitudeDelta: 0.0421}}>
                  {estabelecimentos.length>0 && estabelecimentos.map((estabelecimento, index) => {
                  
                  return (
                    <Marker
                      key={index}
                      coordinate={{
                        latitude: Number(estabelecimento.lat),
                        longitude: Number(estabelecimento.long),
                      }}
                      title={estabelecimento.name}
                    >
                      <CustomMarker type={estabelecimento.type} />
                    </Marker>
                  );
                    })}

                {localizacao && 
                  <Marker coordinate={{latitude:localizacao.latitude, longitude:localizacao.longitude}}  title="Você">
                        <View style={styles.markerContainer}>
                          <Ionicons color={"blue"} name="locate" size={15} style={styles.markerImage}></Ionicons>
                      </View>
                  </Marker>
                }

              </MapView>
              <SearchBar></SearchBar>
            </View>
        
            {localizacao!==null && 
              <>
                  <FlatList style={{flex:0.3}} data={estabelecimentos} renderItem={({item})=>{
              
                    return(
                      <>
                        <EstablishmentCard onPress={()=>{
                          props.navigation.navigate("EstablishmentStack", {screen:"EstablishmentPage",params:{item}})
                        }} userLocation={localizacao} item={item}></EstablishmentCard>
                      
                    </>
                    );
 
                  }} keyExtractor={(item) => item.id.toString()}></FlatList>
     
              </>
            } 
             
           

          
        </View>
    </>

    );
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
      
      },
      container: {
        position: 'absolute', top: 40, left: 20, right: 20,
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 8,
        borderRadius: 10,
        alignItems: 'center',
        marginLeft: 8,
        marginRight: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
     
      },
      icon: {
        marginRight: 8,
      },
      input: {
        flex: 1,
      },
      markerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      markerImage: {
        width: 30,
        height: 30,

      },
})

export default Home;