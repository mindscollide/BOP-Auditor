const baseURL = "http://192.168.18.241";

const authPort = ":13000/ERM_Auth";

const ReportPort = ":13006/ExcelReport";

const AuditorPort = ":13002/Auditor";

const authApi = `${baseURL}${authPort}`;

const reportApi = `${baseURL}${ReportPort}`;

const auditorApi = `${baseURL}${AuditorPort}`;
//const auditorApi = "https://localhost:44322/Auditor";

export { authApi, reportApi, auditorApi };
