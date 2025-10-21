import React, { Suspense } from "react";
import styles from "./RateInputReport.module.css";

import SectionLoader from "../../../components/common/sectionLoader/SectionLoader";
import GlobalTabs from "../../../components/common/tabs/Tabs";
import { Col, Row } from "react-bootstrap";
import Spot from "./Spot";
import Forwards from "./Forwards";
import FEDiscounting from "./FEDiscounting";
import NonFEDiscounting from "./NonFEDiscounting";

const MainInputReport = () => {
  const tabsData = [
    {
      title: "Spot",
      content: (
        <div className="position-relative">
          <Suspense fallback={<SectionLoader />}>
            <Spot />
          </Suspense>
        </div>
      ),
    },
    {
      title: "Forwards",
      content: (
        <div className="position-relative">
          <Suspense fallback={<SectionLoader />}>
            <Forwards />
          </Suspense>
        </div>
      ),
    },
    {
      title: "FE Discounting",
      content: (
        <div className="position-relative">
          <Suspense fallback={<SectionLoader />}>
            <FEDiscounting />
          </Suspense>
        </div>
      ),
    },
    {
      title: "Non-FE Discounting",
      content: (
        <div className="position-relative">
          <Suspense fallback={<SectionLoader />}>
            <NonFEDiscounting />
          </Suspense>
        </div>
      ),
    },
  ];
  return (
    <>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <span className={styles["AuditTrialBankMainHeading"]}>
            Rate Input Report
          </span>
        </Col>
      </Row>
      <GlobalTabs tabClass="mt-4 mb-4" tabs={tabsData} defaultActiveKey={"0"} />
    </>
  );
};

export default MainInputReport;
