import React from "react";
import "./ConfirmReservation.css";
import NavBar from "../Home/NavBar";
import { Link, useLocation } from "react-router-dom";
import PayPalAPI from "./PayPalAPI";

function ConfirmReservation({
  customerData,
  handleReservationClick,
}) {
  const location = useLocation();
  const numPeople = location.state && location.state.numPeople;
  const selectedDate = location.state && location.state.selectedDate;
  const selectedHour = location.state && location.state.selectedHour;
  return (
    <>
      <NavBar />
      <div className="completeForm">
        <div className="completeForm__container">
          <div className="completeForm__container-form">
            <h1>Complete your reservation</h1>
            <form className="container-form">
              <label htmlFor="firstname">
                Customer Name
                <input
                  id="customerName"
                  className="form__complete-input"
                  type="text"
                  value={customerData.customerName}
                  disabled
                />
              </label>
              <label htmlFor="lastname">
                Email address
                <input
                  id="email"
                  className="form__complete-input"
                  type="text"
                  value={customerData.email}
                  disabled
                />
              </label>
              <label htmlFor="phonenumber">
                Phone number
                <input
                  id="phonenumber"
                  className="form__complete-input"
                  type="number"
                  value={customerData.phoneNumber}
                  disabled
                />
              </label>
              <label htmlFor="email">
                Address
                <input
                  id="email"
                  className="form__complete-input"
                  type="text"
                  value={customerData.address}
                  disabled
                />
              </label>
              <p>
                Thank you for choosing our restaurant. Please note that we will
                hold your table for up to 15 minutes from the time of your
                reservation. If your plans change or you anticipate being late,
                kindly let us know as soon as possible. We look forward to
                hosting you!
              </p>
              <div style={{ width: "100%" }}>
                <PayPalAPI
                  numPeople={numPeople}
                  selectedDate={selectedDate}
                  selectedHour={selectedHour}
                />
              </div>
            </form>
          </div>
          <div
            className="completeForm__container-detail"
            style={{ textAlign: "left" }}
          >
            <div className="detail detail-bottom">
              <h6>Reservation details:</h6>
              <p>San Francisco</p>
              {selectedDate && (
                <p>
                  {selectedDate.toLocaleString("en-us", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              )}
              {selectedHour && (
                <p>
                  {selectedHour.toLocaleString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              )}
              <p>{numPeople} guests</p>
              <Link to="/home" onClick={() => handleReservationClick("reservationId")}>Change</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmReservation;
