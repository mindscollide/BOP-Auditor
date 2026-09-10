import React, { useEffect, useRef, useState } from "react";
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
  const currentBundle = useRef(null);

  // Detects a new deployment without exposing any extra file: index.html is
  // already unavoidably public (it's what boots the SPA), and Vite stamps a
  // fresh content-hash into its entry <script src="/assets/index-<hash>.js">
  // on every build. Re-fetching it and watching that src change is enough to
  // know a new build has shipped — no separate version.json needed.
  useEffect(() => {
    const extractBundleSrc = (html) => {
      const match = html.match(/<script[^>]+src="([^"]+\.js)"[^>]*>/i);
      return match ? match[1] : null;
    };

    const checkForNewBuild = async () => {
      try {
        const response = await fetch("/index.html", { cache: "no-cache" });
        const html = await response.text();
        const bundleSrc = extractBundleSrc(html);

        if (!bundleSrc) return;

        if (currentBundle.current && currentBundle.current !== bundleSrc) {
          // 🔹 Clear browser caches (for service workers / cache API)
          if ("caches" in window) {
            const names = await caches.keys();
            await Promise.all(names.map((name) => caches.delete(name)));
          }
          window.location.reload();
          return;
        }

        currentBundle.current = bundleSrc;
      } catch (err) {
        console.log("Error checking for new build:", err);
      }
    };

    checkForNewBuild();
    const interval = setInterval(checkForNewBuild, 30000); // check every 30 sec
    return () => clearInterval(interval);
  }, []);

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
