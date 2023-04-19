import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import { HandleHttpError } from "../../layout/HandleHttpError";

function ProductDetailAPI({ product }) {
  const [productDetails, setProductDetails] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const fetchData = async () => {
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
      setProductDetails(response.data);
    } catch (err) {
      HandleHttpError(err, navigate, "/admin");
    }
  };

  const fetchDataSize = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/size", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setSizes(response.data);
    } catch (err) {
      HandleHttpError("Error fetching data!", navigate, "/admin");
    }
  };

  useEffect(() => {
    fetchData();
    fetchDataSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProductDetail
      product={product}
      productDetails={productDetails}
      show={show}
      handleShow={handleShow}
      handleClose={handleClose}
      fetchData={fetchData}
      sizes={sizes}
    />
  );
}

export default ProductDetailAPI;
