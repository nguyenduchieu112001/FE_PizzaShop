import { Button, Form, Input, Modal } from "antd";
import React, { useEffect } from "react";

function ChangeInformation({
  handleEdit,
  customer,
  show,
  handleEditClose,
  handleEditShow,
}) {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      username: customer.username,
      customerName: customer.customerName,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      address: customer.address,
    });
  }, [customer, form]);

  const onFinish = (values) => {
    handleEdit(values);
  };
  return (
    <>
      <Button onClick={handleEditShow}>Change Information</Button>
      <Modal
        forceRender
        title="Change Information"
        open={show}
        onOk={() => {
          form.validateFields().then((values) => {
            form.resetFields();
            onFinish(values);
          });
        }}
        okText="Submit"
        onCancel={handleEditClose}
        okButtonProps={{ className: "bg-[#1677ff]" }}
      >
        <Form
          form={form}
          // name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Customer Name"
            name="customerName"
            rules={[
              {
                required: true,
                message: "Please input your Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
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
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          ></Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ChangeInformation;
