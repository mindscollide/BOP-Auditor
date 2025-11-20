// store.js
import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "./authSlicer/authSlicer";
import AuditorSlice from "./authSlicer/AuditorSlicer";
import ReportSlicer from "./authSlicer/ReportSlicer";
import SettingsSlicer from "./authSlicer/SettingSlicer";
import RateInputSlicer from "./authSlicer/RateInputSlicer";
const store = configureStore({
  reducer: {
    authReducer: authSlicer,
    AuditorReducer: AuditorSlice,
    ReportReducer: ReportSlicer,
    SettingReducer: SettingsSlicer,
    RateInputSlicer: RateInputSlicer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
