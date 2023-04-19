import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ChangePassword from "./ChangePassword";

function ChangePasswordAPI() {
  const [form, setForm] = useState({
    password: "",
    confirm: "",
    code: "",
  });
  const [valid, setValid] = useState({
    password: false,
    confirm: false,
    code: false,
  });
  const [focus, setFocus] = useState({
    password: false,
    confirm: false,
    code: false,
  });
  const { PWD_REGEX } = {
    PWD_REGEX: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!]).{8,}$/,
  };

  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const valid = validateFields(form);
    setValid(valid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  const validateFields = (form) => {
    const { password, confirm, code } = form;
    const codeValid = code.length === 6;
    return {
      password: PWD_REGEX.test(password),
      confirm: confirm === password,
      code: codeValid,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
        password: form.password,
        code: form.code,
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
      } else {
        setErrMsg("Network error. Please try again later.");
      }
    }
  };

  return (
    <>
      <ChangePassword
        form={form}
        setForm={setForm}
        valid={valid}
        setValid={setValid}
        errMsg={errMsg}
        userRef={userRef}
        errRef={errRef}
        focus={focus}
        setFocus={setFocus}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default ChangePasswordAPI;
