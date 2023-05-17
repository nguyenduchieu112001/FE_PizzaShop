import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Login from "./Login";

function LoginAPI() {
  const navigate = useNavigate();
  const handleSubmit = async (username, password) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/customer/authenticate`,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      localStorage.setItem("token", response?.data.message);
      toast.success(`Login successful!`, {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/checkout");
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
    }
  };
  return <Login handleSubmit={handleSubmit} />;
}

export default LoginAPI;
