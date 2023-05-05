import React from "react";
import Navbars from "../layout/Navbars";
import { Card, Col, Row } from "antd";
import { Helmet } from "react-helmet";
function Home({
  totalElementsUser,
  totalElementsReservation,
  totalElementsBill,
  totalElementProduct,
  totalElementProductType,
  totalElementProductSize,
}) {
  return (
    <>
      <Navbars />
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className="pt-[100px]">
        <Row gutter={[16, 32]}>
          <Col span={8}>
            <Card
              title="Users"
              bordered={false}
              style={{ backgroundColor: "red" }}
            >
              <h1>{totalElementsUser}</h1>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Reservations"
              bordered={false}
              style={{ backgroundColor: "yellow" }}
            >
              <h1>{totalElementsReservation}</h1>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Bills"
              bordered={false}
              style={{ backgroundColor: "blue" }}
            >
              <h1>{totalElementsBill}</h1>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Products"
              bordered={false}
              style={{ backgroundColor: "green" }}
            >
              <h1>{totalElementProduct}</h1>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Product Type"
              bordered={false}
              style={{ backgroundColor: "pink" }}
            >
              <h1>{totalElementProductType}</h1>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Sizes"
              bordered={false}
              style={{ backgroundColor: "silver" }}
            >
              <h1>{totalElementProductSize}</h1>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
