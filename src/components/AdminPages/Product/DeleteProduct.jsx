import React from "react";
import {
  Button,
  Dropdown,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { MdOutlineDelete } from "react-icons/md";

function DeleteProduct({
  product,
  handleCloseDeleteModal,
  handleShowDeleteModal,
  handleDelete,
  showDeleteModal,
}) {
  return (
    <>
      <Dropdown.Item onClick={handleShowDeleteModal}>
        <div style={{ display: "flex" }}>
          <MdOutlineDelete className="mx-2" onClick={handleShowDeleteModal} />
          Delete
        </div>
      </Dropdown.Item>

      {/* Delete Product Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <ModalHeader closeButton>
          <ModalTitle>Delete Product</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p>
            Are you sure you want to delete the product "{product.productName}"?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(product.id)}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default DeleteProduct;
