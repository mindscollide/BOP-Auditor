import {
  Route,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";

import PrivateRoutes from "./PrivateRoute";
import AuditTrial from "../container/Audit/AuditTrials/Audittrial";
import SecurityActivity from "../container/SecurityAdminActivity/SecurityActivity";
import AuditLogin from "../container/Auditor_Login/Login/Audit-Login";
import MainPage from "../container/Pages/mainPage/MainPage";
import TradeCount from "../container/TradeCount/Tradecount";

export const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route exact path="/" element={<AuditLogin />} />
      {/* <Route element={<PrivateRoutes />}> */}
      <Route exact path="/JS/" element={<MainPage />}>
        <Route path="AuditTrial" element={<AuditTrial />} />
        <Route path="" element={<AuditTrial />} />
        <Route path="SecurityActivity" element={<SecurityActivity />} />
        <Route path="TradeCount" element={<TradeCount />} />
      </Route>
      {/* </Route> */}
    </>
  )
);
