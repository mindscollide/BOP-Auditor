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
import TradeCount from "./container/Pages/TradeCount/TradeCount";
import ActivityByBank from "./container/Pages/ActivityByBank/ActivityByBank";
import ActivityByCorporate from "./container/Pages/ActivityByCorporate/ActivityByCorporate";
import BopLogin from "./container/Pages/Login/BopLogin";
import { Loader } from "./components/elements";
import PrivateRoute from "./routes/PrivateRoute";

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
          path: "TradeCount",
          element: <PrivateRoute element={<TradeCount />} />,
        },
        {
          path: "ActivityByBank",
          element: <PrivateRoute element={<ActivityByBank />} />,
        },
        {
          path: "ActivityByCorporate",
          element: <PrivateRoute element={<ActivityByCorporate />} />,
        },
      ],
    };

    const appRoutes = [
      {
        path: "/",
        element: <BopLogin />,
      },
      dashboardRoutes,
      {
        path: "*",
        element: <Navigate to="/" />,
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
