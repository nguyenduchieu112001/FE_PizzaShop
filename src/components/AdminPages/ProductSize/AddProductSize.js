import React from 'react'
import { Button, Col, Form, FormControl, FormGroup } from 'react-bootstrap';
import { Label } from 'semantic-ui-react';

function AddProductSize({ handleSubmit, productSize, setProductSize, errMsg }) {
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
                onChange={(e) => setProductSize(e.target.value)}
                value={productSize}
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

export default AddProductSize
