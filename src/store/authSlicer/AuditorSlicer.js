import { createSlice } from "@reduxjs/toolkit";
import {
  GetTransactionDetailsByBankAuditor,
  GetTransactionDetailsByCorporateAuditor,
} from "../AuditorActions/AuditorActions";
import { GetSpotRateInputDataAPI } from "../RateInputActions/RateInputActions";

const AuditorSlice = createSlice({
  name: "Auditor",
  initialState: {
    responseMessage: "",
    Loader: false,
    error: null,
    transactionDetailsByBankData: null,
    transactionDetailsByCorporateData: null,
    GetSpotRateInputData: null,
  },
  reducers: {
    clearAuthResponseMessage: (state) => {
      state.responseMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending state (while the API call is being made GetTransactionDetailsByBankAuditor)
      .addCase(GetTransactionDetailsByBankAuditor.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds GetTransactionDetailsByBankAuditor)
      .addCase(
        GetTransactionDetailsByBankAuditor.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.transactionDetailsByBankData = payload.response;
          state.error = null;
          state.responseMessage = payload.message;
        }
      )
      // Rejected state (when the API call fails GetTransactionDetailsByBankAuditor)
      .addCase(GetTransactionDetailsByBankAuditor.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.responseMessage = action.payload;
        state.transactionDetailsByBankData = null;
      })
      // Pending state (while the API call is being made GetTransactionDetailsByCorporateAuditor)
      .addCase(GetTransactionDetailsByCorporateAuditor.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds GetTransactionDetailsByCorporateAuditor)
      .addCase(
        GetTransactionDetailsByCorporateAuditor.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.transactionDetailsByCorporateData = payload.response;
          state.error = null;
          state.responseMessage = payload.message;
        }
      )
      // Rejected state (when the API call fails GetTransactionDetailsByCorporateAuditor)
      .addCase(
        GetTransactionDetailsByCorporateAuditor.rejected,
        (state, action) => {
          console.log(action, "actionaction");
          state.Loader = false;
          state.responseMessage = action.payload;
          state.transactionDetailsByCorporateData = null;
        }
      )
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
        console.log(action, "actionaction");
        state.Loader = false;
        state.responseMessage = action.payload;
        state.GetSpotRateInputData = null;
      });
  },
});
export const { clearAuthResponseMessage } = AuditorSlice.actions;
export default AuditorSlice.reducer;
