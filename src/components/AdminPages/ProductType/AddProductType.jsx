import React from "react";
import { Button, Col, Form, FormControl, FormGroup } from "react-bootstrap";
import { Label } from "semantic-ui-react";

function AddProductType({ handleSubmit, productType, setProductType, errMsg }) {
  return (
    <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-3" htmlFor="productType">
        <Label sm={5}>
          Product Name <b style={{ color: "red" }}>*</b>
        </Label>
        <Col sm={20}>
          <FormControl
            type="text"
            id="productType"
            placeholder="Product Type Name"
            onChange={(e) => setProductType(e.target.value)}
            value={productType}
            required
          />
        </Col>
      </FormGroup>
      <Button variant="primary" type="submit">
        Add New Product Type
      </Button>
    </Form>
  );
}

export default AddProductType;
