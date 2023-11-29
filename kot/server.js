const dotenv = require("dotenv");

// enviorment variable setup
dotenv.config({ path: "./.env" });

const app = require("./app");

// Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("Server is Shutting Down DUE TO Uncaught Exception");
  process.exit(1);
});

// DB Connectivity
const db = require("./db");
(async () => {
  await db();
})();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.clear();
  console.log(`Server is running on port: ${PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  server.close(() => {
    console.log("Server is Shutting Down DUE TO Unhandled Rejection");
    process.exit();
  });
});
