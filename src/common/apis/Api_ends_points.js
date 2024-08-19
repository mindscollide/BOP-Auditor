// our base url or machine api
const baseURL = "http://192.168.18.241";

// our service URLs
const authenticationURL = ":12000/ERM_Auth";
const jsAuditor = ":12006/Auditor";
const SystemAdminPort = ":12003/SystemAdmin";
const reportPort = ":12004/ExcelReport";

//our Final Api
const authenticationAPI = baseURL + authenticationURL;
const auditorAPI = baseURL + jsAuditor;
const SystemAdminApi = baseURL + SystemAdminPort;
const ReportApi = baseURL + reportPort;

export { authenticationAPI, auditorAPI, SystemAdminApi, ReportApi };
