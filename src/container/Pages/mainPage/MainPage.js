import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Header from "../../../components/layout/Header/Header";
import Sidebar from "../../../components/layout/Sidebar/Sidebar";
import { Layout } from "antd";

const MainPage = () => {
  const { Sider, Content } = Layout;

  return (
    <Fragment>
      <Layout>
        <Header />
        <Layout>
          <Sider width={250}>
            <Sidebar />
          </Sider>

          <Content className="px-3">
            <Outlet />
          </Content>
        </Layout>
      </Layout>

      {/* <Row>
        <Col sm={12} md={12} lg={12}>
          <Header />
        </Col>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <Row>
              <Col
                sm={12}
                md={12}
                lg={12}
                style={{
                  width: "100%",
                }}
                className="d-flex gap-4"
              >
                <Sidebar />
                <Outlet />
              </Col>
            </Row>
          </Col>
        </Row>
      </Row> */}
    </Fragment>
  );
};

export default MainPage;
