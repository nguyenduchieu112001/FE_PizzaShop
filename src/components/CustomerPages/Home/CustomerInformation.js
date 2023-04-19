import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { BsPersonSquare } from "react-icons/bs";
import ChangeInformationAPI from "../CustomerInformation/ChangeInformationAPI";

function CustomerInformation() {
  const [show, setShow] = useState("");
  const [customerData, setCustomerData] = useState({
    userName: "",
    customerName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:8080/api/v1/customer/information`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    setCustomerData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Dropdown.Item onClick={handleShow}>
        <div style={{display: "flex"}}>
          <BsPersonSquare className="mx-4" style={{ fontSize: "150%" }} />
          Infor
        </div>
      </Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle>Information</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {customerData ? (
            <div>
              <p>Username: {customerData.userName}</p>
              <p>Customer Name: {customerData.customerName}</p>
              <p>Email: {customerData.email}</p>
              <p>Number phone: {customerData.phoneNumber}</p>
              <p>Address: {customerData.address}</p>
            </div>
          ) : (
            <p>Loading customer data...</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <ChangeInformationAPI
            customerData={customerData}
            setCustomerData={setCustomerData}
          />
        </ModalFooter>
      </Modal>
    </>
  );
}

export default CustomerInformation;
