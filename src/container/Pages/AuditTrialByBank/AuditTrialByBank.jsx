import React from "react";
import styles from "./AuditTrialByBank.module.css";
import {
  CustomPaper,
  CustomTable,
  TextField,
} from "../../../components/elements";
const AuditTrialByBank = () => {
  return (
    <>
      <CustomPaper variant="outlined">
        <h2>My Content</h2>
        <TextField />
      </CustomPaper>

      <CustomTable pagination={false} z className={"BankUserList-table"} />
    </>
  );
};

export default AuditTrialByBank;
