const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// Helper function to validate ObjectId
const isInvalidObjectId = (id) => {
  return !ObjectId.isValid(id);
};

const getAll = (req, res) => {
  // #swagger.tags=['Customers']
  try {
    mongodb
      .getDb()
      .db()
      .collection("customers")
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
    res
      .status(500)
      .json({message: "An error occurred while fetching customers."});
  }
};

const getSingle = (req, res) => {
  // #swagger.tags=['Customers']
  try {
    if (isInvalidObjectId(req.params.id)) {
      res.status(400).json("Invalid ID.");
      return;
    }
    const customerId = new ObjectId(req.params.id);
    mongodb
      .getDb()
      .db()
      .collection("customers")
      .find({_id: customerId})
      .toArray((err, lists) => {
        if (err) {
          res.status(400).json({message: err});
          return;
        }
        if (lists.length === 0) {
          res.status(404).json({message: "Customer not found"});
          return;
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists[0]);
      });
  } catch (error) {
    res
      .status(500)
      .json({message: `An error occurred while fetching the customer.`});
  }
};

const createCustomer = async (req, res) => {
  // #swagger.tags = ['Customers']
  // #swagger.description = 'Create a new customer'
  /* 
    #swagger.parameters['body'] = {
      "in": "body",
      "name": "body",
      "description": "Customer object",
      "required": true,
      "schema": {
        $ref: '#/definitions/Customer'}
    }
  */
  try {
    const customer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      gender: req.body.gender,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("customers")
      .insertOne(customer);
    if (response.acknowledged) {
      res.status(201).json({
        message: "Customer created successfully.",
        id: response.insertedId,
        ...customer,
      });
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while creating the customer."
        );
    }
  } catch (error) {
    res
      .status(500)
      .json({message: "An error occurred while creating the customer."});
  }
};

const updateCustomer = async (req, res) => {
  /*  #swagger.tags=['Customers']
   #swagger.description = 'Update an existing customer'
    #swagger.parameters['body'] = {
      "in": "body",
      "name": "body",
      "description": "Customer object",
      "required": true,
      "schema": {
        $ref: '#/definitions/Customer'}
    }
  */
  try {
    if (isInvalidObjectId(req.params.id)) {
      res.status(400).json("Invalid ID.");
      return;
    }
    const customerId = new ObjectId(req.params.id);
    const customer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      gender: req.body.gender,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("customers")
      .replaceOne({_id: customerId}, customer);
    if (response.modifiedCount > 0) {
      res
        .status(200)
        .json({message: "Customer updated successfully.", ...customer});
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while updating the customer."
        );
    }
  } catch (error) {
    res
      .status(500)
      .json({message: "An error occurred while updating the customer."});
  }
};

const deleteCustomer = async (req, res) => {
  // #swagger.tags=['Customers']
  try {
    if (isInvalidObjectId(req.params.id)) {
      res.status(400).json("Invalid ID.");
      return;
    }
    const customerId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("customers")
      .deleteOne({_id: customerId});
    if (response.deletedCount > 0) {
      res.status(200).json({message: "Customer deleted successfully."});
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while deleting the customer."
        );
    }
  } catch (error) {
    res
      .status(500)
      .json({message: "An error occurred while deleting the customer."});
  }
};

module.exports = {
  getAll,
  getSingle,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
