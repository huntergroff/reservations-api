import { Express, Request, Response } from "express";
import * as dao from "./dao";

function userRoutes(app: Express) {
  const getUser = async (req: Request, res: Response) => {
    const { username } = req.params;
    const user = await dao.findUserByUsername(username);
    if (!user) {
      res.status(404).send('User not found.');
    } else {
      res.json(user);
    }
  }

  const getUsers = async (req: Request, res: Response) => {
    const users = await dao.findAllUsers();
    res.json(users);
  }

  app.get("/user/:username", getUser);
  app.get("/users", getUsers);
}

export default userRoutes;
