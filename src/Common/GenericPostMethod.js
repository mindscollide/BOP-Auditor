// src/utils/apiCaller.js
import { setCustomHeaders } from "@/Common/Utils";
import axios from "axios";
import { ensureTokenRefreshed } from "./refreshHandler";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // adjust to your backend
});

// 🔑 Request interceptor → attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    config.headers = {
      ...config.headers,
      ...(setCustomHeaders(false) || {}), // base headers
      ...(token ? { Authorization: `Bearer ${token}` } : {}), // add token
    };

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  async (response) => {
    console.log(response, "response from interceptor");

    let responseData = response.data;

    // ✅ Only try to decode ArrayBuffer if the server says it's JSON
    if (responseData instanceof ArrayBuffer) {
      const contentType = response.headers["content-type"];

      if (contentType?.includes("application/json")) {
        try {
          const decodedString = new TextDecoder().decode(
            new Uint8Array(responseData)
          );
          responseData = JSON.parse(decodedString);
        } catch (err) {
          console.warn("⚠️ Failed to decode JSON ArrayBuffer:", err);
        }
      } else {
        // It's a file (PDF, Excel, ZIP, etc.) → just return response directly
        return response;
      }
    }

    // 🔎 Handle token expired
    if (responseData?.responseCode === 417) {
      const originalRequest = response.config;

      if (!originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const newToken = await ensureTokenRefreshed();
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (err) {
          console.error("Refresh failed → redirecting to login", err);
          localStorage.clear();
          window.location.href = "/";
          return Promise.reject(err);
        }
      }
    }

    if (responseData?.responseCode === 401) {
      localStorage.clear();
      window.location.href = "/";
      return Promise.reject("Unauthorized");
    }

    return response; // ✅ normal response
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

/**
 * Higher-order function for making POST API calls
 * @param {string} url - The endpoint URL
 * @param {string} requestMethod - The RequestMethod value to include in the form
 */
const createPostAPI =
  (url, requestMethod) =>
  async (bodyData = {}, isDoc = false, fileName, ext) => {
    try {
      const headers = setCustomHeaders(isDoc, ext);

      const form = new FormData();
      form.append("RequestMethod", requestMethod);

      // ✅ append RequestData
      if (bodyData && typeof bodyData === "object") {
        form.append("RequestData", JSON.stringify(bodyData));
      }

      // ✅ append File if needed
      if (isDoc && bodyData?.file instanceof File) {
        form.append("File", bodyData.file);
      }

      const config = {
        method: "POST",
        url,
        data: form,
        headers,
        ...(isDoc ? { responseType: "arraybuffer" } : {}),
      };

      const response = await api(config);
      return response;
    } catch (error) {
      console.error(`❌ Error calling ${url}:`, error);
      throw error.response?.data || error;
    }
  };

export default createPostAPI;
