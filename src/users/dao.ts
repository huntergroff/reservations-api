import model from "./model";

/**
 * A collection of custom functions to interact with the database using the User model.
 */

export const findAllUsers = () => model.find();
export const findUserByUsername = (username: string) =>
  model.findOne({ username: username });
