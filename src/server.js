import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import ipRoutes from "./routes/ip.routes.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import { requestLogger } from "./middlewares/requestLogger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* Middlewares of security */
app.use(
  cors({
    origin: process.env.FRONT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Logger */
app.use(requestLogger);

/* Health */
app.get("/health", (req, res) => res.status(200).send("OK"));

/* API Routes */
app.use("/api/ips", ipRoutes);

/* Error Handling */
app.use(notFound);
app.use(errorHandler);

/**
 * Start Server
 */
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      const info = {
        port: PORT,
        env: process.env.NODE_ENV,
        health: `http://localhost:${PORT}/health`,
        base: `http://localhost:${PORT}/api/ips`,
      };
      console.table(info);
    });
  } catch (error) {
    console.error("Error Crítico:", error.message);
    process.exit(1);
  }
};

startServer();
