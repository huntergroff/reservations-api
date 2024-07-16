import users from "./users";

/* Mock database model. Built to be replaced with a mongoose model as described below. */
class UsersModel {
  static async find() {
    return users;
  }

  static async findOne({ username }) {
    return users[username];
  }
}

export default UsersModel;

/*
 * The mock database could be replaced with a mongoose model as follows.
 * The user datatype would be defined in a schema file, and connected to the "users" collection in the database.
 * The model would then be exported for use in the DAO file.
 */

// import mongoose from "mongoose";
// import schema from "./schema";
// const model = mongoose.model("users", schema);
// export default model;
