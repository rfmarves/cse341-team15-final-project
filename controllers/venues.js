const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
//#swagger.tags=['Venues']
  try {
    mongodb
      .getDb()
      .db()
      .collection('venues')
      .findd()
      .toArray((err, lists) => {
        if (err) {
          res.status(400).json({ message: err});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
  } catch (error) {
    res.status(500).json({message: 'An error occured while feching venues.'});
  }
};

const getSingle = (req, res) => {
//#swagger.tags=['Venues']
  try{
    if (isInvalidObjectId(req.params.id)) {
      res.status(400).json('Invalid ID.');
    }
    const userId = new ObjectId(req.params.id);
    mongodb
      .getDb()
      .db()
      .collection('venues')
      .find({ _id: userId})
      .toArray((err, lists) => {
        if (err) {
          res.status(400).json({ message: err});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the venue.' });
  }
};

const createVenue = async (req, res) => {
//#swagger.tags=['Venues']
  try {
    const venue = {
      venueName: req.body.venueName,
      city: req.body.city,
      country: req.body.country,
      address: req.body.address,
      gpsCoordinates: req.body.gpsCoordinates
    };
    const response = await mongodb.getDb().db().collection('venues').insertOne(venue);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the venue.');
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while creating the venue.' });
  }
};

const updateVenue = async (req, res) => {
//#swagger.tags=['Venues']
  try {
    if (isInvalidObjectId(req.params.id)) {
      res.status(400).json('Invalid ID.');
    }
    const venueId = new ObjectId(req.params.id);
     const venue = {
      venueName: req.body.venueName,
      city: req.body.city,
      country: req.body.country,
      address: req.body.address,
      gpsCoordinates: req.body.gpsCoordinates
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('events')
      .replaceOne({ _id: venueId }, venue);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the venue.');
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the venue.' });
  }
};

const deleteVenue = async (req, res) => {
//#swagger.tags=['Venues']
  try {
    if (isInvalidObjectId(req.params.id)) {
      res.status(400).json('Invalid ID.');
    }
    const venueId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('venues').remove({ _id: venueId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the venue.');
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the venue.' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createVenue,
  updateVenue,
  deleteVenue
};
