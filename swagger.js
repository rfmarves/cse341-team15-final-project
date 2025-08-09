const swaggerAutogen = require("swagger-autogen")();
require("dotenv").config();

const doc = {
  info: {
    title: "Event Ticketing - CSE341 Final Project",
    description: "API for ticking data as project2 for CSE 341",
  },
  host: process.env.SWAGGER_HOST,
  schemes: process.env.SWAGGER_SCHEMES
    ? process.env.SWAGGER_SCHEMES.split(",")
    : ["http", "https"],
  definitions: {
    Venue: {
      venueName: "Madison Square Garden",
      city: "New York",
      country: "United States",
      address: "4 Pennsylvania Plaza, New York, NY 10001",
      gpsCoordinates: {
        latitude: 40.7505,
        longitude: -73.9934,
      },
    },
    Customer: {
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@email.com",
      phoneNumber: "+3862345645",
      gender: "Male",
    },
    Event: {
      eventName: "Project Management Conference",
      venueId: "6890b8efd801e1a85b254a2b",
      startDate: "2026-07-25",
      endDate: "2026-07-27",
      startTime: "8:00",
      endTime: "18:00",
      capacity: 300,
      eventType: "Conference",
      eventPrice: 850,
    },
    Ticket: {
      customerId: "6890b8efd801e1a85b254a2f",
      eventId: "68952f6574b382a86aa5c460",
      ticketStatus: "Active",
      amountPaid: 850,
      purchaseDate: "2025-05-01",
      paymentMethod: "Credit Card",
      seat: "A1",
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
