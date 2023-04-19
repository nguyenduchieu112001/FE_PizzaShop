import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HandleHttpError } from "../../AdminPages/layout/HandleHttpError";
import { useEffect } from "react";
import History from "./History";

function HistoryAPI() {
  const [reservation, setReservation] = useState([]);
  const [bill, setBill] = useState([]);
  const [pageBill, setPageBill] = useState(1);
  const [totalElementBill, setTotalElementBill] = useState(0);
  const [pageReservation, setPageReservation] = useState(1);
  const [totalElementReservation, setTotalElementReservation] = useState(0);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      if(token) {
        const responseCustomer = await axios.get(
          `http://localhost:8080/api/v1/customer/information`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        const customerId = responseCustomer.data.id;
  
        const responseReservation = await axios.get(
          `http://localhost:8080/api/v1/customer/reservation/${customerId}?page=${pageReservation}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setReservation(responseReservation.data.content);
        setTotalElementReservation(responseReservation.data.totalElement);
  
        const responseBill = await axios.get(
          `http://localhost:8080/api/v1/customer/bill/${customerId}?page=${pageBill}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setBill(responseBill.data.content);
        setTotalElementBill(responseBill.data.totalElement);
      } else {
        navigate("/sign-in")
      }
    } catch (error) {
      HandleHttpError(error, navigate, "/sign-in");
    }
  };

  const handlePageBillChange = (newPage) => {
    setPageBill(newPage);
  };

  const handlePageReservationChange = (newPage) => {
    setPageReservation(newPage);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageBill, pageReservation]);
  return (
    <History
      reservation={reservation}
      bill={bill}
      handlePageBillChange={handlePageBillChange}
      handlePageReservationChange={handlePageReservationChange}
      totalElementBill={totalElementBill}
      totalElementReservation={totalElementReservation}
    />
  );
}

export default HistoryAPI;
