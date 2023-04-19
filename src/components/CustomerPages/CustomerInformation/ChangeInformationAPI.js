import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ChangeInformation from "./ChangeInformation";
import {HandleHttpError} from "../../AdminPages/layout/HandleHttpError";
import { useNavigate } from "react-router-dom";

function ChangeInformationAPI({ customerData, setCustomerData }) {
  const [show, setShow] = useState("");
  const handleEditShow = () => setShow(true);
  const handleEditClose = () => setShow(false);
  const navigate = useNavigate();

  const handleEdit = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/customer/change-information/${customerData.id}`,
        customerData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      // update the customerData state with the new data from the response
      setCustomerData(response.data);
      toast.success("Customer information updated successfully.", {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      handleEditClose();
    } catch (error) {
      HandleHttpError(error, navigate, '/sign-in');
    }
  };

  return (
    <>
      <ChangeInformation
        handleEdit={handleEdit}
        customerData={customerData}
        setCustomerData={setCustomerData}
        show={show}
        handleEditClose={handleEditClose}
        handleEditShow={handleEditShow}
      />
    </>
  );
}

export default ChangeInformationAPI;
