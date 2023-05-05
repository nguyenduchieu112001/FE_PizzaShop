import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HandleHttpError } from "../../AdminPages/layout/HandleHttpError";
import Information from "./Information";

function InformationAPI() {
  const [customer, setCustomer] = useState({
    username: "",
    customerName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
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
      const response = await axios.get(
        `http://localhost:8080/api/v1/customer/information`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setCustomer(response.data);
      const customerId = response.data.id;
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
    } catch (error) {
      HandleHttpError(error, navigate, "/sgin-in");
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageReservation, pageBill]);

  const handlePageBillChange = (newPage) => {
    setPageBill(newPage);
  };

  const handlePageReservationChange = (newPage) => {
    setPageReservation(newPage);
  };
  return (
    <Information
      customer={customer}
      reservation={reservation}
      bill={bill}
      handlePageBillChange={handlePageBillChange}
      handlePageReservationChange={handlePageReservationChange}
      totalElementBill={totalElementBill}
      totalElementReservation={totalElementReservation}
      fetchData={fetchData}
      setCustomer={setCustomer}
    />
  );
}

export default InformationAPI;
