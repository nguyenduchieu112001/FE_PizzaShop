import React from "react";
import { Container, Dropdown, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { animateScroll, scroller } from "react-scroll";
import { BsFillPersonFill, BsFillPersonPlusFill } from "react-icons/bs";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import CustomerInformation from "./CustomerInformation";

function NavBar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleReservationClick = (reservation) => {
    navigate("/");
    scroller.scrollTo(reservation, {
      duration: 800, // Thời gian cuộn đến (ms)
      smooth: "easeInOutQuart", // Loại hiệu ứng cuộn
      offset: -100, // Độ lệch so với đích đến (pixel)
    });
  };

  const handleContactClick = (contact) => {
    navigate("/");
    scroller.scrollTo(contact, {
      duration: 800, // Thời gian cuộn đến (ms)
      smooth: "easeInOutQuart", // Loại hiệu ứng cuộn
      offset: -100, // Độ lệch so với đích đến (pixel)
    });
  };

  // useEffect(() => {
  //   handleReservationClick("reservation");
  //   handleContactClick("contact");
  // }, []);

  return (
    <>
      <Navbar
        style={{ position: "fixed", left: 0, right: 0, top: 0, zIndex: 99 }}
        bg="light"
        variant="light"
      >
        <Container>
          <NavbarBrand
            as={Link}
            to="/home"
            className="mx-4"
            style={{ color: "black" }}
            onClick={() => animateScroll.scrollToTop()}
          >
            HOME
          </NavbarBrand>
          <Nav className="me-auto">
            <Nav.Link
              // to="/"
              href="/home#reservation"
              onClick={() => handleReservationClick("reservation")}
              className="nav-link mx-3"
              style={{ color: "#dc3727" }}
            >
              RESERVATIONS
            </Nav.Link>
            <Link
              to="/menu"
              className="nav-link mx-3"
              style={{ color: "#dc3727" }}
              onClick={() => animateScroll.scrollToTop()}
            >
              MENU
            </Link>
            <Link
              to="/order"
              className="nav-link mx-3"
              style={{ color: "#dc3727" }}
              onClick={() => animateScroll.scrollToTop()}
            >
              ORDER ONLINE
            </Link>
            <Nav.Link
              // to="/"
              href="/home#contact"
              onClick={() => handleContactClick("contact")}
              className="nav-link mx-3"
              style={{ color: "#dc3727" }}
            >
              CONTACT
            </Nav.Link>
            <Link
              to="/history"
              className="nav-link mx-3"
              style={{ color: "#dc3727" }}
            >
              HISTORY
            </Link>
          </Nav>
          {token ? (
            <Dropdown>
              <Dropdown.Toggle variant="information" id="dropdown-basic">
                <BsFillPersonFill style={{ fontSize: "200%" }} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <CustomerInformation />
                <Dropdown.Item onClick={handleLogout}>
                  <div style={{ display: "flex" }}>
                    <FiLogOut className="mx-4" style={{ fontSize: "150%" }} />
                    Log out
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <>
              <Link
                to="/sign-up"
                style={{
                  fontSize: "120%",
                  textDecoration: "none",
                  color: "#dc3727",
                }}
              >
                <BsFillPersonPlusFill
                  className="mx-3"
                  style={{ fontSize: "150%" }}
                />
                Sign Up
              </Link>
              <Link
                to="/sign-in"
                className="mx-3"
                style={{
                  fontSize: "120%",
                  textDecoration: "none",
                  color: "#dc3727",
                }}
              >
                <FiLogIn className="mx-3" style={{ fontSize: "150%" }} /> Log In
              </Link>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
