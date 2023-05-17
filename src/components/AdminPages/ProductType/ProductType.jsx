import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import DeleteProductTypeAPI from "./DeleteProductTypeAPI";
import EditProductTypeAPI from "./EditProductTypeAPI";

function ProductType({ productType, index, fetchData }) {
  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);
  return (
    <>
      <th scope="row">{index + 1}</th>
      <th scope="row">{productType.name}</th>
      <th scope="row">
        <Button onClick={handleShowEdit} className="btn btn-outline-info mx-2" >
          <div style={{display: "flex"}}><FiEdit /> Edit</div>
        </Button>

        <DeleteProductTypeAPI productType={productType} fetchData={fetchData}/>
      </th>

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <ModalHeader closeButton>
          <ModalTitle>Edit Product Type</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <EditProductTypeAPI
            productType={productType}
            handleCloseEdit={handleCloseEdit}
            fetchData={fetchData}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close Button
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ProductType;
