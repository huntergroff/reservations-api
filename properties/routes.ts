import { Express, Request, Response } from "express";
import * as dao from "./dao";

function propertyRoutes(app: Express) {
  const getProperties = async (req: Request, res: Response) => {
    const properties = await dao.findAllProperties();
    res.json(properties);
  }

  const getProperty = async (req: Request, res: Response) => {
    const { id } = req.params;
    const property = await dao.findPropertyById(id);
    if (!property) {
      res.status(404).send('Property not found.');
    } else {
      res.json(property);
    }
  }

  app.get("/property/:id", getProperty);
  app.get("/properties", getProperties);
}

export default propertyRoutes;