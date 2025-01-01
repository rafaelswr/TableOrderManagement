
//import * as firebase from "firebase";
//const firebase = require('firebase/app').default
import { initializeApp } from 'firebase/app';
import {getAuth,  initializeAuth} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getReactNativePersistence} from "firebase/auth/react-native";

const firebaseConfig = {
  apiKey: "AIzaSyDpE611oSZsOhGQYs4mQTu1pJxbp0E3Cas",
  authDomain: "projapppedmesa.firebaseapp.com",
  projectId: "projapppedmesa",
  storageBucket: "projapppedmesa.appspot.com",
  messagingSenderId: "722350685005",
  appId: "1:722350685005:web:7d17db7d978265dbce5504"
};


export const app = initializeApp(firebaseConfig);


const store = getReactNativePersistence(AsyncStorage);
  try{
    initializeAuth(app,{persistent:store});
  }catch(error){
    console.log(error);
}

export const auth = getAuth(app);
export const db = getFirestore(app); 
export const storage = getStorage(app);