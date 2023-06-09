import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

//pages admin
import ListProductsAPI from "../components/AdminPages/Product/ListProductsAPI";
import LoginAPI from "../components/AdminPages/LoginAdmin/LoginAPI";
import Navbars from "../components/AdminPages/layout/Navbars";
import ProductTypesAPI from "../components/AdminPages/ProductType/ProductTypesAPI";
import ListReservationAPI from "../components/AdminPages/Reservation/ListReservationAPI";
import ListBillsAPI from "../components/AdminPages/Bill/ListBillsAPI";
import ListProductSizeAPI from "../components/AdminPages/ProductSize/ProductSizesAPI";
import AdminHome from "../components/AdminPages/Home/HomeAPI";
import CustomersAPI from "../components/AdminPages/Customer/CustomersAPI";

//pages user
import RegisterAPI from "../components/CustomerPages/RegisterUser/RegisterAPI";
import LoginCustomerAPI from "../components/CustomerPages/LoginUser/LoginAPI";
import Home from "../components/CustomerPages/Home/Home";
import InputEmailAPI from "../components/CustomerPages/ChangePassword/InputEmailAPI";
import ChangePasswordAPI from "../components/CustomerPages/ChangePassword/ChangePasswordAPI";
import ReservationAPI from "../components/CustomerPages/Reservations/ReservationAPI";
import OrderOnline from "../components/CustomerPages/OrderOnline/Order/OrderOnlineAPI";
import ConfirmReservationAPI from "../components/CustomerPages/Reservations/ConfirmReservationAPI";
import CheckOut from "../components/CustomerPages/OrderOnline/Checkout/CheckoutAPI";
import Information from "../components/CustomerPages/CustomerInformation/InformationAPI";
import Auth from "../components/CustomerPages/OrderOnline/AuthCheckout/Auth";
// import Header from "../components/CustomerPages/OrderOnline/Header/Header";

function RouteConfig() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/admin" element={<LoginAPI />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route
            path="/admin/products"
            element={
              <>
                <Navbars />
                <ListProductsAPI />
              </>
            }
          />
          <Route
            path="/admin/productTypes"
            element={
              <>
                <Navbars />
                <ProductTypesAPI />
              </>
            }
          />
          <Route
            path="/admin/reservations"
            element={
              <>
                <Navbars />
                <ListReservationAPI />
              </>
            }
          />
          <Route
            path="/admin/bills"
            element={
              <>
                <Navbars />
                <ListBillsAPI />
              </>
            }
          />
          <Route
            path="/admin/productSizes"
            element={
              <>
                <Navbars />
                <ListProductSizeAPI />
              </>
            }
          />
          <Route
            path="/admin/users"
            element={
              <>
                <Navbars />
                <CustomersAPI />
              </>
            }
          />

          <Route path="*" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sign-up" element={<RegisterAPI />} />
          <Route path="/sign-in" element={<LoginCustomerAPI />} />
          <Route path="/send-mail" element={<InputEmailAPI />} />
          <Route path="/change-password" element={<ChangePasswordAPI />} />
          <Route path="/reservation" element={<ReservationAPI />} />
          <Route path="/order" element={<OrderOnline />} />
          <Route
            path="/confirm-reservation"
            element={<ConfirmReservationAPI />}
          />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/information" element={<Information />} />
          <Route path="/auth" element={<Auth />} />
          {/* <Route path="/header" element={<Header />} /> */}
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default RouteConfig;
