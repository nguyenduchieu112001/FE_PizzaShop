import { Button } from "antd";
import { AiFillSetting } from "react-icons/ai";

const handleDetailClick = (showModal, text, setBillDetail) => {
  setBillDetail(text);
  showModal(text);
};

const ColumnsBill = (showModal, setBillDetail) => [
  {
    title: "#",
    dataIndex: "sur",
    key: "sur",
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Tổng tiền",
    dataIndex: "total",
    key: "total",
  },
  {
    title: "Trạng thái",
    dataIndex: "billStatus",
    key: "billStatus",
  },
  {
    title: "Detail",
    dataIndex: "action",
    key: "action",
    render: (text, record) => (
      <Button>
        <div style={{ display: "flex" }} onClick={() => handleDetailClick(showModal, text, setBillDetail)}>
          <AiFillSetting className="mx-2" />
          Chi tiết
        </div>
      </Button>
    ),
  },
];
export default ColumnsBill;
