import axios from "axios";
import React, { useEffect, useState } from "react";
import Checkout from "./Checkout";
import { useNavigate } from "react-router-dom";
import { HandleHttpError } from "../../../AdminPages/layout/HandleHttpError";

function CheckoutAPI() {
  const [customer, setCustomer] = useState([]);
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      if (token) {
        if (cartItems !== []) {
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
        } else {
          navigate("/order");
        }
      } else {
        navigate("/sign-in");
      }
    } catch (error) {
      HandleHttpError(error, navigate, "/sign-in");
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCountCartItems = () => {
    const totalQuantity = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    return totalQuantity;
  };

  function handleCalculatorSubtotal(cartItems) {
    return cartItems.reduce((total, item) => {
      const productTotal = item.productSize.productPrice * item.quantity;
      return total + productTotal;
    }, 0);
  }

  const handleOrderProcessing = async (form) => {
    try {
      await axios.post(
        `http://localhost:8080/api/v1/bill/order/processing`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      HandleHttpError(error, navigate, "/sign-in");
    }
  };

  const handleOrderDeposited = async (form) => {
    try {
      await axios.post(
        `http://localhost:8080/api/v1/bill/order/deposited`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      HandleHttpError(error, navigate, "/sign-in");
    }
  };

  const createOrder = async (form) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/bill/pay-order`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      HandleHttpError(error, navigate);
    }
  };
  return (
    <Checkout
      customer={customer}
      cartItems={cartItems}
      handleCountCartItems={handleCountCartItems}
      handleCalculatorSubtotal={handleCalculatorSubtotal}
      handleOrderProcessing={handleOrderProcessing}
      handleOrderDeposited={handleOrderDeposited}
      createOrder={createOrder}
    />
  );
}

export default CheckoutAPI;
