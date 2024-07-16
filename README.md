# Vacation Home Reservation API

## Endpoints

There are three entity types that can be returned by the API; users, properties, and reservations.

### Users

- `GET /users`: Retrieve all users.
- `GET /users/{username}`: Retrieve a specific user by their username.

### Properties

- `GET /properties`: Retrieve all properties.
- `GET /properties/{id}`: Retrieve a specific property by ID.
- `GET /properties/{type}`: Retrieve all properties of a given type (ex. Beach House, Apartment, Cabin, etc.)

### Reservations

- `GET /reservations`: Retrieve all reservations.
- `GET /reservations/{id}`: Retrieve a specific reservation by ID.
- `GET /user/{username}/reservations`: Retrieve all reservations under a given username.
- `GET /property/{id}/reservations`: Retrieve all reservations for a given property.
- `POST /reserve`: Create a new reservation. Requires JSON body with the following properties:
  - "user_id": string,
  - "property_id": number,
  - "start_date": date (YYYY-MM-DD)
  - "end_date": date (YYYY-MM-DD)

## Running locally

To run the API locally, clone this repository, navigate to the root directory and run `npm run dev` to start the server on port 3000. To run the tests, run `npm run test`.
