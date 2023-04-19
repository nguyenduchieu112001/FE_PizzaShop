import React from "react";
import Navbar from "../Home/NavBar";
import "./Menu.css";

function Menu({ products, productTypes }) {
  return (
    <>
      <Navbar />
      <div className="menu__menu">
        <div className="menu__container">
          <h1>Menu</h1>
          <p>Our Food Is Made with Love</p>
          {/* List items */}
          {productTypes.map((productType) => (
            <div key={productType.id}>
              <h1>{productType.name}</h1>
              <div className="txt-center" />
              <div className="menu__list">
                {products.map(
                  (product) =>
                    product.productType.name === productType.name && (
                      <div key={product.id} className="menu__item">
                        <div className="item__img">
                          {product.imageUrl && (
                            <img
                              src={product.imageUrl}
                              alt={product.productName}
                            />
                          )}
                        </div>
                        <h2 className="item__name">{product.productName}</h2>
                        <p>{product.description}</p>
                        <h2>{product.price} VNĐ</h2>
                      </div>
                    )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Menu;
