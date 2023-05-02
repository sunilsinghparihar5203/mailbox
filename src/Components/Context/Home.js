import React,{useContext} from 'react'
import { AuthContext } from './Context'
import { useHistory } from 'react-router-dom'

function Home() {
  const AuthCtx = useContext(AuthContext)
  const history = useHistory()
  if(!AuthCtx.isLoggedIn){
    history.push("/login")
  }
  return (
    <div>Welcome to Mail box</div>
  )
}

export default Home