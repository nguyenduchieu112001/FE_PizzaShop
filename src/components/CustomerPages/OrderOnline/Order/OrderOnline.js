import React, { useEffect, useState } from "react";
import NavBar from "../../Home/NavBar";
import "./OrderOnline.css";
import { Element, Link } from "react-scroll";
import ModalContentAPI from "../Modal/ModalContentAPI";
import { HiShoppingCart } from "react-icons/hi";
import Cart from "../Cart/Cart";

function OrderOnline({ products, productTypes }) {
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

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
    <>
      <NavBar />
      <div className="menuOrderComponent" style={{ paddingTop: "80px" }}>
        <div className="menuContainer">
          <div className="menu__header">
            <ul className="listOrders">
              <div className="menu__choose">
                {productTypes.map((productType) => (
                  <li key={productType.id}>
                    <Link
                      className="order"
                      to=""
                      smooth={true}
                      duration={500}
                      onClick={() => handleProductTypeClick(productType)}
                    >
                      {productType.name}
                    </Link>
                  </li>
                ))}
              </div>

              <div className="cart">
                <li>
                  <div className="order order__cart" onClick={handleOpenCart}>
                    <HiShoppingCart style={{ width: "100%", height: "100%" }} />{" "}
                    ({handleCountCartItems()})
                  </div>
                </li>
              </div>
            </ul>
          </div>

          {productTypes.map((productType) => (
            <Element
              id={productType.name}
              key={productType.id}
              className="menuOrder__content"
            >
              <h3 style={{ textAlign: "left" }} className="name__order">
                {productType.name}
              </h3>
              <div className="list__card">
                {products.map(
                  (product) =>
                    product.productType.name === productType.name && (
                      <div
                        key={product.id}
                        className="card"
                        onClick={() => handleShow(product)}
                      >
                        <h5>{product.productName}</h5>
                        <p style={{ textAlign: "left" }}>
                          {product.description}
                        </p>
                        <h5 className="card__price">{product.price} VNĐ</h5>
                      </div>
                    )
                )}
              </div>
            </Element>
          ))}
        </div>
      </div>
      <ModalContentAPI
        product={selectedProduct}
        show={show}
        handleClose={handleClose}
        handleAddToCart={handleAddToCart}
      />
      <Cart
        isCartOpen={isCartOpen}
        handleCloseCart={handleCloseCart}
        cartItems={cartItems}
        handleCountCartItems={handleCountCartItems}
        handleRemoveCart={handleRemoveCart}
        handleCalculatorSubtotal={handleCalculatorSubtotal}
        handleShow={handleShow}
        handleUpdateQuantity={handleUpdateQuantity}
      />
    </>
  );
}

export default OrderOnline;
