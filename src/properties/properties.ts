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

export default properties;
