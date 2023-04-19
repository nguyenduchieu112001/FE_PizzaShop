import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ChangePassword from "./ChangePassword";

function ChangePasswordAPI() {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");

  // };

  const handleSubmit = async (password, code) => {
    const data = {
        password: password,
        code: code,
    }
    try {
      const id = parseInt(localStorage.getItem("customerID"));
      await axios.put(
        `http://localhost:8080/api/v1/customer/change-password/${id}`,
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(`Đổi mật khẩu thành công`, {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/sign-in");
      localStorage.clear();
    } catch (error) {
      if (error.response) {
        setErrMsg(error.response.data.message);
        toast.error(error.response.data.message, {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      } else {
        setErrMsg("Network error. Please try again later.");
      }
    }
  };

  return (
    <>
      <ChangePassword
        errMsg={errMsg}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default ChangePasswordAPI;
