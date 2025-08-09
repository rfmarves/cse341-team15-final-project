const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const COLLECTION_NAME = "admins";

const getAll = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const admins = await db.collection(COLLECTION_NAME).find().toArray();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Failed to get admins", error });
  }
};

const getSingle = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const admin = await db
      .collection(COLLECTION_NAME)
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Failed to get admin", error });
  }
};

const createAdmin = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const adminData = req.body;
    const result = await db.collection(COLLECTION_NAME).insertOne(adminData);
    res.status(201).json({
      message: "Admin created",
      adminId: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create admin", error });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const adminId = req.params.id;
    const adminData = req.body;

    const result = await db
      .collection(COLLECTION_NAME)
      .updateOne(
        { _id: new ObjectId(adminId) },
        { $set: adminData }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update admin", error });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const adminId = req.params.id;

    const result = await db
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(adminId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete admin", error });
  }
};

module.exports = {
  getAll,
  getSingle,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
