const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// Helper function to validate ObjectId
const isInvalidObjectId = (id) => {
  return !ObjectId.isValid(id);
};

const getAll = (req, res) => {
  try {
    mongodb
      .getDb()
      .db()
      .collection("tickets")
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
    res.status(500).json({message: "An error occured while feching tickets."});
  }
};


const getSingle = (req, res) => {
  try {
    if (isInvalidObjectId(req.params.id)) {
      res.status(400).json("Invalid ID.");
      return;
    }
    const ticketId = new ObjectId(req.params.id);
    mongodb
      .getDb()
      .db()
      .collection("tickets")
      .find({_id: ticketId})
      .toArray((err, lists) => {
        if (err) {
          res.status(400).json({message: err});
          return;
        }
        if (lists.length === 0) {
          res.status(404).json({message: "Ticket not found"});
          return;
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists[0]);
      });
  } catch (error) {
    res
      .status(500)
      .json({message: `An error occurred while fetching the ticket.`});
  }
};

const getStatus = (req, res) => {
  try {
    if (isInvalidObjectId(req.params.id)) {
      res.status(400).json("Invalid ID.");
      return;
    }
    const ticketId = new ObjectId(req.params.id);
    mongodb
      .getDb()
      .db()
      .collection("tickets")
      .find({_id: ticketId})
      .toArray((err, lists) => {
        if (err) {
          res.status(400).json({message: err});
          return;
        }
        if (lists.length === 0) {
          res.status(404).json({message: "Ticket not found"});
          return;
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists[0].ticketStatus);
      });
  } catch (error) {
    res
      .status(500)
      .json({message: `An error occurred while fetching the ticket.`});
  }
};


const useTicket = async (req, res) => {
  try {
    if (isInvalidObjectId(req.params.id)) {
      res.status(400).json("Invalid ID.");
      return;
    }
    const ticketId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("tickets")
      .update({_id: ticketId}, { $set: { ticketStatus: "Used" } });
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(200).json({message: "Ticket successfully marked as used."});
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while using the ticket."
        );
    }
  } catch (error) {
    res
      .status(500)
      .json({message: "An error occurred while using the ticket."});
  }
};

const createTicket = async (req, res) => {
  try {
    const ticket = {
      customerId: req.body.customerId,
      eventId: req.body.eventId,
      ticketStatus: req.body.ticketStatus,
      amountPaid: req.body.amountPaid,
      purchaseDate: req.body.purchaseDate,
      paymentMethod: req.body.paymentMethod,
      seat: req.body.seat,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("tickets")
      .insertOne(ticket);
    if (response.acknowledged) {
      res.status(201).json({
        message: "Ticket created successfully.",
        ticket: {_id: response.insertedId, ...ticket},
      });
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while creating the ticket."
        );
    }
  } catch (error) {
    res
      .status(500)
      .json({message: "An error occurred while creating the ticket."});
  }
};

const updateTicket = async (req, res) => {
  try {
    if (isInvalidObjectId(req.params.id)) {
      res.status(400).json("Invalid ID.");
      return;
    }
    const ticketId = new ObjectId(req.params.id);
    const ticket = {
      customerId: req.body.customerId,
      eventId: req.body.eventId,
      ticketStatus: req.body.ticketStatus,
      amountPaid: req.body.amountPaid,
      purchaseDate: req.body.purchaseDate,
      paymentMethod: req.body.paymentMethod,
      seat: req.body.seat,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("tickets")
      .replaceOne({_id: ticketId}, ticket);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(200).json({message: "Ticket updated successfully.", ...ticket});
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while updating the ticket."
        );
    }
  } catch (error) {
    res
      .status(500)
      .json({message: "An error occurred while updating the ticket."});
  }
};

const deleteTicket = async (req, res) => {
  try {
    if (isInvalidObjectId(req.params.id)) {
      res.status(400).json("Invalid ID.");
    }
    const ticketId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("tickets")
      .remove({_id: ticketId}, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).json({message: "Ticket deleted successfully."});
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while deleting the ticket."
        );
    }
  } catch (error) {
    res
      .status(500)
      .json({message: "An error occurred while deleting the ticket."});
  }
};


module.exports = {
  getAll,
  getSingle,
  getStatus,
  useTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};
