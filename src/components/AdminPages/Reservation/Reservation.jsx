import React from "react";
import { FcPaid, FcCancel } from "react-icons/fc";
import { GiReceiveMoney } from "react-icons/gi";
import ReservationDetail from "./ReservationDetail";
import ReservationActions from "./ReservationActions";
import moment from "moment/moment";

function Reservation({ reservation, index, fetchData }) {
  return (
    <>
      <th scope="row">{index + 1}</th>
      <th scope="row">{reservation.reservationCode}</th>
      <th scope="row">{moment(reservation.createdAt).format(`DD/MM/YYYY`)}</th>
      <th scope="row">
        {moment(reservation.reservationDate).format(`DD/MM/YYYY`)}
      </th>
      <th scope="row">{reservation.reservationTime}</th>
      <th scope="row">{reservation.partySize}</th>
      <th scope="row">
        <div style={{ display: "flex", marginLeft: "60px" }}>
          {reservation.reservationStatus === "Paid" ? (
            <FcPaid className="mx-2" />
          ) : reservation.reservationStatus === "Deposited" ? (
            <GiReceiveMoney className="mx-2" />
          ) : (
            <FcCancel className="mx-2" />
          )}
          {reservation.reservationStatus}
        </div>
      </th>
      <th scope="row">
        <ReservationDetail reservation={reservation} />
      </th>
      <th scope="row">
        <ReservationActions reservation={reservation} fetchData={fetchData} />
      </th>
    </>
  );
}

export default Reservation;
