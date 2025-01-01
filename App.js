import React,{useContext, useEffect, useState} from 'react';
//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {View, StyleSheet, Text, TouchableHighlight, TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons';

//Screens
import Login from './screens/LoginScreen';
import Home from './screens/HomeScreen';
import UserHistory from './screens/User/UserHistory';
import UserRegister from './screens/User/UserRegister';
import EstablishmentRegister from './Establishment/EstablishmentRegister';
import PasswordRecovery from './screens/PasswordRecovery';
import UserPerfil from './screens/User/UserPerfil';
import EstablishmentPage from './screens/Establishment/EstablishmentPage';
import ReadQRcode from './screens/ReadQRCode';
//Provider
import "react-native-gesture-handler";
import { AuthProvider } from './context/AuthContext';
import { AuthContext } from './context/AuthContext';
//services
import { loggedUserData, subscribeOnAuthStateChanged, onPressLogout} from './services/firebaseService';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); 

const PerfilStack = () => (
  <Stack.Navigator  screenOptions={{ cardStyle: {backgroundColor: "#fff"}, headerShown:false}}>
    <Stack.Screen name="UserHistory" component={UserHistory}/>
  </Stack.Navigator>
);

const EstablishmentStack = () => (
  <Stack.Navigator  screenOptions={{ cardStyle: {backgroundColor: "#fff"}, headerShown:false}}>
    <Stack.Screen name="EstablishmentPage" component={EstablishmentPage}/>
  </Stack.Navigator>
);



function App() {

  const { authDispatch, authState} = useContext(AuthContext);

  const [aux, setAux] = useState(true);


  useEffect(()=>{
    const unsub = subscribeOnAuthStateChanged((authCredential)=>{
      if(authCredential!=null){

      
          loggedUserData(authCredential.uid, (data) => {
            authDispatch({ type: "login", payload: data });
          });
          
      }else{
        authDispatch({type:"logout"});
      }
    });

    return () => unsub();
  },[]);

  

  return (
    <>
      <NavigationContainer>
        {
      // authState.isAuthenticated ?  (
       aux ? (
            <Tab.Navigator
              screenOptions={({ route }) => ({
              tabBarShowLabel:false,
                headerShown:false, 
              tabBarStyle: {backgroundColor: '#70cf97',borderTopWidth:2,borderTopColor:"#cdcdcd",height:65,paddingTop:3},
            
              tabBarIcon: ({ focused }) => {
                let iconName;
                let textIcon; 

                switch (route.name) {
                  case "UserPerfil":
                    iconName = focused ? 'person' : 'person';
                    textIcon = "Perfil";
                    break;
                  case "QrCodePage":
                    iconName = focused ? 'qr-code-outline' : 'qr-code-outline';
                    textIcon = "Ler QRcode";
                    break;
                  case "Home":
                    iconName = focused ? 'home' : 'home';
                    textIcon = "Página Inicial";
                    break;
                }
      
                return (
                    <View style={{padding:5, justifyContent:"center",alignItems:"center"}}>
                      {
                        iconName==="qr-code-outline" ? (
                          <View style={{backgroundColor:"white", borderRadius:50,borderColor:"#cdcdcd", borderWidth:2, padding:5, height:80, justifyContent:"center", alignItems:"center"}}> 
                              <Ionicons name={iconName} size={25} color="black" style={{alignSelf:"center"}}></Ionicons>
                              <Text style={{color:"black",fontWeight:"500", fontSize:13, paddingBottom:3}}>{textIcon}</Text>
                          </View>
                        ):(
                          <>
                            <Ionicons name={iconName} size={25} color={focused ? "white" : "black"}></Ionicons>
                            <Text style={{color:focused ? "white":"black",fontWeight:"500", fontSize:13, paddingBottom:3}}>{textIcon}</Text>
                          </>
                        )
                      }
                    </View>
                )
              },
            })}>
            <Tab.Screen name="Home" component={Home} 
              options={{
                headerStyle:{
                  backgroundColor:"#fff"
                }
            }}/>
            <Tab.Screen name="QrCodePage" component={ReadQRcode} 
              options={{
                headerStyle:{
                  backgroundColor:"#fff"
                }
            }}/>
            <Tab.Screen name="UserPerfil" component={UserPerfil} 
              options={{
                headerStyle:{
                  backgroundColor:"#fff",
                },
                title:"Perfil",
            }}/>
            
            <Tab.Screen name="PerfilStack" component={PerfilStack} options={{ tabBarButton: () => null, tabBarVisible: false}}/> 
            <Tab.Screen name="EstablishmentStack" component={EstablishmentStack} options={{ tabBarButton: () => null, tabBarVisible: false}}/> 
          
          </Tab.Navigator>
          ) : (
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{
                  headerShown:false
                }}/>
                <Stack.Screen name="EstablishmentRegister" component={EstablishmentRegister} options={{
                  headerTitle:"Registo de Estabelecimento",
                  headerStyle:{
                    backgroundColor:"#F9E9A2",
                
                  }
                }} />
                <Stack.Screen name="UserRegister" component={UserRegister} options={{
                  headerTitle:"",
                  headerTransparent:"true",
                  headerStyle: {
                    backgroundColor:"#F9E9A2",
                  }
                }} />
                <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} options={{
                  headerTitle:"Recuperar Password",
                  headerTransparent:"true",
                  headerStyle: {
                    backgroundColor:"#F9E9A2",
                    borderBottomWidth:2,
                    borderBottomColor:"#6FCF97"
                  },
                }} />
      
            </Stack.Navigator>
          )  
      }
        
    </NavigationContainer>
  </>
  );
  
};

export default () => {
    return ( 
      <AuthProvider>
        <App></App>
      </AuthProvider>
    );
};