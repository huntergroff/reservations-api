import properties from "./properties";

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
