import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HandleHttpError } from "../../../AdminPages/layout/HandleHttpError";
import ChangeInformation from "./ChangeInformation";

function ChangeInformationAPI({ customer, setCustomer, fetchData }) {
  const [show, setShow] = useState("");
  const handleEditShow = () => setShow(true);
  const handleEditClose = () => setShow(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleEdit = async (values) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/customer/change-information/${customer.id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      // update the customerData state with the new data from the response
      setCustomer(response.data);
      toast.success("Customer information updated successfully.", {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      handleEditClose();
      fetchData();
    } catch (error) {
      HandleHttpError(error, navigate, "/sign-in");
    }
  };

  return (
    <ChangeInformation
      handleEdit={handleEdit}
      customer={customer}
      show={show}
      handleEditClose={handleEditClose}
      handleEditShow={handleEditShow}
    />
  );
}

export default ChangeInformationAPI;
