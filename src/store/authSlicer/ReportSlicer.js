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
  DownloadBranchUserForAuditorExcelReportAPI,
  DownloadBranchUserForAuditorReportPDFAPI,
  DownloadCorporateUserForAuditorExcelReportAPI,
  DownloadCorporateUserForAuditorReportPDFAPI,
} from "../ReportActions/ReportActions";

const ReportSlice = createSlice({
  name: "Report",
  initialState: {
    responseMessage: "",
    Loader: false,
    errorSeverity: null,
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
    DownloadBranchUserForAuditorExcelReport: null,
    DownloadBranchUserForAuditorReportPDF: null,
    DownloadCorporateUserForAuditorExcelReport: null,
    DownloadCorporateUserForAuditorReportPDF: null,
  },
  reducers: {
    clearReportResponseMessage: (state) => {
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
          state.errorSeverity = "Success";
          state.excelReportTransactionByBankReport = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        GetTransactionDetailsByBankExcelTypeReportAuditor.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.errorSeverity = "Error";
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
          state.errorSeverity = "Success";
          state.pdfReportTransactionByBankReport = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        GetTransactionDetailsByBankPDFTypeReportAuditor.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.errorSeverity = "Error";
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
          state.errorSeverity = "Success";
          state.excelReportTransactionByCorporateReport = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        GetTransactionDetailsByCorporateExcelTypeReportAuditor.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.errorSeverity = "Error";
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
          state.errorSeverity = "Success";
          state.pdfReportTransactionByCorporateReport = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        GetTransactionDetailsByCorporatePDFTypeReportAuditor.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.errorSeverity = "Error";
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
          state.errorSeverity = "Success";
          state.DownloadSpotRateInputExcelReport = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        DownloadSpotRateInputExcelReportAPI.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.errorSeverity = "Error";
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
          state.errorSeverity = "Success";
          state.DownloadSpotRateInputExcelReportPDF = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        DownloadSpotRateInputExcelReportPDFAPI.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.errorSeverity = "Error";
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
          state.errorSeverity = "Success";
          state.DownloadForwardRateInputExcelReport = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        DownloadForwardRateInputExcelReportAPI.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.errorSeverity = "Error";
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
          state.errorSeverity = "Success";
          state.DownloadForwardRateInputReportPDF = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        DownloadForwardRateInputReportPDFAPI.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.errorSeverity = "Error";
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
          state.errorSeverity = "Success";
          state.DownloadFeDiscountingRateInputExcelReport = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        DownloadFeDiscountingRateInputExcelReportAPI.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.errorSeverity = "Error";
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
          state.errorSeverity = "Success";
          state.DownloadFeDiscountingRateInputReportPDF = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        DownloadFeDiscountingRateInputReportPDFAPI.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.errorSeverity = "Error";
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
          state.errorSeverity = "Success";
          state.DownloadNonFEDiscountingRateInputExcelReport = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        DownloadNonFEDiscountingRateInputExcelReportAPI.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.errorSeverity = "Error";
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
          state.errorSeverity = "Success";
          state.DownloadNonFEDiscountingRateInputReportPDF = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        DownloadNonFEDiscountingRateInputReportPDFAPI.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.errorSeverity = "Error";
          state.DownloadNonFEDiscountingRateInputReportPDF = null;
          state.responseMessage = payload;
        }
      )
      .addCase(DownloadBranchUserForAuditorExcelReportAPI.pending, (state) => {
        state.Loader = true;
      })
      .addCase(
        DownloadBranchUserForAuditorExcelReportAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.errorSeverity = "Success";
          state.DownloadBranchUserForAuditorExcelReport = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        DownloadBranchUserForAuditorExcelReportAPI.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.errorSeverity = "Error";
          state.DownloadBranchUserForAuditorExcelReport = null;
          state.responseMessage = payload;
        }
      )
      .addCase(DownloadBranchUserForAuditorReportPDFAPI.pending, (state) => {
        state.Loader = true;
      })
      .addCase(
        DownloadBranchUserForAuditorReportPDFAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.errorSeverity = "Success";
          state.DownloadBranchUserForAuditorReportPDF = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        DownloadBranchUserForAuditorReportPDFAPI.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.errorSeverity = "Error";
          state.DownloadBranchUserForAuditorReportPDF = null;
          state.responseMessage = payload;
        }
      )
      .addCase(
        DownloadCorporateUserForAuditorExcelReportAPI.pending,
        (state) => {
          state.Loader = true;
        }
      )
      .addCase(
        DownloadCorporateUserForAuditorExcelReportAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.errorSeverity = "Success";
          state.DownloadCorporateUserForAuditorExcelReport = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        DownloadCorporateUserForAuditorExcelReportAPI.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.errorSeverity = "Error";
          state.DownloadCorporateUserForAuditorExcelReport = null;
          state.responseMessage = payload;
        }
      )
      .addCase(DownloadCorporateUserForAuditorReportPDFAPI.pending, (state) => {
        state.Loader = true;
      })
      .addCase(
        DownloadCorporateUserForAuditorReportPDFAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.errorSeverity = "Success";
          state.DownloadCorporateUserForAuditorReportPDF = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        DownloadCorporateUserForAuditorReportPDFAPI.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.errorSeverity = "Error";
          state.DownloadCorporateUserForAuditorReportPDF = null;
          state.responseMessage = payload;
        }
      );
  },
});
export const { clearReportResponseMessage } = ReportSlice.actions;
export default ReportSlice.reducer;
