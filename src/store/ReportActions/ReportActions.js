import { createAsyncThunk } from "@reduxjs/toolkit";
import { reportApi } from "../../Common/API_EndPoints";
import {
  DownloadSpotRateInputExcelReport,
  DownloadSpotRateInputExcelReportPDF,
  ExcelReportTrasactionDetailsByBank,
  ExcelReportTrasactionDetailsByCorporate,
  PDFReportTrasactionDetailsByBank,
  PDFReportTrasactionDetailsByCorporate,
  DownloadForwardRateInputExcelReport,
  DownloadForwardRateInputReportPDF,
  DownloadFeDiscountingRateInputExcelReport,
  DownloadFeDiscountingRateInputReportPDF,
  DownloadNonFEDiscountingRateInputExcelReport,
  DownloadNonFEDiscountingRateInputReportPDF,
} from "../../Common/API_Config";
import createPostAPI from "../../Common/GenericPostMethod";

//Excel File Report Download For Transaction Details By Bank (API Func)
export const GetTransactionDetailsByBankExcelTypeReportAuditor =
  createAsyncThunk(
    "Report/GetTransactionDetailsByBankExcelTypeReportAuditor",
    async ({ Data }, { rejectWithValue }) => {
      try {
        const getTransactionData = createPostAPI(
          reportApi,
          ExcelReportTrasactionDetailsByBank.RequestMethod
        );

        const response = await getTransactionData(Data, true);
        console.log(response, "errorerrorerrorerror");

        // 🚨 Ensure response is valid before trying to read Excel blob
        if (response?.status === 200) {
          const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });

          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "TransactionDetailsByBank.xlsx");
          document.body.appendChild(link);
          link.click();
          link.remove();

          return { message: "Excel downloaded successfully" };
        } else {
          return rejectWithValue(
            "Something went wrong while downloading Excel"
          );
        }
      } catch (error) {
        return rejectWithValue("Something went wrong while downloading Excel");
      }
    }
  );

//PDF File Report Download For Transaction Details By Bank (API Func)
export const GetTransactionDetailsByBankPDFTypeReportAuditor = createAsyncThunk(
  "Report/GetTransactionDetailsByBankPDFTypeReportAuditor",
  async ({ Data }, { rejectWithValue }) => {
    try {
      const getTransactionData = createPostAPI(
        reportApi,
        PDFReportTrasactionDetailsByBank.RequestMethod
      );

      const response = await getTransactionData(Data, true);

      // 🟢 PDF file response
      if (response?.status === 200) {
        const blob = new Blob([response.data], {
          type: "application/pdf",
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "TransactionDetailsByBank.pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();

        return { message: "PDF downloaded successfully" };
      } else {
        return rejectWithValue("Something went wrong while downloading PDF");
      }
    } catch (error) {
      return rejectWithValue("Something went wrong while downloading PDF");
    }
  }
);

//Excel File Report Download For Transaction Details By Coporate (API Func)
export const GetTransactionDetailsByCorporateExcelTypeReportAuditor =
  createAsyncThunk(
    "Report/GetTransactionDetailsByCorporateExcelTypeReportAuditor",
    async ({ Data }, { rejectWithValue }) => {
      try {
        const getTransactionData = createPostAPI(
          reportApi,
          ExcelReportTrasactionDetailsByCorporate.RequestMethod
        );

        const response = await getTransactionData(Data, true);
        console.log(response, "errorerrorerrorerror");

        // 🚨 Ensure response is valid before trying to read Excel blob
        if (response?.status === 200) {
          const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });

          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "TransactionDetailsByCorporate.xlsx");
          document.body.appendChild(link);
          link.click();
          link.remove();

          return { message: "Excel downloaded successfully" };
        } else {
          return rejectWithValue(
            "Something went wrong while downloading Excel"
          );
        }
      } catch (error) {
        return rejectWithValue("Something went wrong while downloading Excel");
      }
    }
  );

//PDF File Report Download For Transaction Details By Corporate (API Func)
export const GetTransactionDetailsByCorporatePDFTypeReportAuditor =
  createAsyncThunk(
    "Report/GetTransactionDetailsByCorporatePDFTypeReportAuditor",
    async ({ Data }, { rejectWithValue }) => {
      try {
        const getTransactionData = createPostAPI(
          reportApi,
          PDFReportTrasactionDetailsByCorporate.RequestMethod
        );

        const response = await getTransactionData(Data, true);

        // 🟢 PDF file response
        if (response?.status === 200) {
          const blob = new Blob([response.data], {
            type: "application/pdf",
          });

          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "TransactionDetailsByCorporate.pdf");
          document.body.appendChild(link);
          link.click();
          link.remove();

          return { message: "PDF downloaded successfully" };
        } else {
          return rejectWithValue("Something went wrong while downloading PDF");
        }
      } catch (error) {
        return rejectWithValue("Something went wrong while downloading PDF");
      }
    }
  );

//Download Spot Report Excell
export const DownloadSpotRateInputExcelReportAPI = createAsyncThunk(
  "Report/DownloadSpotRateInputExcelReport",
  async ({ Data }, { rejectWithValue }) => {
    try {
      const DownloadSpotRateInputExcelReportData = createPostAPI(
        reportApi,
        DownloadSpotRateInputExcelReport.RequestMethod
      );

      const response = await DownloadSpotRateInputExcelReportData(Data, true);
      console.log(response, "errorerrorerrorerror");

      // 🚨 Ensure response is valid before trying to read Excel blob
      if (response?.status === 200) {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "SpotRateInputReport.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();

        return { message: "Excel downloaded successfully" };
      } else {
        return rejectWithValue("Something went wrong while downloading Excel");
      }
    } catch (error) {
      return rejectWithValue("Something went wrong while downloading Excel");
    }
  }
);

//Download Spot Report PDF
export const DownloadSpotRateInputExcelReportPDFAPI = createAsyncThunk(
  "Report/DownloadSpotRateInputExcelReportPDF",
  async ({ Data }, { rejectWithValue }) => {
    try {
      const DownloadSpotRateInputExcelReportPDFData = createPostAPI(
        reportApi,
        DownloadSpotRateInputExcelReportPDF.RequestMethod
      );

      const response = await DownloadSpotRateInputExcelReportPDFData(
        Data,
        true
      );

      // 🟢 PDF file response
      if (response?.status === 200) {
        const blob = new Blob([response.data], {
          type: "application/pdf",
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "SpotRateInputReport.pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();

        return { message: "PDF downloaded successfully" };
      } else {
        return rejectWithValue("Something went wrong while downloading PDF");
      }
    } catch (error) {
      return rejectWithValue("Something went wrong while downloading PDF");
    }
  }
);

//Download Forward Report Excel
export const DownloadForwardRateInputExcelReportAPI = createAsyncThunk(
  "Report/DownloadForwardRateInputExcelReport",
  async ({ Data }, { rejectWithValue }) => {
    try {
      const DownloadForwardRateInputExcelReportData = createPostAPI(
        reportApi,
        DownloadForwardRateInputExcelReport.RequestMethod
      );

      const response = await DownloadForwardRateInputExcelReportData(
        Data,
        true
      );
      console.log(response, "errorerrorerrorerror");

      // 🚨 Ensure response is valid before trying to read Excel blob
      if (response?.status === 200) {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "ForwardRateInputReport.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();

        return { message: "Excel downloaded successfully" };
      } else {
        return rejectWithValue("Something went wrong while downloading Excel");
      }
    } catch (error) {
      return rejectWithValue("Something went wrong while downloading Excel");
    }
  }
);

//Download Forward Report PDF
export const DownloadForwardRateInputReportPDFAPI = createAsyncThunk(
  "Report/DownloadForwardRateInputReportPDF",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const DownloadForwardRateInputReportPDFData = createPostAPI(
        reportApi,
        DownloadForwardRateInputReportPDF.RequestMethod
      );

      const response = await DownloadForwardRateInputReportPDFData(Data, true);

      // 🟢 PDF file response
      if (response?.status === 200) {
        const blob = new Blob([response.data], {
          type: "application/pdf",
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "ForwardRateInputReport.pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();

        return { message: "PDF downloaded successfully" };
      } else {
        return rejectWithValue("Something went wrong while downloading PDF");
      }
    } catch (error) {
      return rejectWithValue("Something went wrong while downloading PDF");
    }
  }
);

//Download FE Discounting Report Excel
export const DownloadFeDiscountingRateInputExcelReportAPI = createAsyncThunk(
  "Report/DownloadFeDiscountingRateInputExcelReport",
  async ({ Data }, { rejectWithValue }) => {
    try {
      const DownloadFeDiscountingRateInputExcelReportData = createPostAPI(
        reportApi,
        DownloadFeDiscountingRateInputExcelReport.RequestMethod
      );

      const response = await DownloadFeDiscountingRateInputExcelReportData(
        Data,
        true
      );
      console.log(response, "errorerrorerrorerror");

      // 🚨 Ensure response is valid before trying to read Excel blob
      if (response?.status === 200) {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "FeDiscountingRateInputReport.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();

        return { message: "Excel downloaded successfully" };
      } else {
        return rejectWithValue("Something went wrong while downloading Excel");
      }
    } catch (error) {
      return rejectWithValue("Something went wrong while downloading Excel");
    }
  }
);

//Download Forward Report PDF
export const DownloadFeDiscountingRateInputReportPDFAPI = createAsyncThunk(
  "Report/DownloadFeDiscountingRateInputReportPDF",
  async ({ Data }, { rejectWithValue }) => {
    try {
      const DownloadFeDiscountingRateInputReportPDFData = createPostAPI(
        reportApi,
        DownloadFeDiscountingRateInputReportPDF.RequestMethod
      );

      const response = await DownloadFeDiscountingRateInputReportPDFData(
        Data,
        true
      );

      // 🟢 PDF file response
      if (response?.status === 200) {
        const blob = new Blob([response.data], {
          type: "application/pdf",
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "FeDiscountingRateInputReport.pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();

        return { message: "PDF downloaded successfully" };
      } else {
        return rejectWithValue("Something went wrong while downloading PDF");
      }
    } catch (error) {
      return rejectWithValue("Something went wrong while downloading PDF");
    }
  }
);

//Download FE Discounting Report Excel
export const DownloadNonFEDiscountingRateInputExcelReportAPI = createAsyncThunk(
  "Report/DownloadNonFEDiscountingRateInputExcelReport",
  async ({ Data }, { rejectWithValue }) => {
    try {
      const DownloadNonFEDiscountingRateInputExcelReportData = createPostAPI(
        reportApi,
        DownloadNonFEDiscountingRateInputExcelReport.RequestMethod
      );

      const response = await DownloadNonFEDiscountingRateInputExcelReportData(
        Data,
        true
      );
      console.log(response, "errorerrorerrorerror");

      // 🚨 Ensure response is valid before trying to read Excel blob
      if (response?.status === 200) {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "NonFEDiscountingRateInput.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();

        return { message: "Excel downloaded successfully" };
      } else {
        return rejectWithValue("Something went wrong while downloading Excel");
      }
    } catch (error) {
      return rejectWithValue("Something went wrong while downloading Excel");
    }
  }
);

//Download Forward Report PDF
export const DownloadNonFEDiscountingRateInputReportPDFAPI = createAsyncThunk(
  "Report/DownloadNonFEDiscountingRateInputReportPDF",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const DownloadNonFEDiscountingRateInputReportPDFData = createPostAPI(
        reportApi,
        DownloadNonFEDiscountingRateInputReportPDF.RequestMethod
      );

      const response = await DownloadNonFEDiscountingRateInputReportPDFData(
        Data,
        true
      );

      // 🟢 PDF file response
      if (response?.status === 200) {
        const blob = new Blob([response.data], {
          type: "application/pdf",
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "NonFEDiscountingRateInputReport.pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();

        return { message: "PDF downloaded successfully" };
      } else {
        return rejectWithValue("Something went wrong while downloading PDF");
      }
    } catch (error) {
      return rejectWithValue("Something went wrong while downloading PDF");
    }
  }
);
