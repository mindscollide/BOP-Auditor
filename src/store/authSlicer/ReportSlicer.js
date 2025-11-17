import { createSlice } from "@reduxjs/toolkit";
import {
  GetTransactionDetailsByBankExcelTypeReportAuditor,
  GetTransactionDetailsByBankPDFTypeReportAuditor,
  GetTransactionDetailsByCorporateExcelTypeReportAuditor,
  GetTransactionDetailsByCorporatePDFTypeReportAuditor,
  DownloadSpotRateInputExcelReportAPI,
  DownloadSpotRateInputExcelReportPDFAPI,
  DownloadForwardRateInputExcelReportAPI,
  DownloadForwardRateInputReportPDFAPI,
  DownloadFeDiscountingRateInputExcelReportAPI,
  DownloadFeDiscountingRateInputReportPDFAPI,
  DownloadNonFEDiscountingRateInputExcelReportAPI,
  DownloadNonFEDiscountingRateInputReportPDFAPI,
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
    DownloadForwardRateInputExcelReport: null,
    DownloadForwardRateInputReportPDF: null,
    DownloadFeDiscountingRateInputExcelReport: null,
    DownloadFeDiscountingRateInputReportPDF: null,
    DownloadNonFEDiscountingRateInputExcelReport: null,
    DownloadNonFEDiscountingRateInputReportPDF: null,
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
      )
      .addCase(DownloadForwardRateInputExcelReportAPI.pending, (state) => {
        state.Loader = true;
      })
      .addCase(
        DownloadForwardRateInputExcelReportAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.DownloadForwardRateInputExcelReport = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        DownloadForwardRateInputExcelReportAPI.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.DownloadForwardRateInputExcelReport = null;
          state.responseMessage = payload;
        }
      )
      .addCase(DownloadForwardRateInputReportPDFAPI.pending, (state) => {
        state.Loader = true;
      })
      .addCase(
        DownloadForwardRateInputReportPDFAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.DownloadForwardRateInputReportPDF = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        DownloadForwardRateInputReportPDFAPI.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.DownloadForwardRateInputReportPDF = null;
          state.responseMessage = payload;
        }
      )
      .addCase(
        DownloadFeDiscountingRateInputExcelReportAPI.pending,
        (state) => {
          state.Loader = true;
        }
      )
      .addCase(
        DownloadFeDiscountingRateInputExcelReportAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.DownloadFeDiscountingRateInputExcelReport = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        DownloadFeDiscountingRateInputExcelReportAPI.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.DownloadFeDiscountingRateInputExcelReport = null;
          state.responseMessage = payload;
        }
      )
      .addCase(DownloadFeDiscountingRateInputReportPDFAPI.pending, (state) => {
        state.Loader = true;
      })
      .addCase(
        DownloadFeDiscountingRateInputReportPDFAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.DownloadFeDiscountingRateInputReportPDF = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        DownloadFeDiscountingRateInputReportPDFAPI.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.DownloadFeDiscountingRateInputReportPDF = null;
          state.responseMessage = payload;
        }
      )
      .addCase(
        DownloadNonFEDiscountingRateInputExcelReportAPI.pending,
        (state) => {
          state.Loader = true;
        }
      )
      .addCase(
        DownloadNonFEDiscountingRateInputExcelReportAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.DownloadNonFEDiscountingRateInputExcelReport = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        DownloadNonFEDiscountingRateInputExcelReportAPI.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.DownloadNonFEDiscountingRateInputExcelReport = null;
          state.responseMessage = payload;
        }
      )
      .addCase(
        DownloadNonFEDiscountingRateInputReportPDFAPI.pending,
        (state) => {
          state.Loader = true;
        }
      )
      .addCase(
        DownloadNonFEDiscountingRateInputReportPDFAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.DownloadNonFEDiscountingRateInputReportPDF = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        DownloadNonFEDiscountingRateInputReportPDFAPI.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.DownloadNonFEDiscountingRateInputReportPDF = null;
          state.responseMessage = payload;
        }
      );
  },
});
export const { clearAuthResponseMessage } = ReportSlice.actions;
export default ReportSlice.reducer;
