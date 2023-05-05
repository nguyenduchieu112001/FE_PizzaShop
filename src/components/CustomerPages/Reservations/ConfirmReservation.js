import React from "react";
import "./ConfirmReservation.css";
import NavBar from "../Home/NavBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PayPalAPI from "./PayPalAPI";
import { ImLocation2 } from "react-icons/im";
import { AiFillCalendar, AiFillClockCircle } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

function ConfirmReservation({ customerData, handleReservationClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const numPeople = location.state && location.state.numPeople;
  const selectedDate = location.state && location.state.selectedDate;
  const selectedHour = location.state && location.state.selectedHour;

  if (location.state === null) {
    toast.error(`Bạn nên chọn số lượng người, ngày giờ trước!`, {
      draggable: true,
      position: toast.POSITION.TOP_RIGHT,
    });
    navigate("/home");
  }
  return (
    <>
      <Helmet>
        <title>Checkout Reservation</title>
      </Helmet>
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
              <p
                style={{
                  fontStyle: "italic",
                  textIndent: "30px",
                  color: "red",
                }}
              >
                Cảm ơn bạn đã chọn nhà hàng của chúng tôi. Xin lưu ý rằng chúng
                tôi sẽ giữ bàn của bạn trong tối đa 15 phút kể từ thời điểm bạn
                đặt chỗ. Nếu kế hoạch của bạn thay đổi hoặc bạn dự đoán bị trễ,
                vui lòng cho chúng tôi biết càng sớm càng tốt. Chúng tôi mong
                được đón tiếp bạn!
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
              <h4>
                <b>Reservation details:</b>
              </h4>
              <p style={{ display: "flex" }}>
                <ImLocation2 className="mx-2" /> 39 Phạm Thị Liên, Kim Long, Huế
              </p>
              {selectedDate && (
                <p style={{ display: "flex" }}>
                  <AiFillCalendar className="mx-2" />
                  {selectedDate.toLocaleString("en-us", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              )}
              {selectedHour && (
                <p style={{ display: "flex" }}>
                  <AiFillClockCircle className="mx-2" />
                  {selectedHour.toLocaleString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              )}
              <p style={{ display: "flex" }}>
                <BsFillPeopleFill className="mx-2" />
                {numPeople} guests
              </p>
              <Link
                to="/home"
                onClick={() => handleReservationClick("reservationId")}
              >
                Change
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmReservation;
