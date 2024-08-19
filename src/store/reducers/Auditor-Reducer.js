import * as actions from "../action_types";

const initialState = {
  UserDetails: null,
  Loading: false,
  Spinner: false,
  ResponseMessage: "",
  SessionExpeireResponseMessage: "",
  Token: "",
  Refresh: "",
  getSearchTransactionDetails: [],
};

const auditorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SEARCH_GET_TRANSACTION_DETAILS_INIT:
      return { ...state, Spinner: true, Loading: true };

    case actions.SEARCH_GET_TRANSACTION_DETAILS_SUCCESS:
      return {
        ...state,
        Spinner: false,
        Loading: false,
        getSearchTransactionDetails: action.response,
        ResponseMessage: action.message,
      };

    case actions.SEARCH_GET_TRANSACTION_DETAILS_FAIL:
      return {
        ...state,
        Spinner: false,
        Loading: false,
        getSearchTransactionDetails: [],
        ResponseMessage: action.message,
      };

    default:
      return { ...state };
  }
};

export default auditorReducer;
