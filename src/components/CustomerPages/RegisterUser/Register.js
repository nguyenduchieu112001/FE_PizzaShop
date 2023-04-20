import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { toast } from "react-toastify";

const Register = ({ errMsg, handleSubmit }) => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    handleSubmit(values);
  };
  const onFinishFailed = () => {
    toast.error(errMsg, {
      draggable: true,
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const handleSignIn = () => {
    navigate("/sign-in");
  };
  return (
    <>
      <Card
        title={<h1>Sign Up</h1>}
        bordered={true}
        style={{
          width: "60%",
          border: "solid",
          margin: "0 auto",
          marginTop: "20px",
        }}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 2000,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="fullName"
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Please input your fullName!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                  {
                    pattern: /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/,
                    message:
                      "4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                  {
                    pattern:
                      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!]).{8,}$/,
                    message:
                      "8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character. Allowed special characters: (!@#$%)",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={12}>
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
                      if (!value || getFieldValue("password") === value) {
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
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid Email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phone"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your Phone!",
                  },
                  {
                    pattern: /^(\+84|0)\d{9,10}$/,
                    message:
                      "Phone number must start with '+84' or '0' and must be 9 or 10 digits long.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input your Address!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: "16px" }}
                >
                  Đăng ký
                </Button>
                <Button htmlType="button" onClick={handleSignIn}>
                  Đăng nhập
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default Register;
