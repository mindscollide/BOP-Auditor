const baseURL = "http://192.168.18.241";

const authPort = ":13000/ERM_Auth";

const ReportPort = ":13006/ExcelReport";

const AuditorPort = ":13002/Auditor";

const settingsPort = ":13008/Setting";

const authApi = `${baseURL}${authPort}`;
// const authApi = "https://localhost:44323/ERM_Auth";

const reportApi = `${baseURL}${ReportPort}`;

const auditorApi = `${baseURL}${AuditorPort}`;
//const auditorApi = "https://localhost:44322/Auditor";

const settingsApi = `${baseURL}${settingsPort}`;

export { authApi, reportApi, auditorApi, settingsApi };
