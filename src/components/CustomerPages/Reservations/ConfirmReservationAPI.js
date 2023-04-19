import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmReservation from "./ConfirmReservation";
import { scroller } from "react-scroll";

function ConfirmReservationAPI() {
  
  const [customerData, setCustomerData] = useState({
    userName: "",
    customerName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const navigate = useNavigate();
  const handleReservationClick = (reservationId) => {
    scroller.scrollTo(reservationId, {
      duration: 800, // Thời gian cuộn đến (ms)
      smooth: "easeInOutQuart", // Loại hiệu ứng cuộn
      offset: -100, // Độ lệch so với đích đến (pixel)
    });
  };
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if(token){
      const response = await axios.get(
        `http://localhost:8080/api/v1/customer/information`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setCustomerData(response.data);
    }
    else {
      navigate("/sign-in")
    }
  };

  useEffect(() => {
    fetchData();
    handleReservationClick("reservationId");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ConfirmReservation
      customerData={customerData}
      handleReservationClick={handleReservationClick}
    />
  );
}

export default ConfirmReservationAPI;
