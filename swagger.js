const swaggerAutogen = require("swagger-autogen")();
require("dotenv").config();

const doc = {
  info: {
    title: 'Event Ticketing - CSE341 Final Project"',
    description: "API for ticking data as project2 for CSE 341",
  },
  host: process.env.SWAGGER_HOST || "localhost:3000",
  schemes: process.env.SWAGGER_SCHEMES
    ? process.env.SWAGGER_SCHEMES.split(",")
    : ["http", "https"],
  definitions: {
    Venue: {
      venueName: "Madison Square Garden",
      city: "New York",
      country: "United States",
      address: "4 Pennsylvania Plaza, New York, NY 10001",
      gpsCoordinates: "40.7505, -73.9934",
    },
    Customer: {
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@email.com",
      phoneNumber: "+1-555-0101",
      gender: "Male",
    },
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });
