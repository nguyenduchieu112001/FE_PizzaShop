import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListProductTypes from "./ListProductTypes";
import { HandleHttpError } from "../layout/HandleHttpError";

function ProductTypesAPI() {
  const [productTypes, setProductTypes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElement, setTotalElement] = useState(0);
  const [query, setQuery] = useState("")
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/api/v1/product-type/page?page=${page}&query=${query}`,
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      const { content, totalPages, totalElement } = response.data;
      setProductTypes(content);
      setTotalElement(totalElement);
      setTotalPages(totalPages);
    } catch (error) {
      HandleHttpError("Error fetching list product type!", navigate, "/admin")
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
    <ListProductTypes
      productTypes={productTypes}
      fetchData={fetchData}
      onPageChange={handlePageChange}
      totalPages={totalPages}
      totalElement={totalElement}
      setQuery={setQuery}
    />
  );
}

export default ProductTypesAPI;
