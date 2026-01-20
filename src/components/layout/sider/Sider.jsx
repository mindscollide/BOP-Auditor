import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import "./Sidebar.css";

const Sidebar = () => {
  const [expandedKey, setExpandedKey] = useState(
    localStorage.getItem("defaultOpenKey") || null
  );
  const location = useLocation();

  // const selectedKey = localStorage.getItem("defaultSelectedKey");

  const handleToggle = (eventKey) => {
    if (eventKey === "sub1") {
      setExpandedKey(expandedKey === eventKey ? null : eventKey);
      localStorage.setItem(
        "defaultOpenKey",
        expandedKey === eventKey ? null : eventKey
      );
    }
  };

  const handleItemClick = (selectedKey) => {
    localStorage.setItem("defaultSelectedKey", selectedKey);
  };

  return (
    <Navbar expand={false} className="sidebar-navbar">
      <Nav className="w-100">
        {/* Reports Section */}
        <Nav.Item className="sidebar-menu-group">
          <Nav.Link
            onClick={() => handleToggle("sub1")}
            className="sidebar-menu-header"
          >
            <span>
              <i className={"sidebar-icon icon-file"} /> <span>Reports</span>
            </span>
            <i
              className={`sidebarExpendIcon ${
                expandedKey === "sub1" ? "icon-arrow-down" : "icon-arrow-right"
              }`}
            ></i>
          </Nav.Link>
          {expandedKey === "sub1" && (
            <div className="sidebar-submenu">
              <Link
                to="/BOP/audittrailbank"
                className={
                  location.pathname.includes("audittrailbank")
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("audittrailbank")}
              >
                Transaction by Bank
              </Link>
              <Link
                to="/BOP/audittrailCorporate"
                className={
                  location.pathname.includes("audittrailCorporate")
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("audittrailCorporate")}
              >
                Transaction by Corporate
              </Link>

              <Link
                to="/BOP/userManagement"
                className={
                  location.pathname.includes("userManagement")
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("userManagement")}
              >
                User Management Report
              </Link>

              <Link
                to="/BOP/rateInputReport"
                className={
                  location.pathname.includes("rateInputReport")
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("rateInputReport")}
              >
                Rate Input Report
              </Link>
            </div>
          )}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default Sidebar;
