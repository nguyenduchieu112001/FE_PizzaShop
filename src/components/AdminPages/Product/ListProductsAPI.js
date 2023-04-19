import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ListProducts from "./ListProducts";
import { HandleHttpError } from "../layout/HandleHttpError";

function ListProductsAPI() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElement, setTotalElement] = useState(0);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const {
        data: { content, totalPages, totalElement },
      } = await axios.get(
        `http://localhost:8080/api/v1/product?page=${page}&query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      const products = content.map((product) => ({
        ...product,
        id: parseInt(product.id),
      }));
      const imageUrls = await Promise.all(
        products.map(async (product) => {
          await new Promise(resolve => setTimeout(resolve, 1000));
          try {
            const {
              config: { url },
            } = await axios.get(`http://localhost:8080${product.image}`);
            return url;
          } catch (error) {
            toast.error(
              `Error fetching image for product ${product.productName}!`,
              {
                draggable: true,
                position: toast.POSITION.TOP_RIGHT,
              }
            );
            return null;
          }
        })
      );
      const updatedProducts = products.map((product, index) => ({
        ...product,
        imageUrl: imageUrls[index],
      }));
      setProducts(updatedProducts);
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
    <ListProducts
      products={products}
      fetchData={fetchData}
      onPageChange={handlePageChange}
      totalPages={totalPages}
      totalElement={totalElement}
      setQuery={setQuery}
    />
  );
}

export default ListProductsAPI;
