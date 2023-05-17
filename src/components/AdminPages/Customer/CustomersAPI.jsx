import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HandleHttpError } from "../layout/HandleHttpError";
import axios from "axios";
import ListCustomers from "./ListCustomers";

function CustomersAPI() {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElement, setTotalElement] = useState(0);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const {
        data: { content, totalPages, totalElement },
      } = await axios.get(
        `http://localhost:8080/api/v1/customer?page=${page}&query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setCustomers(content);
      setTotalPages(totalPages);
      setTotalElement(totalElement);
    } catch (error) {
      HandleHttpError(error, navigate, "/admin");
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <ListCustomers
      customers={customers}
      fetchData={fetchData}
      onPageChange={handlePageChange}
      totalPages={totalPages}
      totalElement={totalElement}
      setQuery={setQuery}
    />
  );
}

export default CustomersAPI;
