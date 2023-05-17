import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderOnline from "./OrderOnline";
import { HandleHttpError } from "../../../AdminPages/layout/HandleHttpError";

function OrderOnlineAPI() {
  const [productTypes, setProductTypes] = useState([]);
  const [productSizes, setProductSizes] = useState([]);
  const navigate = useNavigate();
  const [defaultproductSize, setDefaultproductSize] = useState("");

  const [show, setShow] = useState(false);
  const handleShow = (productSize) => {
    setDefaultproductSize(productSize);
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const fetchproductTypes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/product-type`
      );
      setProductTypes(response.data);
    } catch (error) {
      HandleHttpError(error, navigate, "/sign-in");
    }
  };

  const fetchproductSizes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/product-size/menu`
      );
      setProductSizes(response.data);
    } catch (error) {
      HandleHttpError(error, navigate, "/sign-in");
    }
  };

  useEffect(() => {
    fetchproductTypes();
    fetchproductSizes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [cartItems, setCartItems] = useState([]);

  // Function to handle clicking on product type link
  const handleProductTypeClick = (productType) => {
    // Scroll to the nameOrderRef element
    const refElement = document.getElementById(productType.name);
    if (refElement) {
      refElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAddToCart = (productSize, quantity) => {
    // Check if the productSize is already in the cart
    const existingProductSize = cartItems.find(
      (item) =>
        item.productSize.id === productSize.id &&
        item.productSize.size.id === productSize.size.id &&
        item.productSize.product.id === productSize.product.id
    );
    if (existingProductSize) {
      // If the productSize is already in the cart, update its quantity
      const updatedCartItems = cartItems.map((item) =>
        item.productSize.id === productSize.id &&
        item.productSize.size.id === productSize.size.id &&
        item.productSize.product.id === productSize.product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { productSize, quantity: quantity }]);
    }
  };

  const handleCountCartItems = () => {
    const totalQuantity = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    return totalQuantity;
  };

  const handleRemoveCart = (id) => {
    const index = cartItems.findIndex((item) => item.productSize.id === id);
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

  function handleCalculatorSubtotal(cartItems) {
    return cartItems.reduce((total, item) => {
      const productTotal = item.productSize.productPrice * item.quantity;
      return total + productTotal;
    }, 0);
  }

  // Function to handle updating quantity of an item in the cart
  const handleUpdateQuantity = (itemId, newQuantity) => {
    // Find the index of the item in the cartItems array
    const itemIndex = cartItems.findIndex(
      (item) => item.productSize.id === itemId
    );
    // Create a shallow copy of the cartItems array
    const updatedCartItems = [...cartItems];
    // Update the quantity of the item at the found index
    updatedCartItems[itemIndex].quantity = newQuantity;
    // Update the cartItems state with the updated array
    setCartItems(updatedCartItems);
  };

  // Load cartItems from localStorage on component mount
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Save cartItems to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <OrderOnline
      productSizes={productSizes}
      productTypes={productTypes}
      show={show}
      handleShow={handleShow}
      handleClose={handleClose}
      defaultproductSize={defaultproductSize}
      handleProductTypeClick={handleProductTypeClick}
      handleAddToCart={handleAddToCart}
      cartItems={cartItems}
      handleCountCartItems={handleCountCartItems}
      handleRemoveCart={handleRemoveCart}
      handleCalculatorSubtotal={handleCalculatorSubtotal}
      handleUpdateQuantity={handleUpdateQuantity}
    />
  );
}

export default OrderOnlineAPI;
