import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import moment from "moment";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import EditProductAPI from "./EditProductAPI";
import DeleteProductAPI from "./DeleteProductAPI";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { AiFillSetting } from "react-icons/ai";
import ProductDetailAPI from "./ProductDetail/ProductDetailAPI";

const Product = ({ product, index, fetchData }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <th scope="row">{index + 1}</th>
      <th scope="row" style={{ textAlign: "center" }}>
        {product.imageUrl && (
          <img
            style={{ display: "block", margin: "0 auto" }}
            src={product.imageUrl}
            alt={product.productName}
            width="40%"
            height="40%"
          />
        )}
      </th>
      <th scope="row">{product.productName}</th>
      <th scope="row">{product.price}</th>
      <th scope="row" style={{ textAlign: "left" }}>
        {product.description}
      </th>
      <th scope="row">{moment(product.createdAt).format("DD/MM/yyyy")}</th>
      <th scope="row">{moment(product.updatedAt).format("DD/MM/yyyy")}</th>
      <th scope="row">{product.productType.name}</th>
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
          <DeleteProductAPI product={product} fetchData={fetchData} />
          <ProductDetailAPI product={product} />
        </DropdownButton>
      </th>

      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle>Edit Product</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <EditProductAPI
            product={product}
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
};

export default Product;
