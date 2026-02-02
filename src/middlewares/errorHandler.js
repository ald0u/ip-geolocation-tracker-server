import { ERROR_TYPES } from "../utils/errorCode.js";

export const errorHandler = (err, req, res, next) => {
  const errorKey = err.code?.startsWith("P")
    ? "DATABASE_ERROR"
    : err.name === "ValidationError"
      ? "VALIDATION_ERROR"
      : err.message;

  const { status, message } = ERROR_TYPES[errorKey] || {
    status: err.status || 500,
    message: err.message || "Internal Server Error",
  };

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};
