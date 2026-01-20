import React, { Suspense, useState } from "react";
import styles from "./UserManagementReport.module.css";
import SectionLoader from "../../../components/common/sectionLoader/SectionLoader";
import GlobalTabs from "../../../components/common/tabs/Tabs";
import { Col, Row } from "react-bootstrap";
import Branch from "./Branch";
import Corporate from "./Corporate";

const UserManagementReport = () => {
  const [activeTab, setActiveTab] = useState("Branch"); // default tab key

  const tabsData = [
    {
      title: "Branch",
      key: "Branch",
      content: (
        <div className="position-relative">
          <Suspense fallback={<SectionLoader />}>
            {activeTab === "Branch" && <Branch />}
          </Suspense>
        </div>
      ),
    },
    {
      title: "Corporate",
      key: "Corporate",
      content: (
        <div className="position-relative">
          <Suspense fallback={<SectionLoader />}>
            {activeTab === "Corporate" && <Corporate />}
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
      <GlobalTabs
        tabClass="mt-2 mb-4"
        tabs={tabsData}
        activeKey={activeTab}
        onTabChange={(key) => setActiveTab(key)}
      />
    </>
  );
};

export default UserManagementReport;
