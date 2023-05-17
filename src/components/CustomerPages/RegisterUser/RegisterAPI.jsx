import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Register from "./Register";

function RegisterAPI() {
  // const { USER_REGEX, PWD_REGEX, EMAIL_REGEX, PHONE_REGEX } = {
  //   USER_REGEX: /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/,
  //   PWD_REGEX: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!]).{8,}$/,
  //   EMAIL_REGEX: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  //   PHONE_REGEX: /^(\+84|0)\d{9,10}$/,
  // };

  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (values) => {
    try {
      const data = {
        customerName: values.fullName,
        email: values.email,
        password: values.password,
        address: values.address,
        phoneNumber: values.phoneNumber,
        username: values.username,
      };
      await axios.post("http://localhost:8080/api/v1/customer/register", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      toast.success(`Đăng ký thành công`, {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/sign-in");
    } catch (error) {
      if (error.response) {
        setErrMsg(error.response.data.message);
        toast.error(error.response.data.message, {
          draggable: true,
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        setErrMsg("Network error. Please try again later.");
        toast.error("Network error. Please try again later.", {
          draggable: true,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  return (
    <>
      <Register
        errMsg={errMsg}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default RegisterAPI;
