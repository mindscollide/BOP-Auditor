import { createAsyncThunk } from "@reduxjs/toolkit";
import createPostAPI from "../../Common/GenericPostMethod";
import { auditorApi } from "../../Common/API_EndPoints";
import { refreshTokenAction } from "../../container/Pages/Login/logInAction";
import {
  GetFEDiscountingRateInputData,
  GetForwardRateInputData,
  GetNonFEDiscountingRateInputData,
  GetSpotRateInputData,
} from "../../Common/API_Config";

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

export const GetForwardRateInputDataAPI = createAsyncThunk(
  "Auditor/GetForwardRateInputData",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const GetForwardRateInputDataRes = createPostAPI(
        auditorApi,
        GetForwardRateInputData.RequestMethod
      );

      const response = await GetForwardRateInputDataRes(Data);
      const { responseCode } = response.data;

      // if (responseCode === 401) {
      //   navigate("/");
      //   return rejectWithValue("Unauthorized access, please login again");
      // }

      // if (responseCode === 417) {
      //   await dispatch(refreshTokenAction({ navigate }));
      // }

      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;

        if (isExecuted) {
          const msg = responseMessage;

          if (
            msg.includes(
              "Auditor_AuditorServiceManager_GetForwardRateInputData_01"
            )
          ) {
            return {
              response: response.data.responseResult,
              message: "",
            };
          } else if (
            msg.includes(
              "Auditor_AuditorServiceManager_GetForwardRateInputData_02"
            )
          ) {
            return rejectWithValue("No Record Found");
          } else if (
            msg.includes(
              "Auditor_AuditorServiceManager_GetForwardRateInputData_03"
            )
          ) {
            return rejectWithValue("Exception has been occurred.");
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

export const GetFEDiscountingRateInputDataAPI = createAsyncThunk(
  "Auditor/GetFEDiscountingRateInputData",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const GetFEDiscountingRateInputDataRes = createPostAPI(
        auditorApi,
        GetFEDiscountingRateInputData.RequestMethod
      );

      const response = await GetFEDiscountingRateInputDataRes(Data);
      const { responseCode } = response.data;

      // if (responseCode === 401) {
      //   navigate("/");
      //   return rejectWithValue("Unauthorized access, please login again");
      // }

      // if (responseCode === 417) {
      //   await dispatch(refreshTokenAction({ navigate }));
      // }

      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;

        if (isExecuted) {
          const msg = responseMessage;

          if (
            msg.includes(
              "Auditor_AuditorServiceManager_GetFeDiscountingRateInputData_01"
            )
          ) {
            return {
              response: response.data.responseResult,
              message: "",
            };
          } else if (
            msg.includes(
              "Auditor_AuditorServiceManager_GetFeDiscountingRateInputData_02"
            )
          ) {
            return rejectWithValue("No Record Found");
          } else if (
            msg.includes(
              "Auditor_AuditorServiceManager_GetFeDiscountingRateInputData_03"
            )
          ) {
            return rejectWithValue("Exception has been occurred.");
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

export const GetNonFEDiscountingRateInputDataAPI = createAsyncThunk(
  "Auditor/GetNonFEDiscountingRateInputData",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const GetNonFEDiscountingRateInputDataRes = createPostAPI(
        auditorApi,
        GetNonFEDiscountingRateInputData.RequestMethod
      );

      const response = await GetNonFEDiscountingRateInputDataRes(Data);
      const { responseCode } = response.data;

      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;

        if (isExecuted) {
          const msg = responseMessage;

          if (
            msg.includes(
              "Auditor_AuditorServiceManager_GetNonFeDiscountingRateInputData_01"
            )
          ) {
            return {
              response: response.data.responseResult,
              message: "",
            };
          } else if (
            msg.includes(
              "Auditor_AuditorServiceManager_GetNonFeDiscountingRateInputData_02"
            )
          ) {
            return rejectWithValue("No Record Found");
          } else if (
            msg.includes(
              "Auditor_AuditorServiceManager_GetNonFeDiscountingRateInputData_03"
            )
          ) {
            return rejectWithValue("Exception has been occurred.");
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
