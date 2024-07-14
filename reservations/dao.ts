import model from "./model";
import Reservation from "./reservation.type";

export const findAllReservations = () => model.find();
export const findReservationById = (reservationid: number) =>
  model.findOne({ reservationid: reservationid });
export const findReservationsByUserId = (userid: string) =>
  model.find({ userid: userid });
export const findReservationsByPropertyId = (propertyid: number) =>
  model.find({ propertyid: propertyid });
export const createReservation = (reservation: Reservation) =>
  model.create({reservation : reservation});
