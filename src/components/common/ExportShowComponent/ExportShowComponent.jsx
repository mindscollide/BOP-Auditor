import { Select } from "antd";
import React from "react";
import styles from "./ExportShowComponent.module.css";
import { Col, Row } from "react-bootstrap";

const ExportShowComponent = ({ value, onChange }) => {
  const { Option } = Select;

  const handleChange = (newValue) => {
    console.log(`selected ${newValue}`);
    onChange(newValue); // This will handle both state update and API call
  };

  return (
    <>
      <Row className="mt-3">
        <Col
          lg={12}
          md={12}
          sm={12}
          className="d-flex gap-1 align-items-center"
        >
          <span className={styles["spanshowClass"]}>Show</span>
          <Select
            value={value}
            style={{ width: 70, margin: "0 10px" }}
            onChange={handleChange}
          >
            <Option value={50}>50</Option>
            <Option value={100}>100</Option>
          </Select>
          <span className={styles["spanshowClass"]}>entries</span>
        </Col>
      </Row>
    </>
  );
};

export default ExportShowComponent;
