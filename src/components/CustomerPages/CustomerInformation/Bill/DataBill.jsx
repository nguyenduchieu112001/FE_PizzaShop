import { Tag } from "antd";
import moment from "moment";

const DataBill = (bill) => 
    bill.map((item, index) => ({
        key: item.id,
        sur: index+1,
        createdAt: moment(item.createdAt).format('DD/MM/YYYY'),
        total: item.total.toLocaleString('vi-VN'),
        billStatus: (
            <Tag color={
                item.billStatus === "Canceled" ? "Red" :
                item.billStatus === "Paid" ? "#87d068" :
                item.billStatus === "Processing" ? "geekblue" :
                item.billStatus === "Deposited" ? "cyan" : "magenta"
            }>{item.billStatus}</Tag>
        ),
        action: item.orders
    }))
export default DataBill;