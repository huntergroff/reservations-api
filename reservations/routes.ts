import { Express, Request, Response } from "express";
import * as dao from "./dao";
import Reservation from "./reservation.type";

/* Routes for interacting with reservations in the database. */
function reservationRoutes(app: Express) {
  // Get all reservations
  const getReservations = async (req: Request, res: Response) => {
    const reservations = await dao.findAllReservations();
    res.json(reservations);
  };

  // Get a reservation by its ID
  const getReservation = async (req: Request, res: Response) => {
    const { id } = req.params;
    const reservation = await dao.findReservationById(id);
    if (!reservation) {
      res.status(404).send("Reservation not found.");
    } else {
      res.json(reservation);
    }
  };

  // Get all reservations for a user by their ID
  const getReservationsByUserId = async (req: Request, res: Response) => {
    const { userid } = req.params;
    const reservations = await dao.findReservationsByUserId(userid);
    if (reservations.length === 0) {
      res.status(204).send();
    } else {
      res.json(reservations);
    }
  };

  // Get all reservations for a property by its ID
  const getReservationsByPropertyId = async (req: Request, res: Response) => {
    const { propertyid } = req.params;
    const reservations = await dao.findReservationsByPropertyId(propertyid);
    if (reservations.length === 0) {
      res.status(204).send();
    } else {
      res.json(reservations);
    }
  };

  // Create a new reservation
  const postReservation = async (req: Request, res: Response) => {
    const { username, propertyid, startdate, enddate } = req.body;
    if (!username || !propertyid || !startdate || !enddate) {
      res
        .status(400)
        .send(
          "Missing required fields. Please provide username, propertyid, startdate (YYYY-MM-DD), and enddate (YYYY-MM-DD)."
        );
      return;
    }
    const reservation: Reservation = {
      reservationid: null,
      username: username,
      propertyid: propertyid,
      startdate: startdate,
      enddate: enddate,
    };
    const existingPropertyReservations = await dao.findReservationsByPropertyId(
      req.body.propertyid
    );
    const existingUserReservations = await dao.findReservationsByUserId(
      req.body.userid
    );
    if (
      !ReservationUtil.checkAvailability(
        reservation,
        existingPropertyReservations
      )
    ) {
      res.status(400).send("Property is not available for the selected dates.");
      return;
    }
    if (
      !ReservationUtil.checkAvailability(reservation, existingUserReservations)
    ) {
      res
        .status(400)
        .send("User already has a reservation for the selected dates.");
      return;
    }
    const newReservation = await dao.createReservation(reservation);
    res.status(201).json(newReservation);
  };

  app.get("/reservation/:id", getReservation);
  app.get("/user/:userid/reservations", getReservationsByUserId);
  app.get("/property/:propertyid/reservations", getReservationsByPropertyId);
  app.get("/reservations", getReservations);
  app.post("/reserve", postReservation);
}

class ReservationUtil {
  static checkAvailability(
    reservation: Reservation,
    existingReservations: Reservation[]
  ) {
    for (const existingReservation of existingReservations) {
      if (
        reservation.startdate >= existingReservation.startdate &&
        reservation.startdate <= existingReservation.enddate
      ) {
        return false;
      }
      if (
        reservation.enddate >= existingReservation.startdate &&
        reservation.enddate <= existingReservation.enddate
      ) {
        return false;
      }
    }
    return true;
  }
}

export default reservationRoutes;
