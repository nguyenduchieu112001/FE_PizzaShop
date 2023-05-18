import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ChangePassword from "./ChangePassword";
import { useForm } from "antd/es/form/Form";

function ChangePasswordAPI({ customer }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [form] = useForm();
  const handleResetFields = () => {
    form.resetFields();
  };

  const handleChangePassword = async (form) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/customer/change-password`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success(response.data.message, {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/sign-in");
      localStorage.clear();
    } catch (error) {
      if (error.response.status === 403) {
        toast.error("Mật khẩu không đúng", {
          draggable: true,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      handleResetFields();
    }
  };
  return (
    <ChangePassword
      handleChangePassword={handleChangePassword}
      customer={customer}
      form={form}
    />
  );
}

export default ChangePasswordAPI;
