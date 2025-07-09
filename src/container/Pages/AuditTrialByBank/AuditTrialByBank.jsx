import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetTransactionDetailsByBankAuditor } from "../../../store/AuditorActions/AuditorActions";
import { useTableScrollBottomByClassName } from "../../../components/common/useTableScrollBottom";
import { formatDate } from "../../../components/common/utils";
const AuditTrialByBank = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Extracting the Transaction by Bank Details Data from Reducer
  const AuditorTransactionBankData = useSelector(
    (state) => state.AuditorReducer.transactionDetailsByBankData
  );

  console.log(AuditorTransactionBankData, "AuditorTransactionBankData");
  //Local States
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [open, setOpen] = useState(false);
  const [sRow, setSRow] = useState(0);
  const [totalRecord, setTotalRecord] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionByBankTblData, setTransactionByBankTblData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [formData, setFormData] = useState({
    txnId: "",
    corporateName: "",
    branchName: "",
    txnByBranchUser: "",
    txnByTreasuryUser: "",
  });

  //Calling GetTransactionDetailsByBankAPI
  useEffect(() => {
    try {
      let Data = {
        TXNID: 0,
        corporateName: "",
        BranchName: "",
        TransactionByBankUser: "",
        TransactionByTreasuryUser: "",
        StartDate: "",
        EndDate: "",
        Length: 10,
        sRow: 0,
      };
      dispatch(GetTransactionDetailsByBankAuditor({ navigate, Data }));
    } catch (error) {
      console.log(error, "errorerror");
    }
  }, []);

  //Extracting the Data
  useEffect(() => {
    try {
      if (AuditorTransactionBankData && AuditorTransactionBankData !== null) {
        const newRecords = AuditorTransactionBankData.transactionForBank || [];
        console.log(AuditorTransactionBankData, "AuditorTransactionBankData");

        // Define your own search condition
        const isSearchMode =
          formData.txnId ||
          formData.corporateName ||
          formData.branchName ||
          formData.txnByBranchUser ||
          formData.txnByTreasuryUser ||
          startDate ||
          endDate;

        if (isSearchMode || sRow === 0) {
          setTransactionByBankTblData(newRecords); // replace
          setSRow(newRecords.length);
        } else {
          setTransactionByBankTblData((prev) => [...prev, ...newRecords]); // append
          setSRow((prev) => prev + newRecords.length);
        }

        setTotalRecord(AuditorTransactionBankData.totalCount);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error, "errorerror");
      setIsLoading(false);
    }
  }, [AuditorTransactionBankData]);

  console.log(transactionByBankTblData, "AuditorTransactionBankData");

  //Toggle for Export Button
  const toggleExportOptions = () => {
    setShowExportOptions(!showExportOptions);
  };

  //Excel PDF PopOver Open Func
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  //Excel And PDF Icon Click Func
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

  //Common OnChange for textFields
  const handleTextChange = (e) => {
    const { name, value } = e.target;

    console.log({ name, value }, "DataDataDataData");
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //Handle Start Date Change
  const handleStartDateChange = (dateObject) => {
    setStartDate(formatDate(dateObject));
  };

  //Handle End Date Change
  const handleEndDateChange = (dateObject) => {
    setEndDate(formatDate(dateObject));
  };

  //Handle Search Button
  const handleSearchBtn = () => {
    let Data = {
      TXNID: Number(formData.txnId),
      corporateName: formData.corporateName,
      BranchName: formData.branchName,
      TransactionByBankUser: formData.txnByBranchUser,
      TransactionByTreasuryUser: formData.txnByTreasuryUser,
      StartDate: startDate !== "" ? startDate : "",
      EndDate: endDate !== "" ? endDate : "",
      Length: 10,
      sRow: 0,
    };
    console.log(Data, "DataDataDataData");
    dispatch(GetTransactionDetailsByBankAuditor({ navigate, Data }));
  };

  //Handle Reset Button
  const handleResetBtn = () => {
    setFormData({
      txnId: "",
      corporateName: "",
      branchName: "",
      txnByBranchUser: "",
      txnByTreasuryUser: "",
    });
    setStartDate(null);
    setEndDate(null);
    setTransactionByBankTblData([]);
    setSRow(0);
    let Data = {
      TXNID: 0,
      corporateName: "",
      BranchName: "",
      TransactionByBankUser: "",
      TransactionByTreasuryUser: "",
      StartDate: "",
      EndDate: "",
      Length: 10,
      sRow: 0,
    };
    dispatch(GetTransactionDetailsByBankAuditor({ navigate, Data }));
  };

  // Columns for Audit Trial By Bank
  const AuditTrialByBank = [
    {
      title: "TXN ID",
      dataIndex: "txnid",
      key: "txnid",
      width: 100,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Corporate Name",
      dataIndex: "corporateName",
      key: "corporateName",
      width: 180,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Branch Name",
      dataIndex: "branchName",
      key: "branchName",
      width: 190,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Branch User",
      dataIndex: "branchUser",
      key: "branchUser",
      width: 160,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Treasury User",
      dataIndex: "treasuryUser",
      key: "treasuryUser",
      width: 150,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 120,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      width: 100,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 100,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Nature",
      dataIndex: "nature",
      key: "nature",
      width: 220,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "CCY1",
      dataIndex: "ccY1",
      key: "ccY1",
      width: 80,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount1",
      key: "amount1",
      width: 130,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      width: 90,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "CCY2",
      dataIndex: "ccY2",
      key: "ccY2",
      width: 80,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount2",
      key: "amount2",
      width: 130,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 110,
      render: (text) => (
        <span style={{ color: text === "Accepted" ? "green" : "red" }}>
          {text}
        </span>
      ),
    },
  ];

  //Scroller Custom Hook
  useTableScrollBottomByClassName(
    () => {
      if (!isLoading && transactionByBankTblData.length < totalRecord) {
        setIsLoading(true);
        const Data = {
          TXNID: Number(formData.txnId),
          corporateName: formData.corporateName,
          BranchName: formData.branchName,
          TransactionByBankUser: formData.txnByBranchUser,
          TransactionByTreasuryUser: formData.txnByTreasuryUser,
          StartDate: startDate !== "" ? startDate : "",
          EndDate: endDate !== "" ? endDate : "",
          sRow: sRow,
          Length: 10,
        };
        console.log(Data, "DataDataDataData");
        dispatch(GetTransactionDetailsByBankAuditor({ navigate, Data }));
      }
    },
    0,
    "BankUserList-table"
  );

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
              name="txnId"
              placeholder="TXN ID"
              value={formData.txnId}
              onChange={handleTextChange}
              applyClass="TextFieldAuditors"
            />
          </Col>
          <Col lg={2} md={2} sm={2} xs={12}>
            <TextField
              name="corporateName"
              placeholder="Corporate Name"
              value={formData.corporateName}
              onChange={handleTextChange}
              applyClass="TextFieldAuditors"
            />
          </Col>
          <Col lg={2} md={2} sm={2} xs={12}>
            <TextField
              name="branchName"
              placeholder="Branch Name"
              value={formData.branchName}
              onChange={handleTextChange}
              applyClass="TextFieldAuditors"
            />
          </Col>
          <Col lg={3} md={3} sm={3} xs={12}>
            <TextField
              name="txnByBranchUser"
              placeholder="Transaction By Branch User"
              value={formData.txnByBranchUser}
              onChange={handleTextChange}
              applyClass="TextFieldAuditors"
            />
          </Col>
          <Col lg={3} md={3} sm={3} xs={12}>
            <TextField
              name="txnAcceptedByTreasuryUser"
              placeholder="Transaction Accepted by Treasury User"
              value={formData.txnByTreasuryUser}
              onChange={handleTextChange}
              applyClass="TextFieldAuditors"
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={3} md={3} sm={12} className="d-flex align-items-center ">
            <DatePicker
              name="dateFrom"
              value={startDate}
              onChange={handleStartDateChange}
              placeholder="Start Date"
              inputClass={styles["Tradecount-Datepicker-left"]}
              labelClass="d-none"
              showOtherDays
            />

            <label className={styles["Tradecount-date-to"]}>to</label>

            <DatePicker
              name="dateTo"
              value={endDate}
              onChange={handleEndDateChange}
              placeholder="End Date"
              inputClass={styles["Tradecount-Datepicker-right"]}
              labelClass="d-none"
              showOtherDays
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
              onClick={handleSearchBtn}
            />
            <Button
              icon={<i className="icon-refresh"></i>}
              value={"Reset"}
              className={styles["ResetButtonStyles"]}
              onClick={handleResetBtn}
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
              rows={transactionByBankTblData}
              pagination={false}
              scroll={{ x: "max-content", y: 350 }}
              className={"BankUserList-table"}
            />
          </Col>
        </Row>
      </CustomPaper>
    </>
  );
};

export default AuditTrialByBank;
