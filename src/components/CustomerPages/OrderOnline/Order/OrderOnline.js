import React from "react";
import NavBar from "../../Home/NavBar";
import "./OrderOnline.css";
import { Element, Link } from "react-scroll";
import ModalContentAPI from "../Modal/ModalContentAPI";
import Cart from "../Cart/Cart";
import Header from "../Header/Header";
import Menu from "./Menu";
import { Helmet } from "react-helmet";

function OrderOnline({
  productSizes,
  productTypes,
  show,
  handleShow,
  handleClose,
  defaultproductSize,
  handleProductTypeClick,
  handleAddToCart,
  cartItems,
  handleCountCartItems,
  handleRemoveCart,
  handleCalculatorSubtotal,
  handleUpdateQuantity,
}) {
  return (
    <>
    <Helmet>
      <title>ZIA SONIA</title>
    </Helmet>
      <NavBar />
      <Header productTypes={productTypes} handleProductTypeClick={handleProductTypeClick}/>
      <div className="menuOrderComponent">
        <div className="flex gap-x-8 menuContainer relative">
          <div className="flex-[2]">
            <div className="menu__header">
              <ul className="listOrders">
                <div className="menu__choose">
                  {productTypes.map((productType) => (
                    <li key={productType.id}>
                      <Link
                        className="order"
                        to={productType.name}
                        smooth={true}
                        duration={500}
                        offset={-120}
                        onClick={() => handleProductTypeClick(productType)}
                      >
                        {productType.name}
                      </Link>
                    </li>
                  ))}
                </div>
              </ul>
            </div>
            {productTypes.map((productType) => (
              <Element
                id={productType.name}
                key={productType.id}
                className="menuOrder__content"
              >
                <h3 style={{ textAlign: "left" }} className="name__order pl-5">
                  {productType.name}
                </h3>
                <Menu
                  productSizes={productSizes}
                  productType={productType}
                  handleShow={handleShow}
                />
              </Element>
            ))}
            {defaultproductSize && (
              <ModalContentAPI
                defaultproductSize={defaultproductSize}
                show={show}
                handleClose={handleClose}
                handleAddToCart={handleAddToCart}
              />
            )}
          </div>
          <Cart
            cartItems={cartItems}
            handleCountCartItems={handleCountCartItems}
            handleRemoveCart={handleRemoveCart}
            handleCalculatorSubtotal={handleCalculatorSubtotal}
            handleUpdateQuantity={handleUpdateQuantity}
          />
        </div>
      </div>
    </>
  );
}

export default OrderOnline;
