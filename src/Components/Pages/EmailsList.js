import React, { useEffect } from "react";
import Email from "./Email";
import { ListGroup, Row, Col } from "react-bootstrap";

function EmailsList({ data, isLoading, FetchEmails }) {
  useEffect(() => {
    FetchEmails();
  }, []);
  return (
    <div className="container-fluid m-2">
      <p>Inbox</p>
      {isLoading && <p>Loading..</p>}
      {!isLoading && data.length === 0 && <p>No Mail Available</p>}
      {!isLoading && data.length > 0 && (
        <Row>
          <Col sm={12}>
            <ListGroup as="ul">
              {data.map((item) => {
                return (
                  <Email
                    Subject={item.Subject}
                    key={item.Id}
                    From={item.From}
                    Read={item.Read}
                    Date={item.Date}
                    Id={item.Id}
                  />
                );
              })}
            </ListGroup>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default EmailsList;
