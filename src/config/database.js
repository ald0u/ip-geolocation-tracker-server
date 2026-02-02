import { PrismaClient } from "../../generated/prisma/index.js";

const globalForPrisma = global;

/**
 * Prevent multiple instances in development
 */
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/**
 * Conect to BD
 */
export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Connected via prisma");
  } catch (error) {
    console.error("Connection failed");
    process.exit(1);
  }
};

/**
 * Disconnect to BD
 */
const disconnectDB = async () => {
  await prisma.$disconnect();
  console.log("Disconnected");
};

/**
 * Signs to DB
 */
process.on("SIGINT", async () => {
  await disconnectDB();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await disconnectDB();
  process.exit(0);
});
