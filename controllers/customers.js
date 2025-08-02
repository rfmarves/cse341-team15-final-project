const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {};
const getSingle = (req, res) => {};
const createCustomer = (req, res) => {};
const updateCustomer = (req, res) => {};
const deleteCustomer = (req, res) => {};

module.exports = {
  getAll,
  getSingle,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
