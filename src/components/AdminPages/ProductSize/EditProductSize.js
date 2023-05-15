import React, { useState } from "react";
import { Button, Form, FormControl, FormGroup } from "react-bootstrap";
import { Label } from "semantic-ui-react";

function EditProductSize({ productSize, handleEdit }) {
  const [name, setName] = useState(productSize.name);
  const [percent, setPercent] = useState(productSize.percentPrice);
  const handleSave = async (e) => {
    e.preventDefault();
    const form = {
      name,
      percentPrice: percent,
    };
    handleEdit(form);
  };
  return (
    <Form onSubmit={handleSave}>
      <FormGroup controlId="productSizeName">
        <Label>Product Size Name</Label>
        <FormControl
          type="text"
          placeholder="Enter product type name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>
      <FormGroup controlId="productTypeName">
        <Label>Product Size Percent</Label>
        <FormControl
          type="number"
          placeholder="Enter product type name"
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
        />
      </FormGroup>
      <Button variant="primary" type="submit">
        Save Changes
      </Button>
    </Form>
  );
}

export default EditProductSize;
