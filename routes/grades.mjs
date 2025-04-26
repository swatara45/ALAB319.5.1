import express from "express";
import { ObjectId } from "mongodb";
import db from "../db/conn.mjs";
import Grade from "../models/gradesSchema.mjs";


const router = express.Router();

// // Create a single grade entry
// router.post("/", async (req, res) => {
//   const db = getDb();
//   const collection = db.collection("grades");
//   let newDocument = req.body;

//   if (newDocument.student_id) {
//     newDocument.learner_id = newDocument.student_id;
//     delete newDocument.student_id;
//   }

//   const result = await collection.insertOne(newDocument);
//   res.status(201).send(result);
// });

router.post("/", async (req, res) => {
  try {
    const newDoc = { ...req.body };

    if (newDoc.student_id) {
      newDoc.learner_id = newDoc.student_id;
      delete newDoc.student_id;
    }

    const result = await Grade.create(newDoc);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// Get a single grade entry
router.get("/:id", async (req, res) => {
  const db = getDb();
  const collection = db.collection("grades");
  const query = { _id: new ObjectId(req.params.id) };

  const result = await collection.findOne(query);

  if (!result) return res.status(404).send("Not found");
  res.status(200).send(result);
});

// Add a score to a grade entry
router.patch("/:id/add", async (req, res) => {
  const db = getDb();
  const collection = db.collection("grades");
  const query = { _id: new ObjectId(req.params.id) };

  const result = await collection.updateOne(query, {
    $push: { scores: req.body }
  });

  res.status(result.modifiedCount ? 200 : 404).send(result);
});

// Remove a score from a grade entry
router.patch("/:id/remove", async (req, res) => {
  const db = getDb();
  const collection = db.collection("grades");
  const query = { _id: new ObjectId(req.params.id) };

  const result = await collection.updateOne(query, {
    $pull: { scores: req.body }
  });

  res.status(result.modifiedCount ? 200 : 404).send(result);
});

// Delete a single grade entry
router.delete("/:id", async (req, res) => {
  const db = getDb();
  const collection = db.collection("grades");
  const query = { _id: new ObjectId(req.params.id) };

  const result = await collection.deleteOne(query);

  res.status(result.deletedCount ? 200 : 404).send(result);
});

// Redirect for backwards compatibility
router.get("/student/:id", (req, res) => {
  res.redirect(`/grades/learner/${req.params.id}`);
});

// Get a learner's grade data
router.get("/learner/:id", async (req, res) => {
  const db = getDb();
  const collection = db.collection("grades");
  const query = { learner_id: Number(req.params.id) };

  if (req.query.class) query.class_id = Number(req.query.class);

  const result = await collection.find(query).toArray();

  res.status(result.length ? 200 : 404).send(result.length ? result : "Not found");
});

// Delete a learner's grade data
router.delete("/learner/:id", async (req, res) => {
  const db = getDb();
  const collection = db.collection("grades");
  const query = { learner_id: Number(req.params.id) };

  const result = await collection.deleteOne(query);

  res.status(result.deletedCount ? 200 : 404).send(result);
});

// Get a class's grade data
router.get("/class/:id", async (req, res) => {
  const db = getDb();
  const collection = db.collection("grades");
  const query = { class_id: Number(req.params.id) };

  if (req.query.learner) query.learner_id = Number(req.query.learner);

  const result = await collection.find(query).toArray();

  res.status(result.length ? 200 : 404).send(result.length ? result : "Not found");
});

// Update a class id
router.patch("/class/:id", async (req, res) => {
  const db = getDb();
  const collection = db.collection("grades");
  const query = { class_id: Number(req.params.id) };

  const result = await collection.updateMany(query, {
    $set: { class_id: req.body.class_id }
  });

  res.status(result.modifiedCount ? 200 : 404).send(result);
});

// Delete a class
router.delete("/class/:id", async (req, res) => {
  const db = getDb();
  const collection = db.collection("grades");
  const query = { class_id: Number(req.params.id) };

  const result = await collection.deleteMany(query);

  res.status(result.deletedCount ? 200 : 404).send(result);
});

export default router;