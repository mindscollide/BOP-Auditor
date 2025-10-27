import React, { useEffect, useRef, useState } from "react";
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
import { formatDate, formatPkAmount } from "../../../components/common/utils";
import {
  GetTransactionDetailsByBankExcelTypeReportAuditor,
  GetTransactionDetailsByBankPDFTypeReportAuditor,
} from "../../../store/ReportActions/ReportActions";
import {
  convertDateTimeIntoLocal,
  getDateTimeString,
} from "../../../utils/Timer";
import moment from "moment";
const AuditTrialByBank = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const exportRef = useRef(null);

  // Extracting the Transaction by Bank Details Data from Reducer
  const AuditorTransactionBankData = useSelector(
    (state) => state.AuditorReducer.transactionDetailsByBankData
  );

  //Local States
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
        if (isLoading) {
          setIsLoading(false);
          setTotalRecord(AuditorTransactionBankData.totalCount);
          setTransactionByBankTblData((prev) => [...prev, ...newRecords]); // when the below hook condtion total record and reducer state is not equal get new record appended with previous
          setSRow((prev) => prev + newRecords.length);
        } else {
          setIsLoading(false);
          setTransactionByBankTblData(newRecords); // other wise append the new records only
          setSRow(newRecords.length);
          setTotalRecord(AuditorTransactionBankData.totalCount);
        }
      } else if (AuditorTransactionBankData === null) {
        // if (!hasReachedBottom) {
        //   setHasReachedBottom(false);
        //   setTableData([]);
        //   setRecordLength(0);
        setIsLoading(false);
        setTotalRecord(0);
        setSRow(0);
        setTransactionByBankTblData([]);
      }
    } catch (error) {
      console.log(error, "errorerror");
      setIsLoading(false);
    }
  }, [AuditorTransactionBankData]);

  //Toggle Functino to view Export Icons
  const toggleExportOptions = () => {
    setOpen((prev) => !prev);
  };

  // Automatically export icons closed UseEffect using Useref Hook
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exportRef.current && !exportRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //Excel And PDF Icon Click Func
  const handleExport = (format) => {
    console.log(typeof format, "formatformatformat");
    if (format === "excel") {
      exportToExcel();
    } else if (format === "pdf") {
      exportToPDF();
    }
  };

  //Export to PDF Trigger Function
  const exportToExcel = () => {
    let Data = {
      TXNID: Number(formData.txnId),
      corporateName: formData.corporateName,
      BranchName: formData.branchName,
      TransactionByBankUser: formData.txnByBranchUser,
      TransactionByTreasuryUser: formData.txnByTreasuryUser,
      StartDate: startDate !== null ? startDate : "",
      EndDate: endDate !== null ? endDate : "",
    };

    dispatch(
      GetTransactionDetailsByBankExcelTypeReportAuditor({ navigate, Data })
    );
  };

  //Export to Excel Trigger Function
  const exportToPDF = () => {
    let Data = {
      TXNID: Number(formData.txnId),
      corporateName: formData.corporateName,
      BranchName: formData.branchName,
      TransactionByBankUser: formData.txnByBranchUser,
      TransactionByTreasuryUser: formData.txnByTreasuryUser,
      StartDate: startDate !== null ? startDate : "",
      EndDate: endDate !== null ? endDate : "",
    };

    dispatch(
      GetTransactionDetailsByBankPDFTypeReportAuditor({ navigate, Data })
    );
  };

  //Common OnChange for textFields
  const handleTextChange = (e) => {
    const { name, value } = e.target;

    // const cleanedValue = value.replace(/\t/g, "");
    const cleanedValue = value.replace(/^[\t ]+/, "");

    if (name === "txnId") {
      const numericValue = cleanedValue.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
      return;
    }

    // For all other fields, strip tabs and trim, then limit to 50 characters
    setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
  };

  //Handle Start Date Change
  const handleStartDateChange = (dateObject) => {
    setStartDate(formatDate(dateObject));
    console.log(formatDate(dateObject), "DateCheck");
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
      StartDate: startDate !== null ? startDate : "",
      EndDate: endDate !== null ? endDate : "",
      Length: 10,
      sRow: 0,
    };
    console.log(Data, "DateCheck");
    console.log(startDate, "DateCheck");
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
    setIsLoading(false);
    setTotalRecord(0);
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
      ellipsis: true,
      key: "corporateName",
      width: 180,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Branch Name",
      dataIndex: "branchName",
      key: "branchName",
      ellipsis: true,
      width: 190,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Branch User",
      dataIndex: "branchUser",
      ellipsis: true,
      key: "branchUser",
      width: 160,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Treasury Sales User",
      dataIndex: "treasuryUser",
      ellipsis: true,
      key: "treasuryUser",
      width: 150,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 120,
      render: (text, record) => {
        let dateStr = getDateTimeString(record.date, record.time);
        return (
          <>
            <span>
              {dateStr &&
                moment(convertDateTimeIntoLocal(dateStr)).format("YYYY-MM-DD")}
            </span>
          </>
        );
      },
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      width: 100,
      render: (text, record) => {
        let dateStr = getDateTimeString(record.date, record.time);

        return (
          <span>
            {dateStr &&
              moment(convertDateTimeIntoLocal(dateStr)).format("hh:mm:ss A")}
          </span>
        );
      },
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
      ellipsis: true,
      width: 220,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "CCY1",
      dataIndex: "ccY1",
      key: "ccY1",
      width: 80,
      align: "center",

      render: (text) => <span>{text}</span>,
    },
    {
      title: "TXN Amount",
      dataIndex: "amount2",
      key: "amount1",
      width: 130,
      align: "center",
      render: (text) => <span>{formatPkAmount(text)}</span>,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      width: 90,
      align: "center",
      render: (text) => <span>{formatPkAmount(text)}</span>,
    },
    {
      title: "CCY2",
      dataIndex: "ccY2",
      key: "ccY2",
      width: 80,
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Total Amount",
      dataIndex: "amount1",
      key: "amount2",
      width: 130,
      align: "center",
      render: (text) => <span>{formatPkAmount(text)}</span>,
    },
    {
      title: "LC #",
      dataIndex: "lcNumber",
      key: "lcNumber",
      width: 130,
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Account #",
      dataIndex: "accountNumber",
      key: "accountNumber",
      width: 130,
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Initiated By",
      dataIndex: "initiatedBy",
      key: "initiatedBy",
      width: 130,
      ellipsis: true,
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Accepted By",
      dataIndex: "acceptedBy",
      key: "acceptedBy",
      width: 130,
      align: "center",
      ellipsis: true,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "TXN Accepted Time",
      dataIndex: "txnAcceptedTime",
      key: "amount2",
      align: "center",
      width: 150,
      render: (text, record) => {
        let dateStr =
          record.txnAcceptedTime !== ""
            ? getDateTimeString(record.date, record.txnAcceptedTime)
            : null;

        return (
          <span>
            {dateStr &&
              moment(convertDateTimeIntoLocal(dateStr)).format("hh:mm:ss A")}
          </span>
        );
      },
    },
    {
      title: "Cancelled By",
      dataIndex: "cancelledBy",
      key: "cancelledBy",
      width: 130,
      ellipsis: true,
      align: "center",
      render: (text) => <span>{text}</span>,
    },

    {
      title: "Cancelled Time",
      dataIndex: "cancelledBy",
      key: "cancelledBy",
      align: "center",
      width: 120,
      render: (text, record) => {
        let dateStr =
          record.cancelledTime !== ""
            ? getDateTimeString(record.date, record.cancelledTime)
            : null;

        return (
          <span>
            {dateStr &&
              moment(convertDateTimeIntoLocal(dateStr)).format("hh:mm:ss A")}
          </span>
        );
      },
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
      if (transactionByBankTblData.length !== totalRecord) {
        setIsLoading(true);
        const Data = {
          TXNID: Number(formData.txnId),
          corporateName: formData.corporateName,
          BranchName: formData.branchName,
          TransactionByBankUser: formData.txnByBranchUser,
          TransactionByTreasuryUser: formData.txnByTreasuryUser,
          StartDate: startDate !== null ? startDate : "",
          EndDate: endDate !== null ? endDate : "",
          sRow: sRow,
          Length: 10,
        };
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
            Audit Trail by Bank
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
              maxLength={50}
              applyClass="TextFieldAuditors"
            />
          </Col>
          <Col lg={2} md={2} sm={2} xs={12}>
            <TextField
              name="corporateName"
              placeholder="Corporate Name"
              value={formData.corporateName}
              maxLength={50}
              onChange={handleTextChange}
              applyClass="TextFieldAuditors"
            />
          </Col>
          <Col lg={2} md={2} sm={2} xs={12}>
            <TextField
              name="branchName"
              placeholder="Branch Name"
              maxLength={50}
              value={formData.branchName}
              onChange={handleTextChange}
              applyClass="TextFieldAuditors"
            />
          </Col>
          <Col lg={3} md={3} sm={3} xs={12}>
            <TextField
              name="txnByBranchUser"
              placeholder="Transaction By Branch User"
              maxLength={50}
              value={formData.txnByBranchUser}
              onChange={handleTextChange}
              applyClass="TextFieldAuditors"
            />
          </Col>
          <Col lg={3} md={3} sm={3} xs={12}>
            <TextField
              maxLength={50}
              name="txnByTreasuryUser"
              placeholder="Transaction Accepted by Treasury Sales"
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
              editable={false}
              maxDate={endDate}
              minDate={null}
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
              minDate={startDate}
              maxDate={null}
              editable={false}
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
            <div className="position-relative" ref={exportRef}>
              <Button
                icon={<i className="icon-download"></i>}
                className={styles["Export_Button"]}
                value="Export"
                iconClass={styles["resetIconClass"]}
                onClick={toggleExportOptions}
              />
              <span
                className={`${styles["Export_optionsBox"]} ${
                  open ? styles["open"] : styles["closed"]
                }`}
              >
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
              </span>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col lg={12} md={12} sm={12} xs={12}>
            <CustomTable
              column={AuditTrialByBank}
              rows={transactionByBankTblData}
              pagination={false}
              scroll={{ x: "max-content", y: "45vh" }}
              className={"BankUserList-table"}
            />
          </Col>
        </Row>
      </CustomPaper>
    </>
  );
};

export default AuditTrialByBank;
