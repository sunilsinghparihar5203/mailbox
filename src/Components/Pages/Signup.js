import React, { useState, useRef } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

function Signup() {
  const emailRef = useRef();
  const passRef = useRef();
  const conformPassRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const saveUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const conformPassword = conformPassRef.current.value;

    if (password !== conformPassword) {
      alert("password not matching.");
      return;
    }

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAtQzwkxZ-YE5FObjI37AozxYXHXsy7ydk`,
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          alert("user created!");
        }
        return res.json();
      })
      .then((data) => {
          if (data.error.message) {
          console.log({ data: data });
          throw new Error(data.error.message);
        }
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    Logo
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={saveUser}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          ref={emailRef}
                          required
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          ref={passRef}
                          required
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          ref={conformPassRef}
                          required
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          {!isLoading ? "Create Account" : "Creating...."}
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account??{" "}
                        <a href="{''}" className="text-primary fw-bold">
                          Sign In
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signup;
