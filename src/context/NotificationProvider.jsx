import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import NotificationSnackBar from "../components/common/NotificationSnackbar";

import { clearAuthResponseMessage } from "../store/authSlicer/authSlicer";
import { clearAuditorResponseMessage } from "../store/authSlicer/AuditorSlicer";
import { clearRateInputResponseMessage } from "../store/authSlicer/RateInputSlicer";
import { clearReportResponseMessage } from "../store/authSlicer/ReportSlicer";
import { clearSettingResponseMessage } from "../store/authSlicer/SettingSlicer";
import { clearUserManagementResponseMessage } from "../store/authSlicer/UserManagementSlicer";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const timeouts = useRef({});

  const sources = [
    {
      key: "auth",
      msg: useSelector((s) => s.authReducer?.responseMessage),
      clear: clearAuthResponseMessage,
    },
    {
      key: "auditor",
      msg: useSelector((s) => s.AuditorReducer?.responseMessage),
      clear: clearAuditorResponseMessage,
    },
    {
      key: "report",
      msg: useSelector((s) => s.ReportReducer?.responseMessage),
      clear: clearReportResponseMessage,
    },
    {
      key: "setting",
      msg: useSelector((s) => s.SettingReducer?.responseMessage),
      clear: clearSettingResponseMessage,
    },
    {
      key: "rateInput",
      msg: useSelector((s) => s.RateInputSlicer?.responseMessage),
      clear: clearRateInputResponseMessage,
    },
    {
      key: "userManagement",
      msg: useSelector((s) => s.userManagementSlicer?.responseMessage),
      clear: clearUserManagementResponseMessage,
    },
  ];

  // Listen to all Redux messages
  useEffect(
    () => {
      sources.forEach(({ key, msg, clear }) => {
        if (!msg || timeouts.current[key]) return;

        const newItem = {
          id: `${key}-${Date.now()}`,
          message: msg,
          source: key,
        };
        setMessages((prev) => [...prev, newItem]);

        // Clear after 3 seconds
        timeouts.current[key] = setTimeout(() => {
          dispatch(clear());
          setMessages((prev) => prev.filter((m) => m.source !== key));
          delete timeouts.current[key];
        }, 3000);
      });

      // Cleanup on unmount
      return () => {
        Object.values(timeouts.current).forEach(clearTimeout);
        timeouts.current = {};
      };
    },
    sources.map((s) => s.msg)
  );

  // Manual trigger
  const showMessage = useCallback((msg) => {
    const id = `manual-${Date.now()}`;
    const newItem = { id, message: msg, source: "manual" };
    setMessages((prev) => [...prev, newItem]);
    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }, 3000);
  }, []);

  return (
    <NotificationContext.Provider value={{ showMessage }}>
      {children}
      <NotificationSnackBar message={messages} />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
