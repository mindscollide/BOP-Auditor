import React, { Fragment, useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Notification,
  Table,
  Paper,
  Loader,
} from "../../../components/elements";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import moment from "moment";
import DatePicker from "react-multi-date-picker";
import "./Audittrial.css";

const AuditTrial = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // state for disable the previous date from end date by selecting date from start date
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // state for action by drop down
  const [actionBy, setActionBy] = useState([]);
  const [actionByValue, setActionByValue] = useState([]);

  // states for textfiels in audit trial
  const [auditTrialFields, setAuditTrialFields] = useState({
    firstName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    lastName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    actionBy: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },

    startDate: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    endDate: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    BankID: {
      value: 1,
      errorMessage: "",
      errorStatus: false,
    },
  });

  // validation for textfields in audit action
  const userAuditTrialValidation = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "firstName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setAuditTrialFields({
          ...auditTrialFields,
          firstName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "firstName" && value === "") {
      setAuditTrialFields({
        ...auditTrialFields,
        firstName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "lastName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setAuditTrialFields({
          ...auditTrialFields,
          lastName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "lastName" && value === "") {
      setAuditTrialFields({
        ...auditTrialFields,
        lastName: { value: "", errorMessage: "", errorStatus: false },
      });
    }
  };

  //start date state of multi datepicker
  const dateStartChangeHandler = (date) => {
    setStartDate(date);
    setEndDate(null);
    let newDate = moment(date).format("YYYY-MM-DD");
    setAuditTrialFields({
      ...auditTrialFields,
      startDate: {
        value: newDate,
      },
    });
    console.log(newDate, "dateStartChangeHandler");
  };

  //end date state of multi datepicker
  const dateEndChangeHandler = (date) => {
    setEndDate(date);
    let newEndDate = moment(date).format("YYYY-MM-DD");
    setAuditTrialFields({
      ...auditTrialFields,
      endDate: {
        value: newEndDate,
      },
    });
  };

  // reset handler
  const resetHandler = () => {
    setAuditTrialFields({
      ...auditTrialFields,
      firstName: {
        value: "",
      },
      lastName: {
        value: "",
      },

      actionBy: {
        value: 0,
      },

      startDate: {
        value: "",
      },

      endDate: {
        value: "",
      },
    });
    setActionByValue([]);
  };

  return (
    <Fragment>
      <section className="edit-user-container">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <label className="edit-user-label">Audit Trial</label>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="span-edit-user">
              <Row className="mt-2">
                <Col lg={3} md={6} sm={12} className="p-1">
                  <TextField
                    name="firstName"
                    value={auditTrialFields.firstName.value}
                    className="text-fields-edituser"
                    placeholder="First Name"
                    onChange={userAuditTrialValidation}
                    labelClass="d-none"
                  />
                </Col>

                <Col lg={3} md={6} sm={12} className="p-1">
                  <TextField
                    name="lastName"
                    value={auditTrialFields.lastName.value}
                    className="text-fields-edituser"
                    onChange={userAuditTrialValidation}
                    placeholder="Last Name"
                    labelClass="d-none"
                  />
                </Col>

                <Col lg={3} md={6} sm={12} className="p-1">
                  <Select
                    name="actionBy"
                    options={actionBy}
                    isSearchable={true}
                    value={actionByValue}
                    className="slect-audit-trial"
                    placeholder="Action By"
                  />
                </Col>

                <Col
                  lg={3}
                  md={6}
                  sm={12}
                  className="AuditTrial-Datepicker p-1"
                >
                  <DatePicker
                    selected={startDate}
                    highlightToday={true}
                    onOpenPickNewDate={false}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    autoComplete="off"
                    value={auditTrialFields.startDate.value}
                    onChange={(value) =>
                      dateStartChangeHandler(value?.toDate?.().toString())
                    }
                    showOtherDays={true}
                    inputClass="Audit-Datepicker-left"
                    placeholder="Start Date"
                  />

                  <label className="date-to">to</label>
                  <DatePicker
                    selected={endDate}
                    highlightToday={true}
                    onOpenPickNewDate={false}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={
                      startDate
                        ? moment(startDate).add(1, "days").toDate()
                        : null
                    }
                    autoComplete="off"
                    value={auditTrialFields.endDate.value}
                    onChange={(value) =>
                      dateEndChangeHandler(value?.toDate?.().toString())
                    }
                    showOtherDays={true}
                    inputClass="Audit-Datepicker-right"
                    placeholder="End Date"
                  />
                </Col>
              </Row>

              <Row className="mt-3">
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex justify-content-center"
                >
                  <Button
                    icon={<i className="icon-refresh icon-reset-space"></i>}
                    text="Reset"
                    onClick={resetHandler}
                    className="reset-btn"
                  />
                </Col>
              </Row>

              <Row className="mt-5">
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex justify-content-center mt-3"
                >
                  <Button
                    icon={<i className="icon-download download-btn-icons"></i>}
                    text="Download To Excel"
                    className="download-to-excel-btn"
                  />
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
      </section>
    </Fragment>
  );
};

export default AuditTrial;
