export const ERROR_TYPES = Object.freeze({
  INVALID_IP_FORMAT: { status: 400, message: "Invalid format IP" },
  DATABASE_ERROR: { status: 400, message: "Database error" },
  VALIDATION_ERROR: { status: 400, message: "Validation failed" },
  IP_ALREADY_EXISTS: { status: 409, message: "This IP already exists" },
  IP_NOT_FOUND: { status: 404, message: "The IP was not found" },
});
