import { Express, Request, Response } from "express";
import * as dao from "./dao";

/* Routes for the user resource */
function userRoutes(app: Express) {
  // Get a user by username
  const getUserByUsername = async (req: Request, res: Response) => {
    const { username } = req.params;
    const user = await dao.findUserByUsername(username);
    if (!user) {
      res.status(404).send("User not found.");
    } else {
      res.json(user);
    }
  };

  // Get current user from session
  const getCurrentUser = async (req: Request, res: Response) => {
    if (!req.session["user"]) {
      res.status(404).send("User not found.");
    } else {
      res.json(req.session["user"]);
    }
  };

  // Get all users
  const getUsers = async (req: Request, res: Response) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  app.get("/user/:username", getUserByUsername);
  app.get("/users", getUsers);
  app.get("/user", getCurrentUser);
}

export default userRoutes;
