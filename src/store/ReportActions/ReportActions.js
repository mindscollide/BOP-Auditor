import { createAsyncThunk } from "@reduxjs/toolkit";
import { reportApi } from "../../Common/API_EndPoints";
import {
  ExcelReportTrasactionDetailsByBank,
  ExcelReportTrasactionDetailsByCorporate,
  PDFReportTrasactionDetailsByBank,
  PDFReportTrasactionDetailsByCorporate,
} from "../../Common/API_Config";
import { refreshTokenAction } from "../../container/Pages/Login/logInAction";
import createPostAPI from "../../Common/GenericPostMethod";

//Excel File Report Download For Transaction Details By Bank (API Func)
export const GetTransactionDetailsByBankExcelTypeReportAuditor =
  createAsyncThunk(
    "Report/GetTransactionDetailsByBankExcelTypeReportAuditor",
    async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
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
        console.log("Excel Download Error:", error);
        if (error?.responseCode === 401) {
          navigate("/");
          return rejectWithValue("Unauthorized access, please login again");
        }
        console.log(error, "errorerrorerrorerror");
        console.log(error?.responseCode, "errorerrorerrorerror");
        if (error?.responseCode === 417) {
          await dispatch(refreshTokenAction({ navigate }));
          return;
        }

        return rejectWithValue("Something went wrong while downloading Excel");
      }
    }
  );

//PDF File Report Download For Transaction Details By Bank (API Func)
export const GetTransactionDetailsByBankPDFTypeReportAuditor = createAsyncThunk(
  "Report/GetTransactionDetailsByBankPDFTypeReportAuditor",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
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
      console.log("PDF Download Error:", error);
      if (error?.responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access, please login again");
      }

      if (error?.responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        return;
      }

      return rejectWithValue("Something went wrong while downloading PDF");
    }
  }
);

//Excel File Report Download For Transaction Details By Coporate (API Func)
export const GetTransactionDetailsByCorporateExcelTypeReportAuditor =
  createAsyncThunk(
    "Report/GetTransactionDetailsByCorporateExcelTypeReportAuditor",
    async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
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
        console.log("Excel Download Error:", error);
        if (error?.responseCode === 401) {
          navigate("/");
          return rejectWithValue("Unauthorized access, please login again");
        }
        console.log(error, "errorerrorerrorerror");
        console.log(error?.responseCode, "errorerrorerrorerror");
        if (error?.responseCode === 417) {
          await dispatch(refreshTokenAction({ navigate }));
          return;
        }

        return rejectWithValue("Something went wrong while downloading Excel");
      }
    }
  );

//PDF File Report Download For Transaction Details By Corporate (API Func)
export const GetTransactionDetailsByCorporatePDFTypeReportAuditor =
  createAsyncThunk(
    "Report/GetTransactionDetailsByCorporatePDFTypeReportAuditor",
    async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
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
        console.log("PDF Download Error:", error);
        if (error?.responseCode === 401) {
          navigate("/");
          return rejectWithValue("Unauthorized access, please login again");
        }

        if (error?.responseCode === 417) {
          await dispatch(refreshTokenAction({ navigate }));
          return;
        }

        return rejectWithValue("Something went wrong while downloading PDF");
      }
    }
  );
