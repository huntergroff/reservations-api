/* Mock user table. Built to be replaced with a mongoose DB */
const users = {
  johndoe: {
    username: "johndoe",
    name: "John Doe",
    email: "johndoe@gmail.com",
    role: "USER",
  },
  brucewayne: {
    username: "brucewayne",
    name: "Bruce Wayne",
    email: "notbatman@arkham.com",
    role: "USER",
  },
  sentinel: {
    username: "sentinel",
    name: "Sentinel",
    email: "sentinel@admin.org",
    role: "ADMIN",
  },
};

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
