
import React, {useReducer, useState} from "react";

const handleData = (state, action)=>{
    switch(action.type){
        case "EmptyEmail":{
            return {...state, emailValid:false, msgErrorEmail:"Insira o email!"}
        }
        case "EmailRequirements":{
            return {...state, emailValid:false, msgErrorEmail:"Email inválido!"}
        }
        case "EmptyPassword":{
            return {...state, passwordValid:false, msgErrorPass:"Insira a Password!"}
        }
        case "PasswordRequirements":{
            return {...state, passwordValid:false, msgErrorPass:"Password não cumpre os requisitos"}
        }
        case "EmailClear":{
            return {...state, emailValid:true, msgErrorEmail:""}
        }
        case "PasswordClear":{
            return {...state, passwordValid:true, msgErrorPass:""}
        }
        default:{
           return {...state, passwordValid:true, emailValid:true}
        }
    }
}

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;


const EmailPasswordReducer = () => {   

    const [state, dispatch] = useReducer(handleData, {passwordValid:true, emailValid:null, msgErrorPass:"", msgErrorEmail:""});

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const handleEmail = (email)=>{
        if(email.trim()===""){
            dispatch({type:"EmptyEmail"})
        }else if(!emailRegex.test(email)){
            dispatch({type:"EmailRequirements"})
        }else{
            dispatch({type:"EmailClear"})
        }
    }

    const handlePassword = (password)=>{
        if(password.trim()===""){
            dispatch({type:"EmptyPassword"})
        }else if(!passwordRegex.test(password)){
            dispatch({type:"PasswordRequirements"})
        }else{
            dispatch({type:"PasswordClear"})
        }
    }


    const toggleShowPassword = ()=>{ 
        setShowPassword(!showPassword);
    }
    const toggleShowConfirmPassword = ()=>{ 
        setShowConfirmPassword(!showConfirmPassword);
    }

    return {
        handleEmail, 
        handlePassword,
        toggleShowPassword, 
        toggleShowConfirmPassword,
        showConfirmPassword,
        showPassword,
        state,
    }    

}

export default EmailPasswordReducer; 