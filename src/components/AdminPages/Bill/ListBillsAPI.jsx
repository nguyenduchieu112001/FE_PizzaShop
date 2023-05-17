import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListBills from "./ListBills";
import { HandleHttpError } from "../layout/HandleHttpError";

function ListBillsAPI() {
  const [bills, setBills] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElement, setTotalElement] = useState(0);
  const navigate = useNavigate();

  const fetchBill = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/bill?page=${page}&query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      const { content, totalPages, totalElement } = response.data;
      setBills(content);
      setTotalElement(totalElement);
      setTotalPages(totalPages);
    } catch (error) {
      HandleHttpError(`Error fetching list Bill!`, navigate, "/admin");
    }
  };
  useEffect(() => {
    fetchBill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <ListBills
      bills={bills}
      fetchBill={fetchBill}
      onPageChange={handlePageChange}
      totalPages={totalPages}
      totalElement={totalElement}
      setQuery={setQuery}
    />
  );
}

export default ListBillsAPI;
