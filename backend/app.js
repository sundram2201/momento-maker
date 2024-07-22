const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

// module import
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const momentRoute = require("./routes/moment");
const cityListRoute = require("./routes/cityList");

// middleware for request
app.use(express.json());

app.use(
  cors({
    origin: "https://momento-maker.onrender.com" || "http://localhost:3000", // Default to localhost for development
    credentials: true, // Allow cookies (if applicable)
  })
);

app.use("/uploads", express.static("uploads"));

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", function (req, res) {
  res.send(`Welcome to PORT :  ${port}`);
});

//api
app.use("/api/city", cityListRoute);
app.use("/api/user", userRoute);
app.use("/api/moment", momentRoute);

// Error Middleware
const ErrorMiddleware = require("./middleware/ErrorMiddleware");
app.use(ErrorMiddleware);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.listen(port, () => console.log(`Server @${port}`));

// DB Connectivity
const db = require("./db");
(async () => {
  await db();
})();
module.exports = app;
