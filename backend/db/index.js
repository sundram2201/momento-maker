const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://sundramchn123:Goldy.2201@cluster0.mc7wuld.mongodb.net/5dSolution";

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
