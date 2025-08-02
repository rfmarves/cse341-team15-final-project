const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = (req, res) => {
  res.status(200).json({message: "Get all customers - Not implemented yet"});
};

const getSingle = (req, res) => {
  res
    .status(200)
    .json({message: `Get customer ${req.params.id} - Not implemented yet`});
};

const createCustomer = (req, res) => {
  res.status(201).json({message: "Create customer - Not implemented yet"});
};

const updateCustomer = (req, res) => {
  res
    .status(200)
    .json({message: `Update customer ${req.params.id} - Not implemented yet`});
};

const deleteCustomer = (req, res) => {
  res
    .status(200)
    .json({message: `Delete customer ${req.params.id} - Not implemented yet`});
};

module.exports = {
  getAll,
  getSingle,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
