const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    code: err.statusCode,
    res: err.data,
    stack: err.stack,
    err,
  });
};

const sendProdError = (err, res) => {
  if (err.isOperational) {

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      code: err.statusCode,
      res: err.data,
    });
  } else {
    console.log("Error 💥", err);

    res.status(500).json({
      status: "error",
      message: "Something went wrong...",
      code: 500,
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Internal Server Error";

  if (err.data) {
    err.data = err.data.map((err) => err.message);
  }

  if (process.env.NODE_ENV === "development") {
    sendDevError(err, res);
  } else {
    sendProdError(err, res);
  }
};
