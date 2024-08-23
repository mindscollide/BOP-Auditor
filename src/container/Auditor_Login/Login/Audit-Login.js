import React, { Fragment, useEffect, useState, useRef } from "react";
import { Container, Col, Row, InputGroup, Form } from "react-bootstrap";
import {
  Button,
  TextField,
  Loader,
  Notification,
} from "../../../components/elements";
import { logIn } from "../../../store/actions/Auth-Actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BOPlogo from "../../../assets/images/BOPlogo.png";
import "./Audit-Login.css";
const AuditLogin = () => {
  const { auth } = useSelector((state) => state);
  console.log(auth, "authReducerauthReducerauthReducer");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState({
    open: false,
    message: "",
  });

  const UserName = useRef(null);
  const Password = useRef(null);

  const [passwordText, setPasswordText] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //state for login credentials
  const [securityCredentials, setSecurityCredentials] = useState({
    UserName: "",
    Password: "",
    fakePassword: "",
  });
  console.log("showPasswordshowPassword", showPassword);

  // Enter key handler
  const enterKeyHandler = (event, nextInput) => {
    if (event.key === "Enter") {
      nextInput.current.focus();
    }
  };

  // credentials for email and password
  const setCredentialHandler = (e) => {
    if (e.target.name === "Password") {
      let numChars = e.target.value;
      let showText = "";
      for (let i = 0; i < numChars.length; i++) {
        showText += "•";
      }
      setSecurityCredentials({
        ...securityCredentials,
        [e.target.name]: e.target.value,
        ["fakePassword"]: showText,
      });
    } else {
      setSecurityCredentials({
        ...securityCredentials,
        [e.target.name]: e.target.value,
      });
    }
  };

  // handler for submit login
  const loginValidateHandler = (e) => {
    e.preventDefault();
    if (
      securityCredentials.UserName !== "" &&
      securityCredentials.Password !== ""
    ) {
      dispatch(logIn(navigate, securityCredentials));
    } else {
      setOpen({
        ...open,
        open: true,
        message: "Please Enter All Credentials",
      });
    }
  };

  // eye on Click on Eye Icon on Password
  const toggleEyeIcon = () => {
    setShowPassword(!showPassword);
  };

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
                  <Form onSubmit={loginValidateHandler}>
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
                            onKeyDown={(event) =>
                              enterKeyHandler(event, Password)
                            }
                            name="UserName"
                            autoComplete="off"
                            value={securityCredentials.UserName}
                            onChange={setCredentialHandler}
                            className="form-comtrol-textfield"
                            placeholder="Email ID"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                          />
                        </InputGroup>
                      </Col>
                      <Col sm={12} md={12} lg={12} className="mb-3">
                        <InputGroup>
                          <InputGroup.Text
                            id="basic-addon1"
                            className="Icon-Field-class"
                          >
                            <i className="icon-lock"></i>
                          </InputGroup.Text>
                          <Form.Control
                            name="passwordText"
                            // ref={Password}
                            autoComplete="off"
                            className="form-comtrol-textfield-password"
                            placeholder="Password"
                            aria-label="passwordText"
                            aria-describedby="basic-addon2"
                            type={showPassword ? "text" : "password"}
                            value={passwordText}
                            onChange={(e) => setPasswordText(e.target.value)}
                          />
                          <InputGroup.Text
                            id="basic-addon2"
                            className="eyeIcon-Field-class-BOP-login"
                            onClick={toggleEyeIcon}
                          >
                            {showPassword ? (
                              <i className="icon-eye-slash"></i>
                            ) : (
                              <i className="icon-eye"></i>
                            )}
                          </InputGroup.Text>
                        </InputGroup>
                      </Col>
                      <Col
                        sm={12}
                        md={12}
                        lg={12}
                        className="signIn-Signup-btn-col"
                      >
                        <Button text="Login" className="login-btn" />
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Col>
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
      {auth.Loading ? <Loader /> : null}
    </Fragment>
  );
};

export default AuditLogin;
