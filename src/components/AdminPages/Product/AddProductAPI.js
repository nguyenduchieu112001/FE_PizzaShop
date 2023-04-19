import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddProduct from "./AddProduct";
import { HandleHttpError } from "../layout/HandleHttpError";

function AddProductAPI({ handleClose, fetchData }) {
  const navigate = useNavigate();
  const [productTypes, setProductTypes] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [selectedProductType, setSelectedProductType] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const token = localStorage.getItem("token");

  const fetchDataProductType = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/product-type",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setProductTypes(response.data);
    } catch (err) {
      HandleHttpError("Error fetching data!", navigate, "/admin")
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
      HandleHttpError("Error fetching data!", navigate, "/admin")
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = {
      productName,
      description,
      price,
      sizes: selectedSizes.map((id) => ({ id })),
      productType: {
        id: selectedProductType,
      },
    };

    try {
      const productResponse = await axios.post(
        `http://localhost:8080/api/v1/product/add`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const formData = new FormData();
      formData.append("file", image);
        await axios.post(
          `http://localhost:8080/api/v1/product/${parseInt(productResponse.data.id)}/image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

      setSelectedProductType("");
      setProductName("");
      setDescription("");
      setPrice("");
      setImage("");

      toast.success("add new product successful!", {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });

      handleClose(false);
      setTimeout(() => {
        fetchData();
      }, 1000);
    } catch (error) {
      HandleHttpError(error, navigate, "/admin")
    }
  };

  useEffect(() => {
    fetchDataProductType();
    fetchDataSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AddProduct
      productTypes={productTypes}
      setProductTypes={setProductTypes}
      selectedProductType={selectedProductType}
      setSelectedProductType={setSelectedProductType}
      productName={productName}
      setProductName={setProductName}
      description={description}
      setDescription={setDescription}
      price={price}
      setPrice={setPrice}
      image={image}
      setImage={setImage}
      handleSubmit={handleSubmit}
      sizes={sizes}
      selectedSizes={selectedSizes}
      setSelectedSizes={setSelectedSizes}
    />
  );
}

export default AddProductAPI;
