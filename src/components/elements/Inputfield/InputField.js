import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./InputField.module.css";
import { FormControl, FormGroup } from "react-bootstrap";

const TextField = ({
  onBlur,
  autoComplete,
  ref,
  id,
  focus,
  value,
  label,
  required,
  disable,
  as,
  type,
  size,
  error,
  multiline,
  rows,
  placeholder,
  onChange,
  name,
  className,
  inputIcon,
  iconClassName,
  formParentClass,
  labelClass,
  clickIcon,
  maxLength,
}) => {
  return (
    <>
      <FormGroup className={styles[formParentClass]}>
        <Form.Label className={labelClass}>{label}</Form.Label>
        <Form.Control
          onBlur={onBlur}
          autoComplete={autoComplete}
          className={className}
          ref={ref}
          id={id}
          onFocus={focus}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          as={as}
          multiline={multiline}
          value={value}
          label={<small>{label}</small>}
          size={size}
          error={error}
          type={type}
          maxLength={maxLength}
          disabled={disable}
          required={required}
        />
        <FormControl.Feedback className={iconClassName} onClick={clickIcon}>
          {inputIcon}
        </FormControl.Feedback>
      </FormGroup>
    </>
  );
};

export default TextField;
