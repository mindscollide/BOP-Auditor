import React, { useState } from "react";
import styles from "./AuditTrialByBank.module.css";
import {
  Button,
  CustomPaper,
  CustomTable,
  TextField,
} from "../../../components/elements";
import pdfIcon from "../../../assets/images/pdf.png";
import excelIcon from "../../../assets/images/excel.png";
import { Col, Row } from "react-bootstrap";
import DatePicker from "react-multi-date-picker";
import { Popover } from "antd";
const AuditTrialByBank = () => {
  //Local States
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [open, setOpen] = useState(false);

  //Toggle for Export Button
  const toggleExportOptions = () => {
    setShowExportOptions(!showExportOptions);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const handleExport = (format) => {
    if (format === "excel") {
      exportToExcel();
    } else if (format === "pdf") {
      exportToPDF();
    }
  };

  //Export to PDF Trigger Function
  const exportToExcel = () => {};

  //Export to Excel Trigger Function
  const exportToPDF = () => {};

  // Columns for Audit Trial By Bank
  const AuditTrialByBank = [
    {
      title: "TXN ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Branch Name",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Branch User",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Treasury User",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Time",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Type",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Nature",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "CCY1",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Amount",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Rate",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "CCY2",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Amount",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: status === "Active" ? "green" : "red" }}>
          {status}
        </span>
      ),
    },
  ];

  return (
    <>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <span className={styles["AuditTrialBankMainHeading"]}>
            Audit Trial by Bank
          </span>
        </Col>
      </Row>
      <CustomPaper variant="outlined">
        <Row>
          <Col lg={2} md={2} sm={2} xs={12}>
            <TextField
              placeholder={"TXN ID"}
              applyClass={"TextFieldAuditors"}
            />
          </Col>
          <Col lg={2} md={2} sm={2} xs={12}>
            <TextField
              placeholder={"Customer Name"}
              applyClass={"TextFieldAuditors"}
            />
          </Col>
          <Col lg={2} md={2} sm={2} xs={12}>
            <TextField
              placeholder={"Branch Name"}
              applyClass={"TextFieldAuditors"}
            />
          </Col>
          <Col lg={3} md={3} sm={3} xs={12}>
            <TextField
              placeholder={"Transaction By Branch User"}
              applyClass={"TextFieldAuditors"}
            />
          </Col>
          <Col lg={3} md={3} sm={3} xs={12}>
            <TextField
              placeholder={"Transaction Accepted by  Treasury User"}
              applyClass={"TextFieldAuditors"}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={3} md={3} sm={3} xs={12}>
            <TextField
              placeholder={"Transaction Rejected by  Treasury User"}
              applyClass={"TextFieldAuditors"}
            />
          </Col>
          <Col lg={3} md={3} sm={12} className="d-flex align-items-center ">
            <DatePicker
              name={"dateFrom"}
              labelClass={"d-none"}
              inputClass={styles["Tradecount-Datepicker-left"]}
              placeholder="Start date"
              showOtherDays={true}
            />

            <label className={styles["Tradecount-date-to"]}>to</label>

            <DatePicker
              name="dateTo"
              labelClass={"d-none"}
              placeholder="End Date"
              showOtherDays={true}
              inputClass={styles["Tradecount-Datepicker-right"]}
            />
          </Col>
          <Col
            lg={6}
            md={6}
            sm={6}
            xs={12}
            className="d-flex justify-content-start gap-2"
          >
            <Button
              icon={<i className="icon-search icon-check-space"></i>}
              value={"Search"}
              className={styles["SearchButtonStyles"]}
            />
            <Button
              icon={<i className="icon-refresh"></i>}
              value={"Reset"}
              className={styles["ResetButtonStyles"]}
            />

            <Popover
              content={
                <div className={styles["export-options"]}>
                  <Button
                    icon={<img src={excelIcon} alt="Excel Icon" />}
                    onClick={() => handleExport("excel")}
                    className={styles["export-button"]}
                  />
                  <Button
                    icon={<img src={pdfIcon} alt="PDF Icon" />}
                    onClick={() => handleExport("pdf")}
                    className={styles["export-button"]}
                  />
                </div>
              }
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
              placement="bottomRight"
              arrow={false}
            >
              <Button
                icon={<i className="icon-download"></i>}
                className={styles["Export_Button"]}
                value="Export"
                iconClass={styles["resetIconClass"]}
                onClick={toggleExportOptions}
              />
            </Popover>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col lg={12} md={12} sm={12} xs={12}>
            <CustomTable
              column={AuditTrialByBank}
              pagination={false}
              className={"BankUserList-table"}
            />
          </Col>
        </Row>
      </CustomPaper>
    </>
  );
};

export default AuditTrialByBank;
