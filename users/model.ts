// import mongoose from "mongoose";
// import schema from "./schema";
// const model = mongoose.model("users", schema);
// export default model;

/* Mock database. Built to be replaced with a mongoose DB */
const users = {
        "johndoe": {
            username: "johndoe",
            name: "John Doe",
            email: "johndoe@gmail.com",
            role: "USER"
        },
        "brucewayne" : {
            username: "brucewayne",
            name: "Bruce Wayne",
            email: "notbatman@arkham.com",
            role: "USER"
        },
        "sentinel": {
            username: "sentinel",
            name: "Sentinel",
            email: "sentinel@admin.org",
            role: "ADMIN"
        }
    }

/* Mock database model. Built to be replaced with a mongoose model */
class UsersModel {
    static async find() {
        return users;
    }

    static async findOne({username}) {
        return users[username];
    }
}

export default UsersModel;


