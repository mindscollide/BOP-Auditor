import React, {
  useEffect,
  // useEffect,
  useRef,
  useState,
} from "react";
import styles from "../UserManagementReport.module.css";
import { Col, Row } from "react-bootstrap";
import DatePicker from "react-multi-date-picker";
import { Popover } from "antd";
import pdfIcon from "../../../../assets/images/pdf.png";
import excelIcon from "../../../../assets/images/excel.png";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useTableScrollBottom,
  useTableScrollBottomByClassName,
} from "../../../../components/common/useTableScrollBottom";
import {
  GetTransactionDetailsByCorporateExcelTypeReportAuditor,
  GetTransactionDetailsByCorporatePDFTypeReportAuditor,
} from "../../../../store/ReportActions/ReportActions";
// import {
//   convertDateTimeIntoLocal,
//   getDateTimeString,
// } from "../../../utils/Timer";
// import moment from "moment";
import SelectDropdown from "../../../../components/common/selectDropdown/SelectDropdown";
import {
  Button,
  CustomPaper,
  CustomTable,
  TextField,
} from "../../../../components/elements";
import { GetTransactionDetailsByCorporateAuditor } from "../../../../store/AuditorActions/AuditorActions";
import { useNotification } from "../../../../context/NotificationProvider";
import ExportShowComponent from "../../../../components/common/ExportShowComponent/ExportShowComponent";
import { GetAllTenorsAPI } from "../../../../store/UserManagementActions/UserManagementActions";
const Branch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const exportRef = useRef(null);
  const { showMessage } = useNotification();

  // Extracting the Transaction by Bank Details Data from Reducer
  const AuditorTransactionCorporateData = useSelector(
    (state) => state.AuditorReducer.transactionDetailsByCorporateData
  );

  //Local States
  const [open, setOpen] = useState(false);
  const [sRow, setSRow] = useState(0);
  const [totalRecord, setTotalRecord] = useState(0);
  const [recordsLength, setRecordLength] = useState(0);

  // const [isLoading, setIsLoading] = useState(false);
  // const [userManagementTblData, setUserManagementTblData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const [dropdownvalue, setDropdownvalue] = useState(50);

  // const [branchCorporateOptions, setBranchCorporateOptions] = useState([
  //   { label: "Branch", value: 0 },
  //   { label: "Corporate", value: 1 },
  // ]);

  //TEMPORARY OPTIONS
  const createdByOptions = [
    { label: "ali@gulamAhmed", value: 0 },
    { label: "taha@ppl.com", value: 1 },
    { label: "mohammad.ahmed@gulamAhmed", value: 2 },
    { label: "Yunus@mindscollide.com", value: 3 },
    { label: "ali@treasmark.com", value: 4 },
    { label: "ali@gulamAhmed", value: 15 },
    { label: "taha@ppl.com", value: 5 },
    { label: "mohammad.ahmed@gulamAhmed", value: 6 },
    { label: "Yunus@mindscollide.com", value: 7 },
    { label: "ali@treasmark.com", value: 8 },
    { label: "ali@treasmark.com", value: 9 },
    { label: "ali@gulamAhmed", value: 10 },
    { label: "taha@ppl.com", value: 11 },
    { label: "mohammad.ahmed@gulamAhmed", value: 12 },
    { label: "Yunus@mindscollide.com", value: 13 },
    { label: "ali@treasmark.com", value: 14 },
  ];
  const [selectApprovedByOptions, setSelectApprovedByOptions] = useState(null);

  //TEMPORARY OPTIONS
  const approvedByOptions = [
    { label: "ali@gulamAhmed", value: 0 },
    { label: "taha@ppl.com", value: 1 },
    { label: "mohammad.ahmed@gulamAhmed", value: 2 },
    { label: "Yunus@mindscollide.com", value: 3 },
    { label: "ali@treasmark.com", value: 4 },
    { label: "ali@gulamAhmed", value: 15 },
    { label: "taha@ppl.com", value: 5 },
    { label: "mohammad.ahmed@gulamAhmed", value: 6 },
    { label: "Yunus@mindscollide.com", value: 7 },
    { label: "ali@treasmark.com", value: 8 },
    { label: "ali@treasmark.com", value: 9 },
    { label: "ali@gulamAhmed", value: 10 },
    { label: "taha@ppl.com", value: 11 },
    { label: "mohammad.ahmed@gulamAhmed", value: 12 },
    { label: "Yunus@mindscollide.com", value: 13 },
    { label: "ali@treasmark.com", value: 14 },
  ];
  const [selectCreatedByOptions, setSelectCreatedByOptions] = useState(null);

  //TEMPORARY OPTIONS
  const deactivatedByOptions = [
    { label: "ali@gulamAhmed", value: 0 },
    { label: "taha@ppl.com", value: 1 },
    { label: "mohammad.ahmed@gulamAhmed", value: 2 },
    { label: "Yunus@mindscollide.com", value: 3 },
    { label: "ali@treasmark.com", value: 4 },
    { label: "ali@gulamAhmed", value: 15 },
    { label: "taha@ppl.com", value: 5 },
    { label: "mohammad.ahmed@gulamAhmed", value: 6 },
    { label: "Yunus@mindscollide.com", value: 7 },
    { label: "ali@treasmark.com", value: 8 },
    { label: "ali@treasmark.com", value: 9 },
    { label: "ali@gulamAhmed", value: 10 },
    { label: "taha@ppl.com", value: 11 },
    { label: "mohammad.ahmed@gulamAhmed", value: 12 },
    { label: "Yunus@mindscollide.com", value: 13 },
    { label: "ali@treasmark.com", value: 14 },
  ];
  const [selectDeactivatedByOptions, setSelectDeactivatedByOptions] =
    useState(null);
  //TEMPORARY
  const roleOptions = [
    { label: "Branch", value: 0 },
    { label: "FX Trading", value: 1 },
    { label: "Treasury Sales", value: 2 },
    { label: "System Admin", value: 3 },
    { label: "Security Admin", value: 4 },
  ];

  const [selectedRoleOption, setSelectedRoleOption] = useState(null);

  useEffect(() => {
    dispatch(GetAllTenorsAPI(navigate));
  }, []);
  const handleSelectOption = (e, name) => {
    if (name === "createdBy") {
      setSelectCreatedByOptions(e);
    }
    if (name === "approvedBy") {
      setSelectApprovedByOptions(e);
    }
    if (name === "deactivatedBy") {
      setSelectDeactivatedByOptions(e);
    }
    if (name === "roleOptions") {
      setSelectedRoleOption(e);
      console.log(e, "roleOptions");
      if (e.value !== 0) {
        setFormData((prev) => ({
          ...prev,
          branchName: "",
        }));
      }
    }
  };

  const [formData, setFormData] = useState({
    employeeID: "",
    email: "",
    employeeName: "",
    branchName: "",
  });

  //Custome hook for Scrolling (1)
  const { hasReachedBottom, setHasReachedBottom } = useTableScrollBottom(() => {
    console.log("🚀 Table reached bottom");
    // Load more data here if needed
    if (recordsLength !== tableData.length) {
      let Data = {
        employeeId: formData?.employeeID,
        email: formData?.email,
        role:
          selectedRoleOption?.value !== undefined
            ? selectedRoleOption.value
            : "",
        createdBy:
          selectCreatedByOptions?.value !== undefined
            ? selectCreatedByOptions.value
            : "",
        approvedBy: selectApprovedByOptions?.value
          ? selectApprovedByOptions.value
          : "",
        deactivatedBy: selectDeactivatedByOptions?.value
          ? selectDeactivatedByOptions.value
          : "",
        branchName: formData?.branchName,
        // TransactionByTreasuryUser: formData.employeeName,
        sRow: sRow,
        Length: dropdownvalue,
      };

      // dispatch(SearchBankUsersAPI(navigate, Data));
    }
  });

  const handlePageSizeChange = (newSize) => {
    setDropdownvalue(newSize);
    setSRow(0);
    setHasReachedBottom(false);
    setTableData([]);
    setRecordLength(0);

    let Data = {
      employeeId: formData?.employeeID,
      email: formData?.email,
      role:
        selectedRoleOption?.value !== undefined ? selectedRoleOption.value : "",
      createdBy:
        selectCreatedByOptions?.value !== undefined
          ? selectCreatedByOptions.value
          : "",
      approvedBy: selectApprovedByOptions?.value
        ? selectApprovedByOptions.value
        : "",
      deactivatedBy: selectDeactivatedByOptions?.value
        ? selectDeactivatedByOptions.value
        : "",
      branchName: formData?.branchName,
      // TransactionByTreasuryUser: formData.employeeName,
      sRow: sRow,
      Length: dropdownvalue,
    };

    // dispatch(SearchBankUsersAPI(navigate, Data));
  };

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
    console.log({ name, value }, "value");

    const cleanedValue = value.replace(/\t/g, "").trim();

    // if (name === "employeeID") {
    //   console.log("standing here");
    //   const numericValue = cleanedValue.replace(/\D/g, "");
    //   setFormData((prev) => ({ ...prev, [name]: numericValue }));
    //   return;
    // }

    // For all other fields, strip tabs and trim, then limit to 50 characters

    setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
  };
  //Handle Search Button
  const handleSearchBtn = () => {
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showMessage("Please enter a valid email address.");
      return;
    }
    let Data = {
      employeeId: formData?.employeeID,
      email: formData?.email,
      role:
        selectedRoleOption?.value !== undefined ? selectedRoleOption.value : "",
      createdBy:
        selectCreatedByOptions?.value !== undefined
          ? selectCreatedByOptions.value
          : "",
      approvedBy: selectApprovedByOptions?.value
        ? selectApprovedByOptions.value
        : "",
      deactivatedBy: selectDeactivatedByOptions?.value
        ? selectDeactivatedByOptions.value
        : "",
      branchName: formData?.branchName,
      // TransactionByTreasuryUser: formData.employeeName,
      Length: 10,
      sRow: 0,
    };
    console.log(Data, "DataDataDataData");
    // dispatch(GetTransactionDetailsByCorporateAuditor({ navigate, Data }));
  };

  //Handle Reset Button
  const handleResetBtn = () => {
    setSelectApprovedByOptions(null);
    setSelectCreatedByOptions(null);
    setSelectDeactivatedByOptions(null);
    setSelectedRoleOption(null);

    setFormData({
      employeeID: "",
      email: "",
      employeeName: "",
      branchName: "",
    });

    setTableData([]);
    setSRow(0);
    // setIsLoading(false);
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
    // dispatch(GetTransactionDetailsByCorporateAuditor({ navigate, Data }));
  };

  // Columns for User Management table
  const UserManagementTable = [
    {
      title: "Employee ID",
      // dataIndex: "txnid",
      // key: "txnid",
      width: 100,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Employee Name",
      // dataIndex: "corporateName",
      // key: "corporateName",
      width: 180,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Email",
      // dataIndex: "corporateUser",
      // key: "corporateUser",
      width: 190,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Role",
      // dataIndex: "treasuryUser",
      // key: "treasuryUser",
      width: 100,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Branch",
      // dataIndex: "treasuryUser",
      // key: "treasuryUser",
      width: 100,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Contact",
      // dataIndex: "date",
      // key: "date",
      width: 120,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Status",
      // dataIndex: "date",
      // key: "date",
      width: 120,
      render: (text) => (
        <span
          style={{ color: text?.toLowerCase() === "active" ? "green" : "red" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Last Password Change",
      // dataIndex: "time",
      // key: "time",
      width: 160,

      // render: (text, record) => {
      //   let dateStr = getDateTimeString(record.date, record.time);

      //   return (
      //     <span>
      //       {dateStr &&
      //         moment(convertDateTimeIntoLocal(dateStr)).format("hh:mm:ss")}
      //     </span>
      //   );
      // },
    },
    {
      title: "Creation Date Time",
      // dataIndex: "type",
      // key: "type",
      width: 160,
      // render: (text, record) => {
      //   let dateStr = getDateTimeString(record.date, record.time);

      //   return (
      //     <span>
      //       {dateStr &&
      //         moment(convertDateTimeIntoLocal(dateStr)).format("hh:mm:ss")}
      //     </span>
      //   );
      // },
    },
    {
      title: "Created By",
      // dataIndex: "nature",
      // key: "nature",
      width: 220,
      render: (text) => <span>{text}</span>,
    },

    {
      title: "Approved Date Time",
      // dataIndex: "type",
      // key: "type",
      width: 160,
      // render: (text, record) => {
      //   let dateStr = getDateTimeString(record.date, record.time);

      //   return (
      //     <span>
      //       {dateStr &&
      //         moment(convertDateTimeIntoLocal(dateStr)).format("hh:mm:ss")}
      //     </span>
      //   );
      // },
    },
    {
      title: "Approved By",
      // dataIndex: "ccY1",
      // key: "ccY1",
      width: 220,
      render: (text) => <span>{text}</span>,
    },

    {
      title: "Deactivated By",
      // dataIndex: "ccY1",
      // key: "ccY1",
      width: 220,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Role Modified on",
      // dataIndex: "type",
      // key: "type",
      width: 160,
      // render: (text, record) => {
      //   let dateStr = getDateTimeString(record.date, record.time);

      //   return (
      //     <span>
      //       {dateStr &&
      //         moment(convertDateTimeIntoLocal(dateStr)).format("hh:mm:ss")}
      //     </span>
      //   );
      // },
    },
  ];

  //Scroller Custom Hook
  useTableScrollBottomByClassName(
    () => {
      if (tableData.length !== totalRecord) {
        // setIsLoading(true);
        let Data = {
          TXNID: Number(formData.txnId) !== "" ? Number(formData.txnId) : 0,
          CorporateUser:
            formData.corporateUser !== "" ? formData.corporateUser : "",
          CorporateName:
            formData.corporateName !== "" ? formData.corporateName : "",
          TransactionByTreasuryUser:
            formData.txnByTreasuryUser !== "" ? formData.txnByTreasuryUser : "",
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
      <CustomPaper variant="outlined">
        <Row>
          <Col lg={2} md={2} sm={2} xs={12}>
            <TextField
              name="employeeID"
              placeholder="Employee ID"
              applyClass="TextFieldAuditors"
              maxLength={15}
              value={formData.employeeID}
              onChange={handleTextChange}
            />
          </Col>
          <Col lg={2} md={2} sm={2} xs={12}>
            <TextField
              name="email"
              placeholder="Email"
              applyClass="TextFieldAuditors"
              maxLength={100}
              value={formData.email}
              onChange={handleTextChange}
            />
          </Col>
          <Col lg={2} md={2} sm={2} xs={12}>
            <TextField
              name="employeeName"
              placeholder="Employee Name"
              applyClass="TextFieldAuditors"
              maxLength={50}
              value={formData.employeeName}
              onChange={handleTextChange}
            />
          </Col>
          <Col lg={2} md={2} sm={2} xs={12}>
            <SelectDropdown
              placeholder={"Select Role"}
              options={roleOptions}
              classNamePrefix="dropdownBranchSpotTreasury"
              value={selectedRoleOption}
              isSearchable
              onChange={(e) => handleSelectOption(e, "roleOptions")}
              menuPortalTarget={document.body}
            />
          </Col>
          {selectedRoleOption?.value === 0 && (
            <Col lg={4} md={4} sm={4} xs={12}>
              <TextField
                name="branchName"
                placeholder="Branch Name"
                applyClass="TextFieldAuditors"
                value={formData.branchName}
                onChange={handleTextChange}
                maxLength={50}
              />
            </Col>
          )}
          {selectedRoleOption?.value !== 0 && (
            <Col lg={4} md={4} sm={4} xs={12}>
              <SelectDropdown
                classNamePrefix="dropdownBranchSpotTreasury"
                placeholder={"Created By"}
                options={createdByOptions}
                value={selectCreatedByOptions}
                isSearchable
                onChange={(e) => handleSelectOption(e, "createdBy")}
              />
            </Col>
          )}
        </Row>
        <Row className="mt-3">
          {selectedRoleOption?.value === 0 && (
            <Col lg={4} md={4} sm={4} xs={12}>
              <SelectDropdown
                classNamePrefix="dropdownBranchSpotTreasury"
                placeholder={"Created By"}
                options={createdByOptions}
                value={selectCreatedByOptions}
                isSearchable
                onChange={(e) => handleSelectOption(e, "createdBy")}
              />
            </Col>
          )}
          <Col lg={4} md={4} sm={4} xs={12}>
            <SelectDropdown
              classNamePrefix="dropdownBranchSpotTreasury"
              placeholder="Approved by"
              styles={{
                maxLength: "10px",
              }}
              options={approvedByOptions}
              value={selectApprovedByOptions}
              isSearchable
              onChange={(e) => handleSelectOption(e, "approvedBy")}
            />
          </Col>
          <Col lg={4} md={4} sm={4} xs={12}>
            <SelectDropdown
              classNamePrefix="dropdownBranchSpotTreasury"
              placeholder="Deactivated by"
              styles={{
                maxLength: "10px",
              }}
              options={deactivatedByOptions}
              value={selectDeactivatedByOptions}
              isSearchable
              onChange={(e) => handleSelectOption(e, "deactivatedBy")}
            />
          </Col>
          {selectedRoleOption?.value === 0 ? (
            <>
              <Col
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={`${
                  selectedRoleOption?.value === 0
                    ? "mt-2 justify-content-center align-items-center"
                    : ""
                } d-flex gap-2 `}
              >
                <Button
                  icon={<i className="icon-search icon-check-space"></i>}
                  value={"Search"}
                  className={styles["Usermanagement_SearchButton"]}
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
            </>
          ) : (
            <>
              <Col
                lg={4}
                md={12}
                sm={12}
                xs={12}
                className={`${
                  selectedRoleOption?.value === 0
                    ? "mt-2 d-flex justify-content-center align-items-center"
                    : ""
                } d-flex gap-2`}
              >
                <Button
                  icon={<i className="icon-search icon-check-space"></i>}
                  value={"Search"}
                  className={styles["Usermanagement_SearchButton"]}
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
            </>
          )}
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <ExportShowComponent
              value={dropdownvalue}
              onChange={handlePageSizeChange}
            />
          </Col>
        </Row>

        <Row className="mt-1">
          <Col lg={12} md={12} sm={12} xs={12}>
            <CustomTable
              column={UserManagementTable}
              rows={tableData}
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

export default Branch;
