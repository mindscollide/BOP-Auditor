import React, { forwardRef } from "react";
import { Form } from "react-bootstrap";
import styles from "./MaskedPasswordField.module.css";

// -webkit-text-security/text-security masks a plain type="text" input as dots
// purely via CSS in Chromium/WebKit browsers, which is what lets us avoid
// type="password" (and its browser "Save password?" prompt) there. Firefox
// implements neither property at all, so on Firefox this input would render
// its real value in plain text — feature-detected once at module load so the
// fallback below only kicks in where it's actually needed.
const supportsTextSecurity =
  typeof CSS !== "undefined" &&
  typeof CSS.supports === "function" &&
  (CSS.supports("-webkit-text-security", "disc") ||
    CSS.supports("text-security", "disc"));

/**
 * A text input that always renders masked like a password field, without
 * ever using type="password" — so no browser offers to save/autofill it.
 *
 * Where the browser supports the text-security CSS property, that's all
 * this does. On Firefox (no text-security support), the real input's text
 * is made transparent and a non-interactive dot overlay is drawn on top of
 * it instead, so nothing typed is ever visible on screen either way.
 */
const MaskedPasswordField = forwardRef(function MaskedPasswordField(
  { className = "", value, ...rest },
  ref,
) {
  if (supportsTextSecurity) {
    return (
      <Form.Control
        ref={ref}
        type="text"
        autoComplete="off"
        value={value}
        className={`${className} ${styles.pwdMask}`}
        {...rest}
      />
    );
  }

  return (
    <div className={styles.overlayWrapper}>
      <Form.Control
        ref={ref}
        type="text"
        autoComplete="off"
        value={value}
        className={`${className} ${styles.overlayInput}`}
        {...rest}
      />
      <div className={styles.overlayMask} aria-hidden="true">
        {"•".repeat(value ? value.length : 0)}
      </div>
    </div>
  );
});

export default MaskedPasswordField;
