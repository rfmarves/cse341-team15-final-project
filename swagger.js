const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: 'Event Ticketing - CSE341 Final Project"',
    description: "API for ticking data as project2 for CSE 341",
  },
  host: "localhost:8080",
  schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });
