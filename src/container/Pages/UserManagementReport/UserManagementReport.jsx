import React, { useEffect, useRef, useState } from "react";
import styles from "./UserManagementReport.module.css";
import { Col, Row } from "react-bootstrap";
import DatePicker from "react-multi-date-picker";
import { Popover } from "antd";
import pdfIcon from "../../../assets/images/pdf.png";
import excelIcon from "../../../assets/images/excel.png";
import {
  Button,
  CustomPaper,
  CustomTable,
  TextField,
} from "../../../components/elements";
import { formatDate, formatPkAmount } from "../../../components/common/utils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetTransactionDetailsByCorporateAuditor } from "../../../store/AuditorActions/AuditorActions";
import { useTableScrollBottomByClassName } from "../../../components/common/useTableScrollBottom";
import {
  GetTransactionDetailsByCorporateExcelTypeReportAuditor,
  GetTransactionDetailsByCorporatePDFTypeReportAuditor,
} from "../../../store/ReportActions/ReportActions";
import {
  convertDateTimeIntoLocal,
  getDateTimeString,
} from "../../../utils/Timer";
import moment from "moment";
const UserManagementReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const exportRef = useRef(null);

  // Extracting the Transaction by Bank Details Data from Reducer
  const AuditorTransactionCorporateData = useSelector(
    (state) => state.AuditorReducer.transactionDetailsByCorporateData
  );

  //Local States
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sRow, setSRow] = useState(0);
  const [totalRecord, setTotalRecord] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionByBankTblData, setTransactionByBankTblData] = useState([]);
  // const [formData, setFormData] = useState({
  //   txnId: "",
  //   corporateUser: "",
  //   corporateName: "",
  //   txnByTreasuryUser: "",
  // });
  const [formData, setFormData] = useState({
    counterPart: "",
    branchCorporateDropdown: "",
    employeeID: "",
    email: "",
    branchDropdown: "",
    branchInput: "",
    createBy: "",
    approvedBy: "",
    deactivatedBy: "",
  });
  //Calling
  // useEffect(() => {
  //   try {
  //     let Data = {
  //       TXNID: 0,
  //       CorporateUser: "",
  //       CorporateName: "",
  //       TransactionByTreasuryUser: "",
  //       StartDate: "",
  //       EndDate: "",
  //       Length: 10,
  //       sRow: 0,
  //     };
  //     dispatch(GetTransactionDetailsByCorporateAuditor({ navigate, Data }));
  //   } catch (error) {
  //     console.log(error, "errorerrorerror");
  //   }
  // }, []);

  //Extracting the Data
  // useEffect(() => {
  //   try {
  //     if (
  //       AuditorTransactionCorporateData &&
  //       AuditorTransactionCorporateData !== null
  //     ) {
  //       const newRecords =
  //         AuditorTransactionCorporateData.transactionForCorporate || [];
  //       console.log(
  //         AuditorTransactionCorporateData,
  //         "AuditorTransactionBankData"
  //       );
  //       if (isLoading) {
  //         setIsLoading(false);
  //         setTotalRecord(AuditorTransactionCorporateData.totalCount);
  //         setTransactionByBankTblData((prev) => [...prev, ...newRecords]);
  //         setSRow((prev) => prev + newRecords.length);
  //       } else {
  //         setIsLoading(false);
  //         setTransactionByBankTblData(newRecords);
  //         setSRow(newRecords.length);
  //         setTotalRecord(AuditorTransactionCorporateData.totalCount);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error, "errorerror");
  //     setIsLoading(false);
  //   }
  // }, [AuditorTransactionCorporateData]);

  //Excel And PDF Icon Click Func
  // const handleExport = (format) => {
  //   if (format === "excel") {
  //     exportToExcel();
  //   } else if (format === "pdf") {
  //     exportToPDF();
  //   }
  // };

  //Export to PDF Trigger Function
  // const exportToExcel = () => {
  //   let Data = {
  //     TXNID: Number(formData.txnId),
  //     CorporateUser:
  //       formData.corporateUser !== "" ? formData.corporateUser : "",
  //     CorporateName:
  //       formData.corporateName !== "" ? formData.corporateName : "",
  //     TransactionByTreasuryUser:
  //       formData.txnByTreasuryUser !== "" ? formData.txnByTreasuryUser : "",
  //     StartDate: startDate !== null ? startDate : "",
  //     EndDate: endDate !== null ? endDate : "",
  //   };

  //   dispatch(
  //     GetTransactionDetailsByCorporateExcelTypeReportAuditor({ navigate, Data })
  //   );
  // };

  //Export to Excel Trigger Function
  // const exportToPDF = () => {
  //   let Data = {
  //     TXNID: Number(formData.txnId),
  //     CorporateUser:
  //       formData.corporateUser !== "" ? formData.corporateUser : "",
  //     CorporateName:
  //       formData.corporateName !== "" ? formData.corporateName : "",
  //     TransactionByTreasuryUser:
  //       formData.txnByTreasuryUser !== "" ? formData.txnByTreasuryUser : "",
  //     StartDate: startDate !== null ? startDate : "",
  //     EndDate: endDate !== null ? endDate : "",
  //   };

  //   dispatch(
  //     GetTransactionDetailsByCorporatePDFTypeReportAuditor({ navigate, Data })
  //   );
  // };

  //Handle Start Date Change
  const handleStartDateChange = (dateObject) => {
    setStartDate(formatDate(dateObject));
  };

  //Handle End Date Change
  const handleEndDateChange = (dateObject) => {
    setEndDate(formatDate(dateObject));
  };

  //Toggle Fucntion to view Export Icons
  const toggleExportOptions = () => {
    setOpen((prev) => !prev);
  };

  // Automatically export icons closed UseEffect using Useref Hook
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (exportRef.current && !exportRef.current.contains(event.target)) {
  //       setOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  //Common OnChange for textFields
  const handleTextChange = (e) => {
    const { name, value } = e.target;

    const cleanedValue = value.replace(/\t/g, "").trim();

    if (name === "txnId") {
      const numericValue = cleanedValue.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
      return;
    }

    // For all other fields, strip tabs and trim, then limit to 50 characters
    const limitedValue = cleanedValue.slice(0, 50);
    setFormData((prev) => ({ ...prev, [name]: limitedValue }));
  };
  //Handle Search Button
  const handleSearchBtn = () => {
    let Data = {
      TXNID: Number(formData.txnId),
      CorporateUser: formData.corporateUser,
      CorporateName: formData.corporateName,
      TransactionByTreasuryUser: formData.txnByTreasuryUser,
      StartDate: startDate !== null ? startDate : "",
      EndDate: endDate !== null ? endDate : "",
      Length: 10,
      sRow: 0,
    };
    console.log(Data, "DataDataDataData");
    dispatch(GetTransactionDetailsByCorporateAuditor({ navigate, Data }));
  };

  //Handle Reset Button
  const handleResetBtn = () => {
    if (
      formData.txnId !== "" ||
      formData.corporateName !== "" ||
      formData.corporateUser !== "" ||
      formData.txnByTreasuryUser !== "" ||
      startDate !== null ||
      endDate !== null
    ) {
      setFormData({
        txnId: "",
        corporateUser: "",
        corporateName: "",
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
        CorporateUser: "",
        CorporateName: "",
        TransactionByTreasuryUser: "",
        StartDate: "",
        EndDate: "",
        Length: 10,
        sRow: 0,
      };
      dispatch(GetTransactionDetailsByCorporateAuditor({ navigate, Data }));
    }
  };

  // Columns for Audit Trial By Bank
  const AuditTrialByCorporate = [
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
      title: "Corporate User",
      dataIndex: "corporateUser",
      key: "corporateUser",
      width: 190,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Treasury Sales User",
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
              moment(convertDateTimeIntoLocal(dateStr)).format("hh:mm:ss")}
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
      title: "TXN Amount",
      dataIndex: "amount2",
      key: "amount2",
      align: "center",

      width: 130,
      render: (text) => <span>{formatPkAmount(text)}</span>,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      align: "center",

      width: 90,
      render: (text) => <span>{formatPkAmount(text)}</span>,
    },
    {
      title: "CCY2",
      dataIndex: "ccY2",
      key: "ccY2",
      align: "center",

      width: 80,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Total Amount",
      dataIndex: "amount1",
      key: "amount1",
      align: "center",
      width: 130,
      render: (text) => <span>{formatPkAmount(text)}</span>,
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
        let Data = {
          TXNID: Number(formData.txnId) !== "" ? Number(formData.txnId) : 0,
          CorporateUser:
            formData.corporateUser !== "" ? formData.corporateUser : "",
          CorporateName:
            formData.corporateName !== "" ? formData.corporateName : "",
          TransactionByTreasuryUser:
            formData.txnByTreasuryUser !== "" ? formData.txnByTreasuryUser : "",
          StartDate: startDate !== "" ? startDate : "",
          EndDate: endDate !== "" ? endDate : "",
          Length: 10,
          sRow: sRow,
        };
        dispatch(GetTransactionDetailsByCorporateAuditor({ navigate, Data }));
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
            User Management Report
          </span>
        </Col>
      </Row>
      <CustomPaper variant="outlined">
        <Row>
          <Col lg={2} md={2} sm={2} xs={12}>
            <TextField
              name="counterParty"
              placeholder="Counter Party"
              applyClass="TextFieldAuditors"
              value={formData.txnId}
              onChange={handleTextChange}
            />
          </Col>

          <Col lg={2} md={2} sm={2} xs={12}>
            <TextField
              name="corporateUser"
              placeholder="Corporate User"
              applyClass="TextFieldAuditors"
              value={formData.corporateUser}
              onChange={handleTextChange}
            />
          </Col>
          <Col lg={2} md={2} sm={2} xs={12}>
            <TextField
              name="corporateName"
              placeholder="Corporate Name"
              applyClass="TextFieldAuditors"
              value={formData.corporateName}
              onChange={handleTextChange}
            />
          </Col>
          <Col lg={3} md={3} sm={3} xs={12}>
            <TextField
              name="txnByTreasuryUser"
              placeholder="Transaction Accepted by Treasury Sales"
              applyClass="TextFieldAuditors"
              value={formData.txnByTreasuryUser}
              onChange={handleTextChange}
            />
          </Col>
          <Col lg={3} md={3} sm={12} className="d-flex align-items-center ">
            <DatePicker
              name="dateFrom"
              placeholder="Start Date"
              value={startDate}
              onChange={handleStartDateChange}
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
        </Row>
        <Row className="mt-4">
          <Col
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className="d-flex justify-content-center gap-2"
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
                  // onClick={() => handleExport("excel")}
                  className={styles["export-button"]}
                />
                <Button
                  icon={<img src={pdfIcon} alt="PDF Icon" />}
                  // onClick={() => handleExport("pdf")}
                  className={styles["export-button"]}
                />
              </span>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col lg={12} md={12} sm={12} xs={12}>
            <CustomTable
              column={AuditTrialByCorporate}
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

export default UserManagementReport;
