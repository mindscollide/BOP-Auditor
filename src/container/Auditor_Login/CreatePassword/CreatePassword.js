import React, { Fragment, useState } from "react";
import { Col, Row, InputGroup, Form } from "react-bootstrap";
import { Button } from "../../../components/elements";
import BOPlogo from "../../../assets/images/BOPlogo.png";
import PasswordChecklist from "react-password-checklist";
import "./CreatePassword.css";

const CreatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const showPassowrd = () => {
    setShowPasswordIcon(!showPasswordIcon);
  };

  const showConfirmPasswordFunc = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Fragment>
      <section className="CreatePassword-Screen-bg">
        <Row className="mt-5">
          <Col sm={12} md={12} lg={12} className="CreatePassword-container">
            <Row>
              <Col className="mb-4">
                <img src={BOPlogo} width="300px" />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col
                sm={5}
                md={5}
                lg={5}
                className="CreateBOP-center-div flex-column"
              >
                {/* <Form onSubmit={loginValidateHandler}> */}
                <Row>
                  <Col sm={12} md={12} lg={12}>
                    <span className="Heading-CreatePaswword-BOP">
                      Create Password
                    </span>
                  </Col>
                  <Col sm={12} md={12} lg={12} className="mt-3">
                    <InputGroup className="mb-3">
                      <InputGroup.Text
                        id="basic-addon1"
                        className="Icon-Field-class-BOP-createPass"
                      >
                        <i className="icon-lock"></i>
                      </InputGroup.Text>
                      <Form.Control
                        name="password"
                        autoComplete="off"
                        className="form-comtrol-CreatePassword-textfield"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        type={showPasswordIcon ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <InputGroup.Text
                        id="basic-addon1"
                        className="eyeIcon-Field-class-BOP-createPass"
                        onClick={showPassowrd}
                      >
                        {showPasswordIcon ? (
                          <>
                            <i className="icon-eye-slash"></i>
                          </>
                        ) : (
                          <>
                            <i className="icon-eye"></i>
                          </>
                        )}
                      </InputGroup.Text>
                    </InputGroup>
                  </Col>
                  <Col sm={12} md={12} lg={12} className="mb-3">
                    <InputGroup>
                      <InputGroup.Text
                        id="basic-addon1"
                        className="Icon-Field-class-BOP-createPass"
                      >
                        <i className="icon-lock"></i>
                      </InputGroup.Text>
                      <Form.Control
                        name="confirmPassword"
                        autoComplete="off"
                        className="form-comtrol-CreatePassword-textfield-password"
                        placeholder="Confirm Password"
                        aria-label="Confirm Password"
                        aria-describedby="basic-addon1"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <InputGroup.Text
                        id="basic-addon1"
                        className="eyeIcon-Field-class-BOP-createPass"
                        onClick={showConfirmPasswordFunc}
                      >
                        {showConfirmPassword ? (
                          <>
                            <i className="icon-eye-slash"></i>
                          </>
                        ) : (
                          <>
                            <i className="icon-eye"></i>
                          </>
                        )}
                      </InputGroup.Text>
                    </InputGroup>
                  </Col>
                  <Row>
                    <Col>
                      <PasswordChecklist
                        rules={["minLength", "specialChar", "letter", "match"]}
                        messages={{
                          minLength: "Password has at least 8 characters",
                          specialChar: "Password has special characters",
                          letter: "Password has a letter",
                          match: "Passwords match",
                        }}
                        minLength={8}
                        invalidColor="#ff0000"
                        validColor="#0dc45f"
                        iconSize={"11px"}
                        value={password}
                        valueAgain={confirmPassword}
                      />
                    </Col>
                  </Row>
                  <Col
                    sm={12}
                    md={12}
                    lg={12}
                    className="d-flex justify-content-center mt-2"
                  >
                    <Button
                      text="Create Password"
                      className="ChangePassword-btn"
                      disableBtn={true}
                    />
                  </Col>
                </Row>
                {/* </Form> */}
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
    </Fragment>
  );
};

export default CreatePassword;
