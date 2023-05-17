import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { FcPaid, FcCancel } from "react-icons/fc";

import { AiFillSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { HandleHttpError } from "../layout/HandleHttpError";

function ReservationActions({ reservation, fetchData }) {
  const navigate = useNavigate();

  const handleCancel = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:8080/api/v1/reservation/change-status-canceled/${reservation.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Update reservation successful!", {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      fetchData();
    } catch (error) {
      HandleHttpError("Update reservation false!", navigate, "/admin")
    }
  };

  const handlePaid = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:8080/api/v1/reservation/change-status-paid/${reservation.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Update reservation successful!", {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      fetchData();
    } catch (error) {
      HandleHttpError("Update reservation false!", navigate, "/admin")
    }
  };
  return (
    <DropdownButton
      id="dropdown-basic-button"
      title={
        <>
          <AiFillSetting className="mx-2" />
          Action
        </>
      }
      disabled={
        reservation.reservationStatus === "Canceled" ||
        reservation.reservationStatus === "Paid"
      }
    >
      <Dropdown.Item onClick={handleCancel}>
        <div style={{ display: "flex" }}>
          <FcCancel className="mx-2" /> Cancel
        </div>
      </Dropdown.Item>
      <Dropdown.Item onClick={handlePaid}>
        <div style={{ display: "flex" }}>
          <FcPaid className="mx-2" /> Paid
        </div>
      </Dropdown.Item>
    </DropdownButton>
  );
}

export default ReservationActions;
