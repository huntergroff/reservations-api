import { Express, Request, Response } from "express";
import * as dao from "./dao";

/* Routes for the user resource */
function userRoutes(app: Express) {
  // Get a user by username
  const getUser = async (req: Request, res: Response) => {
    const { username } = req.params;
    const user = await dao.findUserByUsername(username);
    if (!user) {
      res.status(404).send("User not found.");
    } else {
      res.json(user);
    }
  };

  // Get all users
  const getUsers = async (req: Request, res: Response) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  app.get("/user/:username", getUser);
  app.get("/users", getUsers);
}

export default userRoutes;
