import model from "./model";
import Reservation from "./reservation.type";

/**
 * A collection of custom functions to interact with the database using the Reservation model.
 */

export const findAllReservations = () => model.find();
export const findReservationById = (reservationid: number) =>
  model.findOne({ reservationid: reservationid });
export const findReservationsByUserId = (userid: string) =>
  model.find({ userid: userid });
export const findReservationsByPropertyId = (propertyid: number) =>
  model.find({ propertyid: propertyid });
export const createReservation = (reservation: Reservation) =>
  model.create({ reservation: reservation });
export const deleteReservation = (reservationid: number) =>
  model.deleteOne({ reservationid: reservationid });
export const updateReservation = (
  reservationid: number,
  reservation: Reservation
) =>
  model.updateOne({ reservationid: reservationid, reservation: reservation });
