const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {};
const getSingle = (req, res) => {};
const createVenue = (req, res) => {};
const updateVenue = (req, res) => {};
const deleteVenue = (req, res) => {};

module.exports = {
  getAll,
  getSingle,
  createVenue,
  updateVenue,
  deleteVenue
};
