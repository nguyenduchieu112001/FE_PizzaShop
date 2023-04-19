import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OrderOnline from "./OrderOnline";
import { HandleHttpError } from "../../../AdminPages/layout/HandleHttpError";

function OrderOnlineAPI() {
  const [productTypes, setProductTypes] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token === null) {
      navigate("/sign-in");
    } else {
      const fetchData = async () => {
        try {
          const [productTypeResponse, productResponse] = await Promise.all([
            axios.get(`http://localhost:8080/api/v1/product-type`, {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }),
            axios.get(`http://localhost:8080/api/v1/product/menu`, {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }),
          ]);
          setProductTypes(productTypeResponse.data);

          const products = productResponse.data.map((product) => ({
            ...product,
            id: parseInt(product.id),
          }));

          const imageUrls = await axios.all(
            products.map(async (product) => {
              try {
                const {
                  config: { url },
                } = await axios.get(`http://localhost:8080${product.image}`);
                return url;
              } catch (error) {
                toast.error(
                  `Error fetching image for product ${product.productName}!`,
                  {
                    draggable: true,
                    position: toast.POSITION.TOP_RIGHT,
                  }
                );
                return null;
              }
            })
          );

          const updatedProducts = products.map((product, index) => ({
            ...product,
            imageUrl: imageUrls[index],
          }));

          setProducts(updatedProducts);
        } catch (error) {
          HandleHttpError("Error fetching data!", navigate, "/sign-in");
        }
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <OrderOnline products={products} productTypes={productTypes} />;
}

export default OrderOnlineAPI;
