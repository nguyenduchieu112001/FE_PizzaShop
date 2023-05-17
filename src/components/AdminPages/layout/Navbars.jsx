import React, { useEffect, useState } from "react";
import { NavbarBrand } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Navbars = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("name"));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <>
      <Navbar
        style={{ position: "fixed", left: 0, right: 0, top: 0, zIndex: 99 }}
        bg="dark"
        variant="dark"
      >
        <Container>
          <NavbarBrand as={Link} to="/admin/home">
            PizzaShop
          </NavbarBrand>
          <Nav className="me-auto">
            <Link to="/admin/products" className="nav-link">
              Products
            </Link>
            <Link to="/admin/productTypes" className="nav-link">
              ProductTypes
            </Link>
            <Link to="/admin/productSizes" className="nav-link">
              ProductSizes
            </Link>
            <Link to="/admin/reservations" className="nav-link">
              Reservations
            </Link>
            <Link to="/admin/bills" className="nav-link">
              Bills
            </Link>
            <Link to="/admin/users" className="nav-link">
              Users
            </Link>
          </Nav>
          <Navbar.Text>
            {name && <b style={{ fontSize: "100%" }}>{`Xin chào ${name} !`}</b>}
          </Navbar.Text>
          <Link to="/admin" className="nav-link" onClick={handleLogout}>
            <FiLogOut
              className="mx-4"
              style={{ fontSize: "150%", color: "whitesmoke" }}
            />
          </Link>
        </Container>
      </Navbar>
    </>
  );
};

export default Navbars;
