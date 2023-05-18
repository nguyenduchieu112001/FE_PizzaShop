import { Button, Form, Input } from "antd";
import React from "react";
import { Helmet } from "react-helmet";

function ChangePassword({
  handleChangePassword,
  customer,
  form,
}) {
  const onFinish = async (values) => {
    const data = {
      username: customer.userName,
      password: values.password,
      newPassword: values.newPassword,
    };
    await handleChangePassword(data);
  };
  return (
    <div className="pl-[250px]">
      <Helmet>
        <title>Change Password</title>
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
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Old Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your old Password!",
            },
            {
              type: "password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="newPassword"
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
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please input your Confirm Password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Confirm Password does not match!")
                );
              },
            }),
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
            Change password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ChangePassword;
