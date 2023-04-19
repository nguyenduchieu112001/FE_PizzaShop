import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import {BsFillPersonFill} from 'react-icons/bs'

function ReservationDetail({ reservation }) {
  return (
    <div style={{marginLeft: "50px"}}>
      <BsFillPersonFill style={{fontSize: "200%"}}
        data-tip="Reservation details"
        data-tooltip-id={`tooltip-${reservation.id}`}
      />
      <Tooltip
        id={`tooltip-${reservation.id}`}
        effect="solid"
        style={{ backgroundColor: "#0091b0" }}
      >
        <div>
          <p>
            <b>Customer information</b>
          </p>
          <p style={{ textAlign: "left" }}>
            <b>Customer Name: </b>
            {reservation.customer.customerName}
          </p>
          <p style={{ textAlign: "left" }}>
            <b>Email: </b>
            {reservation.customer.email}
          </p>
          <p style={{ textAlign: "left" }}>
            <b>Customer Phone: </b>
            {reservation.customer.phoneNumber}
          </p>
          <p style={{ textAlign: "left" }}>
            <b>Customer Address: </b>
            {reservation.customer.address}
          </p>
        </div>
      </Tooltip>
    </div>
  );
}

export default ReservationDetail;
