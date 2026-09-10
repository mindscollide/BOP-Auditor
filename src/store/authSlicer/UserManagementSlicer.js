import { createSlice } from "@reduxjs/toolkit";
import {
  GetRoleforUserManagementAPI,
  GetAdminEmailforUserManagementAPI,
  SearchBranchUserForUserManagementAPI,
  SearchCorporateUserForUserManagementAPI,
} from "../UserManagementActions/UserManagementActions";

const userManagementSlicer = createSlice({
  name: "userManagement",
  initialState: {
    Loader: false,
    responseMessage: "",
    GetRoleforUserManagement: null,
    GetAdminEmailforUserManagement: null,
    SearchBranchUserForUserManagement: null,
    SearchCorporateUserForUserManagement: null,
  },
  reducers: {
    clearUserManagementResponseMessage: (state) => {
      state.responseMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetRoleforUserManagementAPI.pending, (state) => {
        state.Loader = true;
      })
      .addCase(GetRoleforUserManagementAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.GetRoleforUserManagement = payload.response;
        state.responseMessage = payload.message;
      })
      .addCase(GetRoleforUserManagementAPI.rejected, (state, { payload }) => {
        state.Loader = false;
        state.GetRoleforUserManagement = null;
        state.responseMessage = payload;
      })
      .addCase(GetAdminEmailforUserManagementAPI.pending, (state) => {
        state.Loader = true;
      })
      .addCase(
        GetAdminEmailforUserManagementAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.GetAdminEmailforUserManagement = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        GetAdminEmailforUserManagementAPI.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.GetAdminEmailforUserManagement = null;
          state.responseMessage = payload;
        }
      )
      // Pending state (while the API call is being made GetSpotRateInputDataAPI)
      .addCase(SearchBranchUserForUserManagementAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds GetSpotRateInputDataAPI)
      .addCase(
        SearchBranchUserForUserManagementAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.SearchBranchUserForUserManagement = payload.response;
          state.error = null;
          state.responseMessage = payload.message;
        }
      )
      // Rejected state (when the API call fails SearchCorporateUserForUserManagement)
      .addCase(
        SearchBranchUserForUserManagementAPI.rejected,
        (state, action) => {
          state.Loader = false;
          state.responseMessage = action.payload;
          state.SearchBranchUserForUserManagement = null;
        }
      ) // Pending state (while the API call is being made GetSpotRateInputDataAPI)
      .addCase(SearchCorporateUserForUserManagementAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds SearchCorporateUserForUserManagement)
      .addCase(
        SearchCorporateUserForUserManagementAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.SearchCorporateUserForUserManagement = payload.response;
          state.error = null;
          state.responseMessage = payload.message;
        }
      )
      // Rejected state (when the API call fails SearchCorporateUserForUserManagement)
      .addCase(
        SearchCorporateUserForUserManagementAPI.rejected,
        (state, action) => {
          state.Loader = false;
          state.responseMessage = action.payload;
          state.SearchCorporateUserForUserManagement = null;
        }
      );
  },
});

export const { clearUserManagementResponseMessage } =
  userManagementSlicer.actions;

export default userManagementSlicer.reducer;
