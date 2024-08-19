import * as actions from "../action_types";
import axios from "axios";
import { searchTransactionTradeCount } from "../../common/apis/Api_config";
import { RefreshToken } from "./Auth-Actions";
import { auditorAPI } from "../../common/apis/Api_ends_points";

const tradeCountSearchGetInit = () => {
  return {
    type: actions.SEARCH_GET_TRANSACTION_DETAILS_INIT,
  };
};

const tradeCountSearchGetSuccess = (response, message) => {
  return {
    type: actions.SEARCH_GET_TRANSACTION_DETAILS_SUCCESS,
    response: response,
    message: message,
  };
};

const tradeCountSearchGetFail = (message) => {
  return {
    type: actions.SEARCH_GET_TRANSACTION_DETAILS_FAIL,
    message: message,
  };
};

const tradeCountSearchGetApi = (navigate, newData) => {
  let token = localStorage.getItem("token");

  return async (dispatch) => {
    dispatch(tradeCountSearchGetInit());
    let form = new FormData();
    form.append("RequestMethod", searchTransactionTradeCount.RequestMethod);
    form.append("RequestData", JSON.stringify(newData));
    await axios({
      method: "post",
      url: auditorAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(tradeCountSearchGetApi(navigate, newData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "Auditor_AuditorManager_SearchTransactionDetails_01".toLowerCase()
                )
            ) {
              dispatch(
                tradeCountSearchGetSuccess(
                  response.data.responseResult.transactionDetails,
                  "Record Found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "Auditor_AuditorManager_SearchTransactionDetails_02".toLowerCase()
                )
            ) {
              dispatch(tradeCountSearchGetFail("No Record found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "Auditor_AuditorManager_SearchTransactionDetails_03".toLowerCase()
                )
            ) {
              dispatch(tradeCountSearchGetFail("Invalid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "Auditor_AuditorManager_SearchTransactionDetails_04".toLowerCase()
                )
            ) {
              dispatch(tradeCountSearchGetFail("Exception No Record Found"));
            }
          } else {
            dispatch(tradeCountSearchGetFail("Something went wrong"));
          }
        } else {
          dispatch(tradeCountSearchGetFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(tradeCountSearchGetFail("Something went wrong"));
      });
  };
};

export { tradeCountSearchGetApi };
