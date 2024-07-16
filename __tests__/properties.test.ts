import request from "supertest";
import app from "../src/app";

// Define a property object for testing which is known to exist in the database
const property1 = {
  propertyid: 1,
  name: "The Grand Hotel",
  address: "123 Grand Street, Los Angeles, CA",
  rating: 4.5,
  capacity: 100,
  pricePerNight: 200,
  type: "Hotel",
};

// Test the GET /properties endpoint, which should return all properties in the database
describe("GET /properties", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/properties");
    expect(response.status).toBe(200);
    expect(Object.keys(response.body).length).toBe(4);
    expect(response.body[0]).toEqual(property1);
  });
});

// Test the GET /property/:propertyid endpoint, which should return a property known to exist in the database
describe("GET /property/:propertyid", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/property/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(property1);
  });
});

// Test the GET /property/:propertyid endpoint, which should return not found for an unknown property
describe("GET /property/:propertyid", () => {
  it("should return 404 Not Found", async () => {
    const response = await request(app).get("/property/0");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Property not found.");
  });
});

// Test the GET /properties/:type endpoint, which should return all properties of a given type
describe("GET /properties/:type", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/properties/Hotel");
    expect(response.status).toBe(200);
    for (const property of response.body) {
      expect(property.type).toBe("Hotel");
    }
    expect(Object.keys(response.body).length).toBeGreaterThan(0);
  });
});

// Test the GET /properties/:type endpoint, which should return not found for an unknown property type
describe("GET /properties/:type", () => {
  it("should return 404 Not Found", async () => {
    const response = await request(app).get("/properties/unknown");
    expect(response.status).toBe(404);
    expect(response.text).toBe(
      "Invalid property type: unknown. Please provide a valid property type."
    );
  });
});
