import { Button, Card, Col, Form, Input, Row } from "antd";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login({ handleSubmit, errMsg }) {
  const onFinish = (values) => {
    handleSubmit(values.username, values.Password);
  };

  const onFinishFailed = () => {
    toast.error(errMsg, {
      draggable: true,
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  return (
    <div className="pt-[100px]">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Card
        title={<h1 className="text-center">Đăng nhập</h1>}
        bordered={true}
        style={{
          width: "500px",
          border: "solid",
          margin: "0 auto",
        }}
        className="bg-[rgba(173,178,181,.5)]"
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
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "50%" }}
              className="bg-[#1677ff]"
            >
              Login
            </Button>
          </Form.Item>
          <Form.Item>
            <Row className="flex">
              <Col span={12}>
                <Link to="/send-mail">Quên mật khẩu</Link>
              </Col>
              <Col span={12} className="pl-[30%]">
                <Link to="/sign-up">Đăng ký</Link>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
