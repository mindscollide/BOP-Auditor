import React, { Fragment, useState, useEffect } from "react";
import { Col, Row, InputGroup, Form } from "react-bootstrap";
import { Button, VerificationInputField } from "../../../components/elements";
import BOPlogo from "../../../assets/images/BOPlogo.png";
import "./TwoFaVerification.css";

const TwoFaVerification = () => {
  const [key, setKey] = useState(1);
  const [verifyOTP, setVerifyOTP] = useState("");

  useEffect(() => {
    // if value was cleared, set key to re-render the element
    if (verifyOTP.length === 0) {
      setKey(key + 1);
      return;
    }
  }, [verifyOTP]);

  const changeHandler = (e) => {
    let otpval = e.toUpperCase();
    setVerifyOTP(otpval);
  };
  return (
    <Fragment>
      <section className="TwoFa-Screen-bg">
        <div className="TwoFaVerification-container">
          <Row>
            <Col className="mb-4">
              <img src={BOPlogo} width="300px" />
            </Col>
          </Row>
          <div className="BOP-div flex-column">
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center"
              >
                <span className="TwoFaVerification-Heading">
                  2FA Verification
                </span>
              </Col>
            </Row>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="column-twoFa-subHeading mt-3"
              >
                <span className="TwoFaVerification-SubHeadings">
                  Enter your verification code
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <VerificationInputField
                  fields={6}
                  applyClass="TwoFaOTPInput"
                  change={changeHandler}
                  key={key}
                  value={verifyOTP}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12} className="column-twoFa-subHeading">
                <span className="TwoFaVerification-SubHeadings">
                  Didn't Receive the Code? <span>Resend Code 00:00</span>
                </span>
              </Col>
            </Row>

            <Row>
              <Col lg={12} md={12} sm={12} className="mt-5">
                <Button text="NEXT" className="Next-btn-TwoFaVerification" />
              </Col>
            </Row>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center"
              >
                <span className="goback-twofaverification">Go Back</span>
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default TwoFaVerification;
