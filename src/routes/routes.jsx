import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../container/Dashboard/index.jsx";
import BopLogin from "../container/Pages/Login/BopLogin.jsx";
import AuditTrialByCorporate from "../container/Pages/AuditTrialByCorporate/AuditTrialByCorporate.jsx";
import AuditTrialByBank from "../container/Pages/AuditTrialByBank/AuditTrialByBank.jsx";
import TradeCount from "../container/Pages/TradeCount/TradeCount.jsx";
import ActivityByBank from "../container/Pages/ActivityByBank/ActivityByBank.jsx";
import ActivityByCorporate from "../container/Pages/ActivityByCorporate/ActivityByCorporate.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: <BopLogin />,
      },
    ],
  },
  {
    path: "/BOP",
    element: <Dashboard />,
    children: [
      { path: "audittrailbank", element: <AuditTrialByBank /> },
      { path: "audittrailCorporate", element: <AuditTrialByCorporate /> },
      { path: "TradeCount", element: <TradeCount /> },
      { path: "ActivityByBank", element: <ActivityByBank /> },
      { path: "ActivityByCorporate", element: <ActivityByCorporate /> },
    ],
  },
]);

export { router };
