import * as actions from "../action_types";

const initialState = {
  Loading: false,
  ResponseMessage: "",
  SessionExpeireResponseMessage: "",
  Token: "",
  Refresh: "",
};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.DOWNLOAD_EXCEL_AUDIT_TRIAL_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.DOWNLOAD_SECURITY_EXCEL_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.DOWNLOAD_TRADE_COUNT_EXCEL_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.DOWNLOAD_REPORT_INIT:
      return {
        ...state,
        Loading: false,
      };

    default:
      return { ...state };
  }
};

export default reportReducer;
