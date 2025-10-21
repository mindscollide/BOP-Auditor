import React, { useEffect, useRef, useState } from "react";
import styles from "./forwards.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../components/common/utils";
import { useTableScrollBottomByClassName } from "../../../../components/common/useTableScrollBottom";
import pdfIcon from "../../../../assets/images/pdf.png";

import excelIcon from "../../../../assets/images/excel.png";
import { Col, Row } from "react-bootstrap";
import {
  Button,
  CustomPaper,
  CustomTable,
  TextField,
} from "../../../../components/elements";
import DatePicker from "react-multi-date-picker";
// import {
//   Button,
//   CustomPaper,
//   CustomTable,
//   TextField,
// } from "../../../components/elements";
// import pdfIcon from "../../../assets/images/pdf.png";
// import excelIcon from "../../../assets/images/excel.png";
// import { Col, Row } from "react-bootstrap";
// import DatePicker from "react-multi-date-picker";
// import { Popover } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { GetTransactionDetailsByBankAuditor } from "../../../store/AuditorActions/AuditorActions";
// import { useTableScrollBottomByClassName } from "../../../components/common/useTableScrollBottom";
// import {
//   formatDate,

//   // formatPkAmount
// } from "../../../components/common/utils";
// import {
//   GetTransactionDetailsByBankExcelTypeReportAuditor,
//   GetTransactionDetailsByBankPDFTypeReportAuditor,
// } from "../../../store/ReportActions/ReportActions";
// import {
//   convertDateTimeIntoLocal,
//   getDateTimeString,
// } from "../../../utils/Timer";
// import moment from "moment";
const Forwards = () => {
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
  const [rateReportTblData, setRateReportTblData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: "",
    // branchName: "",
    // txnByBranchUser: "",
    // txnByTreasuryUser: "",
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
      // dispatch(GetTransactionDetailsByBankAuditor({ navigate, Data }));
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

        if (isLoading) {
          setIsLoading(false);
          setTotalRecord(AuditorTransactionBankData.totalCount);
          setRateReportTblData((prev) => [...prev, ...newRecords]); // when the below hook condtion total record and reducer state is not equal get new record appended with previous
          setSRow((prev) => prev + newRecords.length);
        } else {
          setIsLoading(false);
          setRateReportTblData(newRecords); // other wise append the new records only
          setSRow(newRecords.length);
          setTotalRecord(AuditorTransactionBankData.totalCount);
        }
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

    dispatch();
    // GetTransactionDetailsByBankExcelTypeReportAuditor({ navigate, Data })
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

    dispatch();
    // GetTransactionDetailsByBankPDFTypeReportAuditor({ navigate, Data })
  };

  //Common OnChange for textFields
  const handleTextChange = (e) => {
    const { name, value } = e.target;

    const cleanedValue = value.replace(/\t/g, "").trim();

    if (name === "employeeId") {
      const numericValue = cleanedValue.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
      return;
    }

    // For all other fields, strip tabs and trim, then limit to 50 characters
    const limitedValue = cleanedValue.slice(0, 50);
    setFormData((prev) => ({ ...prev, [name]: limitedValue }));
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
    // dispatch(GetTransactionDetailsByBankAuditor({ navigate, Data }));
  };

  //Handle Reset Button
  const handleResetBtn = () => {
    if (
      formData.employeeId !== "" ||
      formData.employeeName !== "" ||
      startDate !== null ||
      endDate !== null
    ) {
      setFormData({
        employeeId: "",
        employeeName: "",
      });
      setStartDate(null);
      setEndDate(null);
      setRateReportTblData([]);
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
      // dispatch(GetTransactionDetailsByBankAuditor({ navigate, Data }));
    }
  };

  // Columns for Audit Trial By Bank
  const RateReportColumns = [
    {
      title: "Employee ID",
      // dataIndex: "txnid",
      // key: "txnid",
      width: 120,
      // render: (text) => <span>{text}</span>,
    },
    {
      title: "Employee Name",
      // dataIndex: "corporateName",
      // key: "corporateName",
      width: 180,
      // render: (text) => <span>{text}</span>,
    },
    {
      title: "Email ID",
      // dataIndex: "branchName",
      // key: "branchName",
      width: 200,
      // render: (text) => <span>{text}</span>,
    },
    {
      title: "Status",
      // dataIndex: "branchUser",
      // key: "branchUser",
      width: 100,
      // render: (text) => <span>{text}</span>,
    },
    {
      title: "Time Stamps",
      // dataIndex: "treasuryUser",
      // key: "treasuryUser",
      width: 180,
      // render: (text) => <span>{text}</span>,
    },
    {
      title: "Bid",
      // dataIndex: "date",
      // key: "date",
      width: 70,
      // render: (text) => <span>{text}</span>,
    },
    {
      title: "Ask",
      // dataIndex: "time",
      // key: "time",
      width: 70,
      // render: (text) => <span>{text}</span>,
    },
  ];

  //Scroller Custom Hook
  useTableScrollBottomByClassName(
    () => {
      if (rateReportTblData.length !== totalRecord) {
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
        // dispatch(GetTransactionDetailsByBankAuditor({ navigate, Data }));
      }
    },
    0,
    "BankUserList-table"
  );

  console.log(totalRecord, "totalRecordtotalRecord");
  console.log(rateReportTblData.length, "totalRecordtotalRecord");

  return (
    <>
      <CustomPaper variant="outlined">
        <Row>
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
          <Col lg={2} md={2} sm={2} xs={12}>
            <TextField
              name="employeeName"
              placeholder="Employee Name"
              value={formData.employeeName}
              onChange={handleTextChange}
              applyClass="TextFieldAuditors"
            />
          </Col>
          <Col lg={2} md={2} sm={2} xs={12}>
            <TextField
              name="employeeId"
              placeholder="Employee ID"
              value={formData.employeeId}
              onChange={handleTextChange}
              applyClass="TextFieldAuditors"
            />
          </Col>
          <Col
            lg={5}
            md={5}
            sm={5}
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
        <Row className="mt-3"></Row>
        <Row className="mt-5">
          <Col lg={12} md={12} sm={12} xs={12}>
            <CustomTable
              column={RateReportColumns}
              rows={rateReportTblData}
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

export default Forwards;
