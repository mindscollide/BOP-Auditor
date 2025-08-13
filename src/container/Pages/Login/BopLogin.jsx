import React, { useEffect, useState } from "react";
import styles from "./BopLogin.module.css";
import { Row, Col, InputGroup, Form } from "react-bootstrap";
import BOPLogo from "../../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateEmail, updatePassword, updateUsername } from "./Loginfunctions";
import IconElement from "../../../components/IconElement/IconElement";
import CustomButton from "../../../components/elements/globalButton/button";
import { loginInApi } from "./logInAction";

// Conditionally import CustomButton based on the environment variables
const BopLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {}, []);
  const [crendentials, setCredentials] = useState({
    email: "",
    password: "",
    hasErrorOnEmail: false,
    hasEmailisValid: true,
    hasErrorOnPassword: false,
    hasErrorOnUserName: false,
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
    // Update the email field and handle validation
    if (name === "email") {
      updateEmail(value, setCredentials);
    }
    // Update the password field and handle validation
    if (name === "password") {
      updatePassword(value, setCredentials);
    }
    // Update the userName field and handle validation
    if (name === "username") {
      updateUsername(value, setCredentials);
    }
  };

  /**
   * Handles the submission of the login form.
   * Validates the credentials and dispatches the login action if valid.
   */
  const handleSubmit = () => {
    const {
      email,
      password,
      hasErrorOnEmail,
      hasErrorOnPassword,
      hasErrorOnUserName, // Typo corrected in state initialization to hasErrorOnUserName
    } = crendentials;

    let Data;

    // Validation for Corporate login (shouldIsCorporate === true)

    // Validation for non-corporate login
    if (
      email &&
      password &&
      !hasErrorOnEmail &&
      !hasErrorOnPassword &&
      !hasErrorOnUserName
    ) {
      Data = {
        UserName: email,
        Password: password,
        DeviceID: "1",
        Device: "Browser",
        RoleID: 6,
      };

      // Dispatch the login API action for non-corporate user
      dispatch(loginInApi({ Data, navigate }));
    } else {
      if (password === "") {
        setPasswordError("Please enter a password");
      }
      if (email === "") {
        setUserNameError("Please enter a username");
      }
      return;
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
                <InputGroup>
                  <InputGroup.Text className={styles["Icon-Field-class"]}>
                    <IconElement iconClass={"icon-user"} />
                  </InputGroup.Text>
                  <Form.Control
                    name='email'
                    autoComplete='off'
                    className={styles["form-comtrol-textfield"]}
                    placeholder='User Name'
                    required
                    value={crendentials.email}
                    onChange={handleChangeFields}
                    type='text'
                    // pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
                    aria-label='email'
                    maxLength={100}
                    aria-describedby='basic-addon1'
                  />
                </InputGroup>

                {crendentials.email === "" && (
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
                  name='password'
                  autoComplete='off'
                  className={styles["form-comtrol-textfield-password"]}
                  placeholder='Password'
                  required
                  value={crendentials.password}
                  onChange={handleChangeFields}
                  type={showPassowrd ? "text" : "password"}
                  aria-label='password'
                  aria-describedby='basic-addon2'
                />
                <InputGroup.Text
                  id='basic-addon2'
                  className={styles["eyeIcon-Field-class-BOP-login"]}>
                  {showPassowrd ? (
                    <IconElement
                      iconClass={"icon-eye-slash"}
                      onClick={() => setShowPassword(!showPassowrd)}
                    />
                  ) : (
                    <IconElement
                      iconClass={"icon-eye"}
                      onClick={() => setShowPassword(!showPassowrd)}
                    />
                  )}
                </InputGroup.Text>
              </InputGroup>
              {crendentials.password === "" && (
                <p className='color-red fs-sm d-flex justify-content-start m-0'>
                  {passwordError}
                </p>
              )}

              <CustomButton
                value={"Login"}
                onClick={handleSubmit}
                applyClass={"authLoginBtn"}
                className={"mt-3"}
              />

              {/* <p className="mt-2">
                <Link
                  to={"/forgotpassword"}
                  className={styles["forgotPasswordLink"]}
                >
                  Forgot Password?
                </Link>
              </p> */}
            </section>
          </Form>
        </Col>
      </Row>
    </section>
  );
};

export default BopLogin;
