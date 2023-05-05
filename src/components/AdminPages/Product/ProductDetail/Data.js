const Data = (productDetails) =>
  productDetails.map((productDetail, index) => ({
    key: productDetail.id,
    sur: index + 1,
    size: productDetail.size.name,
    percentPrice: productDetail.size.percentPrice,
    price: productDetail.productPrice.toLocaleString('vi-VN'),
  }));

export default Data;
