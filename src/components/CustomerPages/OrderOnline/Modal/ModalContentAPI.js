import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HandleHttpError } from "../../../AdminPages/layout/HandleHttpError";
import ModalContent from "./ModalContent";

function ModalContentAPI({
  defaultproductSize,
  show,
  handleClose,
  handleAddToCart,
}) {
  // const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [productSizes, setProductSizes] = useState([]);
  // console.log(defaultproductSize);

  const fetchProductSize = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/product-size/product/${defaultproductSize.product.id}`,
        {
          withCredentials: true,
        }
      );
      setProductSizes(response.data);
    } catch (error) {
      HandleHttpError(error, navigate);
    }
  };

  return (
    <ModalContent
      productSizes={productSizes}
      defaultproductSize={defaultproductSize}
      show={show}
      handleClose={handleClose}
      fetchProductSize={fetchProductSize}
      handleAddToCart={handleAddToCart}
    />
  );
}

export default ModalContentAPI;
