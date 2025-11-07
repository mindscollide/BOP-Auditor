import React, { createContext, useContext, useState, useCallback } from "react";
import NotificationSnackBar from "../components/common/NotificationSnackbar";
// import NotificationSnackbar from "@/components/common/NotificationSnackbar";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState("");

  const showMessage = useCallback((msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, []);

  return (
    <NotificationContext.Provider value={{ showMessage }}>
      {children}
      <NotificationSnackBar message={message} />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
