import React from 'react'
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import {BsFillPersonFill} from 'react-icons/bs'

function CustomerDetail({bill}) {
  return (
    <div>
      <BsFillPersonFill style={{fontSize: "200%", marginLeft: "50px"}}
        data-tip="Bill details"
        data-tooltip-id={`tooltip-${bill.id}`}
      />
      <Tooltip
        id={`tooltip-${bill.id}`}
        effect="solid"
        style={{ backgroundColor: "#0091b0" }}
      >
        <div>
          <p>
            <b>Customer information</b>
          </p>
          <p style={{ textAlign: "left" }}>
            <b>Customer Name: </b>
            {bill.customer.customerName}
          </p>
          <p style={{ textAlign: "left" }}>
            <b>Email: </b>
            {bill.customer.email}
          </p>
          <p style={{ textAlign: "left" }}>
            <b>Customer Phone: </b>
            {bill.customer.phoneNumber}
          </p>
          <p style={{ textAlign: "left" }}>
            <b>Customer Address: </b>
            {bill.customer.address}
          </p>
        </div>
      </Tooltip>
    </div>
  )
}

export default CustomerDetail
