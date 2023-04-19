import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import { FiEdit } from "react-icons/fi";
import EditProductSizeAPI from './EditProductSizeAPI';
import DeleteProductSizeAPI from './DeleteProductSizeAPI';

function ProductSize({ productSize, index, fetchData }) {
    const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);
  return (
    <>
      <th scope="row">{index + 1}</th>
      <th scope="row">{productSize.name}</th>
      <th scope="row">{productSize.percentPrice}</th>
      <th scope="row">
        <Button onClick={handleShowEdit} className="btn btn-outline-info mx-2">
          <FiEdit /> Edit
        </Button>

        <DeleteProductSizeAPI productSize={productSize} fetchData={fetchData}/>
      </th>

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <ModalHeader closeButton>
          <ModalTitle>Edit Product Type</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <EditProductSizeAPI
            productSize={productSize}
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
  )
}

export default ProductSize
