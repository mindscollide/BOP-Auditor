import { createSlice } from "@reduxjs/toolkit";
import {
  GetTransactionDetailsByBankExcelTypeReportAuditor,
  GetTransactionDetailsByBankPDFTypeReportAuditor,
  GetTransactionDetailsByCorporateExcelTypeReportAuditor,
} from "../ReportActions/ReportActions";

const ReportSlice = createSlice({
  name: "Report",
  initialState: {
    responseMessage: "",
    Loader: false,
    error: null,
    refreshTokenResponse: null,
    excelReportTransactionByBankReport: null,
    pdfReportTransactionByBankReport: null,
    excelReportTransactionByCorporateReport: null,
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
      )

      .addCase(
        GetTransactionDetailsByBankPDFTypeReportAuditor.pending,
        (state) => {
          state.Loader = true;
        }
      )
      .addCase(
        GetTransactionDetailsByBankPDFTypeReportAuditor.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.pdfReportTransactionByBankReport = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        GetTransactionDetailsByBankPDFTypeReportAuditor.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.pdfReportTransactionByBankReport = null;
          state.responseMessage = payload;
        }
      )

      .addCase(
        GetTransactionDetailsByCorporateExcelTypeReportAuditor.pending,
        (state) => {
          state.Loader = true;
        }
      )
      .addCase(
        GetTransactionDetailsByCorporateExcelTypeReportAuditor.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.excelReportTransactionByCorporateReport = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        GetTransactionDetailsByCorporateExcelTypeReportAuditor.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.excelReportTransactionByCorporateReport = null;
          state.responseMessage = payload;
        }
      );
  },
});
export const { clearAuthResponseMessage } = ReportSlice.actions;
export default ReportSlice.reducer;
