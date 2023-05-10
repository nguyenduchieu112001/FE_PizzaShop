const DataBill = (bill) => 
    bill.map((item, index) => ({
        key: item.id,
        sur: index+1,
        billCode: item.billCode,
        createdAt: item.createdAt,
        total: item.total,
        billStatus: item.billStatus,
        action: item.orders
    }))
export default DataBill;