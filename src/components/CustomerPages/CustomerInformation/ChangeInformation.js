import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { Label } from "semantic-ui-react";

function ChangeInformation({
  handleEdit,
  customerData,
  setCustomerData,
  show,
  handleEditClose,
  handleEditShow,
}) {
  return (
    <>
      <Button variant="secondary" onClick={handleEditShow}>
        Change Information
      </Button>

      <Modal show={show} onHide={handleEditClose}>
        <ModalHeader closeButton>
          <ModalTitle>Edit Information</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <form>
            <Label htmlFor="customerName">Customer Name:</Label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={customerData.customerName}
              onChange={(e) =>
                setCustomerData({
                  ...customerData,
                  customerName: e.target.value,
                })
              }
            />

            <Label htmlFor="email">Email:</Label>
            <input
              type="email"
              id="email"
              name="email"
              value={customerData.email}
              onChange={(e) =>
                setCustomerData({ ...customerData, email: e.target.value })
              }
            />

            <Label htmlFor="phoneNumber">Phone Number:</Label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={customerData.phoneNumber}
              onChange={(e) =>
                setCustomerData({
                  ...customerData,
                  phoneNumber: e.target.value,
                })
              }
            />

            <Label htmlFor="address">Address:</Label>
            <input
              type="text"
              id="address"
              name="address"
              value={customerData.address}
              onChange={(e) =>
                setCustomerData({ ...customerData, address: e.target.value })
              }
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={handleEditClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ChangeInformation;
