import { Modal, Table } from "antd";
import React from "react";
import DataDetail from "./DataDetail";
import ColumnsDetail from "./ColumnsDetail";

function Detail({ show, CloseModal, billDetail }) {
  const dataSource = DataDetail(billDetail);
  return (
    <Modal
      open={show}
      onCancel={CloseModal}
      onOk={CloseModal}
      okButtonProps={{ className: "bg-[#1677ff]" }}
      width="70%"
    >
      <Table
        className="table table-striped shadow border"
        dataSource={dataSource}
        columns={ColumnsDetail}
        scroll={{ x: 500 }}
      />
    </Modal>
  );
}

export default Detail;
