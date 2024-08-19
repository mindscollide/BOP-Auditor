import * as actions from "../action_types";

const initialState = {
  UserDetails: null,
  isLoggedIn: false,
  Loading: false,
  ResponseMessage: "",
  isSignUp: false,
  SessionExpeireResponseMessage: "",
  getAllCategoryCorporate: [],
  getAuditActions: [],
  roles: null,
  RoleList: [],
  Token: "",
  Refresh: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOG_IN_INIT:
      return { ...state, Loading: true };

    case actions.LOG_IN_SUCCESS:
      return {
        ...state,
        UserDetails: action.response,
        ResponseMessage: action.message,
        Loading: false,
        Token: action.response.token,
        Refresh: action.response.refreshToken,
      };

    case actions.LOG_IN_FAIL:
      return {
        ...state,
        UserDetails: action.response,
        ResponseMessage: action.message,
        Loading: false,
        Token: "",
        Refresh: "",
      };

    case actions.SIGN_UP_INIT:
      return { ...state, Loading: true };

    case actions.SIGN_UP_SUCCESS:
      return {
        ...state,
        Loading: false,
        isLoggedIn: true,
        ResponseMessage: action.message,
      };

    case actions.SIGN_UP_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATES_CATEGORY_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_ALL_CORPORATES_CATEGORY_SUCCESS:
      console.log(action, "GET_ALL_CORPORATES_CATEGORY_SUCCESS");
      return {
        ...state,
        Loading: false,
        getAllCategoryCorporate: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATES_CATEGORY_FAIL:
      return {
        ...state,
        Loading: false,
        getAllCategoryCorporate: [],
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_AUDIT_ACTION_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_ALL_AUDIT_ACTION_SUCCESS:
      console.log(action, "GET_ALL_CORPORATES_CATEGORY_SUCCESS");
      return {
        ...state,
        Loading: false,
        getAuditActions: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_AUDIT_ACTION_FAIL:
      return {
        ...state,
        Loading: false,
        getAuditActions: [],
        ResponseMessage: action.message,
      };

    case actions.SIGN_OUT:
      localStorage.clear();
      return {
        ...state,
        UserDetails: null,
        isLoggedIn: false,
        Loading: false,
        Token: "",
        Refresh: "",
        SessionExpeireResponseMessage: action.message,
      };

    // case actions.ROLE_LIST_INIT:
    //   return {
    //     ...state,
    //     Loading: true,
    //   };

    // case actions.ROLE_LIST_SUCCESS:
    //   return {
    //     ...state,
    //     Loading: false,
    //     RoleList: action.response,
    //     ResponseMessage: action.response,
    //   };

    // case actions.ROLE_LIST_FAIL:
    //   return {
    //     ...state,
    //     Loading: false,
    //     RoleList: [],
    //     ResponseMessage: action.response,
    //   };

    default:
      return { ...state };
  }
};

export default authReducer;
