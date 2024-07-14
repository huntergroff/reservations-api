import model from "./model";

export const findAllProperties = () => model.find();
export const findPropertyById = (propertyid: number) =>
  model.findOne({ propertyid: propertyid });