import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavBar from "../Home/NavBar";
import "./Reservation.css";

function Reservation({
  handleSubmit,
  numPeople,
  handlePeopleChange,
  selectedDate,
  setSelectedDate,
  selectedHour,
  handleHourChange,
}) {
  return (
    <>
      <NavBar />
      <div className="find-table">
        <div className="container">
          <h1 className="find-table-title text-center">Make a Reservation</h1>
          <div className="find-table-comboBox">
            <form className="find-table-form" onSubmit={handleSubmit}>
              <label className="label__reservation" htmlFor="size">
                Party Size
                <select
                  className="find-table-input"
                  value={numPeople}
                  onChange={handlePeopleChange}
                  id="size"
                >
                  {[2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} people
                    </option>
                  ))}
                </select>
              </label>
              <label className="label__reservation" htmlFor="dateSize">
                Date
                <DatePicker
                  className="find-table-input date-picker"
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  minDate={new Date()}
                />
              </label>
              <label className="label__reservation" htmlFor="time">
                Time
                <select
                  className="find-table-input"
                  value={selectedHour}
                  onChange={handleHourChange}
                  id="time"
                >
                  {Array.from({ length: 11 }, (_, i) => 12 + i).map((hour) => (
                    <option key={hour} value={`${hour}:00:00`}>
                      {`${hour}:00:00`}
                    </option>
                  ))}
                </select>
              </label>
              <button className="reserveBtn">Reserve Now</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reservation;
