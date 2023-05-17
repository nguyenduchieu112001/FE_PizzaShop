import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HandleHttpError } from "../../layout/HandleHttpError";
import { Modal } from "antd";

function ModalDelete({
  selectedRecord,
  fetchData,
  handleDeleteModalClose,
  showDeleteModal,
  product,
}) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleDeleteProductSize = async (selectedRecord) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/product-size/delete/${selectedRecord.key}`,
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      fetchData();
      handleDeleteModalClose();
      toast.success("Delete product size successful!", {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      HandleHttpError(error, navigate, "/admin");
    }
  };
  return (
    <Modal
      title="Delete Product Size"
      open={showDeleteModal}
      onCancel={handleDeleteModalClose}
      onOk={() => handleDeleteProductSize(selectedRecord)}
      okType="danger"
      okText="Yes"
      cancelText="No"
    >
      <h6 style={{ color: "red" }}>
        Are you sure you want to delete the product `{product.productName}` have
        size "{selectedRecord.size}"?
      </h6>
    </Modal>
  );
}

export default ModalDelete;
