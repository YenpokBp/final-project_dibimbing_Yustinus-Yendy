import express from "express";
import { query } from "express-validator";
import {
  getBestSellers,
  getLowStock,
  getSalesSummary,
} from "../controllers/reportController.js";
import { authenticate, authorizeRole } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

router.use(authenticate, authorizeRole("admin"));

const periodQuery = query("period")
  .optional()
  .isIn(["today", "week", "month"])
  .withMessage("Period harus today, week, atau month.");

router.get(
  "/best-sellers",
  [
    periodQuery,
    query("limit")
      .optional()
      .isInt({ min: 1, max: 50 })
      .withMessage("limit antara 1 dan 50."),
  ],
  validateRequest,
  getBestSellers,
);

router.get(
  "/low-stock",
  [
    query("threshold")
      .optional()
      .isInt({ min: 0 })
      .withMessage("threshold minimal 0."),
  ],
  validateRequest,
  getLowStock,
);

router.get("/sales-summary", [periodQuery], validateRequest, getSalesSummary);

export default router;
