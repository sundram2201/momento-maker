const mongoose = require("mongoose");

const MONGO_URI = process.env.DB_URI;

const connecting = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
  } catch (err) {
    console.log(err);
  }
};

const db = mongoose.connection;

db.once("open", () => console.log("DB is Connected"));
db.on("error", (err) => console.log("Connection Error", err));

module.exports = connecting;
