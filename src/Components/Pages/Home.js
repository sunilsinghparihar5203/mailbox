import React, { useContext, useState,useEffect, useCallback,useMemo  } from "react";
import { AuthContext } from "../Context/Context";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import Sidebar from "../UI/Sidebar";
import Compose from "../UI/Compose";
import "./Home.css";
import EmailsList from "./EmailsList";
import ReadEmail from "./ReadEmail";
import useFetchData from "../../Hooks/useFetchData";

function Home() {
  const AuthCtx = useContext(AuthContext);
  const history = useHistory();

  const fetchedData = useFetchData()

  const { isLoading,myData,Error,InboxData,SentData,InboxDataUnread,fetchRequest} = fetchedData;

  useEffect(() => {
    if (!AuthCtx.isLoggedIn) {
      history.push("/login");
    }
  }, [AuthCtx.isLoggedIn, history]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchRequest();
      console.log("fething data")
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const DeleteEmail = async (Id) => {
    const response = await fetch(
      `https://mailbox-f3786-default-rtdb.asia-southeast1.firebasedatabase.app/emails/${Id}.json`,
      {
        method: "DELETE",
      }
    );
    console.log({ response: response });
    if (response.ok) {
      console.log("deleted");
      fetchRequest();
    } else {
      alert("Error");
    }
  };

  return (
    <div className="container bootdey my-2">
      <div className="email-app">
        <Sidebar inbox={InboxDataUnread.length} />
        <Switch>
          <Route path="/inbox" exact>
            <EmailsList
              data={InboxData}
              isLoading={isLoading}
              FetchEmails={fetchRequest}
              DeleteEmail={DeleteEmail}
              type={"inbox"}
            />
          </Route>
          <Route path="/inbox/:id" exact>
            <ReadEmail data={InboxData} type={"sent"} />
          </Route>
          <Route path="/sent" exact>
            <EmailsList
              data={SentData}
              isLoading={isLoading}
              FetchEmails={fetchRequest}
              DeleteEmail={DeleteEmail}
              type={"sent"}
            />
          </Route>
          <Route path="/sent/:id" exact>
            <ReadEmail data={SentData} type={"sent"} />
          </Route>
          <Route path="/compose">
            <Compose />
          </Route>
          <Route path="/">
            <Redirect to="/inbox" />;
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Home;
