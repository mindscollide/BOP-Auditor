import { createAsyncThunk } from "@reduxjs/toolkit";
import createPostAPI from "../../Common/GenericPostMethod";
import { refreshTokenAction } from "../../container/Pages/Login/logInAction";
import { settingsApi } from "../../Common/API_EndPoints";
import { GetUserSettings, UpdateUserSettings } from "../../Common/API_Config";

//Get User Settings API
export const GetUserSettingsAuditorAPI = createAsyncThunk(
  "Settings/GetUserSettingsAuditorAPI",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const getTransactionData = createPostAPI(
        settingsApi,
        GetUserSettings.RequestMethod
      );

      const response = await getTransactionData(Data);
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
            msg.includes("Setting_SettingServiceManager_GetUserSettings_01")
          ) {
            return {
              response: response.data.responseResult,
              message: "",
            };
          } else if (
            msg.includes("Setting_SettingServiceManager_GetUserSettings_02")
          ) {
            return rejectWithValue("No Data Available");
          } else if (
            msg.includes("Setting_SettingServiceManager_GetUserSettings_03")
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

//Save User Settings API
export const SaveUserSettingsAuditorAPI = createAsyncThunk(
  "Settings/SaveUserSettingsAuditorAPI",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const getTransactionData = createPostAPI(
        settingsApi,
        UpdateUserSettings.RequestMethod
      );

      const response = await getTransactionData(Data);
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
            msg.includes("Setting_SettingServiceManager_UpdateUserSettings_01")
          ) {
            return {
              response: response.data.responseResult,
              message: "API executed successfully.",
            };
          } else if (
            msg.includes("Setting_SettingServiceManager_UpdateUserSettings_02")
          ) {
            return rejectWithValue("Data is not updated");
          } else if (
            msg.includes("Setting_SettingServiceManager_UpdateUserSettings_03")
          ) {
            return rejectWithValue("Invalid Input");
          } else if (
            msg.includes("Setting_SettingServiceManager_UpdateUserSettings_04")
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
