import moment from "moment";

const DataBill = (bill) => 
    bill.map((item, index) => ({
        key: item.id,
        sur: index+1,
        createdAt: moment(item.createdAt).format('DD/MM/YYYY'),
        total: item.total.toLocaleString('vi-VN'),
        billStatus: item.billStatus,
        action: item.orders
    }))
export default DataBill;