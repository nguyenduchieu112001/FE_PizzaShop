import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Register from "./Register";

function RegisterAPI() {
  const { USER_REGEX, PWD_REGEX, EMAIL_REGEX, PHONE_REGEX } = {
    USER_REGEX: /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/,
    PWD_REGEX: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!]).{8,}$/,
    EMAIL_REGEX: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    PHONE_REGEX: /^(\+84|0)\d{9,10}$/,
  };

  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    user: "",
    pwd: "",
    matchPwd: "",
    email: "",
    phone: "",
    address: "",
  });

  const [validInput, setValidInput] = useState({
    fullName: false,
    user: false,
    pwd: false,
    matchPwd: false,
    email: false,
    phone: false,
    address: false,
  });

  const [inputFocus, setInputFocus] = useState({
    user: false,
    pwd: false,
    matchPwd: false,
    email: false,
    phone: false,
  });

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const validateFields = (formData) => {
    const { user, pwd, matchPwd, email, phone, address, fullName } = formData;
  
    const fullNameValid = fullName.trim().length >= 10;
    const addressValid = address.trim().length >= 10;
  
    return {
      user: USER_REGEX.test(user),
      pwd: PWD_REGEX.test(pwd),
      matchPwd: pwd === matchPwd,
      email: EMAIL_REGEX.test(email),
      phone: PHONE_REGEX.test(phone),
      address: addressValid,
      fullName: fullNameValid,
    };
  };

  useEffect(() => {
    const valid = validateFields(formData);
    setValidInput(valid);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        customerName: formData.fullName,
        email: formData.email,
        password: formData.pwd,
        address: formData.address,
        phoneNumber: formData.phone,
        username: formData.user,
      };
      await axios.post("http://localhost:8080/api/v1/customer/register", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      toast.success(`Đăng ký thành công`, {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/sign-in");
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
      <Register
        userRef={userRef}
        errMsg={errMsg}
        errRef={errRef}
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        validInput={validInput}
        inputFocus={inputFocus}
        setInputFocus={setInputFocus}
      />
    </>
  );
}

export default RegisterAPI;
