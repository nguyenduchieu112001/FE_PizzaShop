import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { MdOutlineDelete } from "react-icons/md";

function DeleteProductType({
  productType,
  handleDelete,
  handleShowDelete,
  showDelete,
  handleCloseDelete,
  errMsg,
  showAlert,
  alertType,
}) {
  return (
    <>
      <Button
        className="btn btn-outline-danger mx-2"
        onClick={handleShowDelete}
      >
        <div style={{ display: "flex" }}>
          <MdOutlineDelete />
          Delete
        </div>
      </Button>

      <Modal show={showDelete} onHide={handleCloseDelete}>
        <ModalHeader closeButton>
          <ModalTitle>Delete Product Type</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p>
            Are you sure you want to delete the product type "{productType.name}
            "?
          </p>
          {showAlert && (
            <div className={`alert alert-${alertType}`} role="alert">
              {alertType === "success"
                ? "Product type updated successfully!"
                : errMsg}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(productType.id)}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default DeleteProductType;
