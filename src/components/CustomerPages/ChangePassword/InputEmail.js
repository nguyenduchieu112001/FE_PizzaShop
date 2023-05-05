import React from "react";
import { Button, Card, Form, Input } from "antd";
import { toast } from "react-toastify";

function InputEmail({
  errMsg,
  handleSendEmail,
}) {
  const onFinish = (values) => {
    handleSendEmail(values.Email);
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
        title={<h1>Validation Email</h1>}
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
            span: 4,
          }}
          wrapperCol={{
            span: 20,
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
            label="Email"
            name="Email"
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
          <Button type="primary" htmlType="submit">
            Get code
          </Button>
        </Form>
      </Card>
    </>
  );
}

export default InputEmail;
