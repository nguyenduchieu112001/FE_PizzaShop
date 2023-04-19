import React, { useState } from "react";
import { GrInProgress } from "react-icons/gr";
import { FaShippingFast } from "react-icons/fa";
import { MdPaid } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import CustomerDetail from "./CustomerDetail";
import BillActions from "./BillActions";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { BsFillInfoCircleFill } from "react-icons/bs";
import BillDetail from "./BillDetail";
import moment from "moment/moment";

function Bill({ bill, index, fetchBill }) {
  const [show, setShow] = useState();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <>
      <th scope="row">{index + 1}</th>
      <th scope="row">{moment(bill.createdAt).format(`DD/MM/YYYY`)}</th>
      <th scope="row">{bill.total}</th>
      <th scope="row">
        <div style={{ display: "flex", marginLeft: "250px" }}>
          {bill.billStatus === "Processing" && <GrInProgress />}
          {bill.billStatus === "Shipping" && (
            <FaShippingFast className="mx-2" />
          )}
          {bill.billStatus === "Paid" && <MdPaid className="mx-2" />}
          {bill.billStatus === "Canceled" && (
            <ImCancelCircle className="mx-2" />
          )}
          {bill.billStatus}
        </div>
      </th>
      <th scope="row">
        <CustomerDetail bill={bill} />
      </th>
      <th scope="row">
        <Button
          onClick={handleShow}
          className="btn btn-outline-primary"
          style={{ color: "#fff" }}
        >
          <BsFillInfoCircleFill className="mx-2" />
          Detail
        </Button>
      </th>
      <th scope="row">
        <BillActions bill={bill} fetchBill={fetchBill} />
      </th>

      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle>Bill Detail</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <BillDetail bill={bill} />
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={handleClose}>
            Close Button
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Bill;
