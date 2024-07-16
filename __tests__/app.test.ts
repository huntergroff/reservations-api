import request from "supertest";
import app from "../src/app";

// Test the GET / endpoint, which should return a welcome message
describe("GET /", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Welcome to the Vacation Rentals API! 🏡");
  });
});
