import Reservation from "./reservation.type";

/* Utility functions for checking validity of reservations */
class ReservationUtil {
  // Check if a reservation is valid given existing reservations
  static checkAvailability(
    reservation: Reservation,
    existingReservations: Reservation[]
  ) {
    for (const existingReservation of existingReservations) {
      // If both dates are before existing start date, continue
      if (
        reservation.startdate < existingReservation.startdate &&
        reservation.enddate < existingReservation.startdate
      ) {
        break;
      }

      // If both dates are after existing end date, continue
      if (
        reservation.startdate > existingReservation.enddate &&
        reservation.enddate > existingReservation.enddate
      ) {
        break;
      }
      return false;
    }
    return true;
  }

  // Check if the start date is before the end date
  static checkDatesInOrder(startdate: string, enddate: string) {
    if (startdate >= enddate) {
      return false;
    }
    return true;
  }

  // Check if all required fields are present in the reservation
  static checkRequiredFields(reservation: Reservation) {
    if (
      !reservation.username ||
      !reservation.propertyid ||
      !reservation.startdate ||
      !reservation.enddate
    ) {
      return false;
    }
    return true;
  }

  // Check if a date is in the correct format
  static isValidDate(date: string) {
    return Date.parse(date) ? true : false;
  }
}

export default ReservationUtil;
