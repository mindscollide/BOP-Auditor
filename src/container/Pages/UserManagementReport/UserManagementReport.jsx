// import React, {
//   // useEffect,
//   useRef,
//   useState,
// } from "react";
// import styles from "./UserManagementReport.module.css";
// import { Col, Row } from "react-bootstrap";
// import DatePicker from "react-multi-date-picker";
// import { Popover } from "antd";
// import pdfIcon from "../../../assets/images/pdf.png";
// import excelIcon from "../../../assets/images/excel.png";
// import {
//   Button,
//   CustomPaper,
//   CustomTable,
//   TextField,
// } from "../../../components/elements";
// // import { formatDate, formatPkAmount } from "../../../components/common/utils";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { GetTransactionDetailsByCorporateAuditor } from "../../../store/AuditorActions/AuditorActions";
// import { useTableScrollBottomByClassName } from "../../../components/common/useTableScrollBottom";
// import {
//   GetTransactionDetailsByCorporateExcelTypeReportAuditor,
//   GetTransactionDetailsByCorporatePDFTypeReportAuditor,
// } from "../../../store/ReportActions/ReportActions";
// // import {
// //   convertDateTimeIntoLocal,
// //   getDateTimeString,
// // } from "../../../utils/Timer";
// // import moment from "moment";
// import SelectDropdown from "../../../components/common/selectDropdown/SelectDropdown";
// const UserManagementReport = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const exportRef = useRef(null);

//   // Extracting the Transaction by Bank Details Data from Reducer
//   const AuditorTransactionCorporateData = useSelector(
//     (state) => state.AuditorReducer.transactionDetailsByCorporateData
//   );

//   //Local States
//   const [open, setOpen] = useState(false);
//   const [sRow, setSRow] = useState(0);
//   const [totalRecord, setTotalRecord] = useState(0);
//   // const [isLoading, setIsLoading] = useState(false);
//   const [userManagementTblData, setUserManagementTblData] = useState([]);

//   // const [branchCorporateOptions, setBranchCorporateOptions] = useState([
//   //   { label: "Branch", value: 0 },
//   //   { label: "Corporate", value: 1 },
//   // ]);

//   const branchCorporateOptions = [
//     { label: "Branch", value: 0 },
//     { label: "Corporate", value: 1 },
//   ];
//   const [selectedBranchCorporateOption, setSelectedBranchCorporateOption] =
//     useState({ label: "Branch", value: 0 });

//   //TEMPORARY
//   const branchOptions = [
//     { label: "Branch", value: 0 },
//     { label: "FX Trading", value: 1 },
//     { label: "Treasury Sales", value: 2 },
//   ];

//   const [selectedBranchOption, setSelectedBranchOption] = useState({
//     label: "Branch",
//     value: 0,
//   });

//   const handleSelectBranchCorporate = (e, name) => {
//     if (name === "branchCorporateOptions") {
//       console.log(e, "selected Option");
//       setSelectedBranchCorporateOption(e);
//     }
//     if (name === "branchOptions") {
//       console.log(e, "selected Option");
//       setSelectedBranchOption(e);
//     }
//   };

//   // const [formData, setFormData] = useState({
//   //   txnId: "",
//   //   corporateUser: "",
//   //   corporateName: "",
//   //   txnByTreasuryUser: "",
//   // });
//   const [formData, setFormData] = useState({
//     counterParty: "",
//     branchCorporateDropdown: "",
//     employeeID: "",
//     email: "",
//     branchDropdown: "",
//     branchInput: "",
//     createdBy: "",
//     approvedBy: "",
//     deactivatedBy: "",
//   });
//   //Calling
//   // useEffect(() => {
//   //   try {
//   //     let Data = {
//   //       TXNID: 0,
//   //       CorporateUser: "",
//   //       CorporateName: "",
//   //       TransactionByTreasuryUser: "",
//   //       StartDate: "",
//   //       EndDate: "",
//   //       Length: 10,
//   //       sRow: 0,
//   //     };
//   //     dispatch(GetTransactionDetailsByCorporateAuditor({ navigate, Data }));
//   //   } catch (error) {
//   //     console.log(error, "errorerrorerror");
//   //   }
//   // }, []);

//   //Extracting the Data
//   // useEffect(() => {
//   //   try {
//   //     if (
//   //       AuditorTransactionCorporateData &&
//   //       AuditorTransactionCorporateData !== null
//   //     ) {
//   //       const newRecords =
//   //         AuditorTransactionCorporateData.transactionForCorporate || [];
//   //       console.log(
//   //         AuditorTransactionCorporateData,
//   //         "AuditorTransactionBankData"
//   //       );
//   //       if (isLoading) {
//   //         setIsLoading(false);
//   //         setTotalRecord(AuditorTransactionCorporateData.totalCount);
//   //         setTransactionByBankTblData((prev) => [...prev, ...newRecords]);
//   //         setSRow((prev) => prev + newRecords.length);
//   //       } else {
//   //         setIsLoading(false);
//   //         setTransactionByBankTblData(newRecords);
//   //         setSRow(newRecords.length);
//   //         setTotalRecord(AuditorTransactionCorporateData.totalCount);
//   //       }
//   //     }
//   //   } catch (error) {
//   //     console.log(error, "errorerror");
//   //     setIsLoading(false);
//   //   }
//   // }, [AuditorTransactionCorporateData]);

//   //Excel And PDF Icon Click Func
//   // const handleExport = (format) => {
//   //   if (format === "excel") {
//   //     exportToExcel();
//   //   } else if (format === "pdf") {
//   //     exportToPDF();
//   //   }
//   // };

//   //Export to PDF Trigger Function
//   // const exportToExcel = () => {
//   //   let Data = {
//   //     TXNID: Number(formData.txnId),
//   //     CorporateUser:
//   //       formData.corporateUser !== "" ? formData.corporateUser : "",
//   //     CorporateName:
//   //       formData.corporateName !== "" ? formData.corporateName : "",
//   //     TransactionByTreasuryUser:
//   //       formData.txnByTreasuryUser !== "" ? formData.txnByTreasuryUser : "",
//   //     StartDate: startDate !== null ? startDate : "",
//   //     EndDate: endDate !== null ? endDate : "",
//   //   };

//   //   dispatch(
//   //     GetTransactionDetailsByCorporateExcelTypeReportAuditor({ navigate, Data })
//   //   );
//   // };

//   //Export to Excel Trigger Function
//   // const exportToPDF = () => {
//   //   let Data = {
//   //     TXNID: Number(formData.txnId),
//   //     CorporateUser:
//   //       formData.corporateUser !== "" ? formData.corporateUser : "",
//   //     CorporateName:
//   //       formData.corporateName !== "" ? formData.corporateName : "",
//   //     TransactionByTreasuryUser:
//   //       formData.txnByTreasuryUser !== "" ? formData.txnByTreasuryUser : "",
//   //     StartDate: startDate !== null ? startDate : "",
//   //     EndDate: endDate !== null ? endDate : "",
//   //   };

//   //   dispatch(
//   //     GetTransactionDetailsByCorporatePDFTypeReportAuditor({ navigate, Data })
//   //   );
//   // };

//   //Toggle Fucntion to view Export Icons
//   const toggleExportOptions = () => {
//     setOpen((prev) => !prev);
//   };

//   // Automatically export icons closed UseEffect using Useref Hook
//   // useEffect(() => {
//   //   const handleClickOutside = (event) => {
//   //     if (exportRef.current && !exportRef.current.contains(event.target)) {
//   //       setOpen(false);
//   //     }
//   //   };

//   //   document.addEventListener("mousedown", handleClickOutside);
//   //   return () => {
//   //     document.removeEventListener("mousedown", handleClickOutside);
//   //   };
//   // }, []);

//   //Common OnChange for textFields
//   const handleTextChange = (e) => {
//     const { name, value } = e.target;
//     console.log({ name, value }, "value");

//     const cleanedValue = value.replace(/\t/g, "").trim();

//     if (name === "employeeID") {
//       console.log("standing here");
//       const numericValue = cleanedValue.replace(/\D/g, "");
//       setFormData((prev) => ({ ...prev, [name]: numericValue }));
//       return;
//     }

//     // For all other fields, strip tabs and trim, then limit to 50 characters
//     const limitedValue = cleanedValue.slice(0, 50);
//     setFormData((prev) => ({ ...prev, [name]: limitedValue }));
//   };
//   //Handle Search Button
//   const handleSearchBtn = () => {
//     let Data = {
//       TXNID: Number(formData.txnId),
//       CorporateUser: formData.corporateUser,
//       CorporateName: formData.corporateName,
//       TransactionByTreasuryUser: formData.txnByTreasuryUser,
//       Length: 10,
//       sRow: 0,
//     };
//     console.log(Data, "DataDataDataData");
//     dispatch(GetTransactionDetailsByCorporateAuditor({ navigate, Data }));
//   };

//   //Handle Reset Button
//   const handleResetBtn = () => {
//     setSelectedBranchCorporateOption({ label: "Branch", value: 0 });
//     setSelectedBranchOption({ label: "Branch", value: 0 });
//     if (
//       formData.counterParty !== "" ||
//       formData.employeeID !== "" ||
//       formData.email !== "" ||
//       formData.branchInput !== "" ||
//       formData.createdBy !== "" ||
//       formData.approvedBy !== "" ||
//       formData.deactivatedBy !== ""
//     ) {
//       setFormData({
//         counterParty: "",
//         employeeID: "",
//         email: "",
//         branchInput: "",
//         createdBy: "",
//         approvedBy: "",
//         deactivatedBy: "",
//       });

//       setUserManagementTblData([]);
//       setSRow(0);
//       // setIsLoading(false);
//       setTotalRecord(0);
//       let Data = {
//         TXNID: 0,
//         CorporateUser: "",
//         CorporateName: "",
//         TransactionByTreasuryUser: "",
//         StartDate: "",
//         EndDate: "",
//         Length: 10,
//         sRow: 0,
//       };
//       // dispatch(GetTransactionDetailsByCorporateAuditor({ navigate, Data }));
//     }
//   };

//   // Columns for User Management table
//   const UserManagementTable = [
//     {
//       title: "Employee ID",
//       // dataIndex: "txnid",
//       // key: "txnid",
//       width: 100,
//       render: (text) => <span>{text}</span>,
//     },
//     {
//       title: "Employee Name",
//       // dataIndex: "corporateName",
//       // key: "corporateName",
//       width: 180,
//       render: (text) => <span>{text}</span>,
//     },
//     {
//       title: "Email",
//       // dataIndex: "corporateUser",
//       // key: "corporateUser",
//       width: 190,
//       render: (text) => <span>{text}</span>,
//     },
//     {
//       title: "Role",
//       // dataIndex: "treasuryUser",
//       // key: "treasuryUser",
//       width: 100,
//       render: (text) => <span>{text}</span>,
//     },
//     {
//       title: "Branch",
//       // dataIndex: "treasuryUser",
//       // key: "treasuryUser",
//       width: 100,
//       render: (text) => <span>{text}</span>,
//     },
//     {
//       title: "Contact",
//       // dataIndex: "date",
//       // key: "date",
//       width: 120,
//       render: (text) => <span>{text}</span>,
//     },
//     {
//       title: "Last Password Change",
//       // dataIndex: "time",
//       // key: "time",
//       width: 160,

//       // render: (text, record) => {
//       //   let dateStr = getDateTimeString(record.date, record.time);

//       //   return (
//       //     <span>
//       //       {dateStr &&
//       //         moment(convertDateTimeIntoLocal(dateStr)).format("hh:mm:ss")}
//       //     </span>
//       //   );
//       // },
//     },
//     {
//       title: "Creation Date Time",
//       // dataIndex: "type",
//       // key: "type",
//       width: 160,
//       // render: (text, record) => {
//       //   let dateStr = getDateTimeString(record.date, record.time);

//       //   return (
//       //     <span>
//       //       {dateStr &&
//       //         moment(convertDateTimeIntoLocal(dateStr)).format("hh:mm:ss")}
//       //     </span>
//       //   );
//       // },
//     },
//     {
//       title: "Created By (Name/ Email)",
//       // dataIndex: "nature",
//       // key: "nature",
//       width: 220,
//       render: (text) => <span>{text}</span>,
//     },

//     {
//       title: "Approved Date Time",
//       // dataIndex: "type",
//       // key: "type",
//       width: 160,
//       // render: (text, record) => {
//       //   let dateStr = getDateTimeString(record.date, record.time);

//       //   return (
//       //     <span>
//       //       {dateStr &&
//       //         moment(convertDateTimeIntoLocal(dateStr)).format("hh:mm:ss")}
//       //     </span>
//       //   );
//       // },
//     },
//     {
//       title: "Approved By (Name/ Email)",
//       // dataIndex: "ccY1",
//       // key: "ccY1",
//       width: 220,
//       render: (text) => <span>{text}</span>,
//     },

//     {
//       title: "Deactivated By (Name/ Email)",
//       // dataIndex: "ccY1",
//       // key: "ccY1",
//       width: 220,
//       render: (text) => <span>{text}</span>,
//     },
//     {
//       title: "Deactivated Date Time",
//       // dataIndex: "type",
//       // key: "type",
//       width: 160,
//       // render: (text, record) => {
//       //   let dateStr = getDateTimeString(record.date, record.time);

//       //   return (
//       //     <span>
//       //       {dateStr &&
//       //         moment(convertDateTimeIntoLocal(dateStr)).format("hh:mm:ss")}
//       //     </span>
//       //   );
//       // },
//     },
//     {
//       title: "Role Modified on",
//       // dataIndex: "type",
//       // key: "type",
//       width: 160,
//       // render: (text, record) => {
//       //   let dateStr = getDateTimeString(record.date, record.time);

//       //   return (
//       //     <span>
//       //       {dateStr &&
//       //         moment(convertDateTimeIntoLocal(dateStr)).format("hh:mm:ss")}
//       //     </span>
//       //   );
//       // },
//     },
//   ];

//   //Scroller Custom Hook
//   useTableScrollBottomByClassName(
//     () => {
//       if (userManagementTblData.length !== totalRecord) {
//         // setIsLoading(true);
//         let Data = {
//           TXNID: Number(formData.txnId) !== "" ? Number(formData.txnId) : 0,
//           CorporateUser:
//             formData.corporateUser !== "" ? formData.corporateUser : "",
//           CorporateName:
//             formData.corporateName !== "" ? formData.corporateName : "",
//           TransactionByTreasuryUser:
//             formData.txnByTreasuryUser !== "" ? formData.txnByTreasuryUser : "",
//           Length: 10,
//           sRow: sRow,
//         };
//         dispatch(GetTransactionDetailsByCorporateAuditor({ navigate, Data }));
//       }
//     },
//     0,
//     "BankUserList-table"
//   );

//   return (
//     <>
//       <Row>
//         <Col lg={12} md={12} sm={12}>
//           <span className={styles["AuditTrialBankMainHeading"]}>
//             User Management Report
//           </span>
//         </Col>
//       </Row>
//       <CustomPaper variant="outlined">
//         <Row>
//           <Col lg={2} md={2} sm={2} xs={12}>
//             <TextField
//               name="counterParty"
//               placeholder="Counter Party"
//               applyClass="TextFieldAuditors"
//               value={formData.counterParty}
//               onChange={handleTextChange}
//             />
//           </Col>
//           <Col lg={2} md={2} sm={2} xs={12}>
//             <SelectDropdown
//               classNamePrefix="selectTransactionNatureList"
//               options={branchCorporateOptions}
//               value={selectedBranchCorporateOption}
//               isSearchable
//               onChange={(e) =>
//                 handleSelectBranchCorporate(e, "branchCorporateOptions")
//               }
//             />
//           </Col>
//           <Col lg={2} md={2} sm={2} xs={12}>
//             <TextField
//               name="employeeID"
//               placeholder="Employee ID"
//               applyClass="TextFieldAuditors"
//               value={formData.employeeID}
//               onChange={handleTextChange}
//               maxLength={50}
//             />
//           </Col>
//           <Col lg={2} md={2} sm={2} xs={12}>
//             <TextField
//               name="email"
//               placeholder="Email"
//               applyClass="TextFieldAuditors"
//               value={formData.email}
//               onChange={handleTextChange}
//             />
//           </Col>
//           <Col lg={2} md={2} sm={2} xs={12}>
//             <SelectDropdown
//               options={branchOptions}
//               classNamePrefix="selectTransactionNatureList"
//               value={selectedBranchOption}
//               isSearchable
//               onChange={(e) => handleSelectBranchCorporate(e, "branchOptions")}
//               menuPortalTarget={document.body}
//             />
//           </Col>
//           <Col lg={2} md={2} sm={2} xs={12}>
//             <TextField
//               name="branchInput"
//               placeholder="Branch"
//               applyClass="TextFieldAuditors"
//               value={formData.branchInput}
//               onChange={handleTextChange}
//             />
//           </Col>
//         </Row>
//         <Row className="mt-3">
//           <Col lg={2} md={2} sm={2} xs={12}>
//             <TextField
//               name="createdBy"
//               placeholder="Created by (Name/Email)"
//               applyClass="TextFieldAuditors"
//               value={formData.createdBy}
//               onChange={handleTextChange}
//             />
//           </Col>
//           <Col lg={2} md={2} sm={2} xs={12}>
//             <TextField
//               name="approvedBy"
//               placeholder="Approved by (Name/Email)"
//               applyClass="TextFieldAuditors"
//               value={formData.approvedBy}
//               onChange={handleTextChange}
//             />
//           </Col>
//           <Col lg={2} md={2} sm={2} xs={12}>
//             <TextField
//               name="deactivatedBy"
//               placeholder="Deactivated by (Name/Email)"
//               applyClass="TextFieldAuditors"
//               value={formData.deactivatedBy}
//               onChange={handleTextChange}
//             />
//           </Col>
//           <Col
//             lg={6}
//             md={12}
//             sm={12}
//             xs={12}
//             className="d-flex gap-2 mt-lg-0 mt-3"
//           >
//             <Button
//               icon={<i className="icon-search icon-check-space"></i>}
//               value={"Search"}
//               className={styles["SearchButtonStyles"]}
//               onClick={handleSearchBtn}
//             />
//             <Button
//               icon={<i className="icon-refresh"></i>}
//               value={"Reset"}
//               className={styles["ResetButtonStyles"]}
//               onClick={handleResetBtn}
//             />

//             <div className="position-relative" ref={exportRef}>
//               <Button
//                 icon={<i className="icon-download"></i>}
//                 className={styles["Export_Button"]}
//                 value="Export"
//                 iconClass={styles["resetIconClass"]}
//                 onClick={toggleExportOptions}
//               />
//               <span
//                 className={`${styles["Export_optionsBox"]} ${
//                   open ? styles["open"] : styles["closed"]
//                 }`}
//               >
//                 <Button
//                   icon={<img src={excelIcon} alt="Excel Icon" />}
//                   // onClick={() => handleExport("excel")}
//                   className={styles["export-button"]}
//                 />
//                 <Button
//                   icon={<img src={pdfIcon} alt="PDF Icon" />}
//                   // onClick={() => handleExport("pdf")}
//                   className={styles["export-button"]}
//                 />
//               </span>
//             </div>
//           </Col>
//         </Row>

//         <Row className="mt-5">
//           <Col lg={12} md={12} sm={12} xs={12}>
//             <CustomTable
//               column={UserManagementTable}
//               rows={userManagementTblData}
//               pagination={false}
//               scroll={{ x: "max-content", y: "45vh" }}
//               className={"BankUserList-table"}
//             />
//           </Col>
//         </Row>
//       </CustomPaper>
//     </>
//   );
// };

// export default UserManagementReport;
