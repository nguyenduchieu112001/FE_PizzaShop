import { Input, Modal, Select } from "antd";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { Label } from "semantic-ui-react";
import { HandleHttpError } from "../../layout/HandleHttpError";
import { useNavigate } from "react-router-dom";

function ModalAdd({
  sizes,
  product,
  handleModalClose,
  fetchData,
  showModal,
  productDetails,
}) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const options = [];
  // eslint-disable-next-line array-callback-return
  sizes.map((size) => {
    options.push({
      key: size.id,
      label: size.name,
      value: size.name,
    });
  });
  const handleAddProductSize = async () => {
    try {
      const productSize = {
        product: { id: product.id },
        sizes: options.map((option) => ({ id: option.key })),
      };
      await axios.post(
        `http://localhost:8080/api/v1/product-size/add`,
        productSize,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      handleModalClose();
      fetchData();
      toast.success("Update product size successful!", {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      HandleHttpError(error, navigate, "/admin");
    }
  };
  return (
    <Modal
      title="Add Product Size"
      open={showModal}
      onOk={() => handleAddProductSize()}
      onCancel={handleModalClose}
    >
      <div className="mb-3">
        <Label sm={5}>Product Name</Label>
        <Input value={product.productName} disabled />
      </div>
      <div className="mb-3">
        <Label sm={5}>Sizes</Label>
        {/* <Input value={0} /> */}
        <Select
          mode="multiple"
          allowClear
          style={{
            width: "100%",
          }}
          placeholder="Please select"
          defaultValue={productDetails.map(
            (productSize) => productSize.size.name
          )}
          options={options}
        />
      </div>
    </Modal>
  );
}

export default ModalAdd;
