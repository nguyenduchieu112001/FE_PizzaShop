import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

function PayPal({
  createOrder,
  bookTable,
}) {

  return (
    <PayPalButton
      style={{
        color: "silver",
        layout: "horizontal",
        height: 48,
        tagline: false,
        shape: "pill",
      }}
      createOrder={(data, actions, err) => {
        return createOrder();
      }}
      onApprove={(data, actions) => {
        actions.order.capture();
        bookTable();
      }}
      onError={() => {
        console.log("Error");
      }}
    />
  );
}

export default PayPal;
