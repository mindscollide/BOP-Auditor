import * as actions from "../action_types";

const initialState = {
  Loading: false,
  Spinner: false,
  ResponseMessage: "",
  corporateNameByBankId: [],
};

const systemReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ALL_CORPORATE_NAME_BY_BANK_INIT:
      return {
        ...state,
        Loading: true,
        Spinner: true,
      };

    case actions.GET_ALL_CORPORATE_NAME_BY_BANK_SUCCESS:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        corporateNameByBankId: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATE_NAME_BY_BANK_FAIL:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        corporateNameByBankId: [],
        ResponseMessage: action.message,
      };

    default:
      return { ...state };
  }
};

export default systemReducer;
