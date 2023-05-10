import { SearchOutlined } from "@material-ui/icons";
import Search from "antd/es/input/Search";
import React from "react";
import { Container, Table } from "react-bootstrap";
import Paginations from "../layout/Paginations";
import Reservation from "./Reservation";
import { Helmet } from "react-helmet";
import { Space } from "antd";
function ListReservations({
  reservations,
  fetchData,
  onPageChange,
  totalPages,
  totalElements,
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
        <title>Reservations</title>
      </Helmet>
      <Container>
        <div className='"py-3'>
          <h1>
            <b>Reservation Manager</b>
          </h1>
          <br />
          <div>
            <h5 style={{ float: "left" }}>
              Có tất cả <strong>{totalElements}</strong> đặt trước
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
                <th scope="col">Reservation Date</th>
                <th scope="col">Reservation Time</th>
                <th scope="col">Party Size</th>
                <th scope="col">Status</th>
                <th scope="col">Customer</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation, index) => (
                <tr key={reservation.id}>
                  <Reservation
                    reservation={reservation}
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
  );
}

export default ListReservations;
