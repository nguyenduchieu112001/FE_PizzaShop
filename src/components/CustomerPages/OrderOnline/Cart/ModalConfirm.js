import { Modal } from "antd";
import React, { useState } from "react";

function ModalConfirm({ id, handleRemoveCart, cartItems }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  const handleClose = () => setShow(false);
  const productSize = cartItems.find((item) => item.productSize.id === id);
  return (
    <>
      <button onClick={handleShow}>Remove</button>
      <Modal
        title="Xóa sản phẩm"
        open={show}
        onCancel={handleClose}
        onOk={() => handleRemoveCart(id)}
        okButtonProps={{className:"bg-[#1677ff]"}}
      >
        <div className="p-2.5">
          <div className="w-full mb-[10px] h-[160px]">
            <img
              className="w-full h-full object-contain"
              src={`http://localhost:8080${productSize.productSize.product.image}`}
              alt={productSize.productSize.product.productName}
            />
          </div>
          <h5 className="product__name flex justify-center items-center pb-3">
            <b>
              {productSize.productSize.product.productName} - Size:{" "}
              {productSize.productSize.size.name}
            </b>
          </h5>
          <h3 className="card__price flex justify-center items-center text-red-600">
            Bạn có chắc muốn xoá sản phẩm này?
          </h3>
        </div>
      </Modal>
    </>
  );
}

export default ModalConfirm;
