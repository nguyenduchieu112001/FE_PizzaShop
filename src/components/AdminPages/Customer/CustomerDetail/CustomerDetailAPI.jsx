import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HandleHttpError } from "../../layout/HandleHttpError";
import CustomerDetail from "./CustomerDetail";

function CustomerDetailAPI({ customer }) {
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
      const responseReservation = await axios.get(
        `http://localhost:8080/api/v1/customer/reservation/${customer.id}?page=${pageReservation}`,
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
        `http://localhost:8080/api/v1/customer/bill/${customer.id}?page=${pageBill}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setBill(responseBill.data.content);
      setTotalElementBill(responseBill.data.totalElement);
    } catch (error) {
      HandleHttpError(error, navigate, "/admin");
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
    <CustomerDetail
      reservation={reservation}
      bill={bill}
      handlePageBillChange={handlePageBillChange}
      handlePageReservationChange={handlePageReservationChange}
      totalElementBill={totalElementBill}
      totalElementReservation={totalElementReservation}
    />
  );
}

export default CustomerDetailAPI;
