import { Col, Row } from "antd";
import React from "react";
import { Link } from "react-scroll";

function Header({ productTypes, handleProductTypeClick }) {
  function getImageUrl(name) {
    switch (name) {
      case "Pizza":
        return "https://afg.softworld.dev//uploads/images/Banner-Pizza-550x250--1.jpg";
      case "Pasta":
        return "https://afg.softworld.dev//uploads/images/a9e22603-c75e-435e-b142-aea119f9ea35.jpg";
      case "Beverage":
        return "images/pepsi-coca-cola-up-can-isolated-white-background-30795323.jpg";
      default:
        return "";
    }
  }

  return (
    <Row gutter={[16, 8]} className="px-12 bg-black pt-[66px]">
      <Col span={24}>
        <img src="images/Untitled1.png" alt="" className="w-max" />
      </Col>

      {productTypes.map((productType) => (
        <Col span={8} key={productType.id}>
          <Link
            to={productType.name}
            smooth={true}
            duration={500}
            offset={-120}
            onClick={() => handleProductTypeClick(productType)}
          >
            <img src={getImageUrl(productType.name)} alt="" />
            <div className="absolute z-[1] bottom-0 top-auto w-[97%] bg-[#f15a22] pb-4">
              <h3 className="text-center text-slate-100 text-[32px]">
                {productType.name}
              </h3>
            </div>
          </Link>
        </Col>
      ))}
    </Row>
  );
}

export default Header;
