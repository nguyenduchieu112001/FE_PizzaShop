import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaShippingFast } from "react-icons/fa";
import { MdPaid } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { AiFillSetting } from "react-icons/ai";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { HandleHttpError } from "../layout/HandleHttpError";

function BillActions({ bill, fetchBill }) {
  const navigate = useNavigate();
  const handleShipping = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:8080/api/v1/bill/change-status-shipping/${bill.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Update bill successful!", {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      fetchBill();
    } catch (error) {
      HandleHttpError(`Update bill false!`, navigate, "/admin")
    }
  };

  const handlePaid = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:8080/api/v1/bill/change-status-paid/${bill.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Update bill successful!", {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      fetchBill();
    } catch (error) {
      HandleHttpError(`Update bill false!`, navigate, "/admin")
    }
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:8080/api/v1/bill/change-status-canceled/${bill.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Update bill successful!", {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      fetchBill();
    } catch (error) {
      HandleHttpError(`Update bill false!`, navigate, "/admin")
    }
  };
  return (
    <DropdownButton
      id="dropdown-basic-button"
      title={
        <>
          <AiFillSetting className="mx-2"/>
          Action
        </>
      }
      disabled={
        bill.billStatus === "Canceled" ||
        bill.billStatus === "Paid"
      }
    >
      <Dropdown.Item onClick={handleShipping}>
        <div style={{display: "flex"}}><FaShippingFast className="mx-2"/> Shipping</div>
      </Dropdown.Item>
      <Dropdown.Item onClick={handlePaid}>
        <div style={{display: "flex"}}><MdPaid className="mx-2"/> Paid</div>
      </Dropdown.Item>
      <Dropdown.Item onClick={handleCancel}>
        <div style={{display: "flex"}}><ImCancelCircle className="mx-2"/> Cancel</div>
      </Dropdown.Item>
    </DropdownButton>
  );
}

export default BillActions;
