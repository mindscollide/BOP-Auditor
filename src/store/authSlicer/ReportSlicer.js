import { createSlice } from "@reduxjs/toolkit";
import {
  GetTransactionDetailsByBankExcelTypeReportAuditor,
  GetTransactionDetailsByBankPDFTypeReportAuditor,
  GetTransactionDetailsByCorporateExcelTypeReportAuditor,
  GetTransactionDetailsByCorporatePDFTypeReportAuditor,
  DownloadSpotRateInputExcelReportAPI,
  DownloadSpotRateInputExcelReportPDFAPI,
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
    pdfReportTransactionByCorporateReport: null,
    DownloadSpotRateInputExcelReport: null,
    DownloadSpotRateInputExcelReportPDF: null,
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
      )

      .addCase(
        GetTransactionDetailsByCorporatePDFTypeReportAuditor.pending,
        (state) => {
          state.Loader = true;
        }
      )
      .addCase(
        GetTransactionDetailsByCorporatePDFTypeReportAuditor.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.pdfReportTransactionByCorporateReport = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        GetTransactionDetailsByCorporatePDFTypeReportAuditor.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.pdfReportTransactionByCorporateReport = null;
          state.responseMessage = payload;
        }
      )
      .addCase(DownloadSpotRateInputExcelReportAPI.pending, (state) => {
        state.Loader = true;
      })
      .addCase(
        DownloadSpotRateInputExcelReportAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.DownloadSpotRateInputExcelReport = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        DownloadSpotRateInputExcelReportAPI.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.DownloadSpotRateInputExcelReport = null;
          state.responseMessage = payload;
        }
      )

      .addCase(DownloadSpotRateInputExcelReportPDFAPI.pending, (state) => {
        state.Loader = true;
      })
      .addCase(
        DownloadSpotRateInputExcelReportPDFAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.DownloadSpotRateInputExcelReportPDF = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        DownloadSpotRateInputExcelReportPDFAPI.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.DownloadSpotRateInputExcelReportPDF = null;
          state.responseMessage = payload;
        }
      );
  },
});
export const { clearAuthResponseMessage } = ReportSlice.actions;
export default ReportSlice.reducer;
