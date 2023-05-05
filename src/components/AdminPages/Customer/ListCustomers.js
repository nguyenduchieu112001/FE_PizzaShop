import React from "react";
import { Container } from "react-bootstrap";
import Search from "antd/es/input/Search";
import { SearchOutlined } from "@material-ui/icons";
import { Table } from "@material-ui/core";
import Paginations from "../layout/Paginations";
import Customer from "./Customer";
import { Helmet } from "react-helmet";

function ListCustomers({
  customers,
  fetchData,
  onPageChange,
  totalPages,
  totalElement,
  setQuery,
}) {
  const handleSearch = (value) => {
    setQuery(value);
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          padding: "4% 0",
          textAlign: "center",
        }}
      >
        <Helmet>
          <title>Customers</title>
        </Helmet>
        <Container>
          <div className="py-4">
            <h1>
              <b>Product Manager</b>
            </h1>
            <h5>
              (Có tất cả <strong>{totalElement}</strong> người dùng)
            </h5>
            <div>
              <div style={{ float: "left" }}>
                <Search
                  placeholder="Customer Name"
                  enterButton={<SearchOutlined />}
                  size="midle"
                  // suffix={<SearchOutlined />}
                  onSearch={handleSearch}
                />
              </div>

              {/* <Button
              onClick={handleShow}
              className="btn btn-outline-primary"
              style={{ float: "right", color: "#fff", display: "flex", alignItems: "center" }}
            >
              <MdAddCircle className="mx-2" />
              Add Product
            </Button> */}
            </div>
            <Table className="table table-striped border shadow">
              <thead>
                <tr style={{ backgroundColor: "#007acc", color: "#fff" }}>
                  <th scope="col">#</th>
                  <th scope="col">Custome Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Address</th>
                  <th scope="col">Detail</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={customer.id}>
                    <Customer
                      customer={customer}
                      index={index}
                      fetchData={fetchData}
                    />
                  </tr>
                ))}
              </tbody>
            </Table>
            <Paginations totalPages={totalPages} onPageChange={onPageChange} />
          </div>
        </Container>
      </div>
    </>
  );
}

export default ListCustomers;
