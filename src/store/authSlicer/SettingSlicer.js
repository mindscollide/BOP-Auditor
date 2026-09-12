import { createSlice } from "@reduxjs/toolkit";
import {
  GetUserSettingsAuditorAPI,
  SaveUserSettingsAuditorAPI,
} from "../SlicerAction/SlicerAction";

const SettingsSlice = createSlice({
  name: "Settings",
  initialState: {
    responseMessage: "",
    Loader: false,
    errorSeverity: null,
    error: null,
    getUserSettingsData: null,
    updateUserSettingsApiData: null,
  },
  reducers: {
    clearSettingResponseMessage: (state) => {
      state.responseMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending state (while the API call is being made GetUserSettingsAuditorAPI)
      .addCase(GetUserSettingsAuditorAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds GetUserSettingsAuditorAPI)
      .addCase(GetUserSettingsAuditorAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.errorSeverity = "Success";
        state.getUserSettingsData = payload.response;
        state.error = null;
        state.responseMessage = payload.message;
      })
      // Rejected state (when the API call fails GetUserSettingsAuditorAPI)
      .addCase(GetUserSettingsAuditorAPI.rejected, (state, action) => {
        state.Loader = false;
        state.errorSeverity = "Error";
        state.responseMessage = action.payload;
        state.getUserSettingsData = null;
      })
      // Pending state (while the API call is being made SaveUserSettingsAuditorAPI)
      .addCase(SaveUserSettingsAuditorAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds SaveUserSettingsAuditorAPI)
      .addCase(SaveUserSettingsAuditorAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.errorSeverity = "Success";
        state.updateUserSettingsApiData = payload.response;
        state.error = null;
        state.responseMessage = payload.message;
      })
      // Rejected state (when the API call fails SaveUserSettingsAuditorAPI)
      .addCase(SaveUserSettingsAuditorAPI.rejected, (state, action) => {
        state.Loader = false;
        state.errorSeverity = "Error";
        state.responseMessage = action.payload;
        state.updateUserSettingsApiData = null;
      });
  },
});
export const { clearSettingResponseMessage } = SettingsSlice.actions;
export default SettingsSlice.reducer;
