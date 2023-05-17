import moment from "moment";

const DataReservation = (data) => 
  data.map((item, index) => ({
    key: item.id,
    sur: index + 1,
    reservationCode: item.reservationCode,
    createdAt: moment(item.createdAt).format('DD/MM/YYYY'),
    reservationDate: moment(item.reservationDate).format('DD/MM/YYYY'),
    reservationTime: item.reservationTime,
    partySize: item.partySize,
  }));
export default DataReservation;