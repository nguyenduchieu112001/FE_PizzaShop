import React, { useState } from "react";
import NavBar from "../../Home/NavBar";
import "./Checkout.css";
import { Link, useNavigate } from "react-router-dom";
import { Radio } from "antd";
import { PayPalButton } from "react-paypal-button-v2";
import { toast } from "react-toastify";
function Checkout({
  customer,
  cartItems,
  handleCountCartItems,
  handleCalculatorSubtotal,
  handleOrderProcessing,
  handleOrderDeposited,
  createOrder,
}) {
  const [value, setValue] = useState(1);
  const navigate = useNavigate();
  const bill = {
    customer: {
      id: customer.id,
    },
    billDetails: cartItems.map((item) => {
      return {
        product: {
          id: item.productSize.product.id,
        },
        size: {
          id: item.productSize.size.id,
        },
        quantity: item.quantity,
      };
    }),
  };
  const handleChangeRadio = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (bill) => {
    if (value === 2) {
      handleOrderProcessing(bill);
      toast.success("Đặt hàng thành công!", {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      localStorage.removeItem("cartItems");
    }
    navigate("/history");
  };

  return (
    <>
      <NavBar />
      <div className="completeForm">
        <div className="completeForm__container">
          <div className="completeForm__container-form">
            <h1 style={{color: "red"}}>Checkout</h1>
            <form onSubmit={() => handleSubmit(bill)}>
              <div className="checkout__block">
                <h2>1. Delivery Method</h2>
                <h5 className="pickup"><b>Pickup from</b></h5>
                <p className="p_content">39 Phạm Thị Liên, Kim Long, Huế</p>
                <h5 className="pickup"><b>Pickup time</b></h5>
                <p className="p_content">Sớm nhất có thể (trong 15p)</p>
              </div>
              <div className="checkout__block">
                <h2>2. Contact Information</h2>
                <p className="p_content">{customer.customerName}</p>
                <p className="p_content">{customer.email}</p>
                <p className="p_content">{customer.phoneNumber}</p>
                <p className="p_content">{customer.address}</p>
              </div>
              <div className="checkout__block">
                <h2>3. Payment</h2>
                <div className="radioButon">
                  <Radio.Group onChange={handleChangeRadio} value={value}>
                    <Radio value={1}>Thanh toán qua PayPal</Radio>
                    <Radio value={2}>Thanh toán trực tiếp</Radio>
                  </Radio.Group>
                </div>
              </div>
              {value === 1 && (
                <div style={{ marginTop: "2rem" }}>
                  <PayPalButton
                    style={{
                      color: "silver",
                      layout: "horizontal",
                      height: 48,
                      tagline: false,
                      shape: "pill",
                    }}
                    createOrder={(data, actions, err) => {
                      return createOrder(bill);
                    }}
                    onApprove={(data, actions) => {
                      actions.order.capture();
                      handleOrderDeposited(bill);
                      toast.success("Thanh toán thành công!", {
                        draggable: true,
                        position: toast.POSITION.TOP_RIGHT,
                      });
                      localStorage.removeItem("cartItems");
                      navigate("/history");
                    }}
                    onError={() => {
                      console.log("Error");
                    }}
                  />
                </div>
              )}
              {value === 2 && (
                <button
                  type="submit"
                  value="Complete reservation"
                  className="reserveBtn__checkout"
                >
                  Continue
                </button>
              )}
            </form>
          </div>
          <div className="completeForm__container-detail">
            <div>
              <Link className="back__page" to="/order">
                Back to menu
              </Link>
            </div>
            <div className="detail">
              <h1>My Orders ({handleCountCartItems()})</h1>
              {cartItems.map((item) => (
                <div className="order" key={item.productSize.id}>
                  <div className="order__name">
                    {item.quantity}
                    {"x"} {item.productSize.product.productName}
                  </div>
                  <div className="order__price">
                    <p>{item.productSize.productPrice} VNĐ</p>
                  </div>
                </div>
              ))}

              <div className="order total total-border">
                <div className="order__name total__name">
                  <p>Subtotal</p>
                </div>
                <div className="order__price total__price">
                  <p>{handleCalculatorSubtotal(cartItems)} VNĐ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
