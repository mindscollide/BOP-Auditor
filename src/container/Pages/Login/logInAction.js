import { createAsyncThunk } from "@reduxjs/toolkit";
import createPostAPI from "../../../Common/GenericPostMethod";
import {
  loginRequestMethod,
  LogOut,
  refreshTokenRM,
} from "../../../Common/API_Config";
import { roleBasedNavigation } from "../../../Common/Utils";
import { authApi } from "../../../Common/API_EndPoints";

//Login API
export const loginInApi = createAsyncThunk(
  "auth/login", // A unique action type string
  async ({ navigate, Data }, { rejectWithValue }) => {
    try {
      let getBlotterData = createPostAPI(
        authApi,
        loginRequestMethod.RequestMethod
      );

      const response = await getBlotterData(Data);
      if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage, token, refreshToken } =
          response.data.responseResult;
        console.log(isExecuted, "messageKeymessageKey");

        if (isExecuted) {
          console.log(responseMessage, "responseMessage");

          switch (responseMessage.toLowerCase()) {
            case "ERM_AuthService_AuthManager_Login_01".toLowerCase():
            case "ERM_AuthService_AuthManager_Login_02".toLowerCase():
            case "ERM_AuthService_AuthManager_Login_04".toLowerCase():
            case "ERM_AuthService_AuthManager_Login_05".toLowerCase():
              return rejectWithValue("User is Locked");
            case "ERM_AuthService_AuthManager_Login_06".toLowerCase():
              return rejectWithValue("User is Disabled");
            case "ERM_AuthService_AuthManager_Login_07".toLowerCase():
              return rejectWithValue("User is Closed");
            case "ERM_AuthService_AuthManager_Login_08".toLowerCase():
              return rejectWithValue("User is Dormant");
            case "ERM_AuthService_AuthManager_Login_09".toLowerCase():
              return rejectWithValue("Login Failed");
            case "ERM_AuthService_AuthManager_Login_10".toLowerCase():
              return rejectWithValue("Login Failed");
            case "ERM_AuthService_AuthManager_Login_11".toLowerCase():
              return rejectWithValue("Someting went wrong");
            case "ERM_AuthService_AuthManager_Login_12".toLowerCase():
              console.log("", response.data);
              return rejectWithValue("Not A valid role to login");

            case "ERM_AuthService_AuthManager_Login_13".toLowerCase():
              console.log("", response.data);
              return rejectWithValue("Branch is InActive");
            case "ERM_AuthService_AuthManager_Login_14".toLowerCase():
              console.log("", response.data);
              return rejectWithValue("Invalid Role");
            case "ERM_AuthService_AuthManager_Login_03".toLowerCase(): {
              const {
                branch,
                employeeID,
                ldapAccount,
                userID,
                firstName,
                email,
                contactNumber,
                userRoleID,
                userStatusID,
              } = response.data.responseResult.user;

              localStorage.setItem("token", token);
              localStorage.setItem("refreshToken", refreshToken);
              localStorage.setItem("name", firstName);
              localStorage.setItem("email", email);
              localStorage.setItem("roleId", userRoleID);
              localStorage.setItem("userID", userID);
              localStorage.setItem("branch", JSON.stringify(branch));
              localStorage.setItem("employeeID", employeeID);
              localStorage.setItem("ldapAccount", ldapAccount);
              localStorage.setItem("contactNumber", contactNumber);
              localStorage.setItem("userStatusID", userStatusID);

              roleBasedNavigation(navigate, userRoleID);

              return {
                response: response.data.responseResult,
                message: "Successfully logged In",
              };
            }

            default:
              console.log("", response.data);
              return rejectWithValue("Something went wrong");
          }
        } else {
          console.log("", response.data);
          return rejectWithValue("Something went wrong");
        }
      }
    } catch (error) {
      // Reject with error message
      console.log("", error);
      return rejectWithValue("Something went wrong");
    }
  }
);

//Refresh Token
export const refreshTokenAction = createAsyncThunk(
  "auth/refreshToken", // A unique action type string
  async ({ navigate }, { rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      let Data = {
        RefreshToken: localStorage.getItem("refreshToken"),
        Token: localStorage.getItem("token"),
      };

      let refreshToken = createPostAPI(authApi, refreshTokenRM.RequestMethod);

      const response = await refreshToken(Data);
      if (response.data.responseCode === 205) {
        localStorage.clear();
        navigate("/");
        return rejectWithValue("Something went wrong");
      } else if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage, token, refreshToken } =
          response.data.responseResult;

        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_RefreshToken_01".toLowerCase()
              )
          ) {
            console.log("", response.data);
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);
            return {
              message: "Successfully updated",
              response: response.data.responseResult,
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_RefreshToken_02".toLowerCase()
              )
          ) {
            localStorage.clear();
            navigate("/");
            return rejectWithValue("Something went wrong");
          } else {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          }
        } else {
          console.log("", response.data);
          localStorage.clear();
          navigate("/");
          return rejectWithValue("Something went wrong");
        }
      }
    } catch (error) {
      console.log(error);
      // Reject with error message
      return rejectWithValue("Something went wrong");
    }
  }
);

//Logout API
export const logoutApi = createAsyncThunk(
  "auth/logoutApi",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const getBlotterData = createPostAPI(authApi, LogOut.RequestMethod);
      const response = await getBlotterData(Data);

      const resCode = response?.data?.responseCode;
      const resResult = response?.data?.responseResult;
      const resMessage = resResult?.responseMessage;
      const isExecuted = resResult?.isExecuted;

      if (resCode === 401) {
        localStorage.clear();
        navigate("/");
        return rejectWithValue("Unauthorized");
      }

      if (resCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        await dispatch(logoutApi({ navigate, Data }));
        return;
      }

      if (resCode === 200) {
        if (isExecuted) {
          switch (resMessage) {
            case "ERM_AuthService_AuthManager_LogOut_01":
              // Logout successful
              localStorage.clear();
              navigate("/");
              return {
                response: resResult,
                message: "Successfully logged out",
              };

            case "ERM_AuthService_AuthManager_LogOut_02":
              return rejectWithValue("Data UnAvailable");

            case "ERM_AuthService_AuthManager_LogOut_03":
              return rejectWithValue("Exception");

            default:
              return rejectWithValue("Unknown Logout Response");
          }
        } else {
          return rejectWithValue("Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      console.log("Logout error:", error);
      return rejectWithValue("Something went wrong");
    }
  }
);

// ✅ Plain async function (can be called anywhere)
export const refreshTokenFn = async () => {
  try {
    let Data = {
      RefreshToken: localStorage.getItem("refreshToken"),
      Token: localStorage.getItem("token"),
    };

    let refreshToken = createPostAPI(authApi, refreshTokenRM.RequestMethod);

    const response = await refreshToken(Data);

    if (response.data.responseCode === 205) {
      localStorage.clear();
      window.location.href = "/";
      throw new Error("Invalid refresh token");
    } else if (response.data.responseCode === 200) {
      const { isExecuted, responseMessage, token, refreshToken } =
        response.data.responseResult;

      if (isExecuted) {
        if (
          responseMessage
            .toLowerCase()
            .includes(
              "ERM_AuthService_AuthManager_RefreshToken_01".toLowerCase()
            )
        ) {
          localStorage.setItem("token", token);
          localStorage.setItem("refreshToken", refreshToken);
          return { token, refreshToken };
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "ERM_AuthService_AuthManager_RefreshToken_02".toLowerCase()
            )
        ) {
          window.location.href = "/";
          throw new Error("Refresh token expired");
        } else {
          throw new Error("Something went wrong");
        }
      } else {
        window.location.href = "/";
        throw new Error("Execution failed");
      }
    }
  } catch (error) {
    console.error("Refresh token error:", error);
    throw error;
  }
};
