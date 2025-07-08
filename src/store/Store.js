// store.js
import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "./authSlicer/authSlicer";
import AuditorSlice from "./authSlicer/AuditorSlicer";
const store = configureStore({
  reducer: {
    authReducer: authSlicer,
    AuditorReducer: AuditorSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
