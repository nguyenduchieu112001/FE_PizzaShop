import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import EditCustomer from "./EditCustomer";

function EditCustomerAPI({ customer, handleClose, fetchData }) {
  const [customerName, setCustomerName] = useState(customer.customerName);
  const [email, setEmail] = useState(customer.email);
  const [phoneNumber, setPhoneNumber] = useState(customer.phoneNumber);
  const [address, setAddress] = useState(customer.address);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [errMsg, setErrMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false); // new state variable for showing/hiding the alert
  const [alertType, setAlertType] = useState("");

  const handleEdit = async (form) => {
    try {
      await axios.put(
        `http://localhost:8080/api/v1/customer/change-information/${customer.id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success("Update Customer successfully!", {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      handleClose(false);
      fetchData();
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
  const handleSave = async (e) => {
    e.preventDefault();
    const form = {
      customerName,
      phoneNumber,
      email,
      address,
    };
    handleEdit(form);
  };
  return (
    <>
      <EditCustomer
        handleSave={handleSave}
        customerName={customerName}
        setCustomerName={setCustomerName}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        email={email}
        setEmail={setEmail}
        address={address}
        setAddress={setAddress}
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

export default EditCustomerAPI;
