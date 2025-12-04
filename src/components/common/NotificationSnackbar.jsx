import React, { useEffect } from "react";
import { notification } from "antd";
import IconElement from "./IconElement/IconElement";

const NotificationSnackBar = ({ message = [] }) => {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (!message || message.length === 0) return;

    message.forEach((msg) => {
      // Use unique key per message to allow multiple notifications
      api.open({
        key: msg?.id,
        message: msg?.message,
        description: msg?.description || null,
        closeIcon: <IconElement iconClass={"icon-close"} />,
        className: "custom-notification-snackbar",
        duration: 3, // auto-close after 3 seconds
      });
    });
  }, [message, api]);

  return <>{contextHolder}</>;
};

export default NotificationSnackBar;
