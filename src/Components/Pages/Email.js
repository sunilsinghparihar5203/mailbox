import React from "react";
import { Form, ListGroup, Row, Col } from "react-bootstrap";

function Email(props) {
  return (
    <ListGroup.Item>
      <Row>
        <Col xs={3}>
          <Row>
            <Col xs={2}>
              <Form.Check inline type="checkbox" />{" "}
            </Col>
            <Col xs={10}>{props.Subject}</Col>
          </Row>
        </Col>
        <Col xs={8}>{props.Content}</Col>
        <Col xs={1}>Date</Col>
      </Row>
    </ListGroup.Item>
  );
}

export default Email;
