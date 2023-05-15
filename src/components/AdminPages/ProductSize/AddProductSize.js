import React from "react";
import { Button, Col, Form, FormControl, FormGroup } from "react-bootstrap";
import { Label } from "semantic-ui-react";

function AddProductSize({ handleSubmit, setProductSize, setPercent }) {
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup className="mb-3" htmlFor="productType">
        <Label sm={5}>
          Product Size Name <b style={{ color: "red" }}>*</b>
        </Label>
        <Col sm={20}>
          <FormControl
            type="text"
            id="productType"
            placeholder="Product Size Name"
            onChange={(e) => setProductSize(e.target.value)}
            required
          />
        </Col>
      </FormGroup>
      <FormGroup className="mb-3" htmlFor="productType">
        <Label sm={5}>
          Product Size percent <b style={{ color: "red" }}>*</b>
        </Label>
        <Col sm={20}>
          <FormControl
            type="number"
            id="productType"
            placeholder="Product Size Name"
            onChange={(e) => setPercent(e.target.value)}
            required
          />
        </Col>
      </FormGroup>

      <Button variant="primary" type="submit">
        Add New Product Size
      </Button>
    </Form>
  );
}

export default AddProductSize;
