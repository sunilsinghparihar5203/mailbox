import { useContext } from "react";
import Header from "./Components/Header/Header";
import { Route, Switch } from "react-router-dom";
import Signup from "./Components/Pages/Signup";
import Login from "./Components/Pages/Login";

import Home from "./Components/Pages/Home";


function App() {
  
  return (
    <>
      <Header />
      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;
