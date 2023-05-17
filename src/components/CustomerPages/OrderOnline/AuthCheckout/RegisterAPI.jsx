import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Register from "./Register";

function RegisterAPI() {
  const navigate = useNavigate();
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
      await axios.post(`http://localhost:8080/api/v1/customer/register`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      toast.success(`Đăng ký thành công`, {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/auth");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message, {
          draggable: true,
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error("Network error. Please try again later.", {
          draggable: true,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };
  return <Register handleSubmit={handleSubmit} />;
}

export default RegisterAPI;
