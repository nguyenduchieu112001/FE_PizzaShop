import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HandleHttpError } from "../../../AdminPages/layout/HandleHttpError";
import ModalContent from "./ModalContent";
import { toast } from "react-toastify";

function ModalContentAPI({ product, show, handleClose, handleAddToCart }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [productSizes, setProductSizes] = useState([]);

  const fetchProductSize = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/product-size/product/${product.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setProductSizes(response.data);
    } catch (error) {
      HandleHttpError(error, navigate);
    }
  };

  // Function to fetch data and update product with image URL
  const fetchData = async (product) => {
    try {
      // Fetch image URL for the product
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay of 1 second
      const {
        config: { url },
      } = await axios.get(`http://localhost:8080${product.image}`);

      // Update product with image URL
      product.imageUrl = url;
    } catch (error) {
      toast.error(`Error fetching image for product ${product.productName}!`, {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <ModalContent
      productSizes={productSizes}
      product={product}
      show={show}
      handleClose={handleClose}
      fetchProductSize={fetchProductSize}
      fetchData={fetchData}
      handleAddToCart={handleAddToCart}
    />
  );
}

export default ModalContentAPI;
