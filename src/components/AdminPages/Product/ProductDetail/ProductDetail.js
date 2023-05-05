import { Button, Modal, Table } from "antd";
import React, { useState } from "react";
import { IoInformationCircleSharp } from "react-icons/io5";
import { MdAddCircle } from "react-icons/md";
import { Dropdown } from "react-bootstrap";
import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import ModalDelete from "./ModalDelete";
import columns from "./Columns";
import Data from "./Data";

function ProductDetail({
  product,
  productDetails,
  show,
  handleShow,
  handleClose,
  fetchData,
  sizes,
}) {
  const [productPrice, setProductPrice] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState("");

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setProductPrice(record.price);
    setShowEditModal(true);
  };

  const handleDelete = (record) => {
    setSelectedRecord(record);
    setShowDeleteModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
  };

  const columnsData = columns(handleEdit, handleDelete);
  const data = Data(productDetails);
  const [showModal, setShowModal] = useState(false);
  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  return (
    <>
      <Dropdown.Item onClick={handleShow}>
        <div style={{ display: "flex" }}>
          <IoInformationCircleSharp className="mx-2" onClick={handleClose} />
          Detail
        </div>
      </Dropdown.Item>

      <Modal open={show} onCancel={handleClose} onOk={handleClose} okButtonProps={{className:"bg-[#1677ff]"}}>
        <div>
          <Button
            onClick={handleModalShow}
            className="btn btn-outline-primary"
            style={{
              float: "left",
              display: "flex",
            }}
          >
            <MdAddCircle className="mx-2" />
            Add Product Size
          </Button>
        </div>
        <Table columns={columnsData} dataSource={data} />

        <ModalAdd
          sizes={sizes}
          product={product}
          handleModalClose={handleModalClose}
          fetchData={fetchData}
          showModal={showModal}
          productDetails={productDetails}
        />

        <ModalEdit
          productPrice={productPrice}
          fetchData={fetchData}
          handleEditModalClose={handleEditModalClose}
          showEditModal={showEditModal}
          selectedRecord={selectedRecord}
          setProductPrice={setProductPrice}
        />

        <ModalDelete
          selectedRecord={selectedRecord}
          fetchData={fetchData}
          handleDeleteModalClose={handleDeleteModalClose}
          showDeleteModal={showDeleteModal}
          product={product}
        />
      </Modal>
    </>
  );
}

export default ProductDetail;
