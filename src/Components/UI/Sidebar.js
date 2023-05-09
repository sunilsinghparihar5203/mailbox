import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../Pages/Home.css";
import { Button, Badge } from "react-bootstrap";
import { AuthContext } from "../Context/Context";
function Sidebar(props) {
  const AuthCtx = useContext(AuthContext);

  const LogoutHandler = () => {
    AuthCtx.logout();
  };
  return (
    <nav>
      <Link to="/compose" className="btn btn-danger btn-block">
        Compose
      </Link>
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link" to="/inbox">
            Inbox
            <Badge variant="primary">{props.inbox > 0 ? props.inbox : ""}</Badge>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/stared">
            Stared
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/sent">
            Sent {props.Unread}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/trash">
            Trash
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/important">
            Important
          </Link>
        </li>
        <li className="nav-item my-1">
          <Button onClick={LogoutHandler}>Logout</Button>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
