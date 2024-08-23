import React, { useState, Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";
import BOPlogo from "../../../assets/images/BOPlogo.png";
import "./EmailSentPage.css";

const EmailSentPage = () => {
  return (
    <>
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
                  <Col className="EMail-Sent-center-div flex-column">
                    <Row>
                      <Col>
                        <p className="Email-Password-sent-heading">
                          Password Reset Email is sent to.
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p className="Email-Sent-subHeading">
                          Please Check your email and click on the Password
                          Reset link.
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Col>
      </Fragment>
    </>
  );
};

export default EmailSentPage;
