import React, { useEffect } from 'react'
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

function ReadEmail(props) {
  const { id } = useParams();

  console.log({ id: id })

  useEffect(() => {
    UpdateEmailToRead(props.data,id)
  }, [])

  const UpdateEmailToRead = async (data,ID) => {
    console.log({data:data,ID:ID})
    let values = data.map((ObjId) => {
      let index = data.indexOf(ObjId)
      if (ObjId.Id === ID) {
        console.log({indexData:data[index]})
        return data[index]
      }
    });

    console.log({values:values})
    const response = await fetch(
      `https://mailbox-f3786-default-rtdb.asia-southeast1.firebasedatabase.app/emails/${ID}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          ...values,
          Read: true
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log({ updateRead: data })
      return data;
    } else {
      return response.ok;
    }
  }
  return (
    <>
      <Row>
        <Col xs={12}>
          {id}
        </Col>
      </Row>
    </>
  )
}

export default ReadEmail