import React,{useState, useRef, useReducer} from "react";
import { Animated, Text} from "react-native";

const handleErrors = (state, action) => {
  switch(action.type){
      //possíveis erros conhecidos, firebase, etc
      case "auth/invalid-email":{
          return {...state, errorCode:"error", errorMsg:"Email inserido é inválido!"}
      }
      case "auth/email-already-in-use":{
          return {...state, errorCode:"error", errorMsg:"Email já existe!"}
      }
      case "auth/wrong-password":{
        return {...state, errorCode:"error", errorMsg:"Senha errada... Tente novamente ou redefina uma nova!"}
      }
      case "auth/user-not-found":{
        return {...state, errorCode:"error", errorMsg:"Email não encontrado... Tente Novamente ou Registe-se!"}
      }
      case "register/success":{
          return {...state, errorCode:"success", errorMsg:"Registado com sucesso!"}
      }
      case "auth/wrong-password":{
        return {...state, errorCode:"error", errorMsg:"Senha Errada, tente novamente!"}
      }
      case "auth/too-many-requests":{
        return {...state, errorCode:"error", errorMsg:"Muitos pedidos, tente novamente mais tarde!"}
      }
      case "clearAll":{
        return {...state, errorCode:"", errorMsg:""};
      }
      //customizável 
      case "error":{
        return {...state, errorCode:"error", errorMsg:action.payload}
      }
      case "success":{
        return {...state, errorCode:"success", errorMsg:action.payload}
      }
      default:
        return state; 
    }
}

const AlertComponent = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;  

  const [showAlert, setShowAlert] = useState(false);  
  const [stateError, dispatch] = useReducer(handleErrors, {errorCode:"", errorMsg:""});


  //Componente para Alerta
  const AlertMsg = (props)=>{
        return (
          <>
            <Animated.View
              style={{
                backgroundColor: props.errorCode === "error" ? "red" : "green",
                padding:10,
                opacity: fadeAnim,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 10,
              }}>
              <Text style={{ color: 'white', fontSize: 17 }}>{props.errorMsg}</Text>
            </Animated.View>
          </>
       )
  }

  //function
  const handleShowAlert = () => {
    setShowAlert(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500, 
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setShowAlert(false);
        });
      }, 2000);
    });
  };
      
  return {handleShowAlert, AlertMsg, showAlert, stateError, dispatch};

}

export default AlertComponent; 