import React, { useEffect, useState } from "react";
import Email from "./Email";
import { ListGroup, Row, Col } from "react-bootstrap";

function EmailsList() {
  const [data, setdata] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    FetchEmails();
    setisLoading(false);
  }, []);

  const modifyArrayForInbox = (obj) =>{
    let arry = [];
    Object.entries(obj).map((item) => {
      let [id, value] = item;
      let obj = {
        Id: id,
        Subject: value.Subject,
        Content: value.Content,
      };
      arry.push(obj);
    });
    console.log({ modifiedArrayt: arry });
    return arry;
  }

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

  console.log({ dataAfter: data });
  return (
    <div className="container-fluid m-2">
      <p>Inbox</p>
      {data.length === 0 && !isLoading && <p>No Mail Available</p>}
      {isLoading && <p>Loading..</p>}
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
