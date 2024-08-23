import React, { useState, useEffect, useRef, Fragment } from "react";
import { Container, Col, Row, InputGroup, Form } from "react-bootstrap";
import { Button, TextField } from "../../../components/elements";
import BOPlogo from "../../../assets/images/BOPlogo.png";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const UserName = useRef(null);

  //state for login credentials
  const [emailForgot, setEmailForgot] = useState({
    EmailUser: "",
  });

  return (
    <Fragment>
      <Col sm={12} lg={12} md={12} className="sign-in">
        <Container>
          <Row className="">
            <Col sm={12} md={12} lg={12} className="login-container">
              <Row>
                <Col className="mb-4">
                  <img src={BOPlogo} width="300px" />
                </Col>
              </Row>
              <Row>
                <Col className="center-div flex-column">
                  <Form>
                    <Row className="flex-column">
                      <Col className="d-flex justify-content-center">
                        <p className="forget-password-heading">
                          Forget Password ?
                        </p>
                      </Col>
                      <Col className="d-flex justify-content-center">
                        <p className="small-heading-forget">
                          Please type your full email
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12} md={12} lg={12} className="mt-3">
                        <InputGroup className="mb-3">
                          <InputGroup.Text
                            id="basic-addon1"
                            className="Icon-Field-class"
                          >
                            <i className="icon-user"></i>
                          </InputGroup.Text>
                          <Form.Control
                            ref={UserName}
                            name="EmailUser"
                            autoComplete="off"
                            value={emailForgot.EmailUser}
                            onChange={setEmailForgot}
                            className="form-comtrol-textfield"
                            placeholder="Email ID"
                            aria-label="EmailUser"
                            aria-describedby="basic-addon1"
                          />
                        </InputGroup>
                      </Col>

                      <Col
                        sm={12}
                        md={12}
                        lg={12}
                        className="signIn-Signup-btn-col"
                      >
                        <Button text="Recover" className="Recover-btn" />
                      </Col>

                      <Col className="d-flex justify-content-center mt-2">
                        <p
                          className="back-to-login-forgot"
                          onClick={() => navigate("/")}
                        >
                          Back to login
                        </p>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Col>
    </Fragment>
  );
};

export default ForgotPassword;
