import { Checkbox } from "antd";
import { useState } from "react";
import { Button, Col, Form, FormControl, FormGroup } from "react-bootstrap";
import { Label } from "semantic-ui-react";

function AddProduct({
  handleSubmit,
  selectedProductType,
  setSelectedProductType,
  productName,
  setProductName,
  description,
  setDescription,
  price,
  setPrice,
  setImage,
  productTypes,
  sizes,
  selectedSizes,
  setSelectedSizes,
}) {
  const [selectAll, setSelectAll] = useState(false);
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedSizes([]);
    } else {
      setSelectedSizes(sizes.map((size) => size.id));
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
    <Form onSubmit={handleSubmit}>
      <FormGroup className="mb-3" controlId="productName">
        <Label sm={5}>
          Product Name <b style={{ color: "red" }}>*</b>
        </Label>
        <Col sm={20}>
          <FormControl
            type="text"
            name="productName"
            // ref={userRef}
            placeholder="Product Name"
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
            required
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
            name="description"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            value={description}
            required
          />
        </Col>
      </FormGroup>
      <FormGroup className="mb-3" controlId="price">
        <Label sm={5}>
          Price <b style={{ color: "red" }}>*</b>
        </Label>
        <Col sm={20}>
          <FormControl
            type="number"
            name="price"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required
          />
        </Col>
      </FormGroup>
      <FormGroup className="mb-3">
        <Label sm={5}>
          Image <b style={{ color: "red" }}>*</b>
        </Label>
        <Col sm={20}>
          <FormControl
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
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
            name="productType"
            value={selectedProductType}
            onChange={(e) => setSelectedProductType(e.target.value)}
          >
            <option value="">Select a product type</option>
            {productTypes.map((productType) => (
              <option key={productType.id} value={productType.id}>
                {productType.name}
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
        Add New Product
      </Button>
    </Form>
  );
}

export default AddProduct;
