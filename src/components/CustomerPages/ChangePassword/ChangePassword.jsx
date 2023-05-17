import { Button, Card, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ChangePassword({ errMsg, handleSubmit }) {
  const navigate = useNavigate();
  const onFinish = (values) => {
    handleSubmit(values.newPassword, values.code);
  };

  const onFinishFailed = () => {
    toast.error(errMsg, {
      draggable: true,
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleCancel = () => {
    navigate("/sign-in");
  };
  return (
    <div className="pt-[100px]">
      <Card
        title={<h1>Change Password</h1>}
        bordered={true}
        style={{
          width: "40%",
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
            label="New Password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please input your New Password!",
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
            dependencies={["newPassword"]}
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
            label="Code"
            name="code"
            rules={[
              {
                required: true,
                message: "Please input your Code!",
              },
            ]}
          >
            <Input />
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
              className="bg-[#1677ff] mr-4"
            >
              Change password
            </Button>
            <Button htmlType="button" onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default ChangePassword;
