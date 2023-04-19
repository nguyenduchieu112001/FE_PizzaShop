import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EditProduct from "./EditProduct";
import { HandleHttpError } from "../layout/HandleHttpError";

function EditProductAPI({ product, handleClose, fetchData }) {
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const [productName, setProductName] = useState(product.productName);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [selectedProductType, setSelectedProductType] = useState(
    product.productType.id
  );
  const [productTypes, setProductTypes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [image, setImage] = useState(null);
  const [showAlert, setShowAlert] = useState(false); // new state variable for showing/hiding the alert
  const [alertType, setAlertType] = useState(""); // new state variable for setting the alert type (e.g. success, danger)

  const token = localStorage.getItem("token");
  const handleEdit = async (form) => {
    try {
      await axios.put(
        `http://localhost:8080/api/v1/product/update/${product.id}`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Update Product successfully!", {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      handleClose(false);
      fetchData();
    } catch (error) {
      if (error.response?.status === 400) {
        setErrMsg(error.response?.message);
        setShowAlert(true);
        setAlertType("danger");
      }
    }
  };

  const handleImageUpload = async (formData) => {
    try {
      await axios.post(
        `http://localhost:8080/api/v1/product/${parseInt(product.id)}/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Update Product successfully!", {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      fetchData();
    } catch (error) {
      if (error.response?.status === 400) {
        setErrMsg(error.response?.message);
        setShowAlert(true);
        setAlertType("danger");
      }
      if (error.response?.status === 401) {
        navigate("/admin");
        localStorage.clear();
      }
    }
  };

  const fetchDataSize = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/size`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setSizes(response.data);
    } catch (error) {
      HandleHttpError(error, navigate);
    }
  };

  const fetchDataProductSize = async () => {
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
      setSelectedSizes(response.data.map((size) => size.size.id));
    } catch (err) {
      HandleHttpError(err, navigate);
    }
  };

  const fetchProductTypes = async () => {
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
    } catch (error) {
      HandleHttpError(error, navigate);
    }
  };

  useEffect(() => {
    fetchDataProductSize();
    fetchProductTypes();
    fetchDataSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSave = async (e) => {
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
    handleEdit(form);

    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      handleImageUpload(formData);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
      <EditProduct
        handleSave={handleSave}
        productName={productName}
        setProductName={setProductName}
        description={description}
        setDescription={setDescription}
        price={price}
        setPrice={setPrice}
        handleImageChange={handleImageChange}
        selectedProductType={selectedProductType}
        setSelectedProductType={setSelectedProductType}
        productTypes={productTypes}
        sizes={sizes}
        setSelectedSizes={setSelectedSizes}
        selectedSizes={selectedSizes}
      />
      {showAlert && (
        <div className={`alert alert-${alertType}`} role="alert">
          {alertType === "success" ? "Product updated successfully!" : errMsg}
        </div>
      )}
    </>
  );
}

export default EditProductAPI;
