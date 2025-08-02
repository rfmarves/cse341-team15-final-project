const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = (req, res) => {
  res.status(200).json({message: "Get all venues - Not implemented yet"});
};

const getSingle = (req, res) => {
  res
    .status(200)
    .json({message: `Get venue ${req.params.id} - Not implemented yet`});
};

const createVenue = (req, res) => {
  res.status(201).json({message: "Create venue - Not implemented yet"});
};

const updateVenue = (req, res) => {
  res
    .status(200)
    .json({message: `Update venue ${req.params.id} - Not implemented yet`});
};

const deleteVenue = (req, res) => {
  res
    .status(200)
    .json({message: `Delete venue ${req.params.id} - Not implemented yet`});
};

module.exports = {
  getAll,
  getSingle,
  createVenue,
  updateVenue,
  deleteVenue,
};
