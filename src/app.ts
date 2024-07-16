import express from "express";
import bodyparser from "body-parser";
import userRoutes from "./users/routes";
import reservationRoutes from "./reservations/routes";
import propertyRoutes from "./properties/routes";
import users from "./users/users";

/* Create the Express app */
const app = express();
app.use(bodyparser.json());

/**
 * Fake session middleware to simulate a logged-in user.
 * In a real application, this would be replaced with a session using express-session.
 */
const mockSession = (req, res, next) => {
  req.session = {
    user: users.sentinel,
  };
  next();
};
app.use(mockSession);

/* Welcome page */
app.get("/", (req, res) => {
  res.status(200);
  res.send(
    "Welcome to the Vacation Rentals API! 🏡" +
      "You are logged in as an " +
      req.session["user"]["role"] +
      " user."
  );
});

/* Compile all routes */
userRoutes(app);
reservationRoutes(app);
propertyRoutes(app);

export default app;
