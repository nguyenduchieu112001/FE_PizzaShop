import React, { useState } from "react";
import NavBar from "../../Home/NavBar";
import "./Checkout.css";
import { Link, useNavigate } from "react-router-dom";
import { Radio } from "antd";
import { PayPalButton } from "react-paypal-button-v2";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
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
    navigate("/information", {
      state: {
        key: 3
      }
    });
  };

  return (
    <>
      <NavBar />
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <div className="completeForm">
        <div className="completeForm__container ">
          <div className="completeForm__container-form ">
            <h1 style={{ color: "red", textAlign: "center" }}>Checkout</h1>
            <form onSubmit={() => handleSubmit(bill)}>
              <div className="checkout__block">
                <h2>1. Delivery Method</h2>
                <h5 className="pickup">
                  <b>Pickup from</b>
                </h5>
                <p className="p_content">39 Phạm Thị Liên, Kim Long, Huế</p>
                <h5 className="pickup">
                  <b>Pickup time</b>
                </h5>
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
                      navigate("/information", {
                        state: {
                          key: 3
                        }
                      });
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
            <div className="min-h-[100px] border-[2px] border-solid border-[#e7e7e7] rounded">
              <div className="cart-header py-[13px] px-[20px] border-b border-[#dee2e6]">
                <h4 className="text-[20px]">
                  <b className="text-2xl">
                    GIỎ HÀNG <span>({handleCountCartItems()} Sản Phẩm)</span>
                  </b>
                </h4>
              </div>
              <div className="cart-body p-[5px]">
                <div className="pr-[10px]">
                  {cartItems.map((item) => (
                    <div
                      key={item.productSize.id}
                      className="cart-item py-[10px] border-b border-[#e5e5e5]"
                    >
                      <div className="flex px-[10px]">
                        <div className="flex-1 p-[8px]">
                          <img
                            className="h-full"
                            src={`http://localhost:8080${item.productSize.product.image}`}
                            alt={item.productSize.product.productName}
                          />
                        </div>
                        <div className="flex-[2]">
                          <div className="flex p-[5px] text-[20px]">
                            <b>{item.productSize.product.productName}</b>
                          </div>
                          <div className="p-[5px] flex justify-between items-center">
                            <div className="item-quantity flex items-center text-[18px]">
                              <span className="w-[80px] h-[30px] flex justify-center items-center text-[14px]">
                                <b>
                                  Số lượng:{"  "}
                                  {item.quantity}
                                </b>
                              </span>
                            </div>
                            <div className="item-price">
                              <span>
                                x
                                {(
                                  item.productSize.productPrice * item.quantity
                                ).toLocaleString("vi-VN")}{" "}
                                VNĐ
                              </span>
                            </div>
                          </div>
                          <div style={{ display: "flex" }}>
                            <div className="px-[5px] pt-[10px] pb-[5px]">
                              Size: {item.productSize.size.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="m-[4px]">
                <div className="py-[5px] my-[8px] flex justify-between items-center">
                  <span className="font-bold uppercase text-[#414042]">
                    TỔNG CỘNG
                  </span>
                  <span className="text-[#f15e22]">
                    {handleCalculatorSubtotal(cartItems).toLocaleString(
                      "vi-VN"
                    )}{" "}
                    VNĐ
                  </span>
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
