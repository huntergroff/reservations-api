import express from "express";
import bodyparser from "body-parser";
import userRoutes from "./users/routes";
import reservationRoutes from "./reservations/routes";
import propertyRoutes from "./properties/routes";

const app = express();
app.use(bodyparser.json());

export const basetext = "Welcome to the Vacation Rentals API! 🏡";

app.get("/", (req, res) => {
  res.status(200);
  res.send(basetext);
});

userRoutes(app);
reservationRoutes(app);
propertyRoutes(app);

export default app;
