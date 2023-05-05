import { Table } from "@material-ui/core";
import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { MdAddCircle } from "react-icons/md";
import Paginations from "../layout/Paginations";
import AddProductAPI from "./AddProductAPI";
import Product from "./Product";
import { SearchOutlined } from "@material-ui/icons";
import Search from "antd/es/input/Search";
import { Helmet } from "react-helmet";

function ListProducts({
  products,
  fetchData,
  onPageChange,
  totalPages,
  totalElement,
  setQuery,
}) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleSearch = (value) => {
    setQuery(value);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: "4% 0",
        textAlign: "center",
      }}
    >
      <Helmet>
        <title>Products</title>
      </Helmet>
      <Container>
        <div className="py-4">
          <h1>
            <b>Product Manager</b>
          </h1>
          <h5>
            (Có tất cả <strong>{totalElement}</strong> sản phẩm)
          </h5>
          <div>
            <div style={{ float: "left" }}>
              <Search
                placeholder="Product Name"
                enterButton
                size="midle"
                suffix={<SearchOutlined />}
                onSearch={handleSearch}
                
              />
            </div>

            <Button
              onClick={handleShow}
              className="btn btn-outline-primary"
              style={{
                float: "right",
                color: "#fff",
                display: "flex",
                alignItems: "center",
              }}
            >
              <MdAddCircle className="mx-2" />
              Add Product
            </Button>
          </div>
          <Table className="table table-striped border shadow">
            <thead>
              <tr style={{ backgroundColor: "#007acc", color: "#fff" }}>
                <th scope="col">#</th>
                <th scope="col" width="15%">
                  Product
                </th>
                <th scope="col">Product Name</th>
                <th scope="col">Default Price</th>
                <th scope="col">Description</th>
                <th scope="col">Created Date</th>
                <th scope="col">Updated Date</th>
                <th scope="col">Product Type</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <Product
                    product={product}
                    index={index}
                    fetchData={fetchData}
                  />
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginations totalPages={totalPages} onPageChange={onPageChange} />

          <Modal show={show} onHide={handleClose}>
            <ModalHeader closeButton>
              <ModalTitle>Add Product</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <AddProductAPI handleClose={handleClose} fetchData={fetchData} />
            </ModalBody>
            <ModalFooter>
              <Button variant="secondary" onClick={handleClose}>
                Close Button
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </Container>
    </div>
  );
}

export default ListProducts;
