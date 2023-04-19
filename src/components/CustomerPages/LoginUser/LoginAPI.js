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
    const local = localStorage.getItem("token")
    if(local){
      navigate("/home");
    }
  }, [navigate]);


  useEffect(() => {}, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      setUsername("");
      setPassword("");
      toast.success(`Login successful!`, {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/home");
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
