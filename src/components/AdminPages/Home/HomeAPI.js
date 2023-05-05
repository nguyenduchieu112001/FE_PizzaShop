import React, { useEffect, useState } from "react";
import { HandleHttpError } from "../layout/HandleHttpError";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Home from "./Home";

function HomeAPI() {
  const [totalElementsUser, setTotalElementsUser] = useState();
  const [totalElementsReservation, setTotalElementsReservation] = useState();
  const [totalElementsBill, setTotalElementsBill] = useState();
  const [totalElementProduct, setTotalElementProduct] = useState();
  const [totalElementProductType, setTotalElementProductType] = useState();
  const [totalElementProductSize, setTotalElementProductSize] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const customer = await axios.get(
        `http://localhost:8080/api/v1/customer`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setTotalElementsUser(customer.data.totalElement);
      const reservation = await axios.get(
        `http://localhost:8080/api/v1/reservation`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setTotalElementsReservation(reservation.data.totalElement);
      const bill = await axios.get(`http://localhost:8080/api/v1/bill`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setTotalElementsBill(bill.data.totalElement);
      const product = await axios.get(`http://localhost:8080/api/v1/product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setTotalElementProduct(product.data.totalElement);
      const productType = await axios.get(
        `http://localhost:8080/api/v1/product-type/page`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setTotalElementProductType(productType.data.totalElement);
      const size = await axios.get(`http://localhost:8080/api/v1/size/page`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setTotalElementProductSize(size.data.totalElement);
    } catch (error) {
      HandleHttpError(error, navigate, "/admin");
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Home
      totalElementsUser={totalElementsUser}
      totalElementsReservation={totalElementsReservation}
      totalElementsBill={totalElementsBill}
      totalElementProduct={totalElementProduct}
      totalElementProductType={totalElementProductType}
      totalElementProductSize={totalElementProductSize}
    />
  );
}

export default HomeAPI;
