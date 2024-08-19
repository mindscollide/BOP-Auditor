const _token = localStorage.getItem("token");

const authenticationLogIn = {
  _token: null,
  RequestMethod: "ServiceManager.Login",
};

const authenticationSignUp = {
  _token: null,
  RequestMethod: "ServiceManager.SignUp",
};

//Referesh Token
const authenticationRefreshToken = {
  RequestMethod: "ServiceManager.RefreshToken",
};

// js auditor searching criteria Api which is Search Transaction details in Trade Count page
const searchTransactionTradeCount = {
  RequestMethod: "ServiceManager.SearchTransactionDetails",
};

// get allCorporate Categories for dropdown in ERM Auth
const getAllCorporateCategoriesERM = {
  RequestMethod: "ServiceManager.GetAllCorporateCategories",
};

// get all Corporate Name By Bank ID company dropdown
const getCorporateNameApi = {
  RequestMethod: "ServiceManager.GetAllCorporateNameByBankID",
};

// get all audit action api in dropdown for action by
const getAuditActionApi = {
  RequestMethod: "ServiceManager.GetAllAuditActions",
};

// user Audit Activity Download Report
const userAuditReport = {
  RequestMethod: "ServiceManager.UserAuditActivityReport",
};

// Security admin Audit Activity Download Report
const securityAuditReport = {
  RequestMethod: "SecurityAdminAuditActivityReport",
};

// Trade count download Excel Report Api
const tradeCountReport = {
  RequestMethod: "DownloadTradeCountReport",
};

export {
  authenticationLogIn,
  authenticationSignUp,
  searchTransactionTradeCount,
  authenticationRefreshToken,
  getAllCorporateCategoriesERM,
  getCorporateNameApi,
  getAuditActionApi,
  userAuditReport,
  securityAuditReport,
  tradeCountReport,
};
