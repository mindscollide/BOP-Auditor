import React, { useEffect, useState } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import "./App.css";
import "./assets/globalstyles/height.css";
import Dashboard from "./container/Dashboard";
import AuditTrialByBank from "./container/Pages/AuditTrialByBank/AuditTrialByBank";
import AuditTrialByCorporate from "./container/Pages/AuditTrialByCorporate/AuditTrialByCorporate";
import BopLogin from "./container/Pages/Login/BopLogin";
import { Loader } from "./components/elements";
import PrivateRoute from "./routes/PrivateRoute";
import UserManagementReport from "./container/Pages/UserManagementReport";
import MainInputReport from "./container/Pages/RateInputReport";
import ForgotPassword from "./container/Pages/forgetPassword/ForgotPassword";
import ResetPassword from "./container/Pages/ResetPassword/ResetPassword";
import ResetPasswordLinkExpired from "./container/Pages/resetPasswordLinkExpired";
import ForgotPasswordEmailSentTo from "./container/Pages/forgetPassword/ForgotPasswordEmailSentTo";
import Redirected from "./container/Pages/redirected";

function App() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    document.title = "BOP Auditor"; // Or customize with env vars if needed
    loadRoutes();
  }, []);

  const loadRoutes = () => {
    const dashboardRoutes = {
      path: "/BOP",
      element: <Dashboard />,
      children: [
        {
          path: "audittrailbank",
          element: <PrivateRoute element={<AuditTrialByBank />} />,
        },
        {
          path: "audittrailCorporate",
          element: <PrivateRoute element={<AuditTrialByCorporate />} />,
        },
        {
          path: "userManagement",
          element: <PrivateRoute element={<UserManagementReport />} />,
        },
        {
          path: "rateInputReport",
          element: <PrivateRoute element={<MainInputReport />} />,
        },
      ],
    };

    const appRoutes = [
      {
        path: "/",
        element: <BopLogin />,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "/emailsent",
        element: <ForgotPasswordEmailSentTo />,
      },
      { path: "/resetPassword", element: <ResetPassword /> },
      {
        path: "/resetPasswordLinkExpired",
        element: <ResetPasswordLinkExpired />,
      },
      { path: "/redirected", element: <Redirected /> },
      dashboardRoutes,
      {
        path: "*",
        element: <Navigate to='/' />,
      },
    ];

    setRoutes(appRoutes);
  };

  if (!routes.length) {
    return <div>Loading...</div>;
  }

  const router = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={router} />
      <Loader />
    </>
  );
}

export default App;
