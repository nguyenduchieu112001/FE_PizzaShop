import React from "react";
import { Table } from "react-bootstrap";

function BillDetail({ bill }) {
  return (
    <>
      <Table className="table table-striped border shadow">
        <thead>
          <tr style={{ backgroundColor: "#007acc", color: "#fff" }}>
            <th scope="col">#</th>
            <th scope="col">Product</th>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Product Type</th>
            <th scope="col">Product Size</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(bill.orders) &&
            bill.orders.map((detail, index) => (
              <tr key={detail.id}>
                <th scope="row">{index + 1}</th>
                <th scope="row">
                  {detail.productSize.product.image && (
                    <img
                      src={`http://localhost:8080${detail.productSize.product.image}`}
                      alt={detail.productSize.product.productName}
                      width="80"
                      height="80"
                    />
                  )}
                </th>
                <th scope="row">{detail.productSize.product.productName}</th>
                <th scope="row">{detail.productSize.productPrice}</th>
                <th scope="row">{detail.quantity}</th>
                <th scope="row">{detail.productSize.product.productType.name}</th>
                <th scope="row">{detail.productSize.size.name}</th>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}

export default BillDetail;
