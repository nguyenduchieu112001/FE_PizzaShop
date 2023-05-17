const DataDetail = (billDetail) =>
  billDetail.map((item, index) => ({
    key: item.id,
    sur: index + 1,
    image: (
      <img
        src={`http://localhost:8080${item.productSize.product.image}`}
        alt={item.productSize.product.productName}
        width="80px"
        height="80px"
      />
    ),
    productName: item.productSize.product.productName,
    quantity: item.quantity,
    productType: item.productSize.product.productType.name,
    size: item.productSize.size.name,
    productPrice: item.productSize.productPrice.toLocaleString('vi-VN'),
    totalPrice: (item.productSize.productPrice * item.quantity).toLocaleString('vi-VN')
  }));
export default DataDetail;
