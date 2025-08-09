const express = require("express");
const request = require("supertest");
const eventsController = require("../controllers/events");
const eventsRoute = require("../routes/events");

const app = express();
app.use(express.json());
app.use("/", eventsRoute);

jest.mock("../controllers/events");

describe("Events API endpoints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET / ", () => {
    it("Should return all events", async () => {
      const mockEvents = [
        {_id: "1", eventName: "Test Event 1"},
        {_id: "2", eventName: "Test Event 2"},
      ];

      eventsController.getAll.mockImplementation((req, res) => {
        res.status(200).json(mockEvents);
      });

      const response = await request(app).get("/");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockEvents);
      expect(eventsController.getAll).toHaveBeenCalled();
    });

    it("Should handle errors when getting all events", async () => {
      eventsController.getAll.mockImplementation((req, res) => {
        res.status(500).json({error: "Internal Server Error"});
      });

      const response = await request(app).get("/");
      expect(response.status).toBe(500);
      expect(eventsController.getAll).toHaveBeenCalled();
    });
  });

  describe("GET /:id", () => {
    it("Should return a single event", async () => {
      const eventId = "689667ef5256f75688e725f5";
      const mockEvent = {_id: eventId, eventName: "Test Event"};

      eventsController.getSingle.mockImplementation((req, res) => {
        res.status(200).json(mockEvent);
      });

      const response = await request(app).get(`/${eventId}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockEvent);
      expect(eventsController.getSingle).toHaveBeenCalled();
    });

    it("Should handle invalid event ID", async () => {
      const invalidId = "invalid-id";

      eventsController.getSingle.mockImplementation((req, res) => {
        res.status(400).json({error: "Invalid ID"});
      });

      const response = await request(app).get(`/${invalidId}`);
      expect(response.status).toBe(400);
      expect(eventsController.getSingle).toHaveBeenCalled();
    });

    it("Should handle event not found", async () => {
      const nonExistentId = "689667ef5256f75688e725f9";

      eventsController.getSingle.mockImplementation((req, res) => {
        res.status(404).json({error: "Event not found"});
      });

      const response = await request(app).get(`/${nonExistentId}`);
      expect(response.status).toBe(404);
      expect(eventsController.getSingle).toHaveBeenCalled();
    });
  });
});
