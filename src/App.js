import logo from "./logo.svg";
import "./App.css";
import "./assets/custom-icons/custom-icon.css";
import Header from "./components/layout/Header/Header";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import AuditTrial from "./container/Audit/AuditTrials/Audittrial";
import SecurityActivity from "./container/SecurityAdminActivity/SecurityActivity";
function App() {
  return (
    <>
      <Sidebar />
      <Header />
      <AuditTrial />
      {/* <SecurityActivity /> */}
    </>
  );
}

export default App;
