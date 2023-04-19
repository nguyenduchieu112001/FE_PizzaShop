import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PayPal from "./PayPal";
import { HandleHttpError } from "../../AdminPages/layout/HandleHttpError";

function PayPalAPI({ numPeople, selectedDate, selectedHour }) {
  const [customerId, setCustomerId] = useState("");
  const navigate = useNavigate();
  const reservationDate = moment(selectedDate).format("YYYY-MM-DD");
  const reservation = {
    reservationDate,
    reservationTime: selectedHour,
    partySize: numPeople,
    total: numPeople,
    customer: { id: customerId },
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/api/v1/customer/information`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setCustomerId(parseInt(response.data.id));
    };

    fetchData();
  }, []);

  const bookTable = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:8080/api/v1/reservation/book-table`,
        reservation,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Reservation successfully!", {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/history")
    } catch (error) {
      HandleHttpError(error, navigate, "/sign-in");
    }
  };

  const createOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:8080/api/v1/reservation/create-order`,
        reservation,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      HandleHttpError(error, navigate, "/sign-in");
    }
  };
  return <PayPal createOrder={createOrder} bookTable={bookTable} />;
}

export default PayPalAPI;
