// utils/secureFormData.js
import CryptoJS from "crypto-js";

// Function to set custom headers
const setCustomHeaders = (isDoc, ext) => {
  const token = localStorage.getItem("token");

  const extensionToContentType = {
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    pdf: "application/pdf",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    txt: "text/plain",
  };

  try {
    const headers = {
      ...(token && { _token: token }),
    };

    if (isDoc && ext && extensionToContentType[ext]) {
      headers["Content-Type"] = extensionToContentType[ext];
      headers["Content-Disposition"] = `attachment; filename=template.${ext}`;
    } else {
      headers["Content-Type"] = "multipart/form-data";
    }

    return headers;
  } catch (error) {
    console.error("Error setting headers:", error);
    return {};
  }
};

const emailValidation = (text) => {
  // Correct regex pattern for email validation
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Test if the input text matches the regex pattern
  const isValid = emailRegex.test(text);

  return isValid; // Return true if valid, false otherwise
};

const roleBasedNavigation = (navigate, roleID) => {
  // 1	Bank
  // 2	Corporate
  // 3	Broker
  // 6	Auditor
  // 7	Dealer
  // 8	Treasury
  // 9	Branch
  if (roleID === 1) {
    console.log("RoleID", roleID);
  } else if (roleID === 2) {
    console.log("RoleID", roleID);
  } else if (roleID === 3) {
    console.log("RoleID", roleID);
  } else if (roleID === 6) {
    navigate("/BOP/audittrailbank");
  } else if (roleID === 7) {
    console.log("RoleID", roleID);
  } else if (roleID === 8) {
    console.log("RoleID", roleID);
  } else if (roleID === 9) {
    console.log("RoleID", roleID);
  }
};

export { setCustomHeaders, emailValidation, roleBasedNavigation };

export const getCookieValue = (cookieName) => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === cookieName) {
      return value;
    }
  }
  return null; // Return null if the cookie is not found
};

// Utility to format date as "Wed, May 31, 2023"
export const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

// utils/crypto.js
export const xorEncryptDecrypt = (input, key) => {
  let out = "";
  for (let i = 0; i < input.length; i++) {
    out += String.fromCharCode(
      input.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  return out;
};

export const encrypt = (data, key) => {
  try {
    const encrypted = xorEncryptDecrypt(data, key);
    return btoa(encrypted); // base64 encode
  } catch (e) {
    console.log("Encrypt Error:", e);
    return null;
  }
};

export const decrypt = (data, key) => {
  try {
    const decoded = atob(data); // base64 decode
    return xorEncryptDecrypt(decoded, key);
  } catch (e) {
    console.log("Decrypt Error:", e);
    return null;
  }
};
