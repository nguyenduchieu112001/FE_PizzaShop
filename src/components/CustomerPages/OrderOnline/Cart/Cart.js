import React from "react";
import ModalConfirm from "./ModalConfirm";
import { Link } from "react-router-dom";

function Cart({
  cartItems,
  handleCountCartItems,
  handleRemoveCart,
  handleCalculatorSubtotal,
  handleUpdateQuantity,
}) {
  const token = localStorage.getItem("token");
  // Function to handle updating quantity of an item
  const handleUpdateItemQuantity = (itemId, newQuantity) => {
    // Call the handleUpdateQuantity prop and pass in the updated quantity
    handleUpdateQuantity(itemId, newQuantity);
  };
  return (
    <>
      <div className="flex-1 transition-all max-w-[370px] bg-white border-[1px] border-[#222] self-start rounded sticky top-[75px] left-0 right-0 z-[100]">
        <div className="cart-header py-[13px] px-[20px] border-b border-[#dee2e6]">
          <h4 className="text-[20px]">
            <b className="text-2xl">
              GIỎ HÀNG <span>({handleCountCartItems()} Sản Phẩm)</span>
            </b>
          </h4>
        </div>
        <div className="cart-body p-[5px]">
          <div className="pr-[10px]">
            {cartItems.length === 0 && (
              <div className="flex justify-center items-center">
                <span className="py-36">
                  Giỏ hàng của bạn đang rỗng, vui lòng đặt món.
                </span>
              </div>
            )}
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
                    <div className="flex p-[5px] text-[14px]">
                      {item.productSize.product.productName}
                    </div>
                    <div className="p-[5px] flex justify-between items-center">
                      <div className="item-quantity flex items-center text-[18px]">
                        <button
                          onClick={() =>
                            handleUpdateItemQuantity(
                              item.productSize.id,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                          className="w-[30px] h-[30px] cursor-pointer bg-[#ededee] rounded-[50%] leading-[30px] flex justify-center items-center"
                        >
                          -
                        </button>
                        <span className="w-[30px] h-[30px] flex justify-center items-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateItemQuantity(
                              item.productSize.id,
                              item.quantity + 1
                            )
                          }
                          disabled={item.quantity >= 99}
                          className="w-[30px] h-[30px] cursor-pointer bg-[#ededee] rounded-[50%] leading-[30px] flex justify-center items-center"
                        >
                          +
                        </button>
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
                      <div className="px-[20px] pt-[10px] pb-[5px] bg-red-400">
                        {/* <button
                          onClick={() => handleRemoveCart(item.productSize.id)}
                        >
                          Remove
                        </button> */}
                        <ModalConfirm
                          id={item.productSize.id}
                          cartItems={cartItems}
                          handleRemoveCart={handleRemoveCart}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="cart-footer p-[12px] text-[16px] flex border-t border-[#dee2e6] flex-col ">
          {/* <div className="discount m-[4px]">
            <div className="total flex justify-between items-center py-[5px]">
              <span>Thành tiền</span>
              <span className="text-right">{handleCalculatorSubtotal(cartItems).toLocaleString("vi-VN")} VNĐ</span>
            </div>
            <div className="flex justify-between items-center py-[5px]">
              <span>Thuế</span>
              <span className="text-right">44.000 ₫</span>
            </div>
          </div> */}
          <div className="m-[4px]">
            <div className="py-[5px] my-[8px] flex justify-between items-center">
              <span className="font-bold uppercase text-[#414042]">
                TỔNG CỘNG
              </span>
              <span className="text-[#f15e22]">
                {handleCalculatorSubtotal(cartItems).toLocaleString("vi-VN")}{" "}
                VNĐ
              </span>
            </div>
            <div className="flex">
              {/* <a
                href="/"
                className="w-full hover:text-white hover:bg-[#414042] h-[50px] leading-[46px] rounded-[5px] font-bold uppercase text-center mr-[5px] text-[#414042] border-[2px] border-[#414042]"
              >
                Xem giỏ hàng
              </a> */}
              <Link
                to={cartItems.length > 0 ? token ? "/checkout": "/auth" : "#"}
                className="w-full hover:text-white hover:bg-[#f15e22] h-[50px] leading-[46px] rounded-[5px] font-bold uppercase text-center text-[#f15e22] border-[2px] border-[#f15e22]"
              >
                thanh toán
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
