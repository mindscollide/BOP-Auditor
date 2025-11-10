import { createSlice } from "@reduxjs/toolkit";
import {
  loginInApi,
  logoutApi,
  refreshTokenAction,
} from "../../container/Pages/Login/logInAction";
import { GetAllTenorsAPI } from "../UserManagementActions/UserManagementActions";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userDetails: null,
    responseMessage: "",
    Loader: false,
    error: null,
    refreshTokenResponse: null,
    logout: null,
    getAllTenors: null,
  },
  reducers: {
    clearAuthResponseMessage: (state) => {
      state.responseMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending state (while the API call is being made)
      .addCase(loginInApi.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds)
      .addCase(loginInApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.userDetails = payload.response;
        state.error = null;
        state.responseMessage = payload.message;
      })
      // Rejected state (when the API call fails)
      .addCase(loginInApi.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.responseMessage = action.payload;
        state.user = null;
      })

      .addCase(refreshTokenAction.pending, (state) => {
        state.Loader = true;
      })
      .addCase(refreshTokenAction.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.refreshTokenResponse = payload.response;
        state.responseMessage = payload.message;
      })
      .addCase(refreshTokenAction.rejected, (state, { payload }) => {
        state.Loader = false;
        state.refreshTokenResponse = null;
        state.responseMessage = payload;
      })

      .addCase(logoutApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(logoutApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.logout = payload.response;
        state.responseMessage = payload.message;
      })
      .addCase(logoutApi.rejected, (state, { payload }) => {
        state.Loader = false;
        state.logout = null;
        state.responseMessage = payload;
      })
      .addCase(GetAllTenorsAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      .addCase(GetAllTenorsAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.getAllTenors = payload.response;
        state.error = false;
        state.responseMessage = payload.message;
      })
      .addCase(GetAllTenorsAPI.rejected, (state, { payload }) => {
        state.Loader = false;
        state.getAllTenors = null;
        state.responseMessage = payload.message;
      });
  },
});
export const { clearAuthResponseMessage } = authSlice.actions;
export default authSlice.reducer;
