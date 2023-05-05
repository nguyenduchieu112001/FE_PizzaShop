import { Button, Col, Modal, Radio, Row } from "antd";
import React, { useEffect, useState } from "react";

function ModalContent({
  productSizes,
  defaultproductSize,
  show,
  handleClose,
  fetchProductSize,
  handleAddToCart,
}) {
  // console.log('defautl', defaultproductSize);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedProductSize, setSelectedProductSize] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    setSelectedProductSize(defaultproductSize);
    setValue(defaultproductSize.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultproductSize]);

  useEffect(() => {
    if (selectedProductSize && selectedProductSize.productPrice) {
      const newPrice = selectedProductSize.productPrice * quantity;
      setPrice(newPrice);
    } else {
      setPrice(defaultproductSize.product.price * quantity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  useEffect(() => {
    if (show) {
      fetchProductSize();
      setPrice(defaultproductSize.product.price);
      setQuantity(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultproductSize]);

  const handleChangePrice = (productSize) => {
    setValue(productSize.id);
    setSelectedProductSize(productSize);
    setPrice(productSize.productPrice * quantity);
  };

  const handleUpdateItemQuantity = (quantity) => {
    setQuantity(quantity);
  };

  const handleAddToCartLocal = () => {
    if (!selectedProductSize || !selectedProductSize.size) {
      // If selectedProductSize.size.name is empty, set default value based on condition
      const defaultProductSize = productSizes.find(
        (productSize) => productSize.product.price === productSize.productPrice
      );
      if (defaultProductSize) {
        handleAddToCart(defaultProductSize, quantity);
      }
    } else {
      handleAddToCart(selectedProductSize, quantity);
    }
    handleClose();
  };
  return (
    <>
      <Modal
        title={
          <h1>
            <b>{defaultproductSize.product.productName}</b>
          </h1>
        }
        open={show}
        onCancel={handleClose}
        onOk={handleAddToCartLocal}
        okButtonProps={{ className: "bg-[#1677ff]" }}
      >
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <img
              src={`http://localhost:8080${defaultproductSize.product.image}`}
              alt={defaultproductSize.product.productName}
              width="100%"
              height="100%"
            />
          </Col>
          <Col span={16}>
            <Row style={{ marginBottom: "12px" }} />
            <Row style={{ marginBottom: "12px" }}>
              <Col span={24}>
                <h3 style={{ color: "red" }}>
                  {price.toLocaleString("vi-VN")} VNĐ
                </h3>
              </Col>
            </Row>
            <Row style={{ marginBottom: "12px" }}>
              <Col span={24} val>
                <h4>Chọn size (Bắt buộc)</h4>
              </Col>
            </Row>
            <Row style={{ marginBottom: "12px" }}>
              {productSizes.map((productSize, index) => (
                <Col key={productSize.size.id} lg={{ span: 6, offset: 2 }}>
                  {/* <Radio
                    onChange={() => handleChangePrice(productSize)}
                    checked={productSize === selectedProductSize}
                    defaultChecked={productSize.id === defaultproductSize.id}
                  >
                    {productSize.size.name}
                  </Radio> */}

                  <Radio.Group
                    onChange={() => handleChangePrice(productSize)}
                    value={value}
                  >
                    <Radio value={productSize.id}>
                      {productSize.size.name}
                    </Radio>
                  </Radio.Group>
                </Col>
              ))}
            </Row>
            <Row style={{ marginBottom: "12px" }}>
              <Col span={24}>
                <Row>
                  <Col span={3}>
                    <div style={{ justifyContent: "flex-end" }}>
                      <Button
                        onClick={() => handleUpdateItemQuantity(quantity - 1)}
                        disabled={quantity <= 1}
                        style={{ paddingTop: "0%", fontSize: "20px" }}
                      >
                        -
                      </Button>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: "2%",
                        fontSize: "20px",
                      }}
                    >
                      {quantity}
                    </div>
                  </Col>
                  <Col span={3}>
                    <Button
                      style={{
                        display: "flex",
                        paddingTop: "0%",
                        fontSize: "20px",
                      }}
                      onClick={() => handleUpdateItemQuantity(quantity + 1)}
                      disabled={quantity >= 99}
                    >
                      +
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default ModalContent;
