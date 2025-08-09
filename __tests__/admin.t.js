const express = require("express");
const request = require("supertest");
const adminController = require("../controllers/admin");
const adminRoute = require("../routes/admin");

const app = express();
app.use(express.json());
app.use("/admin", adminRoute); // <-- important: mount on /admin

jest.mock("../controllers/admin");
jest.mock("../middleware/authenticate", () => ({
  isAuthenticated: (req, res, next) => next(),
}));

describe("Admin API endpoints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /admin", () => {
    it("Should return all admins", async () => {
      const mockAdmins = [
        { _id: "1", username: "admin1", email: "admin1@example.com" },
        { _id: "2", username: "admin2", email: "admin2@example.com" },
      ];

      adminController.getAll.mockImplementation(async (req, res) => {
        res.status(200).json(mockAdmins);
      });

      const response = await request(app).get("/admin");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAdmins);
      expect(adminController.getAll).toHaveBeenCalled();
    }, 10000); // extended timeout
  });

});
