import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/Context";
import { Switch, Route, useHistory,Redirect } from "react-router-dom";
import Sidebar from "../UI/Sidebar";
import Compose from "../UI/Compose";
import "./Home.css";
import EmailsList from "./EmailsList";
import ReadEmail from "./ReadEmail";

function Home() {
  const [data, setdata] = useState([{ 1: "one" }]);
  const [Unread, setUnread] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const AuthCtx = useContext(AuthContext);
  const history = useHistory();
  if (!AuthCtx.isLoggedIn) {
    history.push("/login");
  }

  const modifyArrayForInbox = (obj) => {
    let arry = [];
    let inboxCounter = 0;

    Object.entries(obj).map((item) => {
      let [id, value] = item;
      if (value.Read !== true) {
        inboxCounter++;
      }
      let obj = {
        Id: id,
        Subject: value.Subject,
        Content: value.Content,
        Read: value.Read,
        Date: value.Date,
        Trash: value.Trash,
        From: value.From,
        To: value.To,
        Stared: value.Stared,
        Important: false,
      };
      arry.push(obj);
    });
    arry.sort(
      (a, b) => Date.parse(new Date(b.Date)) - Date.parse(new Date(a.Date))
    );
    setisLoading(false);
    setUnread(inboxCounter);
    return arry;
  };

  const FetchEmails = async () => {
    const response = await fetch(
      `https://mailbox-f3786-default-rtdb.asia-southeast1.firebasedatabase.app/emails.json`
    );
    console.log({ response: response });
    if (response.ok) {
      const data = await response.json();
      console.log({ successdata: data });
      setdata(modifyArrayForInbox(data));
      return data;
    } else {
      const data = await response.json();
      console.log({ Errordata: data });
      alert("Error");
    }
  };

  const DeleteEmail = async (Id) => {
    const response = await fetch(`https://mailbox-f3786-default-rtdb.asia-southeast1.firebasedatabase.app/emails/${Id}.json`,{
      method: "DELETE",
    });
    console.log({ response: response });
    if (response.ok) {
      console.log("deleted")
      FetchEmails()
    } else {
      alert("Error");
    }
  };

  return (
    <div className="container bootdey my-2">
      <div className="email-app">
        <Sidebar Unread={Unread} />
        <Switch>
          <Route path="/inbox" exact>
            <EmailsList
              data={data}
              isLoading={isLoading}
              FetchEmails={FetchEmails}
              DeleteEmail={DeleteEmail}
            />
          </Route>
          <Route path="/inbox/:id" exact>
            <ReadEmail data={data} />
          </Route>
          <Route path="/compose">
            <Compose />
          </Route>
          <Route path="/">
            <Redirect to='/inbox'/>;
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Home;
