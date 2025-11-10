import { createAsyncThunk } from "@reduxjs/toolkit";
import createPostAPI from "../../Common/GenericPostMethod";
import { auditorApi } from "../../Common/API_EndPoints";
import { refreshTokenAction } from "../../container/Pages/Login/logInAction";
import { GetSpotRateInputData } from "../../Common/API_Config";

export const GetSpotRateInputDataAPI = createAsyncThunk(
  "Auditor/GetSpotRateInputData",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const GetSpotRateInputDataRes = createPostAPI(
        auditorApi,
        GetSpotRateInputData.RequestMethod
      );

      const response = await GetSpotRateInputDataRes(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access, please login again");
      }

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
      }

      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;

        if (isExecuted) {
          const msg = responseMessage;

          if (
            msg.includes(
              "Auditor_AuditorServiceManager_GetSpotRateInputData_01"
            )
          ) {
            return {
              response: response.data.responseResult,
              message: "",
            };
          } else if (
            msg.includes(
              "Auditor_AuditorServiceManager_GetSpotRateInputData_02"
            )
          ) {
            return rejectWithValue("No Record Found");
          } else if (
            msg.includes(
              "Auditor_AuditorServiceManager_GetSpotRateInputData_03"
            )
          ) {
            return rejectWithValue("Exception has been occurred.");
          } else if (
            msg.includes("ERM_AuthService_CommonManager_GetAllTenors_04")
          ) {
            return rejectWithValue("Something went wrong");
          } else {
            console.log("Unexpected message:", responseMessage);
            return rejectWithValue("Unexpected response received");
          }
        } else {
          console.log("isExecuted is false:", response.data);
          return rejectWithValue("Something went wrong");
        }
      } else {
        console.log("Unhandled response code:", response.data);
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      console.log("Catch Error:", error);
      return rejectWithValue("Something went wrong");
    }
  }
);
