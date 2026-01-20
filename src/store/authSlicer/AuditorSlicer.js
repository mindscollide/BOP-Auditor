import { createSlice } from "@reduxjs/toolkit";
import {
  GetTransactionDetailsByBankAuditor,
  GetTransactionDetailsByCorporateAuditor,
} from "../AuditorActions/AuditorActions";

const AuditorSlice = createSlice({
  name: "Auditor",
  initialState: {
    responseMessage: "",
    Loader: false,
    error: null,
    transactionDetailsByBankData: null,
    transactionDetailsByCorporateData: null,
    // GetSpotRateInputData: null,
    // GetForwardRateInputData: null,
    // GetFEDiscountingRateInputData: null,
    // GetNonFEDiscountingRateInputData: null,
  },
  reducers: {
    clearAuditorResponseMessage: (state) => {
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
          state.Loader = false;
          state.responseMessage = action.payload;
          state.transactionDetailsByCorporateData = null;
        }
      );
    // // Pending state (while the API call is being made GetSpotRateInputDataAPI)
    // .addCase(GetSpotRateInputDataAPI.pending, (state) => {
    //   state.Loader = true;
    //   state.error = null;
    // })
    // // Fulfilled state (when the API call succeeds GetSpotRateInputDataAPI)
    // .addCase(GetSpotRateInputDataAPI.fulfilled, (state, { payload }) => {
    //   state.Loader = false;
    //   state.GetSpotRateInputData = payload.response;
    //   state.error = null;
    //   state.responseMessage = payload.message;
    // })
    // // Rejected state (when the API call fails GetSpotRateInputDataAPI)
    // .addCase(GetSpotRateInputDataAPI.rejected, (state, action) => {
    //   console.log(action, "actionaction");
    //   state.Loader = false;
    //   state.responseMessage = action.payload;
    //   state.GetSpotRateInputData = null;
    // })
    // // Pending state (while the API call is being made GetSpotRateInputDataAPI)
    // .addCase(GetForwardRateInputDataAPI.pending, (state) => {
    //   state.Loader = true;
    //   state.error = null;
    // })
    // // Fulfilled state (when the API call succeeds GetSpotRateInputDataAPI)
    // .addCase(GetForwardRateInputDataAPI.fulfilled, (state, { payload }) => {
    //   state.Loader = false;
    //   state.GetForwardRateInputData = payload.response;
    //   state.error = null;
    //   state.responseMessage = payload.message;
    // })
    // // Rejected state (when the API call fails GetSpotRateInputDataAPI)
    // .addCase(GetForwardRateInputDataAPI.rejected, (state, action) => {
    //   state.Loader = false;
    //   state.responseMessage = action.payload;
    //   state.GetForwardRateInputData = null;
    // }) // Pending state (while the API call is being made GetSpotRateInputDataAPI)
    // .addCase(GetFEDiscountingRateInputDataAPI.pending, (state) => {
    //   state.Loader = true;
    //   state.error = null;
    // })
    // // Fulfilled state (when the API call succeeds GetSpotRateInputDataAPI)
    // .addCase(
    //   GetFEDiscountingRateInputDataAPI.fulfilled,
    //   (state, { payload }) => {
    //     state.Loader = false;
    //     state.GetFEDiscountingRateInputData = payload.response;
    //     state.error = null;
    //     state.responseMessage = payload.message;
    //   }
    // )
    // // Rejected state (when the API call fails GetSpotRateInputDataAPI)
    // .addCase(GetFEDiscountingRateInputDataAPI.rejected, (state, action) => {
    //   console.log(action, "actionaction");
    //   state.Loader = false;
    //   state.responseMessage = action.payload;
    //   state.GetFEDiscountingRateInputData = null;
    // })

    // .addCase(GetNonFEDiscountingRateInputDataAPI.pending, (state) => {
    //   state.Loader = true;
    //   state.error = null;
    // })
    // // Fulfilled state (when the API call succeeds GetSpotRateInputDataAPI)
    // .addCase(
    //   GetNonFEDiscountingRateInputDataAPI.fulfilled,
    //   (state, { payload }) => {
    //     state.Loader = false;
    //     state.GetNonFEDiscountingRateInputData = payload.response;
    //     state.error = null;
    //     state.responseMessage = payload.message;
    //   }
    // )
    // // Rejected state (when the API call fails GetSpotRateInputDataAPI)
    // .addCase(
    //   GetNonFEDiscountingRateInputDataAPI.rejected,
    //   (state, action) => {
    //     console.log(action, "actionaction");
    //     state.Loader = false;
    //     state.responseMessage = action.payload;
    //     state.GetNonFEDiscountingRateInputData = null;
    //   }
    // );
  },
});
export const { clearAuditorResponseMessage } = AuditorSlice.actions;
export default AuditorSlice.reducer;
