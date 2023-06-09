import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Login from "./Login";
import { useForm } from "antd/es/form/Form";

function LoginAPI() {
  const navigate = useNavigate();
  const [form] = useForm();

  const handleResetFields = () => {
    form.resetFields(['Password']);
  }

  const handleSubmit = async (username, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/customer/authenticate",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      localStorage.setItem("token", response?.data.message);
      toast.success(`Login successful!`, {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/home");
    } catch (error) {
      if (!error?.response) {
        toast.error("No Server Response", {
          draggable: true,
          position: toast.POSITION.TOP_RIGHT,
        });
      } else if (error.response?.status === 400) {
        toast.error("Missing username or password", {
          draggable: true,
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error("Login Failed", {
          draggable: true,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      handleResetFields();
    }
  };
  return (
    <>
      <Login
        handleSubmit={handleSubmit}
        form={form}
      />
    </>
  );
}

export default LoginAPI;
