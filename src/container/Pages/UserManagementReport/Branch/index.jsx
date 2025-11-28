import React, { useCallback, useEffect, useRef, useState } from "react";
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
import ExportShowComponent from "../../../../components/common/ExportShowComponent/ExportShowComponent";
import {
  GetAdminEmailforUserManagementAPI,
  GetRoleforUserManagementAPI,
  SearchBranchUserForUserManagementAPI,
} from "../../../../store/UserManagementActions/UserManagementActions";
import { convertDateTimeIntoLocal } from "../../../../utils/Timer";
import moment from "moment";
import {
  DownloadBranchUserForAuditorExcelReportAPI,
  DownloadBranchUserForAuditorReportPDFAPI,
} from "../../../../store/ReportActions/ReportActions";
const Branch = () => {
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
  const [userManagementBranchTblData, setUserManagementBranchTblData] =
    useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [securityRoleOptions, setSecurityRoleOptions] = useState([]);
  const [SystemRoleOptions, setSystemRoleOptions] = useState([]);
  const [selectApprovedByOptions, setSelectApprovedByOptions] = useState(null);
  const [selectCreatedByOptions, setSelectCreatedByOptions] = useState(null);
  const [selectDeactivatedByOptions, setSelectDeactivatedByOptions] =
    useState(null);
  const [isSearch, setIsSearch] = useState(false);

  const [selectedRoleOption, setSelectedRoleOption] = useState(null);

  const GetRoleforUserManagement = useSelector(
    (state) => state.userManagementSlicer.GetRoleforUserManagement
  );

  const GetAdminEmailforUserManagement = useSelector(
    (state) => state.userManagementSlicer.GetAdminEmailforUserManagement
  );

  const SearchBranchUserForUserManagement = useSelector(
    (state) => state.userManagementSlicer.SearchBranchUserForUserManagement
  );

  //initial useEffect
  useEffect(() => {
    dispatch(GetRoleforUserManagementAPI(navigate));
    dispatch(GetAdminEmailforUserManagementAPI(navigate));
    let Data = {
      EmployeeID: "",
      EmployeeName: "",
      EmployeeEmail: "",
      RoleID: 0,
      CreatedBy: 0,
      ApprovedBy: 0,
      DeactivatedBy: 0,
      Length: dropdownvalue,
      sRow: 0,
    };
    dispatch(SearchBranchUserForUserManagementAPI({ navigate, Data }));
  }, []);

  //set roleID Dropdown
  useEffect(() => {
    if (GetRoleforUserManagement && GetRoleforUserManagement !== null) {
      try {
        const { userRoles = [] } = GetRoleforUserManagement;
        let newRoles = [];
        userRoles.map((role) => {
          newRoles.push({
            value: role.userRoleID,
            label: role.userRoleName,
          });
        });
        setRoleOptions(newRoles);
      } catch (error) {
        console.log(error);
      }
    }
  }, [GetRoleforUserManagement]);

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
        SearchBranchUserForUserManagement &&
        SearchBranchUserForUserManagement !== null
      ) {
        const newRecords = SearchBranchUserForUserManagement.branchUsers || [];
        if (isLoading) {
          setIsLoading(false);
          setUserManagementBranchTblData((prev) => [...prev, ...newRecords]);
          setSRow((prev) => prev + newRecords.length);
          setTotalRecord(SearchBranchUserForUserManagement.totalCount);
        } else {
          setIsLoading(false);
          setUserManagementBranchTblData(newRecords);
          setSRow(newRecords.length);
          setTotalRecord(SearchBranchUserForUserManagement.totalCount);
        }
      } else if (SearchBranchUserForUserManagement === null) {
        if (!isLoading) {
          setIsLoading(false);
          setTotalRecord(0);
          setSRow(0);
          setUserManagementBranchTblData([]);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [SearchBranchUserForUserManagement]);

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
    }
  };

  const [formData, setFormData] = useState({
    employeeID: "",
    email: "",
    employeeName: "",
    roleName: "",
    roleId: 0,
    branchName: "",
  });

  const handlePageSizeChange = (newSize) => {
    setDropdownvalue(newSize);
    setSRow(0);
    setIsLoading(false);
    setUserManagementBranchTblData([]);
    setTotalRecord(0);

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showMessage("Please enter a valid email address.");
      return;
    }

    let Data = {
      EmployeeID: formData.employeeID || "",
      EmployeeName: formData.employeeName || "",
      EmployeeEmail: formData.email || "",
      RoleID:
        selectedRoleOption?.value !== undefined ? selectedRoleOption.value : 0,
      BranchName: formData.branchName || "",

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

    dispatch(SearchBranchUserForUserManagementAPI({ navigate, Data }));
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
      EmployeeID: formData.employeeID || "",
      EmployeeName: formData.employeeName || "",
      EmployeeEmail: formData.email || "",
      RoleID:
        selectedRoleOption?.value !== undefined ? selectedRoleOption.value : 0,
      BranchName: formData.branchName || "",

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

    dispatch(DownloadBranchUserForAuditorExcelReportAPI({ navigate, Data }));
  };

  //Export to Excel Trigger Function
  const exportToPDF = () => {
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showMessage("Please enter a valid email address.");
      return;
    }
    let Data = {
      EmployeeID: formData.employeeID || "",
      EmployeeName: formData.employeeName || "",
      EmployeeEmail: formData.email || "",
      RoleID:
        selectedRoleOption?.value !== undefined ? selectedRoleOption.value : 0,
      BranchName: formData.branchName || "",

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

    dispatch(DownloadBranchUserForAuditorReportPDFAPI({ navigate, Data }));
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

  const handleTextChange = useCallback((e) => {
    const { name, value, validity } = e.target;
    console.log(
      { name, value, validity: validity.valid, target: e.target },
      "formDataformData"
    );

    // const cleanedValue = value.replace(/\t/g, "").trim();

    if (name === "employeeID" && validity.valid) {
      setFormData((prev) => ({ ...prev, [name]: value }));
      return;
    }
    if (name === "email") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (name === "employeeName" && validity.valid) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }, []);
  //Handle Search Button
  const handleSearchBtn = () => {
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showMessage("Please enter a valid email address.");
      return;
    }
    setIsSearch(true);

    let Data = {
      EmployeeID: formData.employeeID !== "" ? formData.employeeID : "",
      EmployeeName: formData.employeeName !== "" ? formData.employeeName : "",
      EmployeeEmail: formData.email !== "" ? formData.email : "",
      RoleID:
        selectedRoleOption?.value !== undefined ? selectedRoleOption.value : 0,
      BranchName: formData.branchName !== "" ? formData.branchName : "",

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
      sRow: 0,
    };

    console.log(Data, "DataDataDataData");
    dispatch(SearchBranchUserForUserManagementAPI({ navigate, Data }));
  };

  //Handle Reset Button
  const handleResetBtn = () => {
    setIsSearch(false);
    setSelectApprovedByOptions(null);
    setSelectCreatedByOptions(null);
    setSelectDeactivatedByOptions(null);
    setSelectedRoleOption(null);

    setFormData({
      employeeID: "",
      email: "",
      employeeName: "",
      branchName: "",
      roleId: 0,
    });

    setUserManagementBranchTblData([]);
    setSRow(0);
    // setIsLoading(false);
    setTotalRecord(0);
    let Data = {
      EmployeeID: "",
      EmployeeName: "",
      BranchName: "",
      EmployeeEmail: "",
      RoleID: 0,
      CreatedBy: 0,
      ApprovedBy: 0,
      DeactivatedBy: 0,
      Length: dropdownvalue,
      sRow: 0,
    };
    dispatch(SearchBranchUserForUserManagementAPI({ navigate, Data }));
  };

  // Columns for User Management table
  const UserManagementTable = [
    {
      title: "Employee ID",
      dataIndex: "employeeID",
      key: "employeeID",
      width: 90,
      ellipsis: true,
    },
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
      ellipsis: true,
      width: 220,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      width: 190,
    },
    {
      title: "Role",
      dataIndex: "roleID",
      key: "roleID",
      ellipsis: true,
      width: 100,
      render: (val) => {
        let roleName = roleOptions.find((role) => role.value === val);
        return <span>{roleName?.label}</span>;
      },
    },
    {
      title: "Branch",
      dataIndex: "branchName",
      key: "branchName",
      width: 100,
      ellipsis: true,
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      ellipsis: true,
      width: 120,
    },
    {
      title: "Status",
      dataIndex: "statusID",
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
      width: 220,
    },

    {
      title: "Deactivated By",
      dataIndex: "deactivatedBy",
      key: "deactivatedBy",
      width: 220,
    },
    {
      title: "Role Modified on",
      dataIndex: "roleModifiedOn",
      key: "roleModifiedOn",
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
  ];

  //Scroller Custom Hook
  useTableScrollBottomByClassName(
    () => {
      if (userManagementBranchTblData.length !== totalRecord) {
        setIsLoading(true);
        if (isSearch) {
          if (
            formData.email !== "" &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
          ) {
            showMessage("Please enter a valid email address.");
            return;
          }
          let Data = {
            EmployeeID:
              formData.employeeID && isSearch ? formData.employeeID : "",
            EmployeeName:
              formData.employeeName && isSearch ? formData.employeeName : "",
            EmployeeEmail: formData.email && isSearch ? formData.email : "",
            RoleID:
              selectedRoleOption?.value !== undefined
                ? selectedRoleOption.value
                : 0,
            BranchName:
              formData.branchName && isSearch ? formData.branchName : "",

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
          dispatch(SearchBranchUserForUserManagementAPI({ navigate, Data }));
        } else if (isSearch === false) {
          let Data = {
            EmployeeID: "",
            EmployeeName: "",
            EmployeeEmail: "",
            RoleID: 0,
            BranchName: "",
            CreatedBy: 0,
            ApprovedBy: 0,
            DeactivatedBy: 0,
            Length: dropdownvalue,
            sRow: sRow,
          };
          dispatch(SearchBranchUserForUserManagementAPI({ navigate, Data }));
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
              name="employeeID"
              placeholder="Employee ID"
              applyClass="TextFieldAuditors"
              maxLength={15}
              value={formData.employeeID}
              pattern={"^[a-zA-Z0-9]+$"}
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
              pattern={"^[A-Za-z ]+$"}
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
          {selectedRoleOption?.value === 9 && (
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
          {selectedRoleOption?.value !== 9 && (
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
          )}
        </Row>
        <Row className="mt-3">
          {selectedRoleOption?.value === 9 && (
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
          )}
          <Col lg={4} md={4} sm={4} xs={12}>
            <SelectDropdown
              classNamePrefix="dropdownBranchSpotTreasury"
              placeholder="Approved by"
              styles={{
                maxLength: "10px",
              }}
              options={securityRoleOptions}
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
              options={securityRoleOptions}
              value={selectDeactivatedByOptions}
              isSearchable
              onChange={(e) => handleSelectOption(e, "deactivatedBy")}
            />
          </Col>
          {selectedRoleOption?.value === 9 ? (
            <>
              <Col
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={`${
                  selectedRoleOption?.value === 9
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
            </>
          ) : (
            <>
              <Col
                lg={4}
                md={12}
                sm={12}
                xs={12}
                className={`${
                  selectedRoleOption?.value === 9
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
              rows={userManagementBranchTblData}
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

export default Branch;
