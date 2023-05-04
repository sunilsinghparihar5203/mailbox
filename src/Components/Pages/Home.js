import React, { useContext } from "react";
import { AuthContext } from "../Context/Context";
import { Switch, Route, useHistory } from "react-router-dom";
import Sidebar from "../UI/Sidebar";
import Compose from "../UI/Compose";
import "./Home.css";
import EmailsList from "./EmailsList";

function Home() {
  const AuthCtx = useContext(AuthContext);
  const history = useHistory();
  if (!AuthCtx.isLoggedIn) {
    history.push("/login");
  }
  return (
    <div className="container bootdey my-2">
      <div className="email-app">
        <Sidebar />
        <Switch>
          <Route path="/inbox">
            <EmailsList />
          </Route>
          <Route path="/compose">
            <Compose />
          </Route>
          <Route path="/">
            <EmailsList />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Home;
