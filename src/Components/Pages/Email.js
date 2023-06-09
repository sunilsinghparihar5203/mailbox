import React from "react";
import { Form, ListGroup, Row, Col } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

import classes from "./Email.module.css";
function Email(props) {
  let date = !!props.Date
    ? new Date(props.Date).toLocaleDateString("en-us", {
        weekday: "short",
        month: "long",
        day: "numeric",
      })
    : "date not avalibe";

  let day = new Date(date).getDate();
  let today = new Date().getDate();
  let time = new Date(props.Date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  let timeDisplay = day === today ? time : date;

  const match = useRouteMatch();

  const DeleteHandler = () =>{
    props.DeleteEmail(props.Id);
  }
  
  return (
    <ListGroup.Item>
      <Row>
        <Col xs={1}>
          <Row>
            <Col xs={4}>
              <Form.Check inline type="checkbox" />{" "}
            </Col>
            <Col xs={4} style={{ color: "blue" }}>
              <AiFillDelete
                onClick={DeleteHandler} style={{ cursor: "pointer",color:'red' }}
              />
            </Col>
            <Col xs={4} style={{ color: "blue" }}>
              {!props.Read && <Dot />}
            </Col>
          </Row>
        </Col>
        <Col xs={11}>
          <Link to={`${match.url}/${props.Id}`} className={classes.link}>
            <Row>
              <Col xs={3}>{props.From.split("@")[0]}</Col>
              <Col xs={7}>{props.Subject}</Col>
              <Col xs={2}>{timeDisplay}</Col>
            </Row>
          </Link>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export default Email;

function Dot() {
  return <>&#9679;</>;
}
