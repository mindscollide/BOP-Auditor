import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./forwards.module.css";
import { useDispatch, useSelector } from "react-redux";
import { formatDateForPayload } from "../../../../components/common/utils";
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
import moment from "moment";
import SelectDropdown from "../../../../components/common/selectDropdown/SelectDropdown";
import { GetForwardRateInputDataAPI } from "../../../../store/RateInputActions/RateInputActions";
import { useNavigate } from "react-router-dom";
import { createTableFunc } from "../../../../Common/generateTableData";
import ExportShowComponent from "../../../../components/common/ExportShowComponent/ExportShowComponent";
import {
  DownloadForwardRateInputExcelReportAPI,
  DownloadForwardRateInputReportPDFAPI,
} from "../../../../store/ReportActions/ReportActions";
import { clearGetForwardRateInputData } from "../../../../store/authSlicer/RateInputSlicer";

const Forwards = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const exportRef = useRef(null);

  //Local States
  const [open, setOpen] = useState(false);
  const [sRow, setSRow] = useState(0);
  const [dropdownvalue, setDropdownvalue] = useState(50);

  const [totalRecord, setTotalRecord] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [rateReportTblData, setRateReportTblData] = useState([]);
  const [rateReportColumns, setRateReportColumns] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: "",
    dateFrom: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    dateTo: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });
  // Date range options
  const [dateRangeOptions] = useState([
    { value: 1, label: "1 Month" },
    { value: 2, label: "3 Months" },
    { value: 3, label: "6 Months" },
    { value: 4, label: "1 Year" },
    { value: 5, label: "Custom Date" },
  ]);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);

  const GetForwardRateInputData = useSelector(
    (state) => state.RateInputSlicer.GetForwardRateInputData
  );
  const GetAllTenors = useSelector((state) => state.authReducer.getAllTenors);

  const handlePageSizeChange = useCallback(
    (newSize) => {
      setDropdownvalue(newSize);
      setSRow(0);
      setIsLoading(false);
      setRateReportTblData([]); // other wise append the new records only
      setTotalRecord(0);

      const { StartDate, EndDate } = formatDateForPayload(
        formData.dateFrom.value,
        formData.dateTo.value
      );

      const Data = {
        EmployeeID: formData.employeeId || "",
        EmployeeName: formData.employeeName || "",
        StartDate,
        EndDate,
        Length: newSize,
        sRow: 0,
      };

      dispatch(GetForwardRateInputDataAPI({ navigate, Data }));
    },
    [
      formData.employeeId,
      formData.employeeName,
      formData.dateFrom.value,
      formData.dateTo.value,
      dispatch,
      navigate,
    ]
  );

  useEffect(() => {
    try {
      let Data = {
        EmployeeID: "",
        EmployeeName: "",
        StartDate: "",
        EndDate: "",
        Length: dropdownvalue,
        sRow: 0,
      };

      dispatch(GetForwardRateInputDataAPI({ navigate, Data }));
    } catch (error) {
      console.log(error, "errorerror");
    }
    return () => {
      dispatch(clearGetForwardRateInputData());
    };
  }, []);

  useEffect(() => {
    if (GetForwardRateInputData !== null) {
      if (GetAllTenors?.tenors?.length) {
        const { forwardRateInputs = [], totalCount } = GetForwardRateInputData;
        try {
          const tenors = GetAllTenors.tenors.filter(
            (t) => t.isForwardStandard === true
          );

          //to Optimize code
          const { columns, tableData } = createTableFunc(
            1,
            tenors,
            forwardRateInputs
          );

          if (tableData && tableData !== null && columns.length > 0) {
            const newRecords = tableData || [];
            if (isLoading) {
              setIsLoading(false);
              setTotalRecord(totalCount);
              setRateReportTblData((prev) => [...prev, ...newRecords]); // when the below hook condtion total record and reducer state is not equal get new record appended with previous
              setSRow((prev) => prev + newRecords.length);
            } else {
              setIsLoading(false);
              setRateReportColumns(columns);
              setRateReportTblData(newRecords); // other wise append the new records only
              setSRow(newRecords.length);
              setTotalRecord(totalCount);
            }
          } else if (GetForwardRateInputData === null) {
            if (!isLoading) {
              setIsLoading(false);
              setTotalRecord(0);
              setSRow(0);
              setRateReportTblData([]);
            }
          }
        } catch (error) {
          setIsLoading(false);
          console.error("Error building table:", error);
        }
      }
    } else if (GetForwardRateInputData === null) {
      if (!isLoading) {
        setIsLoading(false);
        setTotalRecord(0);
        setSRow(0);
        setRateReportTblData([]);
      }
    }
  }, [GetForwardRateInputData, GetAllTenors]);

  //Toggle Functino to view Export Icons
  const toggleExportOptions = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

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
  const handleExport = useCallback((format) => {
    if (format === "excel") {
      exportToExcel();
    } else if (format === "pdf") {
      exportToPDF();
    }
  }, []);

  //Export to PDF Trigger Function
  const exportToExcel = useCallback(() => {
    const { StartDate, EndDate } = formatDateForPayload(
      formData.dateFrom.value,
      formData.dateTo.value
    );

    const Data = {
      EmployeeID: formData.employeeId || "",
      EmployeeName: formData.employeeName || "",
      StartDate,
      EndDate,
    };

    dispatch(DownloadForwardRateInputExcelReportAPI({ navigate, Data }));
  }, [
    formData.employeeId,
    formData.employeeName,
    formData.dateFrom.value,
    formData.dateTo.value,
    dispatch,
    navigate,
  ]);

  //Export to Excel Trigger Function
  const exportToPDF = useCallback(() => {
    const { StartDate, EndDate } = formatDateForPayload(
      formData.dateFrom.value,
      formData.dateTo.value
    );

    const Data = {
      EmployeeID: formData.employeeId || "",
      EmployeeName: formData.employeeName || "",
      StartDate,
      EndDate,
    };

    dispatch(DownloadForwardRateInputReportPDFAPI({ navigate, Data }));
  }, [
    formData.employeeId,
    formData.employeeName,
    formData.dateFrom.value,
    formData.dateTo.value,
    dispatch,
    navigate,
  ]);
  //Common OnChange for textFields
  const handleTextChange = useCallback((e) => {
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
  }, []);

  //new date work
  // Function to handle date range selection
  const handleDateRangeChange = useCallback((selectedOption) => {
    setSelectedDateRange(selectedOption);

    if (selectedOption.value === 5) {
      setShowCustomDatePicker(true);
      return;
    }

    setShowCustomDatePicker(false);

    const today = new Date();
    const fromDate = new Date();

    switch (selectedOption.value) {
      case 1:
        fromDate.setMonth(today.getMonth() - 1);
        break;
      case 2:
        fromDate.setMonth(today.getMonth() - 3);
        break;
      case 3:
        fromDate.setMonth(today.getMonth() - 6);
        break;
      case 4:
        fromDate.setMonth(today.getMonth() - 12);
        break;
      default:
        fromDate.setMonth(today.getMonth() - 1);
    }

    // Format dates for display
    const fromDateStr = moment(fromDate).format("DD-MM-YYYY");
    const toDateStr = moment(today).format("DD-MM-YYYY");

    let displayLabel = `${fromDateStr} to ${toDateStr}`;

    // Update the tradeCount state with new dates
    setFormData((prev) => ({
      ...prev,
      dateFrom: {
        ...prev.dateFrom,
        value: fromDate,
      },
      dateTo: {
        ...prev.dateTo,
        value: today,
      },
    }));

    // Update selected option with date range in label
    setSelectedDateRange({
      ...selectedOption,
      label: displayLabel,
    });
  }, []);
  //Handle Date Change method
  const handleDateChange = useCallback(
    (fieldName, value) => {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          value,
          errorMessage: "",
          errorStatus: false,
        },
      }));

      // Example validation: Start Date should be before End Date
      if (
        fieldName === "dateFrom" &&
        formData.dateTo.value &&
        new Date(value) > new Date(formData.dateTo.value)
      ) {
        setFormData((prev) => ({
          ...prev,
          dateFrom: {
            ...prev.dateFrom,
            errorMessage: "Start date cannot be after end date.",
            errorStatus: true,
          },
        }));
      }
    },
    [formData.dateTo.value]
  );

  //Handle Search Button
  const handleSearchBtn = () => {
    const { StartDate, EndDate } = formatDateForPayload(
      formData.dateFrom.value,
      formData.dateTo.value
    );

    const Data = {
      EmployeeID: formData.employeeId || "",
      EmployeeName: formData.employeeName || "",
      StartDate,
      EndDate,
      Length: dropdownvalue,
      sRow: 0,
    };

    dispatch(GetForwardRateInputDataAPI({ navigate, Data }));
    setIsSearch(true);
  };

  //Handle Reset Button
  const handleResetBtn = useCallback(() => {
    setIsSearch(false);
    setShowCustomDatePicker(false);
    setFormData({
      employeeName: "",
      employeeId: "",
      dateFrom: {
        value: "",
        errorMessage: "",
        errorStatus: false,
      },
      dateTo: {
        value: "",
        errorMessage: "",
        errorStatus: false,
      },
    });
    setSelectedDateRange(null);
    setRateReportTblData([]);
    setSRow(0);
    setIsLoading(false);
    setTotalRecord(0);
    let Data = {
      EmployeeName: "",
      EmployeeID: "",
      StartDate: "",
      EndDate: "",
      Length: dropdownvalue,
      sRow: 0,
    };
    dispatch(GetForwardRateInputDataAPI({ navigate, Data }));
  }, [dropdownvalue, dispatch, navigate, setIsSearch]);

  //Scroller Custom Hook
  useTableScrollBottomByClassName(
    () => {
      if (rateReportTblData.length !== totalRecord) {
        setIsLoading(true);
        if (isSearch) {
          const { StartDate, EndDate } = formatDateForPayload(
            formData.dateFrom.value,
            formData.dateTo.value
          );
          const Data = {
            EmployeeID:
              formData.employeeId && isSearch ? formData.employeeId : "",
            EmployeeName:
              formData.employeeName && isSearch ? formData.employeeName : "",
            StartDate: StartDate && isSearch ? StartDate : "",
            EndDate: EndDate && isSearch ? EndDate : "",
            Length: dropdownvalue,
            sRow: sRow,
          };
          dispatch(GetForwardRateInputDataAPI({ navigate, Data }));
        } else if (isSearch === false) {
          const Data = {
            EmployeeID: "",
            EmployeeName: "",
            StartDate: "",
            EndDate: "",
            Length: dropdownvalue,
            sRow: sRow,
          };
          dispatch(GetForwardRateInputDataAPI({ navigate, Data }));
        }
      }
    },
    0,
    "RateInputForward-table"
  );

  return (
    <>
      <CustomPaper variant="outlined">
        <Row>
          <Col lg={3} md={12} sm={12}>
            <SelectDropdown
              styles={{
                placeholder: (base) => ({
                  ...base,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }),
              }}
              placeholder="Select Date Range"
              classNamePrefix="dropdownBranchSpotTreasury"
              options={dateRangeOptions}
              value={selectedDateRange}
              isSearchable={true}
              isClearable={false}
              onChange={handleDateRangeChange}
              menuPortalTarget={document.body}
            />
          </Col>
          <Col lg={2} md={2} sm={2} xs={12}>
            <TextField
              name="employeeName"
              placeholder="Employee Name"
              value={formData.employeeName}
              onChange={handleTextChange}
              applyClass="TextFieldAuditors"
              maxLength={50}
            />
          </Col>
          <Col lg={2} md={2} sm={2} xs={12}>
            <TextField
              name="employeeId"
              placeholder="Employee ID"
              value={formData.employeeId}
              onChange={handleTextChange}
              applyClass="TextFieldAuditors"
              maxLength={15}
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
        <Row className="mt-2">
          <Col
            lg={3}
            md={12}
            sm={12}
            className={`d-flex align-items-center pe-4 ${
              showCustomDatePicker ? "visible" : "invisible"
            }`}
          >
            <DatePicker
              name="dateFrom"
              value={formData.dateFrom.value}
              placeholder="Start date"
              showOtherDays="true"
              inputClass={styles["Tradecount-Datepicker-left"]}
              onChange={(date) => handleDateChange("dateFrom", date)}
              maxDate={formData.dateTo.value}
              minDate={null}
              editable={false}
            />
            <label className={styles["Tradecount-date-to"]}>to</label>
            <DatePicker
              name="dateTo"
              value={formData.dateTo.value}
              placeholder="End Date"
              showOtherDays="true"
              inputClass={styles["Tradecount-Datepicker-right"]}
              onChange={(date) => handleDateChange("dateTo", date)}
              minDate={formData.dateFrom.value}
              maxDate={new Date(new Date().setHours(23, 59, 59, 999))}
              editable={false}
            />
          </Col>
        </Row>
        <Row className="">
          <Col lg={12} md={12} sm={12}>
            <ExportShowComponent
              value={dropdownvalue}
              onChange={handlePageSizeChange}
            />
          </Col>
        </Row>
        <Row className="">
          <Col lg={12} md={12} sm={12} xs={12}>
            <CustomTable
              column={rateReportColumns}
              rows={rateReportTblData}
              pagination={false}
              rowKey={(data, index) => index}
              scroll={{ x: "max-content", y: "30vh" }}
              className={"RateInputForward-table"}
            />
          </Col>
        </Row>
      </CustomPaper>
    </>
  );
};

export default Forwards;
