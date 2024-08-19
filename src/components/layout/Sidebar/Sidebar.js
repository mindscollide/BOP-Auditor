import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Nav, Container, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Users from "../../../assets/images/Assignees-Icon.png";
import Broadcast from "../../../assets/images/6.png";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const { SubMenu } = Menu;
  const { Sider } = Layout;

  let defaultOpenKey = localStorage.getItem("defaultOpenKey ");
  let defaultSelectedKey = localStorage.getItem("defaultSelectedKey");
  console.log("defaultOpenKey", defaultOpenKey);
  console.log("defaultSelectedKey", defaultSelectedKey);

  const navigateToAudit = () => {
    localStorage.setItem("defaultOpenKey", "sub1");
    localStorage.setItem("defaultSelectedKey", "3");
    navigate("/JS/AuditTrial");
  };

  const navigateToSecurity = () => {
    localStorage.setItem("defaultOpenKey", "sub1");
    localStorage.setItem("defaultSelectedKey", "4");
    navigate("/JS/SecurityActivity");
  };

  const navigateToTradeCount = () => {
    localStorage.setItem("defaultOpenKey", "sub1");
    localStorage.setItem("defaultSelectedKey", "5");
    navigate("/JS/TradeCount");
  };

  // useEffect(() => {
  //   navigate("/JS/AuditTrial");
  // }, []);

  return (
    <Row>
      <Col lg={12} md={12} sm={12}>
        <Menu
          theme="light"
          defaultOpenKeys={[defaultOpenKey]}
          defaultSelectedKeys={[defaultSelectedKey]}
          mode="inline"
          className="Menu-sidebar-class"
        >
          <SubMenu
            key="sub1"
            icon={<i className="icon-file menu-icons"></i>}
            title="Audit Trial"
            className="submenu-sidebar-icons"
          >
            <Menu.Item
              className="menu-items-sidebar"
              key="3"
              onClick={navigateToAudit}
            >
              Audit Trial
            </Menu.Item>
            <Menu.Item
              className="menu-items-sidebar"
              key="4"
              onClick={navigateToSecurity}
            >
              Security Admin Activity
            </Menu.Item>
            <Menu.Item
              className="menu-items-sidebar"
              key="5"
              onClick={navigateToTradeCount}
            >
              Trade Count
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Col>
    </Row>
  );
};

export default Sidebar;
