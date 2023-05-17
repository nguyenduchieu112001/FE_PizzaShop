import React, { useState } from "react";
import {
  Button,
  Dropdown,
  DropdownButton,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { AiFillSetting } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import EditCustomerAPI from "./EditCustomerAPI";
import CustomerDetailAPI from "./CustomerDetail/CustomerDetailAPI";

function Customer({ customer, index, fetchData }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  const handleClose = () => setShow(false);

  return (
    <>
      <th scope="row">{index + 1}</th>
      <th scope="row" style={{ textAlign: "center" }}>
        {customer.customerName}
      </th>
      <th scope="row">{customer.userName}</th>
      <th scope="row">{customer.email}</th>
      <th scope="row" style={{ textAlign: "left" }}>
        {customer.phoneNumber}
      </th>
      <th scope="row">{customer.address}</th>
      <th scope="row">
        <CustomerDetailAPI customer={customer} />
      </th>
      <th scope="row">
        <DropdownButton
          id="dropdown-basic-button"
          title={
            <>
              <AiFillSetting className="mx-2" />
              Action
            </>
          }
        >
          <Dropdown.Item onClick={handleShow}>
            <div style={{ display: "flex" }}>
              <FiEdit className="mx-2" /> Edit
            </div>
          </Dropdown.Item>
          {/* <DeleteCustomerAPI customer={customer} fetchData={fetchData} /> */}
        </DropdownButton>
      </th>

      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle>Edit Customer</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <EditCustomerAPI
            customer={customer}
            handleClose={handleClose}
            fetchData={fetchData}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={handleClose}>
            Close Button
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Customer;
