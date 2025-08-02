const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = (req, res) => {
  res.status(200).json({message: "Get all tickets - Not implemented yet"});
};

const getSingle = (req, res) => {
  res
    .status(200)
    .json({message: `Get ticket ${req.params.id} - Not implemented yet`});
};

const createTicket = (req, res) => {
  res.status(201).json({message: "Create ticket - Not implemented yet"});
};

const updateTicket = (req, res) => {
  res
    .status(200)
    .json({message: `Update ticket ${req.params.id} - Not implemented yet`});
};

const deleteTicket = (req, res) => {
  res
    .status(200)
    .json({message: `Delete ticket ${req.params.id} - Not implemented yet`});
};

module.exports = {
  getAll,
  getSingle,
  createTicket,
  updateTicket,
  deleteTicket,
};
