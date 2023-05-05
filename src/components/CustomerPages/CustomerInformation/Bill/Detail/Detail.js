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
      width="70%"
      okButtonProps={{ className: "bg-[#1677ff]" }}
    >
      <Table
        dataSource={dataSource}
        columns={ColumnsDetail}
        scroll={{ x: 500 }}
      />
    </Modal>
  );
}

export default Detail;
