import request from "supertest";
import app from "../app";

// Define a user object for testing which is known to exist in the database
const johndoe = {
  username: "johndoe",
  name: "John Doe",
  email: "johndoe@gmail.com",
  role: "USER",
};

// Test the GET /users endpoint, which should return all users
describe("GET /users", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(Object.keys(response.body).length).toBe(3);
    expect(response.body["johndoe"]).toEqual(johndoe);
  });
});

// Test the GET /user/:username endpoint, which should return not found for an unknown user
describe("GET /user/:username", () => {
  it("should return 404 Not Found", async () => {
    const response = await request(app).get("/user/unknown");
    expect(response.status).toBe(404);
    expect(response.text).toBe("User not found.");
  });
});

// Test the GET /user/:username endpoint, which should return a user
describe("GET /user/:username", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/user/johndoe");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(johndoe);
  });
});
