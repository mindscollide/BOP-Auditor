import React, { Fragment } from "react";
import { Row, Col, Nav, Container, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu } from "antd";
import Users from "../../../assets/images/Assignees-Icon.png";
import Broadcast from "../../../assets/images/6.png";
import "./Sidebar.css";

const Sidebar = () => {
  const { SubMenu } = Menu;
  const { Sider } = Layout;
  const location = useLocation();
  const navigate = useNavigate();
  let defaultOpenKey = localStorage.getItem("defaultOpenKey ");
  let defaultSelectedKey = localStorage.getItem("defaultSelectedKey");

  //Create User Page Name is Pending User Requests

  const navigateToBankUser = () => {
    localStorage.setItem("defaultOpenKey ", "sub1");
    localStorage.setItem("defaultSelectedKey", "5");
    navigate("/BOP/audittrailbank");
  };

  const navigateToCorporateUser = () => {
    localStorage.setItem("defaultOpenKey ", "sub1");
    localStorage.setItem("defaultSelectedKey", "6");
    navigate("/BOP/audittrailCorporate");
  };

  // const navigateToTradeCount = () => {
  //   localStorage.setItem("defaultOpenKey ", "sub1");
  //   localStorage.setItem("defaultSelectedKey", "7");
  //   navigate("/BOP/TradeCount");
  // };

  // const navigateToActivityByBank = () => {
  //   localStorage.setItem("defaultOpenKey ", "sub1");
  //   localStorage.setItem("defaultSelectedKey", "8");
  //   navigate("/BOP/ActivityByBank");
  // };

  // const navigateToActivityByCorporate = () => {
  //   localStorage.setItem("defaultOpenKey ", "sub1");
  //   localStorage.setItem("defaultSelectedKey", "9");
  //   navigate("/BOP/ActivityByCorporate");
  // };

  let defaultKeySidebar = localStorage.getItem("defaultSelectedKey");

  return (
    <Row>
      <Col lg={12} md={12} sm={12}>
        <Menu
          theme='dark'
          defaultOpenKeys={[defaultOpenKey]}
          defaultSelectedKeys={[defaultSelectedKey]}
          mode='inline'
          className='Menu-sidebar-class'>
          <SubMenu
            key='sub1'
            icon={<i className='icon-file'></i>}
            title='Reports'
            className='submenu-sidebar-icons'>
            <Menu.Item
              className={
                location.pathname === "/BOP/audittrailbank"
                  ? "menu-items-sidebar_active"
                  : "menu-items-sidebar"
              }
              key='5'
              onClick={navigateToBankUser}>
              Transaction by Bank
            </Menu.Item>
            <Menu.Item
              className={
                location.pathname === "/BOP/audittrailCorporate"
                  ? "menu-items-sidebar_active"
                  : "menu-items-sidebar"
              }
              key='6'
              onClick={navigateToCorporateUser}>
              Transaction by Corporate
            </Menu.Item>
            {/* <Menu.Item
              className={
                defaultKeySidebar !== "7"
                  ? "menu-items-sidebar noDefault"
                  : "menu-items-sidebar"
              }
              key="7"
              onClick={navigateToTradeCount}
            >
              Trade Count
            </Menu.Item>
            <Menu.Item
              className={
                defaultKeySidebar !== "8"
                  ? "menu-items-sidebar noDefault"
                  : "menu-items-sidebar"
              }
              key="8"
              onClick={navigateToActivityByBank}
            >
              Activity by Bank
            </Menu.Item>
            <Menu.Item
              className={
                defaultKeySidebar !== "9"
                  ? "menu-items-sidebar noDefault"
                  : "menu-items-sidebar"
              }
              key="9"
              onClick={navigateToActivityByCorporate}
            >
              Activity by Corporate
            </Menu.Item> */}
          </SubMenu>
        </Menu>
      </Col>
    </Row>
  );
};

export default Sidebar;
