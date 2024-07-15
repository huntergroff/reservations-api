import model from "./model";

/**
 * A collection of custom functions to interact with the database using the Property model.
 */

export const findAllProperties = () => model.find();
export const findPropertyById = (propertyid: number) =>
  model.findOne({ propertyid: propertyid });
export const findPropertiesByType = (type: string) =>
  model.find({ type: type });
