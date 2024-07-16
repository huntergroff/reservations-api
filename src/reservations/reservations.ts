/* Mock reservations table. Built to simulate a database in local memory. */
const reservations = [
  {
    reservationid: 1,
    username: "johndoe",
    propertyid: 1,
    startdate: "2020-01-01",
    enddate: "2020-01-07",
  },
  {
    reservationid: 2,
    username: "brucewayne",
    propertyid: 2,
    startdate: "2020-03-04",
    enddate: "2020-04-09",
  },
  {
    reservationid: 3,
    username: "sentinel",
    propertyid: 3,
    startdate: "2020-06-23",
    enddate: "2020-06-24",
  },
  {
    reservationid: 4,
    username: "brucewayne",
    propertyid: 1,
    startdate: "2020-06-01",
    enddate: "2020-06-07",
  },
];

export default reservations;
