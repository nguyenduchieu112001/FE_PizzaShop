import { SearchOutlined } from "@material-ui/icons";
import { Space } from "antd";
import Search from "antd/es/input/Search";
import React from "react";
import { Container, Table } from "react-bootstrap";
import Paginations from "../layout/Paginations";
import Bill from "./Bill";
import { Helmet } from "react-helmet";
function ListBills({
  bills,
  fetchBill,
  onPageChange,
  totalPages,
  totalElement,
  setQuery,
}) {
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
        <title>Bills</title>
      </Helmet>
      <Container>
        <div className="py-3">
          <h1>
            <b>Bill Manager</b>
          </h1>
          <br />
          <div>
            <h5 style={{ float: "left" }}>
              {" "}
              Có tất cả <strong>{totalElement}</strong> đơn hàng
            </h5>
          </div>
          <Space direction="vertical" style={{ float: "right" }}>
            <Search
              placeholder="nhập code để tìm kiếm"
              enterButton
              size="large"
              suffix={<SearchOutlined />}
              onSearch={handleSearch}
            />
          </Space>
          <Table className="table table-striped border shadow">
            <thead>
              <tr style={{ backgroundColor: "#007acc", color: "#fff" }}>
                <th scope="col">#</th>
                <th scope="col">Code</th>
                <th scope="col">Created Date</th>
                <th scope="col">Total</th>
                <th scope="col">Status</th>
                <th scope="col">Customer</th>
                <th scope="col">Bill Details</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill, index) => (
                <tr key={bill.id}>
                  <Bill bill={bill} index={index} fetchBill={fetchBill} />
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginations totalPages={totalPages} onPageChange={onPageChange} />
        </div>
      </Container>
    </div>
  );
}

export default ListBills;
