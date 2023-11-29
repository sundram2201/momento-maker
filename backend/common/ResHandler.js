function ResHandler(res, message, statusCode, data = undefined) {
  return res.status(statusCode).json({
    status: "success",
    code: statusCode,
    message,
    data,
  });
}

module.exports = ResHandler;
