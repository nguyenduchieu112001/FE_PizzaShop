import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ListProductSizes from "./ListProductSizes";

function ProductSizesAPI() {
  const [productSizes, setProductSizes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElement, setTotalElement] = useState(0);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/api/v1/size/page?page=${page}&query=${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      const { content, totalPages, totalElement } = response.data;
      setProductSizes(content);
      setTotalElement(totalElement);
      setTotalPages(totalPages);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/admin");
        localStorage.clear();
      } else {
        toast.error("Error fetching list product type!", {
          draggable: true,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
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
    <ListProductSizes
      productSizes={productSizes}
      fetchData={fetchData}
      onPageChange={handlePageChange}
      totalPages={totalPages}
      totalElement={totalElement}
      setQuery={setQuery}
    />
  );
}

export default ProductSizesAPI;
