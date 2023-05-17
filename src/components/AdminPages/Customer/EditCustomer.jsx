import React from "react";
import { Button, Col, Form, FormControl, FormGroup } from "react-bootstrap";
import { Label } from "semantic-ui-react";

function EditCustomer({
  handleSave,
  customerName,
  setCustomerName,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  address,
  setAddress,
}) {
  return (
    <Form onSubmit={handleSave}>
      <FormGroup className="mb-3" controlId="customerName">
        <Label sm={5}>
          Customer Name <b style={{ color: "red" }}>*</b>
        </Label>
        <Col sm={20}>
          <FormControl
            type="text"
            placeholder="Enter customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </Col>
      </FormGroup>
      <FormGroup className="mb-3" controlId="email">
        <Label sm={5}>
          Email <b style={{ color: "red" }}>*</b>
        </Label>
        <Col sm={20}>
        <FormControl
            type="text"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Col>
      </FormGroup>
      <FormGroup className="mb-3" controlId="phoneNumber">
        <Label sm={5}>
          Phone Number <b style={{ color: "red" }}>*</b>
        </Label>
        <Col sm={20}>
          <FormControl
            type="number"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Col>
      </FormGroup>
      <FormGroup className="mb-3" controlId="address">
        <Label sm={5}>
          Address <b style={{ color: "red" }}>*</b>
        </Label>
        <Col sm={20}>
          <FormControl
            type="textarea"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Col>
      </FormGroup>

      <Button variant="primary" type="submit">
        Save Changes
      </Button>
    </Form>
  );
}

export default EditCustomer;
