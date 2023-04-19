import { Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormControl, FormGroup } from "react-bootstrap";
import { Label } from "semantic-ui-react";

function EditProduct({
  handleSave,
  productName,
  setProductName,
  description,
  setDescription,
  price,
  setPrice,
  handleImageChange,
  selectedProductType,
  setSelectedProductType,
  productTypes,
  sizes,
  selectedSizes,
  setSelectedSizes,
}) {
  const [selectAll, setSelectAll] = useState(false);
  useEffect(() => {
    if (selectedSizes.length === sizes.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedSizes, sizes]);
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedSizes([]);
    } else {
      setSelectedSizes(sizes.map((size) => size.size.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectSize = (id) => {
    if (selectedSizes.includes(id)) {
      setSelectedSizes((prevSelectedSizes) =>
        prevSelectedSizes.filter((selectedId) => selectedId !== id)
      );
      setSelectAll(false);
    } else {
      setSelectedSizes((prevSelectedSizes) => [...prevSelectedSizes, id]);
      if (selectedSizes.length === sizes.length - 1) {
        setSelectAll(true);
      }
    }
  };

  return (
    <Form onSubmit={handleSave}>
      <FormGroup className="mb-3" controlId="productName">
        <Label sm={5}>
          Product Name <b style={{ color: "red" }}>*</b>
        </Label>
        <Col sm={20}>
          <FormControl
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Col>
      </FormGroup>
      <FormGroup className="mb-3" controlId="description">
        <Label sm={5}>
          Description <b style={{ color: "red" }}>*</b>
        </Label>
        <Col sm={20}>
          <FormControl
            as="textarea"
            rows={3}
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Col>
      </FormGroup>
      <FormGroup className="mb-3" controlId="price">
        <Label sm={5}>
          Price <b style={{ color: "red" }}>*</b>
        </Label>
        <Col sm={20}>
          <FormControl
            type="text"
            placeholder="Enter product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Col>
      </FormGroup>
      <FormGroup className="mb-3" controlId="image">
        <Label sm={5}>
          Image <b style={{ color: "red" }}>*</b>
        </Label>
        <Col sm={20}>
          <FormControl
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Col>
      </FormGroup>
      <FormGroup className="mb-3" controlId="productType">
        <Label sm={5}>
          Product Type <b style={{ color: "red" }}>*</b>
        </Label>
        <Col sm={20}>
          <FormControl
            as="select"
            value={selectedProductType}
            onChange={(e) => setSelectedProductType(e.target.value)}
          >
            {productTypes.map((pt) => (
              <option key={pt.id} value={pt.id}>
                {pt.name}
              </option>
            ))}
          </FormControl>
        </Col>
      </FormGroup>

      <FormGroup className="mb-3" controlId="size">
        <div>
          <Label sm={5}>
            Sizes <b style={{ color: "red" }}>*</b>
          </Label>
            <Checkbox checked={selectAll} onChange={handleSelectAll} />
            Select All
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {sizes.map((size) => (
              <div key={size.id} style={{ marginRight: "10px" }}>
                <Checkbox
                  checked={selectedSizes.includes(size.id)}
                  onChange={() => handleSelectSize(size.id)}
                />
                {size.name}
              </div>
            ))}
          </div>
        </div>
      </FormGroup>
      <Button variant="primary" type="submit">
        Save Changes
      </Button>
    </Form>
  );
}

export default EditProduct;
