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
    startdate: "2024-01-01",
    enddate: "2024-01-07",
  },
  {
    reservationid: 3,
    username: "sentinel",
    propertyid: 3,
    startdate: "2020-01-01",
    enddate: "2020-01-07",
  },
];

/* Mock database model. Built to be replaced with a mongoose model, as explained below. */
class ReservationsModel {
  // Find all reservations matching the given user or property id
  static async find(id = null) {
    if (id) {
      if (id.userid) {
        return reservations.filter((r) => r.username === id.userid);
      } else if (id.propertyid) {
        return reservations.filter((r) => r.propertyid === +id.propertyid);
      }
    }
    return reservations;
  }

  // Find a reservation by its id
  static async findOne({ reservationid }) {
    const res = reservations.find((r) => r.reservationid == reservationid);
    return reservations.find((r) => r.reservationid == reservationid);
  }

  // Create a new reservation
  static async create({ reservation }) {
    // Generate a unique reservation id
    var randomid = Math.floor(Math.random() * 1000);
    while (reservations.find((r) => r.reservationid === randomid)) {
      randomid = Math.floor(Math.random() * 1000);
    }
    reservation.reservationid = randomid;
    // Add the reservation to the database
    reservations.push(reservation);
    // Return the reservation
    return reservation;
  }
}

export default ReservationsModel;

/*
 * The mock database could be replaced with a mongoose model as follows.
 * The model would be defined in a schema file, and connected to the reservations collection in the database.
 * The model would then be exported for use in the DAO file.
 */

// import mongoose from "mongoose";
// import schema from "./schema";
// const model = mongoose.model("reservations", schema);
// export default model;
