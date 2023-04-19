import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteProductSize from "./DeleteProductSize";
import { toast } from "react-toastify";

function DeleteProductSizeAPI({ productSize, fetchData }) {
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
        `http://localhost:8080/api/v1/size/delete/${id}`,
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
      <DeleteProductSize
        productSize={productSize}
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

export default DeleteProductSizeAPI;
