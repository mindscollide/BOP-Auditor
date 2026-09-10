import React, { Suspense, useEffect, useState } from "react";
import styles from "./RateInputReport.module.css";
import SectionLoader from "../../../components/common/sectionLoader/SectionLoader";
import GlobalTabs from "../../../components/common/tabs/Tabs";
import { Col, Row } from "react-bootstrap";
import Spot from "./Spot";
import Forwards from "./Forwards";
import FEDiscounting from "./FEDiscounting";
import NonFEDiscounting from "./NonFEDiscounting";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllTenorsAPI } from "../../../store/RateInputActions/RateInputActions";

const MainInputReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [activeTab, setActiveTab] = useState("0");
  const [activeTab, setActiveTab] = useState("Spot"); // default tab key
  // const [activeTabNo, setActiveTabNo] = useState(null);

  const hasFetched = React.useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      dispatch(GetAllTenorsAPI(navigate));
    }
  }, [dispatch, navigate]);

  const tabsData = [
    {
      title: "Spot",
      key: "Spot",
      content: (
        <div className="position-relative">
          <Suspense fallback={<SectionLoader />}>
            {activeTab === "Spot" && <Spot />}
          </Suspense>
        </div>
      ),
    },
    {
      title: "Forwards",
      key: "Forwards",

      content: (
        <div className="position-relative">
          <Suspense fallback={<SectionLoader />}>
            {activeTab === "Forwards" && <Forwards />}
          </Suspense>
        </div>
      ),
    },
    {
      title: "FE Discounting",
      key: "FE Discounting",
      content: (
        <div className="position-relative">
          <Suspense fallback={<SectionLoader />}>
            {activeTab === "FE Discounting" && <FEDiscounting />}
          </Suspense>
        </div>
      ),
    },
    {
      title: "Non-FE Discounting",
      key: "Non-FE Discounting",
      content: (
        <div className="position-relative">
          <Suspense fallback={<SectionLoader />}>
            {activeTab === "Non-FE Discounting" && <NonFEDiscounting />}
          </Suspense>
        </div>
      ),
    },
  ];
  return (
    // <div className={styles["pageScrollContainer"]}>
    <div>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <span className={styles["AuditTrialBankMainHeading"]}>
            Rate Input Report
          </span>
        </Col>
      </Row>
      <GlobalTabs
        tabClass="mt-4 mb-4"
        tabs={tabsData}
        activeKey={activeTab}
        onTabChange={(key) => setActiveTab(key)} // 🔹 track tab change
      />
    </div>
  );
};

export default MainInputReport;
