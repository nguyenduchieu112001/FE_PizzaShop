import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteProductType from "./DeleteProductType";

function DeleteProductTypeAPI({ productType, fetchData }) {
  const [errMsg, setErrMsg] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false); // new state variable for showing/hiding the alert
  const [alertType, setAlertType] = useState(""); // new state variable for setting the alert type (e.g. success, danger)

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/product-type/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      handleCloseDelete(false);
      toast.success("Delete product type successful!", {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      fetchData();
      //   window.location.reload();
    } catch (error) {
      if (error.response?.status === 405) {
        setErrMsg(error.response?.data.message);
        setShowAlert(true);
        setAlertType("danger");
      }
      if (error.response?.status === 401) {
        navigate("/admin");
        localStorage.clear();
      }
    }
  };
  return (
    <>
      <DeleteProductType
        productType={productType}
        handleDelete={handleDelete}
        handleShowDelete={handleShowDelete}
        showDelete={showDelete}
        handleCloseDelete={handleCloseDelete}
        errMsg={errMsg}
        showAlert={showAlert}
        alertType={alertType}
      />
    </>
  );
}

export default DeleteProductTypeAPI;
