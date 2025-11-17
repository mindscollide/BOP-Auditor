import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./Tabs.css";
const GlobalTabs = ({ tabs, activeKey, onTabChange, tabClass }) => {
  return (
    <Tabs
      id="uncontrolled-tab-example"
      className={`${tabClass} ${"position-relative"}`}
      activeKey={activeKey}
      onSelect={onTabChange}
    >
      {tabs.map((tab, index) => (
        <Tab
          // active={activeTab}
          eventKey={tab.title}
          title={tab.title}
          key={index}
        >
          {tab.content}
        </Tab>
      ))}
    </Tabs>
  );
};
export default GlobalTabs;
