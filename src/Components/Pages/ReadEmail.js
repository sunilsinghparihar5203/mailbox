import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

function ReadEmail(props) {
  const { id } = useParams();
  const values = props.data.find((ObjId) => ObjId.Id === id);
  useEffect(() => {
    UpdateEmailToRead(values, id);
  }, []);

  const UpdateEmailToRead = async (values, ID) => {
    if (values.Read === false) {
      const response = await fetch(
        `https://mailbox-f3786-default-rtdb.asia-southeast1.firebasedatabase.app/emails/${ID}.json`,
        {
          method: "PUT",
          body: JSON.stringify({ ...values, Read: true }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        return response.ok;
      }
    }
  };
  return (
    <>
      <Container className="p-3">
        <Row>
          <Col xs={8}>{values.From}</Col>
          <Col xs={4}>{values.Date}</Col>
          <Col xs={12}>{values.Content}</Col>
        </Row>
      </Container>
    </>
  );
}

export default ReadEmail;
