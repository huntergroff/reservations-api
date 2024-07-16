import { Express, Request, Response } from "express";
import * as dao from "./dao";

/* Routes for the property resource */
function propertyRoutes(app: Express) {
  // Get all properties
  const getProperties = async (req: Request, res: Response) => {
    const properties = await dao.findAllProperties();
    res.json(properties);
  };

  // Get a property by its ID
  const getProperty = async (req: Request, res: Response) => {
    const { id } = req.params;
    const property = await dao.findPropertyById(id);
    if (!property) {
      res.status(404).send("Property not found.");
    } else {
      res.json(property);
    }
  };

  // Get all properties of a given type
  const getPropertiesByType = async (req: Request, res: Response) => {
    const { type } = req.params;
    const properties = await dao.findPropertiesByType(type);
    if (properties.length === 0) {
      res
        .status(404)
        .send(
          "Invalid property type: " +
            type +
            ". Please provide a valid property type."
        );
    } else {
      res.json(properties);
    }
  };

  app.get("/property/:id", getProperty);
  app.get("/properties", getProperties);
  app.get("/properties/:type", getPropertiesByType);
}

export default propertyRoutes;
