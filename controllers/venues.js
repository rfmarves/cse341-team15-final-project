const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// Helper function to validate ObjectId
const isInvalidObjectId = (id) => {
  return !ObjectId.isValid(id);
};

const getAll = (req, res) => {
  // #swagger.tags=['Venues']
  try {
    mongodb
      .getDb()
      .db()
      .collection("venues")
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
    res.status(500).json({message: "An error occured while feching venues."});
  }
};

const getSingle = (req, res) => {
  // #swagger.tags=['Venues']
  try {
    if (isInvalidObjectId(req.params.id)) {
      res.status(400).json("Invalid ID.");
      return;
    }
    const venueId = new ObjectId(req.params.id);
    mongodb
      .getDb()
      .db()
      .collection("venues")
      .find({_id: venueId})
      .toArray((err, lists) => {
        if (err) {
          res.status(400).json({message: err});
          return;
        }
        if (lists.length === 0) {
          res.status(404).json({message: "Venue not found"});
          return;
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists[0]);
      });
  } catch (error) {
    res
      .status(500)
      .json({message: `An error occurred while fetching the venue.`});
  }
};

const createVenue = async (req, res) => {
  // #swagger.tags = ['Venues']
  // #swagger.description = 'Create a new venue'
  /* 
    #swagger.parameters['body'] = {
      "in": "body",
      "name": "body",
      "description": "Venue object",
      "required": true,
      "schema": {
        $ref: '#/definitions/Venue'}
    }
  */
  try {
    const venue = {
      venueName: req.body.venueName,
      city: req.body.city,
      country: req.body.country,
      address: req.body.address,
      gpsCoordinates: req.body.gpsCoordinates,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("venues")
      .insertOne(venue);
    if (response.acknowledged) {
      res.status(201).json({
        message: "Venue created successfully.",
        venue: {_id: response.insertedId, ...venue},
      });
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while creating the venue."
        );
    }
  } catch (error) {
    res
      .status(500)
      .json({message: "An error occurred while creating the venue."});
  }
};

const updateVenue = async (req, res) => {
  /*  #swagger.tags=['Venues']
   #swagger.description = 'Update an existing venue'
    #swagger.parameters['body'] = {
      "in": "body",
      "name": "body",
      "description": "Venue object",
      "required": true,
      "schema": {
        $ref: '#/definitions/Venue'}
    }

  } */
  try {
    if (isInvalidObjectId(req.params.id)) {
      res.status(400).json("Invalid ID.");
      return;
    }
    const venueId = new ObjectId(req.params.id);
    const venue = {
      venueName: req.body.venueName,
      city: req.body.city,
      country: req.body.country,
      address: req.body.address,
      gpsCoordinates: req.body.gpsCoordinates,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("venues")
      .replaceOne({_id: venueId}, venue);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(200).json({message: "Venue updated successfully.", ...venue});
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while updating the venue."
        );
    }
  } catch (error) {
    res
      .status(500)
      .json({message: "An error occurred while updating the venue."});
  }
};

const deleteVenue = async (req, res) => {
  // #swagger.tags=['Venues']
  try {
    if (isInvalidObjectId(req.params.id)) {
      res.status(400).json("Invalid ID.");
    }
    const venueId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("venues")
      .remove({_id: venueId}, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).json({message: "Venue deleted successfully."});
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while deleting the venue."
        );
    }
  } catch (error) {
    res
      .status(500)
      .json({message: "An error occurred while deleting the venue."});
  }
  res.status(200).json({message: "Get all venues - Not implemented yet"});
};

module.exports = {
  getAll,
  getSingle,
  createVenue,
  updateVenue,
  deleteVenue,
};
