import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputEmail from "./InputEmail";

function InputEmailAPI() {
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/customer/find-by-email?email=${email}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      localStorage.setItem("customerID", response.data.message);
      const resolveAfter3Sec = new Promise((resolve) =>
        setTimeout(resolve, 4000)
      );
      toast.promise(resolveAfter3Sec, {
        pending: "Please wait...",
        success: "Email sent successfully!",
        error: "Failed to send email",
      });
      await axios.post(
        `http://localhost:8080/api/v1/customer/send-mail?recipient=${email}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setEmail("");
      navigate("/change-password");
    } catch (error) {
      if (error?.response) {
        setErrMsg(error.response.data.message);
        setEmail("");
      }
    }
  };
  return (
    <InputEmail
      setEmail={setEmail}
      errMsg={errMsg}
      handleSendEmail={handleSendEmail}
      errRef={errRef}
      userRef={userRef}
      email={email}
    />
  );
}

export default InputEmailAPI;
