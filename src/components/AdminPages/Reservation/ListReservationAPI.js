import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListReservations from "./ListReservations";
import { HandleHttpError } from "../layout/HandleHttpError";

function ListReservationAPI() {
  const [reservations, setReservations] = useState([]);
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/api/v1/reservation?page=${page}&query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      const { content, totalElement, totalPages } = response.data;
      setReservations(content);
      setTotalElements(totalElement);
      setTotalPages(totalPages);
    } catch (error) {
      HandleHttpError("Error fetching list reservation!", navigate, "/admin")
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);
  return (
    <ListReservations
      reservations={reservations}
      fetchData={fetchData}
      onPageChange={handlePageChange}
      totalPages={totalPages}
      totalElements={totalElements}
      setQuery={setQuery}
    />
  );
}

export default ListReservationAPI;
