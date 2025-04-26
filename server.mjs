import express from "express";
import grades from "./routes/grades.mjs";
import grades_agg from "./routes/grades_agg.mjs";
import dotenv from 'dotenv';
import connectDB from './db/conn.mjs';


// Setups
dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

// Connect to Database
connectDB();  // Important! Connect to MongoDB before routes/middleware

// Middlewares
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the Grades API.");
});

// Routes
app.use("/grades", grades);
app.use("/grades_agg", grades_agg);


// Global Error Handling
app.use((err, _req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Seems like we messed up somewhere..." });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});