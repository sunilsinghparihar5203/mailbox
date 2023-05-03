import React,{ useState } from "react";
import { AuthContext } from "./Context";

function AuthContextProvider(props){
  const initialToken = localStorage.getItem("TokenID")
  const initialEmail = localStorage.getItem("EmailID")
  const [Token, setToken] = useState(initialToken)
  const [email, setEmail] = useState(initialEmail)
  
  const isLoggedIn = !!Token;

  const loginHandler =(Token,email) =>{
    setToken(Token)
    setEmail(email)
    localStorage.setItem('TokenID',Token)
    localStorage.setItem('EmailID',email)
  }

  const logoutHander = () =>{
    setToken(null)
    setEmail(null)
    localStorage.removeItem('TokenID');
    localStorage.removeItem('EmailID');
  }

  const ContextValue ={
    Token:Token,
    isLoggedIn:isLoggedIn,
    login:loginHandler,
    logout:logoutHander,
    email:email
  }
  return(
    <AuthContext.Provider value={ContextValue}>
      {props.children}
    </AuthContext.Provider>
  )

}

export default  AuthContextProvider