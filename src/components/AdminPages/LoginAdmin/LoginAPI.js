import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../../context/AuthProvider";
import Login from "./Login";

function LoginAPI() {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const { setAuth } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {}, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      setUsername("");
      setPassword("");
      toast.success(`Xin chào ${name?.data.message}!`, {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/admin/products");
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing username or password");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };
  return (
    <>
      <Login
        handleSubmit={handleSubmit}
        userRef={userRef}
        errMsg={errMsg}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        errRef={errRef}
      />
    </>
  );
}

export default LoginAPI;
