import ReservationUtil from "../src/reservations/utility";

// Define several reservation objects for testing
const reservation1 = {
  reservationid: 1,
  username: "johndoe",
  propertyid: 1,
  startdate: "2025-01-01",
  enddate: "2025-01-07",
};

const overlapping_reservation = {
  reservationid: 2,
  username: "brucewayne",
  propertyid: 1,
  startdate: "2023-12-27",
  enddate: "2025-01-09",
};

const interior_reservation = {
  reservationid: 3,
  username: "brucewayne",
  propertyid: 1,
  startdate: "2025-01-02",
  enddate: "2025-01-06",
};

const non_overlapping_reservation = {
  reservationid: 4,
  username: "janedoe",
  propertyid: 1,
  startdate: "2025-01-08",
  enddate: "2025-01-14",
};

const reservation2 = {
  reservationid: 5,
  username: "sentinel",
  propertyid: 1,
  startdate: "2025-03-04",
  enddate: "2025-05-07",
};

const incomplete_reservation = {
  reservationid: 6,
  username: "sentinel",
  propertyid: 1,
  startdate: "2025-05-07",
  enddate: null,
};

const valid_reservations = [non_overlapping_reservation, reservation2];

// Test the checkAvailability method
describe("checkAvailability", () => {
  test("returns true for a valid reservation", () => {
    expect(
      ReservationUtil.checkAvailability(reservation1, valid_reservations)
    ).toBe(true);
  });

  test("returns false for an overlapping reservation", () => {
    expect(
      ReservationUtil.checkAvailability(reservation1, [overlapping_reservation])
    ).toBe(false);
  });

  test("returns false for an interior reservation", () => {
    expect(
      ReservationUtil.checkAvailability(reservation1, [interior_reservation])
    ).toBe(false);
  });
});

// Test the checkDatesInOrder method
describe("checkDatesInOrder", () => {
  test("returns true for dates in order", () => {
    expect(ReservationUtil.checkDatesInOrder("2025-01-01", "2025-01-07")).toBe(
      true
    );
    expect(ReservationUtil.checkDatesInOrder("2019-08-19", "2025-01-05")).toBe(
      true
    );
  });

  test("returns false for dates out of order", () => {
    expect(ReservationUtil.checkDatesInOrder("2025-01-02", "2025-01-01")).toBe(
      false
    );
  });
});

// Test the checkRequiredFields method
describe("checkRequiredFields", () => {
  test("returns true for a reservation with all required fields", () => {
    expect(ReservationUtil.checkRequiredFields(reservation1)).toBe(true);
  });

  test("returns false for a reservation with missing fields", () => {
    expect(ReservationUtil.checkRequiredFields(incomplete_reservation)).toBe(
      false
    );
  });
});

// Test the isValidDate method
describe("isValidDate", () => {
  test("returns true for a valid date", () => {
    expect(ReservationUtil.isValidDate("2025-01-01")).toBe(true);
  });

  test("returns false for an invalid date", () => {
    expect(ReservationUtil.isValidDate("2025-01-32")).toBe(false);
  });
});
