const mongoose = require("mongoose");

require("dotenv").config();

// Use environment variable for MongoDB URI
const MONGO_URI = process.env.DB_URI || "mongodb://localhost:27017/momentomaker";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};

mongoose.connection.on("error", (err) => {
  console.error("MongoDB error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

module.exports = connectDB;
