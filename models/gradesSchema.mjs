import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  type: String,
  score: Number,
});

const gradeSchema = new mongoose.Schema({
  learner_id: Number,
  class_id: Number,
  scores: [scoreSchema], 
});

const Grade = mongoose.model("Grade", gradeSchema);
export default Grade;