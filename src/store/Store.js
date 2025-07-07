// store.js
import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "./authSlicer/authSlicer";

const store = configureStore({
  reducer: {
    authReducer: authSlicer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
