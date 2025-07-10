import { createSlice } from "@reduxjs/toolkit";
import { GetTransactionDetailsByBankExcelTypeReportAuditor } from "../ReportActions/ReportActions";

const ReportSlice = createSlice({
  name: "Report",
  initialState: {
    responseMessage: "",
    Loader: false,
    error: null,
    refreshTokenResponse: null,
    excelReportTransactionByBankReport: null,
  },
  reducers: {
    clearAuthResponseMessage: (state) => {
      state.responseMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(
        GetTransactionDetailsByBankExcelTypeReportAuditor.pending,
        (state) => {
          state.Loader = true;
        }
      )
      .addCase(
        GetTransactionDetailsByBankExcelTypeReportAuditor.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.excelReportTransactionByBankReport = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        GetTransactionDetailsByBankExcelTypeReportAuditor.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.excelReportTransactionByBankReport = null;
          state.responseMessage = payload;
        }
      );
  },
});
export const { clearAuthResponseMessage } = ReportSlice.actions;
export default ReportSlice.reducer;
