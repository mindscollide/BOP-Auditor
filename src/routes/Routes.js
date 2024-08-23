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
import TwoFaVerification from "../container/Auditor_Login/2faVerificationScreen/TwoFaVerification";
import CreatePassword from "../container/Auditor_Login/CreatePassword/CreatePassword";
import ChangePassword from "../container/Auditor_Login/ChangePassword/ChangePassword";
import ForgotPassword from "../container/Auditor_Login/forgetPassword/ForgotPassword";
import EmailSentPage from "../container/Auditor_Login/PasswordEmailSent/EmailSentPage";
import ResetPassword from "../container/Auditor_Login/ResetPassword/ResetPassword";

export const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route exact path="/" element={<AuditLogin />} />
      <Route exact path="/TwoFaVerification" element={<TwoFaVerification />} />
      <Route exact path="/CreatePassword" element={<CreatePassword />} />
      <Route exact path="/ChangePassword" element={<ChangePassword />} />
      <Route exact path="/ResetPassword" element={<ResetPassword />} />
      <Route exact path="/ForgotPassword" element={<ForgotPassword />} />
      <Route exact path="/EmailSent" element={<EmailSentPage />} />

      {/* <Route element={<PrivateRoutes />}> */}
      <Route exact path="/JS/" element={<MainPage />}>
        <Route path="AuditTrial" element={<AuditTrial />} />
        <Route path="" element={<AuditTrial />} />
        <Route path="SecurityActivity" element={<SecurityActivity />} />
        {/* <Route path="TradeCount" element={<TradeCount />} /> */}
      </Route>
      {/* </Route> */}
    </>
  )
);
