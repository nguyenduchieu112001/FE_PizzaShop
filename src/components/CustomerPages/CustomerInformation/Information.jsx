import React, { useState } from "react";
import { Layout, Menu, Table, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import "./Information.css";
import NavBar from "../Home/NavBar";
import { Link, useLocation } from "react-router-dom";
import CustomerInformation from "./CustomerInformation";
import DataReservation from "./Reservation/DataReservation";
import ColumnsReservation from "./Reservation/ColumnsReservation";
import DataBill from "./Bill/DataBill";
import ColumnsBill from "./Bill/ColumnsBill";
import Detail from "./Bill/Detail/Detail"
import ChangePasswordAPI from "./ChangePassword/ChangePasswordAPI";

function Information({
  customer,
  reservation,
  bill,
  handlePageBillChange,
  handlePageReservationChange,
  totalElementBill,
  totalElementReservation,
  fetchData,
  setCustomer,
}) {
  const location = useLocation();
  const keyLocation = location.state && location.state.key
  const [selectedMenuItem, setSelectedMenuItem] = useState(keyLocation ? keyLocation.toString() : "1");
  const handleMenuItemClick = (key) => {
    setSelectedMenuItem(key); // Cập nhật trạng thái item được chọn
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [show, setShow] = useState(false);
  const [billDetail, setBillDetail] = useState([]);

  const showModal = () => setShow(!show);
  const CloseModal = () => setShow(false);
  const dataSource = DataReservation(reservation);
  const dataSourceBill = DataBill(bill);
  const columnsBill = ColumnsBill(showModal, setBillDetail);
  return (
    <>
      <NavBar />
      <Layout style={{ paddingTop: "80px", height: "120vh", width: "100vw" }}>
        <Sider trigger={null}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={selectedMenuItem}
            onClick={({ key }) => handleMenuItemClick(key)}
            items={[
              {
                key: "1",
                label: "Customer Information",
              },
              {
                key: "2",
                label: "Reservations",
              },
              {
                key: "3",
                label: "Bills",
              },
              {
                key: "4",
                label: "Change Password",
              }
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Link to="/home" style={{ paddingLeft: "90%" }}>
              Back to home
            </Link>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: colorBgContainer,
            }}
          >
            {selectedMenuItem === "1" && (
              <CustomerInformation
                customer={customer}
                setCustomer={setCustomer}
                fetchData={fetchData}
              />
            )}
            {selectedMenuItem === "2" && (
              <Table
                dataSource={dataSource}
                columns={ColumnsReservation}
                pagination={{
                  total: totalElementReservation,
                  onChange: handlePageReservationChange,
                }}
              />
            )}
            {selectedMenuItem === "3" && (
              <Table
                dataSource={dataSourceBill}
                columns={columnsBill}
                pagination={{
                  total: totalElementBill,
                  onChange: handlePageBillChange,
                }}
              />
            )}
            {
              selectedMenuItem === "4" && (
                <ChangePasswordAPI customer={customer} />
              )
            }
            <Detail show={show} CloseModal={CloseModal} billDetail={billDetail} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Information;
