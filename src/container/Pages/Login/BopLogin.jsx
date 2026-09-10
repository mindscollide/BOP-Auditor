import React, { useEffect, useRef, useState } from "react";

import styles from "./BopLogin.module.css";

import { Row, Col, InputGroup, Form } from "react-bootstrap";

import BOPLogo from "../../../assets/images/logo.png";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { updateEmail, updatePassword } from "./Loginfunctions";

import IconElement from "../../../components/IconElement/IconElement";

import CustomButton from "../../../components/elements/globalButton/button";

import { loginInApi } from "./logInAction";

import { useNotification } from "../../../context/NotificationProvider";

import { bopEmailValidation, encryptField } from "../../../Common/Utils";

import MaskedPasswordField from "../../../components/common/maskedPasswordField/MaskedPasswordField";

const BopLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showMessage } = useNotification();

  const passwordRef = useRef(null);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    hasErrorOnEmail: false,
    hasEmailisValid: true,
    hasErrorOnPassword: false,
  });

  const [passwordError, setPasswordError] = useState("");
  const [userNameError, setUserNameError] = useState("");

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleChangeFields = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      const email = value;

      setUserNameError("");

      if (!email.trim()) {
        setCredentials((prev) => ({
          ...prev,
          email,
          hasErrorOnEmail: true,
          hasEmailisValid: false,
        }));
        return;
      }

      if (!bopEmailValidation(email.trim())) {
        setCredentials((prev) => ({
          ...prev,
          email,
          hasErrorOnEmail: true,
          hasEmailisValid: false,
        }));
        setUserNameError("Please enter a valid email");
        return;
      }

      updateEmail(email, setCredentials);

      setUserNameError("");
    }

    if (name === "password") {
      const password = value;

      setPasswordError("");

      updatePassword(password, setCredentials);

      if (!password) {
        setPasswordError("Please enter a password");
      }
    }
  };

  const validateFields = () => {
    const trimmedEmail = credentials.email.trim();
    const password = credentials.password;

    let isValid = true;

    // Email validation
    if (!trimmedEmail) {
      setUserNameError("Please enter an email");
      isValid = false;
    } else if (!bopEmailValidation(trimmedEmail)) {
      setUserNameError("Please enter a valid email");
      isValid = false;
    } else {
      setUserNameError("");
    }

    // Password validation
    if (!password) {
      setPasswordError("Please enter a password");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    const trimmedEmail = credentials.email.trim();

    try {
      const [encryptedEmail, encryptedPassword] = await Promise.all([
        encryptField(trimmedEmail),
        encryptField(credentials.password),
      ]);

      const Data = {
        Email: encryptedEmail,
        Password: encryptedPassword,
        DeviceID: "1",
        Device: "Browser",
        RoleID: 6,
      };

      dispatch(loginInApi({ Data, navigate }));
    } catch (error) {
      console.error("Login encryption error:", error);
      showMessage("Unable to process login. Please try again.", "error");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;

    if (e.target.name === "email") {
      const email = e.target.value.trim();

      if (!email) {
        setUserNameError("Please enter an email");
        return;
      }

      if (!bopEmailValidation(email)) {
        setUserNameError("Please enter a valid email");
        return;
      }

      setUserNameError("");
      passwordRef.current?.focus();
    }

    if (e.target.name === "password") {
      handleSubmit(e);
    }
  };

  return (
    <section className={styles["sign-in"]}>
      <Row>
        <Col
          sm={12}
          md={12}
          lg={12}
          className="d-flex justify-content-center mt-5"
        >
          <img
            src={BOPLogo}
            style={{ maxWidth: "100%" }}
            width="300"
            className="img-fluid"
            alt="BOP Logo"
          />
        </Col>

        <Col sm={12} md={12} lg={12}>
          <Form onSubmit={handleSubmit}>
            <section className={styles["LoginCard"]}>
              <h4 className={styles["Heading-js"]}>Login</h4>

              {/* Email */}
              <InputGroup>
                <InputGroup.Text className={styles["Icon-Field-class"]}>
                  <IconElement iconClass="icon-user" />
                </InputGroup.Text>

                <Form.Control
                  name="email"
                  autoComplete="off"
                  className={styles["form-comtrol-textfield"]}
                  placeholder="Email"
                  value={credentials.email}
                  onChange={handleChangeFields}
                  onKeyDown={handleKeyDown}
                  type="email"
                  aria-label="email"
                  maxLength={100}
                  aria-describedby="email-error"
                  isInvalid={!!userNameError}
                />
              </InputGroup>

              {userNameError && (
                <p
                  id="email-error"
                  className="color-red fs-sm d-flex justify-content-start m-0"
                >
                  {userNameError}
                </p>
              )}

              {/* Password */}
              <InputGroup className="mt-3">
                <InputGroup.Text
                  id="basic-addon1"
                  className={styles["Icon-Field-class"]}
                >
                  <IconElement iconClass="icon-lock" />
                </InputGroup.Text>

                <MaskedPasswordField
                  id="login-password-field"
                  name="password"
                  className={styles["form-comtrol-textfield-password"]}
                  placeholder="Password"
                  ref={passwordRef}
                  onKeyDown={handleKeyDown}
                  value={credentials.password}
                  onChange={handleChangeFields}
                  aria-label="password"
                  aria-describedby="password-error"
                />
              </InputGroup>

              {passwordError && (
                <p
                  id="password-error"
                  className="color-red fs-sm d-flex justify-content-start m-0"
                >
                  {passwordError}
                </p>
              )}

              <p className="mt-2 text-end">
                <Link
                  to="/forgotpassword"
                  className={styles["forgotPasswordLink"]}
                >
                  Forgot Password?
                </Link>
              </p>

              <CustomButton
                value="Login"
                onClick={handleSubmit}
                applyClass="authLoginBtn"
                className="mt-3"
              />
            </section>
          </Form>
        </Col>
      </Row>
    </section>
  );
};

export default BopLogin;