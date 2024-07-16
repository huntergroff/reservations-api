# Vacation Home Reservation API

## Introduction

Welcome to my Vacation Home Reservation API prototype. This is a Node and Express app, written in Typescript and tested using the Jest library.

**Prototype Notes:**

- The prototype uses in-memory storage and does not persist, but is designed to be easily connected to a Mongo database in the future by replacing the three `model.ts` files with imported mongoose models.
- In lieu of routes for sign up/log in/log out, the prototype uses a mock session where the user is always logged in as an admin. Thus, the prototype allows access to all routes, while in reality certain routes would be restricted (like getting all reservations for another user.)

## Endpoints

There are three entity types that can be returned by the API; **users**, **properties**, and **reservations**.

#### Users

_For tests displaying functionality of all "users" endpoints, see \_\_tests\_\_/users.test.ts_

- `GET /users`: Retrieve all users.
- `GET /users/{username}`: Retrieve a specific user by their username.
- `GET /user`: Retrieve the current user.

#### Properties

_For tests displaying functionality of all "properties" endpoints, see \_\_tests\_\_/properties.test.ts_

- `GET /properties`: Retrieve all properties.
- `GET /properties/{id}`: Retrieve a specific property by ID.
- `GET /properties/{type}`: Retrieve all properties of a given type (ex. Beach House, Apartment, Cabin, etc.)

#### Reservations

_For tests displaying functionality of all "reservations" endpoints, see \_\_tests\_\_/reservations.test.ts_

- `GET /reservations`: Retrieve all reservations.
- `GET /reservations/{id}`: Retrieve a specific reservation by ID.
- `GET /user/{username}/reservations`: Retrieve all reservations under a given username.
- `GET /property/{id}/reservations`: Retrieve all reservations for a given property.
- `POST /reservation`: Create a new reservation.
  - Requires JSON body with the following properties:
    - `"userid": string`,
    - `"propertyid": number`,
    - `"startdate": string (YYYY-MM-DD)`,
    - `"enddate": string (YYYY-MM-DD)`
  - The given user and property must be available for the entirety of the reservation period, otherwise the reservation will be rejected.
- `PUT /reservation/{id}`: Updates the given reservation with a new start date and end date.
  - Requires JSON body with the following properties:
    - `"startdate": string (YYYY-MM-DD)`,
    - `"enddate": string (YYYY-MM-DD)`,
  - The user and property in the reservation must be available for the entirety of the new reservation period, otherwise the update will be rejected.
- `DELETE /reservation/{id}`: Deletes the reservation with the given id.

## Running locally

To run the API locally, clone this repository, navigate to the root directory and use the command `npm run dev` to start the server on port 3000. To run the tests, use `npm run test`.
