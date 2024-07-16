import request from "supertest";
import app from "../src/app";

// Define a reservation object for testing which is known to exist in the database
const reservation1 = {
  reservationid: 1,
  username: "johndoe",
  propertyid: 1,
  startdate: "2025-01-01",
  enddate: "2025-01-07",
};

// Test the GET /reservations endpoint, which should return all reservations in the database
describe("GET /reservations", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/reservations");
    expect(response.status).toBe(200);
    expect(Object.keys(response.body).length).toBeGreaterThan(0);
    expect(response.body[0]).toEqual(reservation1);
  });
});

// Test the GET /reservation/:reservationid endpoint, which should return a reservation known to exist in the database
describe("GET /reservation/:reservationid with valid reservation", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/reservation/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(reservation1);
  });
});

// Test the GET /reservation/:reservationid endpoint, which should return not found for an unknown reservation
describe("GET /reservation/:reservationid with unknown reservation", () => {
  it("should return 404 Not Found", async () => {
    const response = await request(app).get("/reservation/0");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Reservation not found.");
  });
});

// Test the GET /reservation/:reservationid endpoint, which should return bad request for an invalid reservation id
describe("GET /reservation/:reservationid with invalid reservation id", () => {
  it("should return 400 BAD REQUEST", async () => {
    const response = await request(app).get("/reservation/invalid");
    expect(response.status).toBe(400);
    expect(response.text).toBe(
      "Invalid reservation ID. Please provide a valid ID."
    );
  });
});

// Test the GET /user/:username/reservations endpoint, which should return all reservations for a user
describe("GET /user/:username/reservations with valid user", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/user/johndoe/reservations");
    expect(response.status).toBe(200);
    expect(Object.keys(response.body).length).toBeGreaterThan(0);
    expect(response.body[0]).toEqual(reservation1);
  });
});

// Test the GET /user/:username/reservations endpoint, which should return no content for an unknown user
describe("GET /user/:username/reservations with unknown user", () => {
  it("should return 204 NO CONTENT", async () => {
    const response = await request(app).get("/user/unknown/reservations");
    expect(response.status).toBe(204);
  });
});

// Test the GET /property/:propertyid/reservations endpoint, which should return all reservations for a property
describe("GET /property/:propertyid/reservations with valid property", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/property/1/reservations");
    expect(response.status).toBe(200);
    expect(Object.keys(response.body).length).toBeGreaterThan(0);
    expect(response.body[0]).toEqual(reservation1);
  });
});

// Test the GET /property/:propertyid/reservations endpoint, which should return no content for an unknown property
describe("GET /property/:propertyid/reservations with unknown property", () => {
  it("should return 204 NO CONTENT", async () => {
    const response = await request(app).get("/property/0/reservations");
    expect(response.status).toBe(204);
  });
});

// Test the GET /property/:propertyid/reservations endpoint, which should return bad request for an invalid property id
describe("GET /property/:propertyid/reservations with invalid property id", () => {
  it("should return 400 BAD REQUEST", async () => {
    const response = await request(app).get("/property/invalid/reservations");
    expect(response.status).toBe(400);
    expect(response.text).toBe(
      "Invalid property ID. Please provide a valid ID."
    );
  });
});

// Test the POST /reservation endpoint, which should create a new reservation
describe("POST /reservation", () => {
  it("should return 201 CREATED", async () => {
    const details = {
      username: "johndoe",
      propertyid: 1,
      startdate: "2025-12-01",
      enddate: "2025-12-07",
    };
    const response = await request(app).post("/reservation").send(details);
    expect(response.status).toBe(201);
    expect(response.body.username).toBe("johndoe");
    expect(response.body.propertyid).toBe(1);
    expect(response.body.startdate).toBe("2025-12-01");
    expect(response.body.enddate).toBe("2025-12-07");
    const id = response.body.reservationid;

    //make sure the reservation was created
    const reservation = await request(app).get("/reservation/" + id);
    expect(reservation.body).toMatchObject(details);
  });
});

// Test the POST /reservation endpoint, which should return bad request for missing fields
describe("POST /reservation with missing fields", () => {
  it("should return 400 BAD REQUEST", async () => {
    const response = await request(app).post("/reservation").send({
      username: "johndoe",
      propertyid: 1,
    });
    expect(response.status).toBe(400);
    expect(response.text).toBe(
      "Missing required fields. Please provide username, propertyid, startdate (YYYY-MM-DD), and enddate (YYYY-MM-DD)."
    );
  });
});

// Test the POST /reservation endpoint, which should return bad request for unavailable property
describe("POST /reservation with unavailable property", () => {
  it("should return 400 BAD REQUEST", async () => {
    const response = await request(app).post("/reservation").send({
      username: "brucewayne",
      propertyid: 1,
      startdate: "2025-01-03",
      enddate: "2025-01-06",
    });
    expect(response.status).toBe(400);
    expect(response.text).toBe(
      "Property is not available for the selected dates."
    );
  });
});

// Test the POST /reservation endpoint, which should return bad request for unavailable property
describe("POST /reservation with unavailable property", () => {
  it("should return 400 BAD REQUEST", async () => {
    const response = await request(app).post("/reservation").send({
      username: "brucewayne",
      propertyid: 1,
      startdate: "2025-01-01",
      enddate: "2025-01-04",
    });
    expect(response.status).toBe(400);
    expect(response.text).toBe(
      "Property is not available for the selected dates."
    );
  });
});

// Test the POST /reservation endpoint, which should return bad request for user with existing reservation
describe("POST /reservation with existing reservation", () => {
  it("should return 400 BAD REQUEST", async () => {
    const response = await request(app).post("/reservation").send({
      username: "johndoe",
      propertyid: 2,
      startdate: "2025-01-01",
      enddate: "2025-01-07",
    });
    expect(response.status).toBe(400);
    expect(response.text).toBe(
      "User already has a reservation for the selected dates."
    );
  });
});

// Test the DELETE /reservation/:reservationid endpoint, which should delete a reservation known to exist in the database
describe("DELETE /reservation/:reservationid with valid reservation", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).delete("/reservation/2");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Reservation deleted.");
    // Check that the reservation was deleted
    const deletedReservation = await request(app).get("/reservation/2");
    expect(deletedReservation.status).toBe(404);
  });
});

// Test the DELETE /reservation/:reservationid endpoint, which should return not found for an unknown reservation
describe("DELETE /reservation/:reservationid with unknown reservation", () => {
  it("should return 404 Not Found", async () => {
    const response = await request(app).delete("/reservation/0");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Reservation not found.");
  });
});

// Test the DELETE /reservation/:reservationid endpoint, which should return bad request for an invalid reservation id
describe("DELETE /reservation/:reservationid with invalid reservation id", () => {
  it("should return 400 BAD REQUEST", async () => {
    const response = await request(app).delete("/reservation/invalid");
    expect(response.status).toBe(400);
    expect(response.text).toBe(
      "Invalid reservation ID. Please provide a valid ID."
    );
  });
});

// Test the PUT /reservation/:reservationid endpoint, which should update a reservation known to exist in the database
describe("PUT /reservation/:reservationid with valid reservation", () => {
  it("should return 200 OK", async () => {
    const details = {
      startdate: "2025-01-04",
      enddate: "2025-01-12",
    };
    // Check that the reservation exists and has the original dates
    const originalReservation = await request(app).get("/reservation/1");
    expect(originalReservation.body).toMatchObject(reservation1);

    // Update the reservation
    const response = await request(app).put("/reservation/1").send(details);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      ...reservation1,
      ...details,
    });

    // Check that the reservation was updated
    const updatedReservation = await request(app).get("/reservation/1");
    expect(updatedReservation.body).toMatchObject({
      ...reservation1,
      ...details,
    });
  });
});

// Test the PUT /reservation/:reservationid endpoint, which should return not found for an unknown reservation
describe("PUT /reservation/:reservationid with unknown reservation", () => {
  it("should return 404 Not Found", async () => {
    const response = await request(app).put("/reservation/0").send({
      startdate: "2025-12-01",
      enddate: "2025-12-07",
    });
    expect(response.status).toBe(404);
    expect(response.text).toBe("Reservation not found.");
  });
});

// Test the PUT /reservation/:reservationid endpoint, which should return bad request for unavailable property
describe("PUT /reservation/:reservationid with unavailable property", () => {
  it("should return 400 BAD REQUEST", async () => {
    const response = await request(app).put("/reservation/1").send({
      startdate: "2025-06-01",
      enddate: "2025-06-04",
    });
    expect(response.status).toBe(400);
    expect(response.text).toBe(
      "Property is not available for the selected dates."
    );
  });
});
