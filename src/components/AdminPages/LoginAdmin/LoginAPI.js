import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../../context/AuthProvider";
import Login from "./Login";

function LoginAPI() {
  const navigate = useNavigate();

  const { setAuth } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (username, password) => {

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/admin/login",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const name = await axios.get(`http://localhost:8080/api/v1/admin/name`, {
        headers: {
          Authorization: `Bearer ${response?.data.message}`,
        },
        withCredentials: true,
      });
      localStorage.setItem("token", response?.data.message);
      localStorage.setItem("name", name?.data.message);
      setAuth({ username, password });
      toast.success(`Xin chào ${name?.data.message}!`, {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/admin/products");
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No Server Response");
        toast.error("No Server Response", {
          draggable: true,
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        setErrMsg("Login Failed");
        toast.error("Login Failed", {
          draggable: true,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };
  return (
    <>
      <Login
        handleSubmit={handleSubmit}
        errMsg={errMsg}
      />
    </>
  );
}

export default LoginAPI;
