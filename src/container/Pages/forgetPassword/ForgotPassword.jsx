import React, { useRef, useState } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import BOPLogo from "@/assets/logo.png";
import styles from "./ForgotPassword.module.css";
import IconElement from "@/components/common/IconElement/IconElement";
import CustomButton from "@/components/elements/globalButton/button";
import { useNavigate } from "react-router-dom";
import { ForgotPasswordApi } from "@/store/AuthActions/authActions";
import { bopEmailValidation, encryptField } from "@/Common/Utils";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState({ status: false, message: "" });

  const handleClickResetBtn = async (e) => {
    e.preventDefault();
    const isValidEmail = bopEmailValidation(email);
    if (!isValidEmail) {
      setEmailError({ status: true, message: "Enter a valid email address" });
      return;
    }
    setEmailError({ status: false, message: "" });

    const encryptedEmail = await encryptField(email.trim());

    // Only the Auditor role exists in this app, so RoleID is always 6 —
    // matches the hardcoded RoleID used for login.
    let Data = { Email: encryptedEmail };
    dispatch(ForgotPasswordApi({ Data, navigate }));
  };

  const emailRef = useRef(null);
  const handleChangeEmailInput = (event) => {
    const { name, value } = event.target;

    if (name === "email") {
      if (value !== "") {
        setEmail(value);
        const isValidEmail = bopEmailValidation(value);
        if (isValidEmail) {
          setEmailError({ status: false, message: "" });
        }
      } else {
        setEmail("");
        setEmailError({ status: true, message: "Enter a valid email address" });
      }
    }
  };

  const handleKeyDown = (e, fieldName) => {
    // console.log(e, fieldName, "testestets");
    if (e.key === "Enter") {
      e.preventDefault();
      if (fieldName === "email") {
        handleClickResetBtn(e);
      }
    }
    // For non-corporate login (no email validation required)
  };

  return (
    <section className={styles["sign-in"]}>
      <Row>
        <Col
          sm={12}
          md={12}
          lg={12}
          className='d-flex justify-content-center mt-5 '>
          <img
            src={BOPLogo}
            style={{ maxWidth: "100%" }}
            width='300'
            className='img-fluid'
            alt='BOP Logo'
          />
        </Col>
        <Col sm={12} md={12} lg={12}>
          <section className={styles["LoginCard"]}>
            <h4 className={styles["Heading-js"]}>Forgot Passowrd?</h4>
            <span className='mb-4 text-center'>
              Please type your full email
            </span>
            <>
              <InputGroup>
                <InputGroup.Text className={styles["Icon-Field-class"]}>
                  <IconElement iconClass={"icon-user"} />
                </InputGroup.Text>
                <Form.Control
                  name='email'
                  ref={emailRef}
                  onKeyDown={(e) => handleKeyDown(e, "email")}
                  autoComplete='off'
                  className={styles["form-comtrol-textfield"]}
                  placeholder='Email ID'
                  onChange={handleChangeEmailInput}
                  value={email}
                  required={true}
                  pattern='^[a-zA-Z0-9._%+-]+@bop\.com\.pk$'
                  aria-label='Username'
                  aria-describedby='basic-addon1'
                />
              </InputGroup>
              {emailError.status === true && (
                <p className={styles["emailErrorText"]}>{emailError.message}</p>
              )}
            </>

            <CustomButton
              className='mt-3'
              value={"Recover"}
              // type="submit"
              onClick={handleClickResetBtn}
              applyClass={"authLoginBtn"}
              disabled={email ? false : true}
            />
          </section>
        </Col>
      </Row>
    </section>
  );
};

export default ForgotPassword;
