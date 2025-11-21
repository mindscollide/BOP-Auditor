import { createSlice } from "@reduxjs/toolkit";

import {
  GetFEDiscountingRateInputDataAPI,
  GetForwardRateInputDataAPI,
  GetNonFEDiscountingRateInputDataAPI,
  GetSpotRateInputDataAPI,
} from "../RateInputActions/RateInputActions";

const RateInputSlicer = createSlice({
  name: "RateInput",
  initialState: {
    responseMessage: "",
    Loader: false,
    error: null,
    transactionDetailsByBankData: null,
    transactionDetailsByCorporateData: null,
    GetSpotRateInputData: null,
    GetForwardRateInputData: null,
    GetFEDiscountingRateInputData: null,
    GetNonFEDiscountingRateInputData: null,
  },
  reducers: {
    clearAuthResponseMessage: (state) => {
      state.responseMessage = "";
    },
    clearGetSpotRateInputData: (state) => {
      state.GetSpotRateInputData = null;
    },
    clearGetForwardRateInputData: (state) => {
      state.GetForwardRateInputData = null;
    },
    clearGetFEDiscountingRateInputData: (state) => {
      state.GetFEDiscountingRateInputData = null;
    },
    clearGetNonFEDiscountingRateInputData: (state) => {
      state.GetNonFEDiscountingRateInputData = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Pending state (while the API call is being made GetSpotRateInputDataAPI)
      .addCase(GetSpotRateInputDataAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds GetSpotRateInputDataAPI)
      .addCase(GetSpotRateInputDataAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.GetSpotRateInputData = payload.response;
        state.error = null;
        state.responseMessage = payload.message;
      })
      // Rejected state (when the API call fails GetSpotRateInputDataAPI)
      .addCase(GetSpotRateInputDataAPI.rejected, (state, action) => {
        state.Loader = false;
        state.responseMessage = action.payload;
        state.GetSpotRateInputData = null;
      })
      // Pending state (while the API call is being made GetSpotRateInputDataAPI)
      .addCase(GetForwardRateInputDataAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds GetSpotRateInputDataAPI)
      .addCase(GetForwardRateInputDataAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.GetForwardRateInputData = payload.response;
        state.error = null;
        state.responseMessage = payload.message;
      })
      // Rejected state (when the API call fails GetSpotRateInputDataAPI)
      .addCase(GetForwardRateInputDataAPI.rejected, (state, action) => {
        state.Loader = false;
        state.responseMessage = action.payload;
        state.GetForwardRateInputData = null;
      }) // Pending state (while the API call is being made GetSpotRateInputDataAPI)
      .addCase(GetFEDiscountingRateInputDataAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds GetSpotRateInputDataAPI)
      .addCase(
        GetFEDiscountingRateInputDataAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.GetFEDiscountingRateInputData = payload.response;
          state.error = null;
          state.responseMessage = payload.message;
        }
      )
      // Rejected state (when the API call fails GetSpotRateInputDataAPI)
      .addCase(GetFEDiscountingRateInputDataAPI.rejected, (state, action) => {
        state.Loader = false;
        state.responseMessage = action.payload;
        state.GetFEDiscountingRateInputData = null;
      })

      .addCase(GetNonFEDiscountingRateInputDataAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds GetSpotRateInputDataAPI)
      .addCase(
        GetNonFEDiscountingRateInputDataAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.GetNonFEDiscountingRateInputData = payload.response;
          state.error = null;
          state.responseMessage = payload.message;
        }
      )
      // Rejected state (when the API call fails GetSpotRateInputDataAPI)
      .addCase(
        GetNonFEDiscountingRateInputDataAPI.rejected,
        (state, action) => {
          state.Loader = false;
          state.responseMessage = action.payload;
          state.GetNonFEDiscountingRateInputData = null;
        }
      );
  },
});
export const {
  clearAuthResponseMessage,
  clearGetSpotRateInputData,
  clearGetForwardRateInputData,
  clearGetFEDiscountingRateInputData,
  clearGetNonFEDiscountingRateInputData,
} = RateInputSlicer.actions;
export default RateInputSlicer.reducer;
