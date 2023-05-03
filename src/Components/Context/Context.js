import { createContext } from "react";

export const AuthContext = createContext({
  Token:"",
  isLoggedIn : false,
  login:(token)=>{},
  logout: ()=>{},
  email:'',
})