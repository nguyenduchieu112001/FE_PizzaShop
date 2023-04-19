import { Card, Table } from "antd";
import React from "react";
import { useState } from "react";
import DataReservation from "./DataReservation";
import ColumnsReservation from "./ColumnsReservation";
import NavBar from "../Home/NavBar";
import DataBill from "./DataBill";
import ColumnsBill from "./ColumnsBill";
import Detail from "./Detail";

function History({
  reservation,
  bill,
  handlePageBillChange,
  handlePageReservationChange,
  totalElementBill,
  totalElementReservation,
}) {
  const tabList = [
    {
      key: "tab1",
      tab: "Reservations",
    },
    {
      key: "tab2",
      tab: "Bills",
    },
  ];
  const [show, setShow] = useState(false);
  const [billDetail, setBillDetail] = useState([]);

  const showModal = () => setShow(!show);
  const CloseModal = () => setShow(false);

  const dataSource = DataReservation(reservation);

  const dataSourceBill = DataBill(bill);
  const columnsBill = ColumnsBill(showModal, setBillDetail);

  const contentList = {
    tab1: (
      <Table
        dataSource={dataSource}
        columns={ColumnsReservation}
        pagination={{
          total: totalElementReservation,
          onChange: handlePageReservationChange,
        }}
      />
    ),
    tab2: (
      <Table
        dataSource={dataSourceBill}
        columns={columnsBill}
        pagination={{
          total: totalElementBill,
          onChange: handlePageBillChange,
        }}
      />
    ),
  };
  const [activeTabKey1, setActiveTabKey1] = useState("tab1");
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };
  return (
    <>
      <NavBar />
      <Card
        style={{
          width: "100%",
          position: "absolute",
          top: 80,
          left: 0,
        }}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {contentList[activeTabKey1]}
      </Card>
      <Detail show={show} CloseModal={CloseModal} billDetail={billDetail} />
    </>
  );
}

export default History;
