import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddProductType from "./AddProductType";

function AddProductTypeAPI({ handleClose, fetchData }) {
  const [productType, setProductType] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false); // new state variable for showing/hiding the alert
  const [alertType, setAlertType] = useState(""); // new state variable for setting the alert type (e.g. success, danger)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `http://localhost:8080/api/v1/product-type/add`,
        { name: productType },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setProductType("");
      handleClose(false);
      toast.success("Add new product type successful!", {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      fetchData();
    } catch (error) {
      if (error.response?.status === 409) {
        setErrMsg(error.response?.data.message);
        setShowAlert(true);
        setAlertType("danger");
      }
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/admin");
        localStorage.clear()
      }
    }
  };
  return (
    <>
      <AddProductType
        productType={productType}
        setProductType={setProductType}
        errMsg={errMsg}
        handleSubmit={handleSubmit}
      />
      {showAlert && (
        <div className={`alert alert-${alertType}`} role="alert">
          {alertType === "success"
            ? "Product type updated successfully!"
            : errMsg}
        </div>
      )}
    </>
  );
}

export default AddProductTypeAPI;
