import { createAsyncThunk } from "@reduxjs/toolkit";
import { reportApi } from "../../Common/API_EndPoints";
import { ExcelReportTrasactionDetailsByBank } from "../../Common/API_Config";
import { refreshTokenAction } from "../../container/Pages/Login/logInAction";
import createPostAPI from "../../Common/GenericPostMethod";

export const GetTransactionDetailsByBankExcelTypeReportAuditor =
  createAsyncThunk(
    "Report/GetTransactionDetailsByBankExcelTypeReportAuditor",
    async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
      try {
        const getTransactionData = createPostAPI(
          reportApi,
          ExcelReportTrasactionDetailsByBank.RequestMethod
        );

        // Make the request expecting binary data (Excel)
        const response = await getTransactionData(Data, {
          headers: {
            "Content-Type": "application/json",
            Accept:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          },
          responseType: "arraybuffer",
        });

        const { responseCode } = response.data;

        if (responseCode === 401) {
          navigate("/");
          return rejectWithValue("Unauthorized access, please login again");
        }

        if (responseCode === 417) {
          await dispatch(refreshTokenAction({ navigate }));
          return;
        }

        if (responseCode === 200) {
          // Extract blob and trigger download
          const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });

          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "TransactionDetails.xlsx");
          document.body.appendChild(link);
          link.click();
          link.remove();
        } else {
          console.log("Unhandled response code:", response.data);
          return rejectWithValue("Something went wrong");
        }
      } catch (error) {
        console.log("Catch Error:", error);
        return rejectWithValue("Something went wrong");
      }
    }
  );
