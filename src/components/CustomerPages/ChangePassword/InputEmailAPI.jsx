import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputEmail from "./InputEmail";

function InputEmailAPI() {
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleSendEmail = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/customer/find-by-email?email=${email}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

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
      navigate("/change-password", {
        state: {
          customerId: response.data.message
        }
      });
    } catch (error) {
      if (error?.response) {
        setErrMsg(error.response.data.message);
        toast.error(error.response.data.message, {
          draggable: true,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };
  return (
    <InputEmail
      errMsg={errMsg}
      handleSendEmail={handleSendEmail}
    />
  );
}

export default InputEmailAPI;
