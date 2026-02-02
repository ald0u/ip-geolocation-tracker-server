/**
 * Middleware HTTP
 */
export const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const { method, originalUrl, ip } = req;
    const { statusCode } = res;

    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${method} ${originalUrl} ${statusCode} - ${duration}ms - IP: ${ip}`;

    statusCode >= 400 ? console.error(logMessage) : console.log(logMessage);
  });

  next();
};
