import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Reservation from "./Reservation";
import { HandleHttpError } from "../../AdminPages/layout/HandleHttpError";

function ReservationAPI() {
  const [numPeople, setNumPeople] = useState(2);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState("12:00:00");
  const navigate = useNavigate();

  const handleHourChange = (event) => {
    setSelectedHour(event.target.value);
  };

  const handlePeopleChange = (event) => {
    setNumPeople(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const reservation = {
      reservationDate: moment(selectedDate).format("YYYY-MM-DD"),
      reservationTime: selectedHour,
      partySize: numPeople,
    };
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/reservation/check-reservation`,
        reservation,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (response?.status === 200) {
        navigate("/confirm-reservation", {
          state: {
            numPeople: numPeople.toString(),
            selectedDate: selectedDate,
            selectedHour: selectedHour,
          },
        });
      }
    } catch (error) {
      HandleHttpError(error, navigate, "/sign-in")
    }
  };

  return (
    <Reservation
      handleSubmit={handleSubmit}
      numPeople={numPeople}
      handlePeopleChange={handlePeopleChange}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      selectedHour={selectedHour}
      handleHourChange={handleHourChange}
    />
  );
}

export default ReservationAPI;
