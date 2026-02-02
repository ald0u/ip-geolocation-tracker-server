import express from "express";
import ipController from "../controllers/ip.controller.js";

const router = express.Router();

/**
 * ROUTES
 */

router.get("/", ipController.getAllIPs);
router.get("/stats", ipController.getStats);
router.get("/:id", ipController.getIPById);
router.post("/", ipController.createIP);
router.delete("/:id", ipController.deleteIP);

export default router;
