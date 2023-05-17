import React, { useState } from "react";
import { Button, Form, FormControl, FormGroup } from "react-bootstrap";
import { Label } from "semantic-ui-react";

function EditProductType({ productType, handleEdit }) {
  const [name, setName] = useState(productType.name);

  const handleSave = async (e) => {
    e.preventDefault();
    const form = {
      name,
    };
    handleEdit(form);
  };
  return (
    <Form onSubmit={handleSave}>
        <FormGroup controlId="productTypeName">
        <Label>Product Type Name</Label>
        <FormControl
          type="text"
          placeholder="Enter product type name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>
      <Button variant="primary" type="submit">
        Save Changes
      </Button>
    </Form>
  );
}

export default EditProductType;
