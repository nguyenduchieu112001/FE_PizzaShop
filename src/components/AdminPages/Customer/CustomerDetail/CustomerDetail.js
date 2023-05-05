import { Card, Modal, Table } from "antd";
import React, { useState } from "react";
import DataReservation from "./DataReservation";
import DataBill from "./DataBill";
import ColumnsReservation from "./ColumnsReservation";
import ColumnsBill from "./ColumnsBill";
import { Button } from "react-bootstrap";
import { BsFillInfoCircleFill } from "react-icons/bs";
import Detail from "./Detail";

function CustomerDetail({
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
  const [showDetail, setShowDetail] = useState(false);
  const handleShowDetail = () => setShowDetail(!showDetail);
  const handleCloseDetail = () => setShowDetail(false);
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
      <Button
        onClick={handleShowDetail}
        className="btn btn-outline-primary"
        style={{ color: "#fff" }}
      >
        <BsFillInfoCircleFill className="mx-2" />
        Detail
      </Button>

      <Modal
        title={
          <h1>
            <b>Customer's History</b>
          </h1>
        }
        open={showDetail}
        onCancel={handleCloseDetail}
        onOk={handleCloseDetail}
        okButtonProps={{className:"bg-[#1677ff]"}}
        width={1000}
      >
        <Card
          className="table-striped shadow"
          tabList={tabList}
          activeTabKey={activeTabKey1}
          onTabChange={onTab1Change}
        >
          {contentList[activeTabKey1]}
        </Card>
        <Detail show={show} CloseModal={CloseModal} billDetail={billDetail} />
      </Modal>
    </>
  );
}

export default CustomerDetail;
