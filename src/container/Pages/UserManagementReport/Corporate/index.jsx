import React, { useEffect, useRef, useState } from "react";
import styles from "../UserManagementReport.module.css";
import { Col, Row } from "react-bootstrap";
import pdfIcon from "../../../../assets/images/pdf.png";
import excelIcon from "../../../../assets/images/excel.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTableScrollBottomByClassName } from "../../../../components/common/useTableScrollBottom";
import SelectDropdown from "../../../../components/common/selectDropdown/SelectDropdown";
import {
  Button,
  CustomPaper,
  CustomTable,
  TextField,
} from "../../../../components/elements";
import { useNotification } from "../../../../context/NotificationProvider";
import {
  GetAdminEmailforUserManagementAPI,
  SearchCorporateUserForUserManagementAPI,
} from "../../../../store/UserManagementActions/UserManagementActions";
import moment from "moment";
import { convertDateTimeIntoLocal } from "../../../../utils/Timer";
import ExportShowComponent from "../../../../components/common/ExportShowComponent/ExportShowComponent";
import {
  DownloadCorporateUserForAuditorExcelReportAPI,
  DownloadCorporateUserForAuditorReportPDFAPI,
} from "../../../../store/ReportActions/ReportActions";
const Corporate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const exportRef = useRef(null);
  const { showMessage } = useNotification();

  //Local States
  const [open, setOpen] = useState(false);
  const [sRow, setSRow] = useState(0);
  const [dropdownvalue, setDropdownvalue] = useState(50);
  const [totalRecord, setTotalRecord] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    corporateUser: "",
    corporateName: "",
  });
  const [userManagementCorpTblData, setUserManagementCorpTblData] = useState(
    []
  );
  const [securityRoleOptions, setSecurityRoleOptions] = useState([]);
  const [SystemRoleOptions, setSystemRoleOptions] = useState([]);
  const GetAdminEmailforUserManagement = useSelector(
    (state) => state.userManagementSlicer.GetAdminEmailforUserManagement
  );
  const SearchCorporateUserForUserManagement = useSelector(
    (state) => state.userManagementSlicer.SearchCorporateUserForUserManagement
  );
  const [selectApprovedByOptions, setSelectApprovedByOptions] = useState(null);
  const [selectCreatedByOptions, setSelectCreatedByOptions] = useState(null);
  const [selectDeactivatedByOptions, setSelectDeactivatedByOptions] =
    useState(null);
  const [isSearch, setIsSearch] = useState(false);
  //initial useEffect
  useEffect(() => {
    dispatch(GetAdminEmailforUserManagementAPI(navigate));
    let Data = {
      CorporateUser: "",
      CorporateName: "",
      Email: "",
      CreatedBy: 0,
      ApprovedBy: 0,
      DeactivatedBy: 0,
      Length: dropdownvalue,
      sRow: 0,
    };
    dispatch(SearchCorporateUserForUserManagementAPI({ navigate, Data }));
  }, []);

  // Set Security and System Role Options
  useEffect(() => {
    if (
      GetAdminEmailforUserManagement &&
      GetAdminEmailforUserManagement !== null
    ) {
      try {
        //For Security Roles
        if (
          GetAdminEmailforUserManagement.securityAdminEmailList &&
          GetAdminEmailforUserManagement.securityAdminEmailList.length > 0
        ) {
          const { securityAdminEmailList = [] } =
            GetAdminEmailforUserManagement;
          let newSecurityRoles = [];
          securityAdminEmailList.map((role) => {
            newSecurityRoles.push({
              value: role.userID,
              label: role.userEmail,
            });
          });
          setSecurityRoleOptions(newSecurityRoles);
        }
        // For System Roles
        if (
          GetAdminEmailforUserManagement.systemAdminEmailList &&
          GetAdminEmailforUserManagement.systemAdminEmailList.length > 0
        ) {
          const { systemAdminEmailList = [] } = GetAdminEmailforUserManagement;
          let newSystemRoles = [];
          systemAdminEmailList.map((role) => {
            newSystemRoles.push({
              value: role.userID,
              label: role.userEmail,
            });
          });
          setSystemRoleOptions(newSystemRoles);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [GetAdminEmailforUserManagement]);

  // UseEffect to set Data for Search API in the table
  useEffect(() => {
    try {
      if (
        SearchCorporateUserForUserManagement &&
        SearchCorporateUserForUserManagement !== null
      ) {
        const newRecords =
          SearchCorporateUserForUserManagement.corporateUsers || [];
        if (isLoading) {
          setIsLoading(false);
          setUserManagementCorpTblData((prev) => [...prev, ...newRecords]);
          setSRow((prev) => prev + newRecords.length);
          setTotalRecord(SearchCorporateUserForUserManagement.totalCount);
        } else {
          setIsLoading(false);
          setUserManagementCorpTblData(newRecords);
          setSRow(newRecords.length);
          setTotalRecord(SearchCorporateUserForUserManagement.totalCount);
        }
      } else if (SearchCorporateUserForUserManagement === null) {
        if (!isLoading) {
          setIsLoading(false);
          setTotalRecord(0);
          setSRow(0);
          setUserManagementCorpTblData([]);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [SearchCorporateUserForUserManagement]);

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
  };

  const handlePageSizeChange = (newSize) => {
    setDropdownvalue(newSize);
    setSRow(0);
    setIsLoading(false);
    setUserManagementCorpTblData([]);
    setTotalRecord(0);

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showMessage("Please enter a valid email address.");
      return;
    }

    let Data = {
      CorporateUser: formData.corporateUser || "",
      CorporateName: formData.corporateName || "",
      Email: formData.email || "",
      CreatedBy:
        selectCreatedByOptions?.value !== undefined
          ? selectCreatedByOptions.value
          : 0,
      ApprovedBy:
        selectApprovedByOptions?.value !== undefined
          ? selectApprovedByOptions.value
          : 0,
      DeactivatedBy:
        selectDeactivatedByOptions?.value !== undefined
          ? selectDeactivatedByOptions.value
          : 0,
      Length: newSize,
      sRow: 0,
    };
    dispatch(SearchCorporateUserForUserManagementAPI({ navigate, Data }));
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
  const exportToExcel = () => {
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showMessage("Please enter a valid email address.");
      return;
    }

    let Data = {
      CorporateUser: formData.corporateUser || "",
      CorporateName: formData.corporateName || "",
      Email: formData.email || "",
      CreatedBy:
        selectCreatedByOptions?.value !== undefined
          ? selectCreatedByOptions.value
          : 0,
      ApprovedBy:
        selectApprovedByOptions?.value !== undefined
          ? selectApprovedByOptions.value
          : 0,
      DeactivatedBy:
        selectDeactivatedByOptions?.value !== undefined
          ? selectDeactivatedByOptions.value
          : 0,
    };

    dispatch(DownloadCorporateUserForAuditorExcelReportAPI({ navigate, Data }));
  };

  //Export to Excel Trigger Function
  const exportToPDF = () => {
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showMessage("Please enter a valid email address.");
      return;
    }
    let Data = {
      CorporateUser: formData.corporateUser || "",
      CorporateName: formData.corporateName || "",
      Email: formData.email || "",
      CreatedBy:
        selectCreatedByOptions?.value !== undefined
          ? selectCreatedByOptions.value
          : 0,
      ApprovedBy:
        selectApprovedByOptions?.value !== undefined
          ? selectApprovedByOptions.value
          : 0,
      DeactivatedBy:
        selectDeactivatedByOptions?.value !== undefined
          ? selectDeactivatedByOptions.value
          : 0,
    };

    dispatch(DownloadCorporateUserForAuditorReportPDFAPI({ navigate, Data }));
  };

  //Toggle Fucntion to view Export Icons
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

  //Common OnChange for textFields
  const handleTextChange = (e) => {
    const { name, value, validity } = e.target;
    console.log({ name, value }, "value");

    if (name === "email") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (name === "corporateUser" && validity.valid) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (name === "corporateName" && validity.valid) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  //Handle Search Button
  const handleSearchBtn = () => {
    // If email is not empty and invalid -> show popup
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showMessage("Please enter a valid email address.");
      return;
    }
    let Data = {
      CorporateUser: formData.corporateUser,
      CorporateName: formData?.corporateName,
      Email: formData?.email,
      CreatedBy:
        selectCreatedByOptions?.value !== undefined
          ? selectCreatedByOptions.value
          : 0,
      ApprovedBy:
        selectApprovedByOptions?.value !== undefined
          ? selectApprovedByOptions.value
          : 0,
      DeactivatedBy:
        selectDeactivatedByOptions?.value !== undefined
          ? selectDeactivatedByOptions.value
          : 0,
      Length: dropdownvalue,
      sRow: 0,
    };
    console.log(Data, "DataDataDataData");

    dispatch(SearchCorporateUserForUserManagementAPI({ navigate, Data }));
    setIsSearch(true);
  };

  //Handle Reset Button
  const handleResetBtn = () => {
    setIsSearch(false);
    setSelectApprovedByOptions(null);
    setSelectCreatedByOptions(null);
    setSelectDeactivatedByOptions(null);

    setFormData({
      email: "",
      corporateName: "",
      corporateUser: "",
    });

    setUserManagementCorpTblData([]);
    setSRow(0);
    // setIsLoading(false);
    setTotalRecord(0);
    let Data = {
      CorporateUser: "",
      CorporateName: "",
      Email: "",
      CreatedBy: 0,
      ApprovedBy: 0,
      DeactivatedBy: 0,
      Length: dropdownvalue,
      sRow: 0,
    };
    dispatch(SearchCorporateUserForUserManagementAPI({ navigate, Data }));
  };

  // Columns for User Management table
  const UserManagementTable = [
    {
      title: "Corporate User",
      dataIndex: "corporateUser",
      key: "corporateUser",
      width: 180,
      ellipsis: true,
    },
    {
      title: "Corporate Name",
      dataIndex: "corporateName",
      key: "corporateName",
      width: 180,
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 190,
      ellipsis: true,
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      width: 120,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "statusID", // use your actual data field name
      key: "statusID",
      width: 75,

      render: (val) => {
        return (
          <span style={{ color: val === 1 ? "green" : "red" }}>
            {val === 1
              ? "Active"
              : val === 2
              ? "Inactive"
              : val === 3
              ? "Locked"
              : val === 4
              ? "Closed"
              : val === 9
              ? "Dormant"
              : ""}
          </span>
        );
      },
    },
    {
      title: "Last Password Change",
      dataIndex: "lastPasswordChange",
      key: "lastPasswordChange",
      width: 180,
      align: "center",
      render: (text) => (
        <span>
          {text === "-"
            ? "-"
            : text &&
              moment(convertDateTimeIntoLocal(text)).format(
                "YYYY/MM/DD hh:mm:ss A"
              )}
        </span>
      ),
    },
    {
      title: "Creation Date Time",
      dataIndex: "creationDateTime",
      key: "creationDateTime",
      width: 180,
      align: "center",
      render: (text) => (
        <span>
          {text &&
            moment(convertDateTimeIntoLocal(text)).format(
              "YYYY/MM/DD hh:mm:ss A"
            )}
        </span>
      ),
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      width: 200,
      ellipsis: true,
    },

    {
      title: "Approved Date Time",
      dataIndex: "approvedDateTime",
      key: "approvedDateTime",
      width: 180,
      align: "center",
      render: (text) => (
        <span>
          {text &&
            moment(convertDateTimeIntoLocal(text)).format(
              "YYYY/MM/DD hh:mm:ss A"
            )}
        </span>
      ),
    },
    {
      title: "Approved By",
      dataIndex: "approvedBy",
      key: "approvedBy",
      width: 200,
      ellipsis: true,
    },

    {
      title: "Deactivated By",
      dataIndex: "deactivatedBy",
      key: "deactivatedBy",
      width: 200,
      ellipsis: true,
    },
  ];
  //Scroller Custom Hook
  useTableScrollBottomByClassName(
    () => {
      if (userManagementCorpTblData.length !== totalRecord) {
        setIsLoading(true);
        if (isSearch) {
          let Data = {
            CorporateUser:
              formData.corporateUser && isSearch ? formData.corporateUser : "",
            CorporateName:
              formData.corporateName && isSearch ? formData.corporateName : "",
            Email: formData.email && isSearch ? formData.email : "",
            CreatedBy:
              selectCreatedByOptions?.value !== undefined
                ? selectCreatedByOptions.value
                : 0,
            ApprovedBy: selectApprovedByOptions?.value
              ? selectApprovedByOptions.value
              : 0,
            DeactivatedBy: selectDeactivatedByOptions?.value
              ? selectDeactivatedByOptions.value
              : 0,
            Length: dropdownvalue,
            sRow: sRow,
          };
          dispatch(SearchCorporateUserForUserManagementAPI({ navigate, Data }));
        } else if (isSearch === false) {
          let Data = {
            CorporateUser: "",
            CorporateName: "",
            Email: "",
            CreatedBy: 0,
            ApprovedBy: 0,
            DeactivatedBy: 0,
            Length: dropdownvalue,
            sRow: sRow,
          };
          dispatch(SearchCorporateUserForUserManagementAPI({ navigate, Data }));
        }
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
              name="email"
              placeholder="Email"
              applyClass="TextFieldAuditors"
              maxLength={100}
              value={formData.email}
              onChange={handleTextChange}
            />
          </Col>
          <Col lg={3} md={3} sm={3} xs={12}>
            <TextField
              name="corporateUser"
              placeholder="Corporate User"
              applyClass="TextFieldAuditors"
              pattern={"^[A-Za-z ]+$"}
              maxLength={50}
              value={formData.corporateUser}
              onChange={handleTextChange}
            />
          </Col>

          <Col lg={3} md={3} sm={3} xs={12}>
            <TextField
              name="corporateName"
              placeholder="Corporate Name"
              applyClass="TextFieldAuditors"
              maxLength={50}
              value={formData.corporateName}
              pattern={"^[A-Za-z ]+$"}
              onChange={handleTextChange}
            />
          </Col>
          <Col lg={4} md={4} sm={4} xs={12}>
            <SelectDropdown
              classNamePrefix="dropdownBranchSpotTreasury"
              placeholder={"Created By"}
              options={SystemRoleOptions}
              value={selectCreatedByOptions}
              isSearchable
              onChange={(e) => handleSelectOption(e, "createdBy")}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={4} md={4} sm={6} xs={12}>
            <SelectDropdown
              classNamePrefix="dropdownBranchSpotTreasury"
              placeholder={"Approved By"}
              options={securityRoleOptions}
              value={selectApprovedByOptions}
              isSearchable
              onChange={(e) => handleSelectOption(e, "approvedBy")}
            />
          </Col>
          <Col lg={4} md={4} sm={6} xs={12}>
            <SelectDropdown
              classNamePrefix="dropdownBranchSpotTreasury"
              placeholder="Deactivated by"
              styles={{
                maxLength: "10px",
              }}
              options={securityRoleOptions}
              value={selectDeactivatedByOptions}
              isSearchable
              onChange={(e) => handleSelectOption(e, "deactivatedBy")}
            />
          </Col>

          <Col
            lg={4}
            md={12}
            sm={12}
            xs={12}
            className={"d-flex gap-2 justify-content-center align-items-center"}
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
              rows={userManagementCorpTblData}
              pagination={false}
              scroll={{ y: "45vh" }}
              className={"BankUserList-table"}
            />
          </Col>
        </Row>
      </CustomPaper>
    </>
  );
};

export default Corporate;
