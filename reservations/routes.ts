import { Express, Request, Response } from "express";
import * as dao from "./dao";

type Reservation = {
  reservationid: number;
  username: string;
  propertyid: number;
  startdate: string;
  enddate: string;
};

function reservationRoutes(app: Express) {
  const getReservations = async (req: Request, res: Response) => {
    const reservations = await dao.findAllReservations();
    res.json(reservations);
  }

  const getReservation = async (req: Request, res: Response) => {
    const { id } = req.params;
    const reservation = await dao.findReservationById(id);
    if (!reservation) {
      res.status(404).send('Reservation not found.');
    } else {
      res.json(reservation);
    }
  }

  const getReservationsByUserId = async (req: Request, res: Response) => {
    const { userid } = req.params;
    const reservations = await dao.findReservationsByUserId(userid);
    res.json(reservations);
  }

  const getReservationsByPropertyId = async (req: Request, res: Response) => {
    const { propertyid } = req.params;
    const reservations = await dao.findReservationsByPropertyId(propertyid);
    res.json(reservations);
  }

  const postReservation = async (req: Request, res: Response) => {
    const { username, propertyid, startdate, enddate } = req.body;
    if (!username || !propertyid || !startdate || !enddate) {
      res.status(400).send('Missing required fields. Please provide username, propertyid, startdate (YYYY-MM-DD), and enddate (YYYY-MM-DD).');
      return;
    }
    const reservation: Reservation = {
      reservationid: null,
      username: username,
      propertyid: propertyid,
      startdate: startdate,
      enddate: enddate
    };
    const existingPropertyReservations = await dao.findReservationsByPropertyId(req.body.propertyid);
    const existingUserReservations = await dao.findReservationsByUserId(req.body.userid);
    if (!ReservationUtil.checkAvailability(reservation, existingPropertyReservations)){
      res.status(400).send('Property is not available for the selected dates.');
      return;
    }
    if (!ReservationUtil.checkAvailability(reservation, existingUserReservations)){
      res.status(400).send('User already has a reservation for the selected dates.');
      return;
    }
    const newReservation = await dao.createReservation(reservation);
    res.json(newReservation);
  }

  app.get("/reservation/:id", getReservation);
  app.get("/user/:userid/reservations", getReservationsByUserId);
  app.get("/property/:propertyid/reservations", getReservationsByPropertyId);
  app.get("/reservations", getReservations);
  app.post("/makereservation", postReservation);
}

class ReservationUtil {
  static checkAvailability(reservation: Reservation, existingReservations: Reservation[]) {
    for (const existingReservation of existingReservations) {
      if (reservation.startdate >= existingReservation.startdate && reservation.startdate <= existingReservation.enddate) {
        return false;
      }
      if (reservation.enddate >= existingReservation.startdate && reservation.enddate <= existingReservation.enddate) {
        return false;
      }
    }
    return true;
  }
}

export default reservationRoutes;
