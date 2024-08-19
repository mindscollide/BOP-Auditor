import * as actions from "../action_types";
import axios from "axios";
import {
  userAuditReport,
  securityAuditReport,
  tradeCountReport,
} from "../../common/apis/Api_config";
import { RefreshToken } from "./Auth-Actions";
import { ReportApi } from "../../common/apis/Api_ends_points";

const downloadAuditUserInit = () => {
  return {
    type: actions.DOWNLOAD_EXCEL_AUDIT_TRIAL_INIT,
  };
};

// for Download Report Loader
const loaderReport = (response) => {
  return {
    type: actions.DOWNLOAD_REPORT_INIT,
    action: response,
  };
};

// For Download Report Something Went wrong
const SomeThingWentWrong = (response) => {
  return {
    type: actions.SOME_THING_WENT_WRONG,
    action: response,
  };
};

const downloadAuditTrialReport = (reportAudit) => {
  let token = localStorage.getItem("token");
  let form = new FormData();
  form.append("RequestMethod", userAuditReport.RequestMethod);
  form.append("RequestData", JSON.stringify(reportAudit));
  return (dispatch) => {
    console.log("downloadCorporateLoginReports");
    dispatch(downloadAuditUserInit());
    axios({
      method: "post",
      url: ReportApi,
      data: form,
      headers: {
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        console.log("ReportApiReportApi", response);

        if (response.status === 417) {
          await dispatch(RefreshToken());
          dispatch(downloadAuditTrialReport(reportAudit));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          console.log("downloadAuditTrialReport", url);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            "download-corporate-login-reports.xlsx"
          );
          document.body.appendChild(link);
          link.click();

          dispatch(loaderReport(false));
        }
      })
      .catch((response) => {
        console.log("downloadAuditTrialReport", response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

// FOR DOWNLOAD SECURITY EXCEL FILE
const downloadSecurityFileInit = () => {
  return {
    type: actions.DOWNLOAD_SECURITY_EXCEL_INIT,
  };
};

const downloadSecurityReport = (reportSecurtiy) => {
  let token = localStorage.getItem("token");
  let form = new FormData();
  form.append("RequestMethod", securityAuditReport.RequestMethod);
  form.append("RequestData", JSON.stringify(reportSecurtiy));
  return (dispatch) => {
    console.log("downloadCorporateLoginReports");
    dispatch(downloadSecurityFileInit());
    axios({
      method: "post",
      url: ReportApi,
      data: form,
      headers: {
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        console.log("ReportApiReportApi", response);

        if (response.status === 417) {
          await dispatch(RefreshToken());
          dispatch(downloadSecurityReport(reportSecurtiy));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          console.log("downloadSecurityReport", url);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            "download-corporate-login-reports.xlsx"
          );
          document.body.appendChild(link);
          link.click();

          dispatch(loaderReport(false));
        }
      })
      .catch((response) => {
        console.log("downloadSecurityReportwewe", response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

// for download Trade Count Excel file
const downloadTradeCountInit = () => {
  return {
    type: actions.DOWNLOAD_TRADE_COUNT_EXCEL_INIT,
  };
};

const downloadTradeCountReport = (reportTrade) => {
  let token = localStorage.getItem("token");
  let form = new FormData();
  form.append("RequestMethod", tradeCountReport.RequestMethod);
  form.append("RequestData", JSON.stringify(reportTrade));
  return (dispatch) => {
    console.log("downloadTradeCountInit");
    dispatch(downloadTradeCountInit());
    axios({
      method: "post",
      url: ReportApi,
      data: form,
      headers: {
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        console.log("ReportApiReportApi", response);

        if (response.status === 417) {
          await dispatch(RefreshToken());
          dispatch(downloadTradeCountReport(reportTrade));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          console.log("downloadSecurityReport", url);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            "download-corporate-login-reports.xlsx"
          );
          document.body.appendChild(link);
          link.click();

          dispatch(loaderReport(false));
        }
      })
      .catch((response) => {
        console.log("downloadTradeCountReporteerrrr", response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

export {
  downloadAuditTrialReport,
  downloadSecurityReport,
  downloadTradeCountReport,
};
