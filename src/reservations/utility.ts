import Reservation from "./reservation.type";

class ReservationUtil {
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

  static checkDatesInOrder(startdate: string, enddate: string) {
    if (startdate >= enddate) {
      return false;
    }
    return true;
  }

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

  static isValidDate(date: string) {
    return Date.parse(date) ? true : false;
  }
}

export default ReservationUtil;
