// store.js
import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "./authSlicer/authSlicer";
import AuditorSlice from "./authSlicer/AuditorSlicer";
import ReportSlicer from "./authSlicer/ReportSlicer";
const store = configureStore({
  reducer: {
    authReducer: authSlicer,
    AuditorReducer: AuditorSlice,
    ReportReducer: ReportSlicer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
