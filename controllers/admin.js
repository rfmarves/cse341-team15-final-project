const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = (req, res) => {
  res.status(200).json({message: "Get all admins - Not implemented yet"});
};

const getSingle = (req, res) => {
  res
    .status(200)
    .json({message: `Get admin ${req.params.id} - Not implemented yet`});
};

const createAdmin = (req, res) => {
  res.status(201).json({message: "Create admin - Not implemented yet"});
};

const updateAdmin = (req, res) => {
  res
    .status(200)
    .json({message: `Update admin ${req.params.id} - Not implemented yet`});
};

const deleteAdmin = (req, res) => {
  res
    .status(200)
    .json({message: `Delete admin ${req.params.id} - Not implemented yet`});
};

module.exports = {
  getAll,
  getSingle,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
