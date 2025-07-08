import { createSlice } from "@reduxjs/toolkit";
import { GetTransactionDetailsByBankAuditor } from "../AuditorActions/AuditorActions";

const AuditorSlice = createSlice({
  name: "Auditor",
  initialState: {
    responseMessage: "",
    Loader: false,
    error: null,
    transactionDetailsByBankData: null,
  },
  reducers: {
    clearAuthResponseMessage: (state) => {
      state.responseMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending state (while the API call is being made)
      .addCase(GetTransactionDetailsByBankAuditor.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds)
      .addCase(
        GetTransactionDetailsByBankAuditor.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.transactionDetailsByBankData = payload.response;
          state.error = null;
          state.responseMessage = payload.message;
        }
      )
      // Rejected state (when the API call fails)
      .addCase(GetTransactionDetailsByBankAuditor.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.responseMessage = action.payload;
        state.transactionDetailsByBankData = null;
      });
  },
});
export const { clearAuthResponseMessage } = AuditorSlice.actions;
export default AuditorSlice.reducer;
