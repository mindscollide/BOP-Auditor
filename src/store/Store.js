// store.js
import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "./authSlicer/authSlicer";
import AuditorSlice from "./authSlicer/AuditorSlicer";
import ReportSlicer from "./authSlicer/ReportSlicer";
import SettingsSlicer from "./authSlicer/SettingSlicer";
import RateInputSlicer from "./authSlicer/RateInputSlicer";
import userManagementSlicer from "./authSlicer//UserManagementSlicer";
const store = configureStore({
  reducer: {
    authReducer: authSlicer,
    AuditorReducer: AuditorSlice,
    ReportReducer: ReportSlicer,
    SettingReducer: SettingsSlicer,
    RateInputSlicer: RateInputSlicer,
    userManagementSlicer: userManagementSlicer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
