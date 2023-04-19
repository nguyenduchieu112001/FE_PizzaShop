import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import EditProductSize from './EditProductSize';

function EditProductSizeAPI({ productSize, handleCloseEdit, fetchData }) {
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");
    const [showAlert, setShowAlert] = useState(false); // new state variable for showing/hiding the alert
    const [alertType, setAlertType] = useState(""); // new state variable for setting the alert type (e.g. success, danger)
    
    const handleEdit = async (form) => {
        const token = localStorage.getItem("token");
        try {
          await axios.put(
            `http://localhost:8080/api/v1/size/update/${productSize.id}`,
            form,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          );
          handleCloseEdit(false);
          toast.success("Update product type successfully!", {
            draggable: true,
            position: toast.POSITION.TOP_RIGHT,
          });
          fetchData()
        } catch (error) {
          if (error.response?.status === 400 || error.response?.status === 409) {
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
          <EditProductSize
            productSize={productSize}
            handleEdit={handleEdit}
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

export default EditProductSizeAPI
