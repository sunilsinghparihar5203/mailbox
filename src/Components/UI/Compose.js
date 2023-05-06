import React, { useRef, useState, useEffect, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { EditorState,convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../Pages/Home.css";
import { AuthContext } from "../Context/Context";
function Compose() {
  const emailRef = useRef();
  const subjRef = useRef();
  const AuthCtx = useContext(AuthContext);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  console.log(convertedContent);

  const sendEmailHandler = async (item) => {
    const emailFrom = AuthCtx.email;
    const emailTo = emailRef.current.value;
    const subject = subjRef.current.value;
    // const username = emailFrom.split("@")[0];

    const response = await fetch(
      `https://mailbox-f3786-default-rtdb.asia-southeast1.firebasedatabase.app/emails.json`,
      {
        method: "POST",
        body: JSON.stringify({
          From: emailFrom,
          To: emailTo,
          Subject: subject,
          Content: convertedContent,
          Stared: false,
          Important: false,
          Trash: false,
          Read:false,
          Date:new Date(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log({ response: response });
    if (response.ok) {
      const data = await response.json();
      console.log({ successdata: data });
      alert("Sent");
      return data;
    } else {
      const data = await response.json();
      console.log({ Errordata: data });
      alert("Error");
    }
  };

  return (
    <main>
      <h4 className="text-center">Compose Mail</h4>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="text-center">Email</Form.Label>
          <Form.Control type="email" ref={emailRef} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicsubject">
          <Form.Label className="text-center">Subject</Form.Label>
          <Form.Control type="text" ref={subjRef} required />
        </Form.Group>
        <Editor
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />
      </Form>
      <hr />
      <div className="col-12 ml-auto">
        <Button
          type="submit"
          className="btn btn-success"
          onClick={sendEmailHandler}
        >
          Send
        </Button>
      </div>
    </main>
  );
}

export default Compose;
