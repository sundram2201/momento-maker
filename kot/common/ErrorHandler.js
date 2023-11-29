class ErrorHandler extends Error {
  constructor(message, statusCode, data = undefined) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "failed" : "error";
    this.data = data;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
