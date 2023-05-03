import React, { useContext } from "react";
import { AuthContext } from "../Context/Context";
import { Switch, Route, useHistory } from "react-router-dom";
import Sidebar from "../UI/Sidebar";
import Compose from "../UI/Compose";
import "./Home.css";

function Home() {
  const AuthCtx = useContext(AuthContext);
  const history = useHistory();
  if (!AuthCtx.isLoggedIn) {
    history.push("/login");
  }
  return (
    <div className="container bootdey">
      <div className="email-app">
        <Sidebar />
        <Switch>
          <Route path="/compose">
            <Compose />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Home;
