const express = require("express");
const request = require("supertest");
const customersController = require("../controllers/customers");
const customersRoute = require("../routes/customers");

const app = express();
app.use(express.json());
app.use("/", customersRoute);

jest.mock("../controllers/customers");
jest.mock("../middleware/authenticate", () => ({
  isAuthenticated: (req, res, next) => next(), // Mock authentication for testing
}));

describe("Customers API endpoints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /", () => {
    it("Should return all customers", async () => {
      const mockCustomers = [
        {
          _id: "1",
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
        },
        {
          _id: "2",
          firstName: "Jane",
          lastName: "Smith",
          email: "jane@example.com",
        },
      ];

      customersController.getAll.mockImplementation((req, res) => {
        res.status(200).json(mockCustomers);
      });

      const response = await request(app).get("/");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCustomers);
      expect(customersController.getAll).toHaveBeenCalled();
    });

    it("Should handle errors when getting all customers", async () => {
      customersController.getAll.mockImplementation((req, res) => {
        res.status(500).json({error: "Internal Server Error"});
      });

      const response = await request(app).get("/");
      expect(response.status).toBe(500);
      expect(customersController.getAll).toHaveBeenCalled();
    });
  });

  describe("GET /:id", () => {
    it("Should return a single customer", async () => {
      const customerId = "689667ef5256f75688e725f5";
      const mockCustomer = {
        _id: customerId,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phoneNumber: "+1-555-0101",
        gender: "Male",
      };

      customersController.getSingle.mockImplementation((req, res) => {
        res.status(200).json(mockCustomer);
      });

      const response = await request(app).get(`/${customerId}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCustomer);
      expect(customersController.getSingle).toHaveBeenCalled();
    });

    it("Should handle invalid customer ID", async () => {
      const invalidId = "invalid-id";

      customersController.getSingle.mockImplementation((req, res) => {
        res.status(400).json({error: "Invalid ID"});
      });

      const response = await request(app).get(`/${invalidId}`);
      expect(response.status).toBe(400);
      expect(customersController.getSingle).toHaveBeenCalled();
    });

    it("Should handle customer not found", async () => {
      const nonExistentId = "689667ef5256f75688e725f9";

      customersController.getSingle.mockImplementation((req, res) => {
        res.status(404).json({error: "Customer not found"});
      });

      const response = await request(app).get(`/${nonExistentId}`);
      expect(response.status).toBe(404);
      expect(customersController.getSingle).toHaveBeenCalled();
    });
  });
});
