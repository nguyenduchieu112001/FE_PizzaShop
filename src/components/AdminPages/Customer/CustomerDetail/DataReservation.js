const DataReservation = (data) => 
  data.map((item, index) => ({
    key: item.id,
    sur: index + 1,
    reservationCode: item.reservationCode,
    createdAt: item.createdAt,
    reservationDate: item.reservationDate,
    reservationTime: item.reservationTime,
    partySize: item.partySize,
  }));
export default DataReservation;