import React from "react";
import { Button, Card, Form, Input } from "antd";
import { toast } from "react-toastify";

function Login({
  handleSubmit,
  errMsg,
}) {
  const onFinish = (values) => {
    handleSubmit(values.username, values.Password)
  };

  const onFinishFailed = () => {
    toast.error(errMsg, {
      draggable: true,
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  return (
    <>
      <Card
        title={<h1>Login</h1>}
        bordered={true}
        style={{
          width: "30%",
          border: "solid",
          margin: "0 auto",
          marginTop: "20px",
        }}
      >
        <Form
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
          onFinishFailed={onFinishFailed}
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
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}

export default Login;
