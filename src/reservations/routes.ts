import { Express, Request, Response } from "express";
import * as dao from "./dao";
import Reservation from "./reservation.type";
import ReservationUtil from "./utility";

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
    if (Number.isNaN(parseInt(id))) {
      res
        .status(400)
        .send("Invalid reservation ID. Please provide a valid ID.");
      return;
    }
    const reservation = await dao.findReservationById(parseInt(id));
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
    if (Number.isNaN(parseInt(propertyid))) {
      res.status(400).send("Invalid property ID. Please provide a valid ID.");
      return;
    }
    const reservations = await dao.findReservationsByPropertyId(
      parseInt(propertyid)
    );
    if (reservations.length === 0) {
      res.status(204).send();
    } else {
      res.json(reservations);
    }
  };

  // Create a new reservation
  const postReservation = async (req: Request, res: Response) => {
    // Check for required fields
    if (!ReservationUtil.checkRequiredFields(req.body)) {
      res
        .status(400)
        .send(
          "Missing required fields. Please provide username, propertyid, startdate (YYYY-MM-DD), and enddate (YYYY-MM-DD)."
        );
      return;
    }

    const reservation: Reservation = {
      reservationid: null,
      username: req.body.username,
      propertyid: req.body.propertyid,
      startdate: req.body.startdate,
      enddate: req.body.enddate,
    };

    // Check that dates are valid
    if (
      !ReservationUtil.isValidDate(reservation.startdate) ||
      !ReservationUtil.isValidDate(reservation.enddate)
    ) {
      res.status(400).send("Invalid date format. Please use YYYY-MM-DD.");
      return;
    }

    // Check that dates are in order
    if (
      !ReservationUtil.checkDatesInOrder(
        reservation.startdate,
        reservation.enddate
      )
    ) {
      res.status(400).send("Start date must be before end date.");
      return;
    }

    // Check that property and user are available
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

    // Create the reservation
    const newReservation = await dao.createReservation(reservation);
    res.status(201).json(newReservation);
  };

  // Delete a reservation by its ID
  const deleteReservation = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (Number.isNaN(parseInt(id))) {
      res
        .status(400)
        .send("Invalid reservation ID. Please provide a valid ID.");
      return;
    }
    const reservation = await dao.findReservationById(parseInt(id));
    if (!reservation) {
      res.status(404).send("Reservation not found.");
    } else {
      await dao.deleteReservation(parseInt(id));
      res.send("Reservation deleted.");
    }
  };

  // Update a reservation by its ID, changing the start and end dates
  const updateReservation = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { startdate, enddate } = req.body;
    if (Number.isNaN(parseInt(id))) {
      res
        .status(400)
        .send("Invalid reservation ID. Please provide a valid ID.");
      return;
    }
    const reservation = await dao.findReservationById(parseInt(id));

    if (!reservation) {
      res.status(404).send("Reservation not found.");
      return;
    }

    // Check that new dates are valid
    if (
      !ReservationUtil.isValidDate(startdate) ||
      !ReservationUtil.isValidDate(enddate)
    ) {
      res.status(400).send("Invalid date format. Please use YYYY-MM-DD.");
      return;
    }

    // Check that new dates are in order
    if (!ReservationUtil.checkDatesInOrder(startdate, enddate)) {
      res.status(400).send("Start date must be before end date.");
      return;
    }

    const newReservation = {
      ...reservation,
      startdate,
      enddate,
    };
    console.log(newReservation);

    // Get all reservations for the property and user (excluding the current reservation)
    const existingPropertyReservations = await dao.findReservationsByPropertyId(
      reservation.propertyid
    );
    const filteredPropertyReservations = existingPropertyReservations.filter(
      (r) => r.reservationid !== reservation.reservationid
    );
    const existingUserReservations = await dao.findReservationsByUserId(
      reservation.username
    );
    const filteredUserReservations = existingUserReservations.filter(
      (r) => r.reservationid !== reservation.reservationid
    );

    // Check that property and user are available
    if (
      !ReservationUtil.checkAvailability(
        newReservation,
        filteredPropertyReservations
      )
    ) {
      res.status(400).send("Property is not available for the selected dates.");
      return;
    }
    if (
      !ReservationUtil.checkAvailability(
        newReservation,
        filteredUserReservations
      )
    ) {
      res
        .status(400)
        .send("User already has a reservation for the selected dates.");
      return;
    }

    // Update the reservation
    const updatedReservation = await dao.updateReservation(
      parseInt(id),
      newReservation
    );
    res.json(updatedReservation);
  };

  app.get("/reservation/:id", getReservation);
  app.get("/user/:userid/reservations", getReservationsByUserId);
  app.get("/property/:propertyid/reservations", getReservationsByPropertyId);
  app.get("/reservations", getReservations);
  app.post("/reservation", postReservation);
  app.delete("/reservation/:id", deleteReservation);
  app.put("/reservation/:id", updateReservation);
}

export default reservationRoutes;
