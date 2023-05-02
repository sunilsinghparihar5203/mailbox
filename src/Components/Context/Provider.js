import React,{ useState } from "react";
import { AuthContext } from "./Context";

function AuthContextProvider(props){
  const initialToken = localStorage.getItem("TokenID")
  const [Token, setToken] = useState(initialToken)
  
  const isLoggedIn = !!Token;

  const loginHandler =(Token) =>{
    setToken(Token)
    localStorage.setItem('TokenID',Token)
  }

  const logoutHander = () =>{
    setToken(null)
    localStorage.removeItem('TokenID');
  }

  const ContextValue ={
    Token:Token,
    isLoggedIn:isLoggedIn,
    login:loginHandler,
    logout:logoutHander
  }
  return(
    <AuthContext.Provider value={ContextValue}>
      {props.children}
    </AuthContext.Provider>
  )

}

export default  AuthContextProvider