import React from "react";
import "./Paper.css";

const CustomPaper = ({ children, className = "", variant }) => {
  return (
    <div
      className={`custom-paper ${
        variant === "outlined" ? "outlined" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default CustomPaper;
