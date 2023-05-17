import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteProduct from "./DeleteProduct";
import { HandleHttpError } from "../layout/HandleHttpError";

function DeleteProductAPI({ product, fetchData }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate()
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8080/api/v1/product/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      handleCloseDeleteModal(false);
      fetchData();
      toast.success("Delete product successful!", {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      HandleHttpError(err, navigate, "/admin")
    }
  };

  return (
    <>
      <DeleteProduct
        product={product}
        handleCloseDeleteModal={handleCloseDeleteModal}
        handleShowDeleteModal={handleShowDeleteModal}
        handleDelete={handleDelete}
        showDeleteModal={showDeleteModal}
      />
    </>
  );
}

export default DeleteProductAPI;
