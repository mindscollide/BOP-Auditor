import React, { useEffect, useRef, useState } from "react";
import styles from "./BopLogin.module.css";
import { Row, Col, InputGroup, Form } from "react-bootstrap";
import BOPLogo from "../../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateEmail, updatePassword, updateUsername } from "./Loginfunctions";
import IconElement from "../../../components/IconElement/IconElement";
import CustomButton from "../../../components/elements/globalButton/button";
import { loginInApi } from "./logInAction";
import { useNotification } from "../../../context/NotificationProvider";
import { bopEmailValidation, encryptField } from "../../../Common/Utils";

// Conditionally import CustomButton based on the environment variables
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
  const [showPassowrd, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  /**
   * Handles input field changes for email and password.
   * Validates email format and updates the credentials state.
   *
   * @param {object} e - Event object from the input field change.
   */

  useEffect(() => {
    localStorage.clear();
  }, []);
  const handleChangeFields = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      updateEmail(value, setCredentials);
    }
    if (name === "password") {
      updatePassword(value, setCredentials);
    }
  };

  /**
   * Handles the submission of the login form.
   * Validates the credentials and dispatches the login action if valid.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, hasErrorOnEmail, hasErrorOnPassword } =
      credentials;

    if (!email || !password || hasErrorOnEmail || hasErrorOnPassword) {
      if (!email) {
        setUserNameError("Please enter an email");
      }

      if (!password) {
        setPasswordError("Please enter a password");
      }

      return;
    }

    try {
      const trimmedEmail = email.trim();

      const [encryptedEmail, encryptedPassword] = await Promise.all([
        encryptField(trimmedEmail),
        encryptField(password),
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
    if (e.key === "Enter") {
      if (e.target.name === "email") {
        if (e.target.value.trim() !== "") {
          passwordRef.current?.focus();
        } else {
          setUserNameError("Please enter a username");
        }
      } else if (e.target.name === "password") {
        handleSubmit(e);
      }
    }
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
          <Form onSubmit={handleSubmit}>
            <section className={styles["LoginCard"]}>
              <>
                <h4 className={styles["Heading-js"]}>{"Login"}</h4>
                <InputGroup>
                  <InputGroup.Text className={styles["Icon-Field-class"]}>
                    <IconElement iconClass={"icon-user"} />
                  </InputGroup.Text>
                  <Form.Control
                    name='email'
                    autoComplete='off'
                    className={styles["form-comtrol-textfield"]}
                    placeholder='Email'
                    required
                    value={credentials.email}
                    onChange={handleChangeFields}
                    onKeyDown={handleKeyDown}
                    type='email'
                    aria-label='email'
                    maxLength={100}
                    aria-describedby='basic-addon1'
                  />
                </InputGroup>

                {credentials.email === "" && (
                  <p className='color-red fs-sm d-flex justify-content-start m-0'>
                    {userNameError}
                  </p>
                )}
              </>

              <InputGroup className='mt-3'>
                <InputGroup.Text
                  id='basic-addon1'
                  className={styles["Icon-Field-class"]}>
                  <IconElement iconClass={"icon-lock"} />
                </InputGroup.Text>
                <Form.Control
                  id='login-password-field'
                  name='password'
                  autoComplete='off'
                  className={`${styles["form-comtrol-textfield-password"]} ${styles["pwdMask"]}`}
                  placeholder='Password'
                  required
                  ref={passwordRef}
                  onKeyDown={handleKeyDown}
                  value={credentials.password}
                  onChange={handleChangeFields}
                  type={"text"}
                  aria-label='password'
                  aria-describedby='basic-addon2'
                />
              </InputGroup>

              {credentials.password === "" && (
                <p className='color-red fs-sm d-flex justify-content-start m-0'>
                  {passwordError}
                </p>
              )}
              <p className='mt-2 text-end'>
                <Link
                  to={"/forgotpassword"}
                  className={styles["forgotPasswordLink"]}>
                  Forgot Password?
                </Link>
              </p>
              <CustomButton
                value={"Login"}
                onClick={handleSubmit}
                applyClass={"authLoginBtn"}
                className={"mt-3"}
              />
            </section>
          </Form>
        </Col>
      </Row>
    </section>
  );
};

export default BopLogin;
