import { Typography } from "antd";
import React from "react";

function Menu({productSizes, productType, handleShow}) {
  return (
    <>
      <div className="grid grid-cols-3 gap-x-6 gap-y-12 pl-5">
        {productSizes.map(
          (productSize) =>
            productSize.product.productType.name === productType.name && (
              <div
                key={productSize.product.id}
                className="rounded-md text-center shadow-[0_3px_3px_rgba(0,0,0,.25)] relative"
                onClick={() => handleShow(productSize)}
              >
                <div className="p-2.5 bg-[#fff] rounded-lg shadow-[0_3px_3px_rgba(0,0,0,.25)] min-h-full">
                  <div className="w-full mb-[10px] h-[160px]">
                    <img
                      className="w-full h-full object-contain"
                      src={`http://localhost:8080${productSize.product.image}`}
                      alt={productSize.product.productName}
                    />
                  </div>
                  <div className="pb-5">
                    <h5>
                      <b>{productSize.product.productName}</b>
                    </h5>
                    {/* <p style={{ textAlign: "left" }}>
                      {productSize.product.description}
                    </p> */}
                    <Typography.Paragraph className="!text-left !break-all text-[15px]" ellipsis={{
                      rows: 4
                    }}>
                      {productSize.product.description}
                    </Typography.Paragraph>
                    <h5 className="card__price flex justify-center items-center text-red-400">
                      {productSize.product.price.toLocaleString("vi-VN")} VNĐ
                    </h5>
                  </div>
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
                    <button className="rounded-[30px] w-[120px] h-[40px] bg-[#f15a22] text-white uppercase">
                      Chọn mua
                    </button>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
}

export default Menu;
