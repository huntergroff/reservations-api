import model from "./model";
import User from "./user.type";

export const findAllUsers = () => model.find();
export const findUserByUsername = (username: string) =>
  model.findOne({ username: username });
