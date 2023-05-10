import { Table } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import Search from "antd/es/input/Search";
import React, { useState } from "react";
import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "react-bootstrap";
import { MdAddCircle } from "react-icons/md";
import { HeaderContent } from "semantic-ui-react";
import ProductSize from "./ProductSize";
import AddProductSizeAPI from "./AddProductSizeAPI";
import Paginations from "../layout/Paginations";
import { Helmet } from "react-helmet";

function ListProductSizes({
  productSizes,
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
        <title>Product Sizes</title>
      </Helmet>
      <Container>
        <div className="my-1">
          <h1>
            <b>Product Size Manager</b>
          </h1>
          <p>
            Có tất cả <strong>{totalElement}</strong> loại sản phẩm
          </p>
          <br />
          <div>
            <div style={{ float: "left" }}>
              <Search
                placeholder="Product Size Name"
                enterButton={<SearchOutlined />}
                size="midle"
                // suffix={<SearchOutlined />}
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
              Add Product Size
            </Button>
          </div>
          <Table className="table table-striped border shadow">
            <thead>
              <tr style={{ backgroundColor: "#007acc", color: "#fff" }}>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Percent Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {productSizes.map((productSize, index) => (
                <tr key={productSize.id}>
                  <ProductSize
                    productSize={productSize}
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
              <HeaderContent>Add Product Type</HeaderContent>
            </ModalHeader>
            <ModalBody>
              <AddProductSizeAPI
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
        </div>
      </Container>
    </div>
  );
}

export default ListProductSizes;
