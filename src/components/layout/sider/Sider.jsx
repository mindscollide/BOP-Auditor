// import React from "react";
// import { Row, Col } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { Layout, Menu } from "antd";
// import "./Sidebar.css";

// const Sidebar = () => {
//   const { SubMenu } = Menu;
//   const { Sider } = Layout;
//   const navigate = useNavigate();
//   let defaultOpenKey = localStorage.getItem("defaultOpenKey ");
//   let defaultSelectedKey = localStorage.getItem("defaultSelectedKey");

//   //Create User Page Name is Pending User Requests

//   const navigateToBankUser = () => {
//     localStorage.setItem("defaultOpenKey ", "sub1");
//     localStorage.setItem("defaultSelectedKey", "5");
//     navigate("/BOP/audittrailbank");
//   };

//   const navigateToCorporateUser = () => {
//     localStorage.setItem("defaultOpenKey ", "sub1");
//     localStorage.setItem("defaultSelectedKey", "6");
//     navigate("/BOP/audittrailCorporate");
//   };

//   let defaultKeySidebar = localStorage.getItem("defaultSelectedKey");

//   return (
//     <Row>
//       <Col lg={12} md={12} sm={12}>
//         <Menu
//           theme="dark"
//           defaultOpenKeys={[defaultOpenKey]}
//           defaultSelectedKeys={[defaultSelectedKey]}
//           mode="inline"
//           className="Menu-sidebar-class"
//         >
//           <SubMenu
//             key="sub1"
//             icon={<i className="icon-file"></i>}
//             title="Reports"
//             className="submenu-sidebar-icons"
//           >
//             <Menu.Item
//               className={
//                 defaultKeySidebar !== "5"
//                   ? "menu-items-sidebar noDefault"
//                   : "menu-items-sidebar"
//               }
//               key="5"
//               onClick={navigateToBankUser}
//             >
//               Transaction by Bank
//             </Menu.Item>
//             <Menu.Item
//               className={
//                 defaultKeySidebar !== "6"
//                   ? "menu-items-sidebar noDefault"
//                   : "menu-items-sidebar"
//               }
//               key="6"
//               onClick={navigateToCorporateUser}
//             >
//               Transaction by Corporate
//             </Menu.Item>
//           </SubMenu>
//         </Menu>
//       </Col>
//     </Row>
//   );
// };

// export default Sidebar;

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

              {/* <Link
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
              </Link> */}
            </div>
          )}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default Sidebar;
