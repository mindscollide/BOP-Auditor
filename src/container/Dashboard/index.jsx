import { Layout } from "antd";
import React from "react";
import MainHeader from "../../components/layout/header/header";
import Sidebar from "../../components/layout/sider/sider";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const { Content, Sider, Footer } = Layout;
  return (
    <Layout style={{ height: "100vh" }}>
      <MainHeader />
      <Layout>
        <Sider width={250} style={{ background: "#4d4946", color: "#fff" }}>
          <Sidebar />
        </Sider>
        <Content className="p-4">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
