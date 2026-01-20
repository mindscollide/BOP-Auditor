import { createAsyncThunk } from "@reduxjs/toolkit";
import createPostAPI from "../../Common/GenericPostMethod";
import { auditorApi } from "../../Common/API_EndPoints";
import {
  GetAdminEmailforUserManagement,
  GetRoleforUserManagement,
  SearchBranchUserForUserManagement,
  SearchCorporateUserForUserManagement,
} from "../../Common/API_Config";

export const GetRoleforUserManagementAPI = createAsyncThunk(
  "Auditor/GetRoleforUserManagement",
  async ({ rejectWithValue }) => {
    try {
      const GetRoleforUserManagementData = createPostAPI(
        auditorApi,
        GetRoleforUserManagement.RequestMethod
      );
      const response = await GetRoleforUserManagementData();
      const { responseCode } = response.data;

      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;

        if (isExecuted) {
          const msg = responseMessage.toLowerCase();

          if (
            msg.includes(
              "Auditor_AuditorServiceManager_GetRoleforUserManagement_01".toLowerCase()
            )
          ) {
            return {
              response: response.data.responseResult,
              message: "",
            };
          } else if (
            msg.includes(
              "Auditor_AuditorServiceManager_GetRoleforUserManagement_02".toLowerCase()
            )
          ) {
            return rejectWithValue("No Data Found");
          } else if (
            msg.includes(
              "Auditor_AuditorServiceManager_GetRoleforUserManagement_03".toLowerCase()
            )
          ) {
            return rejectWithValue("Exception");
          } else {
            console.log("Unexpected message:", responseMessage);
            return rejectWithValue("Something went wrong");
          }
        } else {
          console.log("Unexpected message:", response.data);
          return rejectWithValue("Something went wrong");
        }
      } else {
        console.log("Unexpected message:", response.data);
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      console.log("Catch Error:", error);
      return rejectWithValue("Something went wrong");
    }
  }
);

export const GetAdminEmailforUserManagementAPI = createAsyncThunk(
  "Auditor/GetAdminEmailforUserManagement",
  async ({ rejectWithValue }) => {
    try {
      const GetAdminEmailforUserManagementData = createPostAPI(
        auditorApi,
        GetAdminEmailforUserManagement.RequestMethod
      );
      const response = await GetAdminEmailforUserManagementData();
      const { responseCode } = response.data;

      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;

        if (isExecuted) {
          const msg = responseMessage.toLowerCase();

          if (
            msg.includes(
              "Auditor_AuditorServiceManager_GetAdminEmailforUserManagement_01".toLowerCase()
            )
          ) {
            return {
              response: response.data.responseResult,
              message: "",
            };
          } else if (
            msg.includes(
              "Auditor_AuditorServiceManager_GetAdminEmailforUserManagement_02".toLowerCase()
            )
          ) {
            return rejectWithValue("No Data Found");
          } else if (
            msg.includes(
              "Auditor_AuditorServiceManager_GetAdminEmailforUserManagement_03".toLowerCase()
            )
          ) {
            return rejectWithValue("Exception");
          } else {
            console.log("Unexpected message:", responseMessage);
            return rejectWithValue("Something went wrong");
          }
        } else {
          console.log("Unexpected message:", response.data);
          return rejectWithValue("Something went wrong");
        }
      } else {
        console.log("Unexpected message:", response.data);
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      console.log("Catch Error:", error);
      return rejectWithValue("Something went wrong");
    }
  }
);

export const SearchBranchUserForUserManagementAPI = createAsyncThunk(
  "Auditor/SearchBranchUserForUserManagement",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const SearchBranchUserForUserManagementRes = createPostAPI(
        auditorApi,
        SearchBranchUserForUserManagement.RequestMethod
      );

      const response = await SearchBranchUserForUserManagementRes(Data);
      const { responseCode } = response.data;

      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;

        if (isExecuted) {
          const msg = responseMessage;

          if (
            msg.includes(
              "Auditor_AuditorServiceManager_SearchBranchUserForUserManagement_01"
            )
          ) {
            return {
              response: response.data.responseResult,
              message: "",
            };
          } else if (
            msg.includes(
              "Auditor_AuditorServiceManager_SearchBranchUserForUserManagement_02"
            )
          ) {
            return rejectWithValue("No Record Found");
          } else if (
            msg.includes(
              "Auditor_AuditorServiceManager_SearchBranchUserForUserManagement_03"
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

export const SearchCorporateUserForUserManagementAPI = createAsyncThunk(
  "Auditor/SearchCorporateUserForUserManagement",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const SearchCorporateUserForUserManagementRes = createPostAPI(
        auditorApi,
        SearchCorporateUserForUserManagement.RequestMethod
      );

      const response = await SearchCorporateUserForUserManagementRes(Data);
      const { responseCode } = response.data;

      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;

        if (isExecuted) {
          const msg = responseMessage;

          if (
            msg.includes(
              "Auditor_AuditorServiceManager_SearchCorporateUserForUserManagement_01"
            )
          ) {
            return {
              response: response.data.responseResult,
              message: "",
            };
          } else if (
            msg.includes(
              "Auditor_AuditorServiceManager_SearchCorporateUserForUserManagement_02"
            )
          ) {
            return rejectWithValue("No Record Found");
          } else if (
            msg.includes(
              "Auditor_AuditorServiceManager_SearchCorporateUserForUserManagement_03"
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
