const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// Helper function to validate ObjectId
const isInvalidObjectId = (id) => {
  return !ObjectId.isValid(id);
};

const getAll = (req, res) => {
  try {
    mongodb
      .getDb()
      .db()
      .collection("events")
      .find()
      .toArray((err, lists) => {
        if (err) {
          res.status(400).json({message: err});
          return;
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists);
      });
  } catch (error) {
    res.status(500).json({message: "An error occured while feching events."});
  }
};

const getSingle = (req, res) => {
  try {
    if (isInvalidObjectId(req.params.id)) {
      res.status(400).json("Invalid ID.");
      return;
    }
    const eventId = new ObjectId(req.params.id);
    mongodb
      .getDb()
      .db()
      .collection("events")
      .find({_id: eventId})
      .toArray((err, lists) => {
        if (err) {
          res.status(400).json({message: err});
          return;
        }
        if (lists.length === 0) {
          res.status(404).json({message: "Events not found"});
          return;
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists[0]);
      });
  } catch (error) {
    res
      .status(500)
      .json({message: `An error occurred while fetching the event.`});
  }
};


const createEvent = async (req, res) => {
  try {
    const event = {
      eventName: req.body.eventName,
      venueId: req.body.venueId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      capacity: req.body.capacity,
      eventType: req.body.eventType,
      eventPrice: req.body.eventPrice,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("events")
      .insertOne(event);
    if (response.acknowledged) {
      res.status(201).json({
        message: "Event created successfully.",
        event: {_id: response.insertedId, ...event},
      });
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while creating the event."
        );
    }
  } catch (error) {
    res
      .status(500)
      .json({message: "An error occurred while creating the event."});
  }
};

const updateEvent = async (req, res) => {
  try {
    if (isInvalidObjectId(req.params.id)) {
      res.status(400).json("Invalid ID.");
      return;
    }
    const eventId = new ObjectId(req.params.id);
    const event = {
      eventName: req.body.eventName,
      venueId: req.body.venueId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      capacity: req.body.capacity,
      eventType: req.body.eventType,
      eventPrice: req.body.eventPrice,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("events")
      .replaceOne({_id: eventId}, event);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(200).json({message: "Venue updated successfully.", ...event});
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while updating the event."
        );
    }
  } catch (error) {
    res
      .status(500)
      .json({message: "An error occurred while updating the event."});
  }
};

const deleteEvent = async (req, res) => {
  try {
    if (isInvalidObjectId(req.params.id)) {
      res.status(400).json("Invalid ID.");
    }
    const eventId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("events")
      .remove({_id: eventId}, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).json({message: "Event deleted successfully."});
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while deleting the event."
        );
    }
  } catch (error) {
    res
      .status(500)
      .json({message: "An error occurred while deleting the event."});
  }
};

module.exports = {
  getAll,
  getSingle,
  createEvent,
  updateEvent,
  deleteEvent,
};
