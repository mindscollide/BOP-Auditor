import React from "react";
import Button from "react-bootstrap/Button";

const CustomButton = ({
  text,
  icon,
  onClick,
  className,
  icon2,
  disableBtn,
  variant,
  size,
  color,  
  align,
  type,
  onChange,
  style,
  pdfIcon,
  pdfIconClass,
  iconClass,
}) => {
  return (
    <>
      <Button
        type={type}
        color={color}
        size={size}
        className={className}
        variant={variant}
        disabled={disableBtn}
        onClick={onClick}
        onChange={onChange}
        align={align}
        style={style}
      >
        <span className={iconClass}>{icon}</span>
        {text}
        {icon2}
        <img className={pdfIconClass} src={pdfIcon} />
      </Button>
    </>
  );
};

export default CustomButton;
