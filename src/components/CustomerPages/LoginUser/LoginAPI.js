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
        "http://localhost:8080/api/v1/customer/authenticate",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      localStorage.setItem("token", response?.data.message);
      setAuth({ username, password });
      toast.success(`Login successful!`, {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/home");
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No Server Response");
        toast.error("No Server Response", {
          draggable: true,
          position: toast.POSITION.TOP_RIGHT,
        });
      } else if (error.response?.status === 400) {
        setErrMsg("Missing username or password");
        toast.error("Missing username or password", {
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
