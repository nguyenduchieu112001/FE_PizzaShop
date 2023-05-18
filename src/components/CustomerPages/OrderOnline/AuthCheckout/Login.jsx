import { Button, Form, Input } from "antd";
import React from "react";
import { Helmet } from "react-helmet";

function Login({ handleSubmit, form }) {
  const onFinish = (values) => {
    handleSubmit(values.username, values.Password);
  };
  return (
    <>
      <Helmet>
        <title>Auth - Login</title>
      </Helmet>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="Password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
            {
              type: "password",
              message: "Please enter a valid Password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "50%" }}
            className="bg-[#1677ff]"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Login;
