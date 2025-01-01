import React, {useReducer, useRef, useState} from "react";


const AuthContext = React.createContext();

const AuthProvider = ({children})=>{

  const authReducer = (state, action) => {
    switch (action.type) {
      case 'login':
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
        };
      case 'logout':
        return {
          ...state,
          user: null,
          isAuthenticated: false,
        };
      default:
        return state;
    }
  };

  const [authState, authDispatch] = useReducer(authReducer, {user:null, isAuthenticated: false});

    const contextValues={
      authDispatch,
      authState
    }

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider};