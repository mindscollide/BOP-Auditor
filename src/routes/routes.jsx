import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../container/Dashboard/index.jsx";
import BopLogin from "../container/Pages/Login/BopLogin.jsx";


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
      { path: "audittrailbank", element: <div>Audit Trail Bank</div> },
    ],
  },
]);

export { router };
