/* Mock properties table. Built to be replaced with a mongoose model */
const properties = [
  {
    propertyid: 1,
    name: "The Grand Hotel",
    address: "123 Grand Street, Los Angeles, CA",
    rating: 4.5,
    capacity: 100,
    pricePerNight: 200,
    type: "Hotel",
  },
  {
    propertyid: 2,
    name: "Beautiful Beach House overlooking Miami Beach",
    address: "123 Ocean Drive, Miami, FL",
    rating: 4.8,
    capacity: 10,
    pricePerNight: 500,
    type: "Beach House",
  },
  {
    propertyid: 3,
    name: "Cozy Cabin in the Woods",
    address: "123 Forest Lane, Big Sur, CA",
    rating: 4.2,
    capacity: 6,
    pricePerNight: 150,
    type: "Cabin",
  },
  {
    propertyid: 4,
    name: "Luxury Condo in the Heart of the City",
    address: "123 Main Street, New York, NY",
    rating: 4.6,
    capacity: 4,
    pricePerNight: 300,
    type: "City Apartment",
  },
];

/* Mock properties model. Built to be replaced with a mongoose model, as explained below. */
class PropertiesModel {
  // Find all properties matching the given type, or return all properties
  static async find(type = null) {
    if (type) {
      return properties.filter((p) => p.type === type.type);
    }

    return properties;
  }

  // Find a property by its id
  static async findOne({ propertyid }) {
    return properties.find((p) => p.propertyid == propertyid);
  }
}

export default PropertiesModel;

/*
 * The mock database could be replaced with a mongoose model as follows.
 * The property datatype would be defined in a schema file, and connected to the "properties" collection in the database.
 * The model would then be exported for use in the DAO file.
 */

// import mongoose from "mongoose";
// import schema from "./schema";
// const model = mongoose.model("properties", schema);
// export default model;
