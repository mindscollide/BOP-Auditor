import React, { useEffect, useState } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import BOPLogo from "@/assets/logo.png";
import styles from "./ResetPassword.module.css";
import IconElement from "@/components/common/IconElement/IconElement";
import CustomButton from "@/components/elements/globalButton/button";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useNotification } from "@/context/NotificationProvider";
import { decryptField, encryptField } from "@/Common/Utils";
import { ResetPasswordApi } from "@/store/AuthActions/authActions";
// Common weak/dictionary passwords rejected outright, regardless of other rules being met.
const COMMON_PASSWORDS = [
  "password",
  "12345678",
  "123456789",
  "qwerty123",
  "letmein",
  "welcome1",
  "admin123",
  "iloveyou",
  "passw0rd",
  "changeme",
  "bankofpunjab",
  "bop12345",
  // App/domain-specific words that shouldn't appear in a password either
  "auditor",
  "punjab",
];

const containsPersonalInfo = (password, personalInfo) => {
  const lowerPassword = password.toLowerCase();

  // A value like firstName can itself be multiple words (e.g. "Mamdani Treasury"),
  // so every word is split out and checked individually against the password.
  const words = personalInfo
    .flatMap((info) => (info ? info.split(/\s+/) : []))
    .filter((word) => word.length >= 3);

  return words.some((word) => lowerPassword.includes(word.toLowerCase()));
};

const containsDictionaryWord = (password) => {
  const lowerPassword = password.toLowerCase();
  return COMMON_PASSWORDS.some((word) => lowerPassword.includes(word));
};

const hasRepeatedCharacters = (password) => /(.)\1{2,}/.test(password);

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { showMessage } = useNotification();

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [validations, setValidations] = useState({
    isLengthValid: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasLowerCase: false,
    hasUpperCase: false,
    noRepeatedChars: false,
    noDictionaryOrPersonalInfo: false,
    isMatch: false,
  });

  // email/firstName arrive encrypted via navigate(..., { state }) and are
  // decrypted here so the "no personal information" check compares against real values.
  const [personalInfo, setPersonalInfo] = useState({
    email: "",
    firstName: "",
    encryptedToken: "",
  });

  // Set when arriving from the "forgot password" email link (via /redirected, which
  // already verified the token with EmailTokenVerifyApi). This route has no email/firstName
  // to show, so the "no personal information" check just has less to compare against here —
  // the token itself is carried forward as EncryptedString for the actual reset call below.
  useEffect(() => {
    if (location.state === null) {
      navigate("/");
      return;
    }
    const { email, firstName = "", requestToken = "" } = location.state || {};

    const decryptResetPasswordState = async () => {
      const [decryptedEmail, decryptedFirstName] = await Promise.all([
        email ? decryptField(email) : "",
        firstName ? decryptField(firstName) : "",
      ]);

      setPersonalInfo({
        email: decryptedEmail,
        firstName: decryptedFirstName,
        encryptedToken: requestToken,
      });
    };

    if (email || firstName) {
      decryptResetPasswordState().catch(() => {
        showMessage("Unable to verify account details for this reset link");
      });
    }
  }, [location.state]);

  const validatePassword = (newPassword, confirmPassword) => {
    const personalInfoList = [
      personalInfo.email,
      personalInfo.email?.split("@")[0],
      personalInfo.firstName,
    ];

    setValidations({
      isLengthValid: newPassword.length >= 8,
      hasNumber: /[1-9]/.test(newPassword),
      hasSpecialChar: /[!@#$%^&*]/.test(newPassword),
      hasLowerCase: /[a-z]/.test(newPassword),
      hasUpperCase: /[A-Z]/.test(newPassword),
      noRepeatedChars:
        newPassword !== "" && !hasRepeatedCharacters(newPassword),
      noDictionaryOrPersonalInfo:
        newPassword !== "" &&
        !containsDictionaryWord(newPassword) &&
        !containsPersonalInfo(newPassword, personalInfoList),
      isMatch: newPassword !== "" && newPassword === confirmPassword,
    });
  };

  // Re-run validation once personalInfo finishes decrypting, in case the user
  // already typed a password before email/firstName were available.
  useEffect(() => {
    if (passwordData.newPassword || passwordData.confirmPassword) {
      validatePassword(passwordData.newPassword, passwordData.confirmPassword);
    }
  }, [personalInfo]);

  const handleChangePassword = (fieldName, event) => {
    const { value } = event.target;
    setPasswordData((prev) => {
      const updated = { ...prev, [fieldName]: value };
      validatePassword(
        fieldName === "newPassword" ? value : prev.newPassword,
        fieldName === "confirmPassword" ? value : prev.confirmPassword,
      );
      return updated;
    });
  };

  const isFormValid = Object.values(validations).every(Boolean);

  const handleClickResetPassword = async () => {
    if (!isFormValid) return;

    let encryptedPassword = await encryptField(passwordData.newPassword);

    // Only the Auditor role exists in this app, so RoleID is always 6 —
    // matches the hardcoded RoleID used for login.
    let Data = {
      Email: location.state?.email ? location.state?.email : "",
      Password: encryptedPassword,
      DeviceID: "1",
      Device: "Browser",
      RoleID: 6,
      EncryptedString: personalInfo.encryptedToken || "",
    };

    dispatch(ResetPasswordApi({ Data, navigate }));
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
            <h4 className={styles["Heading-js"]}>Reset Password</h4>
            <InputGroup className='mb-3'>
              <InputGroup.Text
                id='basic-addon1'
                className={styles["Icon-Field-class"]}>
                <IconElement iconClass={"icon-lock"} />
              </InputGroup.Text>
              <Form.Control
                name='newPassword'
                type={"password"}
                autoComplete='new-password'
                onChange={(event) => handleChangePassword("newPassword", event)}
                className={styles["form-comtrol-textfield-password"]}
                placeholder='Password'
                aria-label='newPassword'
              />
            </InputGroup>
            <InputGroup className='mb-3'>
              <InputGroup.Text
                id='basic-addon1'
                className={styles["Icon-Field-class"]}>
                <IconElement iconClass={"icon-lock"} />
              </InputGroup.Text>
              <Form.Control
                name='confirmPassword'
                type={"password"}
                autoComplete='new-password'
                onChange={(event) =>
                  handleChangePassword("confirmPassword", event)
                }
                className={styles["form-comtrol-textfield-password"]}
                placeholder='New Confirm Password'
                aria-label='confirmPassword'
              />
            </InputGroup>
            <div className='d-flex gap-1 align-items-end mb-2'>
              <span
                className={
                  validations.isLengthValid
                    ? styles["checkIcon"]
                    : styles["closeIcon"]
                }>
                <IconElement
                  applyClass={styles["iconElement"]}
                  iconClass={
                    validations.isLengthValid ? "icon-check" : "icon-close"
                  }
                />
              </span>
              <span>Length of at least 8 characters</span>
            </div>
            <div className='d-flex gap-1 align-items-end justify-content-start mb-2'>
              <span
                className={
                  validations.hasNumber
                    ? styles["checkIcon"]
                    : styles["closeIcon"]
                }>
                <IconElement
                  applyClass={styles["iconElement"]}
                  iconClass={
                    validations.hasNumber ? "icon-check" : "icon-close"
                  }
                />
              </span>
              <span>Contains numbers</span>
            </div>
            <div className='d-flex gap-1 align-items-end mb-2'>
              <span
                className={
                  validations.hasLowerCase
                    ? styles["checkIcon"]
                    : styles["closeIcon"]
                }>
                <IconElement
                  applyClass={styles["iconElement"]}
                  iconClass={
                    validations.hasLowerCase ? "icon-check" : "icon-close"
                  }
                />
              </span>
              <span>Contains at least 1 lowercase letter</span>
            </div>
            <div className='d-flex gap-1 align-items-end mb-2'>
              <span
                className={
                  validations.hasUpperCase
                    ? styles["checkIcon"]
                    : styles["closeIcon"]
                }>
                <IconElement
                  applyClass={styles["iconElement"]}
                  iconClass={
                    validations.hasUpperCase ? "icon-check" : "icon-close"
                  }
                />
              </span>
              <span>Contains at least 1 uppercase letter</span>
            </div>
            <div className='d-flex gap-1 align-items-end mb-2'>
              <span
                className={
                  validations.hasSpecialChar
                    ? styles["checkIcon"]
                    : styles["closeIcon"]
                }>
                <IconElement
                  applyClass={styles["iconElement"]}
                  iconClass={
                    validations.hasSpecialChar ? "icon-check" : "icon-close"
                  }
                />
              </span>
              <span>Contains special characters (!@#$%^&*)</span>
            </div>
            <div className='d-flex gap-1 align-items-end mb-2'>
              <span
                className={
                  validations.noRepeatedChars
                    ? styles["checkIcon"]
                    : styles["closeIcon"]
                }>
                <IconElement
                  applyClass={styles["iconElement"]}
                  iconClass={
                    validations.noRepeatedChars ? "icon-check" : "icon-close"
                  }
                />
              </span>{" "}
              <span>No character repeated more than 2 times</span>
            </div>
            <div className='d-flex gap-1 align-items-end mb-2'>
              <span
                className={
                  validations.noDictionaryOrPersonalInfo
                    ? styles["checkIcon"]
                    : styles["closeIcon"]
                }>
                <IconElement
                  applyClass={styles["iconElement"]}
                  iconClass={
                    validations.noDictionaryOrPersonalInfo
                      ? "icon-check"
                      : "icon-close"
                  }
                />
              </span>{" "}
              <span>Does not contain dictionary or personal information</span>
            </div>
            <div className='d-flex gap-1 align-items-end mb-2'>
              <span
                className={
                  validations.isMatch
                    ? styles["checkIcon"]
                    : styles["closeIcon"]
                }>
                <IconElement
                  applyClass={styles["iconElement"]}
                  iconClass={validations.isMatch ? "icon-check" : "icon-close"}
                />
              </span>{" "}
              <span>Password match</span>
            </div>
            <CustomButton
              disabled={!isFormValid}
              onClick={handleClickResetPassword}
              value={"Change Password"}
              applyClass={"changePasswordBtn"}
            />
          </section>
        </Col>
      </Row>
    </section>
  );
};

export default ResetPassword;
