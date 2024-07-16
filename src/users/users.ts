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

export default users;
