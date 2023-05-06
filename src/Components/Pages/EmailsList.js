import React, { useEffect } from "react";
import Email from "./Email";
import { ListGroup, Row, Col } from "react-bootstrap";

function EmailsList({data,isLoading,FetchEmails}) {

  useEffect(() => {
    FetchEmails();
  }, [FetchEmails]);


  console.log({ dataAfter: data });
  return (
    <div className="container-fluid m-2">
      <p>Inbox</p>
      {isLoading && <p>Loading..</p>}
      {!isLoading && (data.length === 0 && <p>No Mail Available</p>)}
      <Row>
        <Col sm={12}>
          <ListGroup as="ul">
            {data.length > 0 &&
              data.map((item) => {
                return (
                  <Email
                    Subject={item.Subject}
                    key={item.Id}
                    Content={item.Content}
                    Read={item.Read}
                    Date={item.Date}
                    Id={item.Id}
                  />
                );
              })}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}

export default EmailsList;
