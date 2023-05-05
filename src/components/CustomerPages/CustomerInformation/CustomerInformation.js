import { Col, Input, Row } from "antd";
import React from "react";
import ChangeInformationAPI from "./ChangeInformation/ChangeInformationAPI";
import { Helmet } from "react-helmet";

function CustomerInformation({ customer, setCustomer, fetchData }) {
  return (
    <>
      <Helmet>
        <title>Customer's information</title>
      </Helmet>
      <Row
        style={{
          marginBottom: "16px",
        }}
      >
        <Col span={6}>
          <b style={{ fontSize: 20 }}>Username</b>
        </Col>
        <Col span={18}>
          <Input
            size="large"
            placeholder="large size"
            value={customer.userName}
          />
        </Col>
      </Row>
      <Row style={{ marginBottom: "16px" }}>
        <Col span={6}>
          <b style={{ fontSize: 20, textAlign: "left" }}>Customer Name</b>
        </Col>
        <Col span={18}>
          <Input
            size="large"
            placeholder="large size"
            value={customer.customerName}
          />
        </Col>
      </Row>
      <Row style={{ marginBottom: "16px" }}>
        <Col span={6}>
          <b style={{ fontSize: 20 }}>Email</b>
        </Col>
        <Col span={18}>
          <Input
            size="large"
            placeholder="large size"
            value={customer.email}
          />
        </Col>
      </Row>
      <Row style={{ marginBottom: "16px" }}>
        <Col span={6}>
          <b style={{ fontSize: 20 }}>Phone Number</b>
        </Col>
        <Col span={18}>
          <Input
            size="large"
            placeholder="large size"
            value={customer.phoneNumber}
          />
        </Col>
      </Row>
      <Row style={{ marginBottom: "16px" }}>
        <Col span={6}>
          <b style={{ fontSize: 20 }}>Address</b>
        </Col>
        <Col span={18}>
          <Input
            size="large"
            placeholder="large size"
            value={customer.address}
          />
        </Col>
      </Row>

      <Row style={{ marginBottom: "32px" }}>
        <Col span={8} />
        <Col span={8} />
        <Col span={8}>
          <ChangeInformationAPI customer={customer} setCustomer={setCustomer} fetchData={fetchData}/>
        </Col>
      </Row>
    </>
  );
}

export default CustomerInformation;
