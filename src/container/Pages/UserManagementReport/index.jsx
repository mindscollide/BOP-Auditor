import React, { Suspense } from "react";
import styles from "./UserManagementReport.module.css";

import SectionLoader from "../../../components/common/sectionLoader/SectionLoader";
import GlobalTabs from "../../../components/common/tabs/Tabs";
import { Col, Row } from "react-bootstrap";
import Branch from "./Branch";
import Corporate from "./Corporate";
// import Spot from "./Spot";
// import Forwards from "./Forwards";
// import FEDiscounting from "./FEDiscounting";
// import NonFEDiscounting from "./NonFEDiscounting";

const UserManagementReport = () => {
  const tabsData = [
    {
      title: "Branch",
      content: (
        <div className="position-relative">
          <Suspense fallback={<SectionLoader />}>
            <Branch />
          </Suspense>
        </div>
      ),
    },
    {
      title: "Corporate",
      content: (
        <div className="position-relative">
          <Suspense fallback={<SectionLoader />}>
            <Corporate />
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
            User Management Report
          </span>
        </Col>
      </Row>
      <GlobalTabs tabClass="mt-4 mb-4" tabs={tabsData} defaultActiveKey={"0"} />
    </>
  );
};

export default UserManagementReport;
