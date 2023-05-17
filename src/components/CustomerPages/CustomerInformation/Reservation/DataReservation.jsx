import { Tag } from "antd";
import moment from "moment";

const DataReservation = (data) =>
  data.map((item, index) => ({
    key: item.id,
    sur: index + 1,
    reservationCode: item.reservationCode,
    createdAt: moment(item.createdAt).format("DD/MM/YYYY"),
    reservationDate: moment(item.reservationDate).format("DD/MM/YYYY"),
    reservationTime: item.reservationTime,
    partySize: item.partySize,
    reservationStatus: (
      <Tag
        color={
          item.reservationStatus === "Paid"
            ? "#87d068"
            : item.reservationStatus === "Deposited"
            ? "cyan"
            : "red"
        }
      >
        {item.reservationStatus}
      </Tag>
    ),
  }));
export default DataReservation;
