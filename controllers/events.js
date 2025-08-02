const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = (req, res) => {
  res.status(200).json({message: "Get all events - Not implemented yet"});
};

const getSingle = (req, res) => {
  res
    .status(200)
    .json({message: `Get event ${req.params.id} - Not implemented yet`});
};

const createEvent = (req, res) => {
  res.status(201).json({message: "Create event - Not implemented yet"});
};

const updateEvent = (req, res) => {
  res
    .status(200)
    .json({message: `Update event ${req.params.id} - Not implemented yet`});
};

const deleteEvent = (req, res) => {
  res
    .status(200)
    .json({message: `Delete event ${req.params.id} - Not implemented yet`});
};

module.exports = {
  getAll,
  getSingle,
  createEvent,
  updateEvent,
  deleteEvent,
};
