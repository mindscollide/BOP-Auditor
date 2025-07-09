import { createAsyncThunk } from "@reduxjs/toolkit";
import createPostAPI from "../../Common/GenericPostMethod";
import { auditorApi } from "../../Common/API_EndPoints";
import { refreshTokenAction } from "../../container/Pages/Login/logInAction";
import {
  AuditTrialByBank,
  AuditTrialByCorporate,
} from "../../Common/API_Config";

export const GetTransactionDetailsByBankAuditor = createAsyncThunk(
  "Auditor/GetTransactionDetailsByBankAuditor",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const getTransactionData = createPostAPI(
        auditorApi,
        AuditTrialByBank.RequestMethod
      );

      const response = await getTransactionData(Data);
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
              "Blotter_BlotterServiceManager_GetTransactionDetailsByBankData_01"
            )
          ) {
            console.log(
              response.data.responseResult,
              "responseResultresponseResult"
            );
            return {
              response: response.data.responseResult,
              message: "Data Available",
            };
          } else if (
            msg.includes(
              "Blotter_BlotterServiceManager_GetTransactionDetailsByBankData_02"
            )
          ) {
            return rejectWithValue("No Data Available");
          } else if (
            msg.includes(
              "Blotter_BlotterServiceManager_GetTransactionDetailsByBankData_03"
            )
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

export const GetTransactionDetailsByCorporateAuditor = createAsyncThunk(
  "Auditor/GetTransactionDetailsByCorporateAuditor",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const getTransactionData = createPostAPI(
        auditorApi,
        AuditTrialByCorporate.RequestMethod
      );

      const response = await getTransactionData(Data);
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
              "Blotter_BlotterServiceManager_GetTransactionDetailsByCorporateData_01"
            )
          ) {
            console.log(
              response.data.responseResult,
              "responseResultresponseResult"
            );
            return {
              response: response.data.responseResult,
              message: "Data Available",
            };
          } else if (
            msg.includes(
              "Blotter_BlotterServiceManager_GetTransactionDetailsByCorporateData_02"
            )
          ) {
            return rejectWithValue("No Data Available");
          } else if (
            msg.includes(
              "Blotter_BlotterServiceManager_GetTransactionDetailsByCorporateData_03"
            )
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
