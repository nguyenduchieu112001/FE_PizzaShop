import React from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'
import {FaTimes} from 'react-icons/fa'
function Cart({
  isCartOpen,
  handleCloseCart,
  cartItems,
  handleCountCartItems,
  handleRemoveCart,
  handleCalculatorSubtotal,
  handleShow,
  handleUpdateQuantity,
}) {
  // Function to handle updating quantity of an item
  const handleUpdateItemQuantity = (itemId, newQuantity) => {
    // Call the handleUpdateQuantity prop and pass in the updated quantity
    handleUpdateQuantity(itemId, newQuantity);
  };
  return (
    <>
      {isCartOpen && (
        <div className="modalCart">
          <nav className={isCartOpen ? "active" : ""}>
            <div className="navHeader">
              <span>My Order ({handleCountCartItems()}) </span>
              <button onClick={handleCloseCart}><FaTimes /></button>
            </div>
            <div className="navContent">
              <ul>
                {cartItems.length === 0 && (
                  <div className="wrapSpan">
                    <span>
                      Browse our menu and start adding items to your order
                    </span>
                  </div>
                )}
                {cartItems.map((item) => (
                  <div key={item.productSize.id} className="wrapli">
                    <li>
                      <div className="wrapQuantity">
                        <button
                          onClick={() =>
                            handleUpdateItemQuantity(
                              item.productSize.id,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1} // Disable button when quantity is 1
                        >
                          <AiOutlineMinus /> {/* Button for decrementing quantity */}
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleUpdateItemQuantity(
                              item.productSize.id,
                              item.quantity + 1
                            )
                          }
                          disabled={item.quantity >= 10}
                        >
                          <AiOutlinePlus /> {/* Button for incrementing quantity */}
                        </button>
                      </div>
                      <span className="productName">
                        {item.productSize.product.productName}
                      </span>
                      <span className="sizeName">
                        {item.productSize.size.name}
                      </span>
                      <span>
                        {(
                          item.productSize.productPrice * item.quantity
                        ).toFixed(0)}{" "}
                        VNĐ
                      </span>
                    </li>
                    <button
                      onClick={() => handleRemoveCart(item.productSize.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </ul>
            </div>
            <div className="navFooter">
              <div className="wrapTotal">
                <span>Subtotal</span>
                <p>{handleCalculatorSubtotal(cartItems)} VNĐ</p>
              </div>
              <button>
                <Link to="/checkout">Continue to Checkout</Link>
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

export default Cart;
