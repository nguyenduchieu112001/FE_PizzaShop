import { Input, Modal } from "antd";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { Label } from "semantic-ui-react";
import { HandleHttpError } from "../../layout/HandleHttpError";
import { useNavigate } from "react-router-dom";

function ModalEdit({
  productPrice,
  fetchData,
  handleEditModalClose,
  showEditModal,
  selectedRecord,
  setProductPrice,
}) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleEditProductSize = async (selectedRecord) => {
    try {
      const request = { productPrice };
      await axios.put(
        `http://localhost:8080/api/v1/product-size/update/${selectedRecord.key}`,
        request,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Update Product Size successfully!", {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      fetchData();
      handleEditModalClose();
    } catch (error) {
      HandleHttpError(error, navigate, "/admin");
    }
  };
  return (
    <Modal
      title="Edit Product Size"
      open={showEditModal}
      onCancel={handleEditModalClose}
      onOk={() => handleEditProductSize(selectedRecord)}
      okButtonProps={{className: "bg-[#1677ff]"}}
    >
      <div className="mb-3">
        <Label sm={5}>Size</Label>
        <Input value={selectedRecord.size} disabled />
      </div>
      <div className="mb-3">
        <Label sm={5}>Percent Price (%)</Label>
        <Input value={selectedRecord.percentPrice} disabled />
      </div>
      <div className="mb-3">
        <Label sm={5}>Product Price (VNĐ)</Label>
        <Input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
      </div>
    </Modal>
  );
}

export default ModalEdit;
