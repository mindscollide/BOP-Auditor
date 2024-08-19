import * as actions from "../action_types";
import axios from "axios";
import { getCorporateNameApi } from "../../common/apis/Api_config";
import { RefreshToken } from "./Auth-Actions";
import { SystemAdminApi } from "../../common/apis/Api_ends_points";

// get all corporate Name By Bank ID
const corporateBankIdInit = () => {
  return {
    type: actions.GET_ALL_CORPORATE_NAME_BY_BANK_INIT,
  };
};

const corporateBankIdSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_CORPORATE_NAME_BY_BANK_SUCCESS,
    response: response,
    message: message,
  };
};

const corporateBankIdFail = (message) => {
  return {
    type: actions.GET_ALL_CORPORATE_NAME_BY_BANK_FAIL,
    message: message,
  };
};

const corporateNameByBankId = (navigate, corporateBank) => {
  let token = localStorage.getItem("token");

  return async (dispatch) => {
    dispatch(corporateBankIdInit());
    let form = new FormData();
    form.append("RequestMethod", getCorporateNameApi.RequestMethod);
    form.append("RequestData", JSON.stringify(corporateBank));
    await axios({
      method: "post",
      url: SystemAdminApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(corporateNameByBankId(navigate, corporateBank));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporateNameByBankID_01".toLowerCase()
                )
            ) {
              dispatch(
                corporateBankIdSuccess(
                  response.data.responseResult.corporateNames,
                  "Record Found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporateNameByBankID_02".toLowerCase()
                )
            ) {
              dispatch(corporateBankIdFail("No Record found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporateNameByBankID_03".toLowerCase()
                )
            ) {
              dispatch(corporateBankIdFail("Exception Something went wrong"));
            }
          } else {
            dispatch(corporateBankIdFail("Something went wrong"));
          }
        } else {
          dispatch(corporateBankIdFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(corporateBankIdFail("Something went wrong"));
      });
  };
};

export { corporateNameByBankId };
