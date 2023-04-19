import { Button, Col, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import { QuantityPicker } from "react-qty-picker";

function ModalContent({
  productSizes,
  product,
  show,
  handleClose,
  fetchProductSize,
  fetchData,
  handleAddToCart,
}) {
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedProductSize, setSelectedProductSize] = useState([]);
  useEffect(() => {
    if (show) {
      fetchProductSize();
      setPrice(product.price);
      setQuantity(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);
  const handleChangePrice = (productSize) => {
    setSelectedProductSize(productSize);
    setPrice(productSize.productPrice);
  };
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };
  const handleAddToCartLocal = () => {
    if (!selectedProductSize || !selectedProductSize.size) {
      // If selectedProductSize.size.name is empty, set default value based on condition
      const defaultProductSize = productSizes.find(
        (productSize) => product.price === productSize.productPrice
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
    <Modal
      title={
        <h1>
          <b>{product.productName}</b>
        </h1>
      }
      open={show}
      onCancel={handleClose}
      onOk={handleAddToCartLocal}
    >
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <img
            src={product.imageUrl}
            alt={product.productName}
            width="100%"
            height="100%"
          />
        </Col>
        <Col span={16}>
          <Row style={{ marginBottom: "12px" }} />
          <Row style={{ marginBottom: "12px" }}>
            <Col span={24}>
              <h3 style={{ color: "red" }}>{price} VNĐ</h3>
            </Col>
          </Row>
          <Row style={{ marginBottom: "12px" }}>
            <Col span={24} val>
              <h4>Chọn size (Bắt buộc)</h4>
            </Col>
          </Row>
          <Row style={{ marginBottom: "12px" }}>
            {productSizes.map((productSize) => (
              <Col
                key={productSize.size.id}
                lg={{
                  span: 6,
                  offset: 2,
                }}
              >
                <Button onClick={() => handleChangePrice(productSize)}>
                  {productSize.size.name}
                </Button>
              </Col>
            ))}
          </Row>
          <Row style={{ marginBottom: "12px" }}>
            <Col span={24}>
              <QuantityPicker
                value={quantity}
                smooth
                min={1}
                max={10}
                onChange={handleQuantityChange}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
}

export default ModalContent;
