const express = require("express");

const app = express();

// module import
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const momentRoute = require("./routes/moment");
const cityListRoute = require("./routes/cityList");

// middleware for request
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", function (req, res) {
  res.send("Welcome to Portal...");
});

//api
app.use("/api/city", cityListRoute);
app.use("/api/user", userRoute);
app.use("/api/moment", momentRoute);

// Error Middleware
const ErrorMiddleware = require("./middleware/ErrorMiddleware");
app.use(ErrorMiddleware);

module.exports = app;
