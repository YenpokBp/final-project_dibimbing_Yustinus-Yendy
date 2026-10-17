import express from "express";
import { param, query } from "express-validator";
import {
  getAllOrders,
  getOrderDetail,
  payOrder,
  cancelOrderByAdmin,
} from "../controllers/adminOrderController.js";
import { authenticate, authorizeRole } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

router.use(authenticate, authorizeRole("admin"));

const idParam = param("id")
  .isInt({ min: 1 })
  .withMessage("ID pesanan tidak valid.");

router.get(
  "/",
  [
    query("status")
      .optional()
      .isIn(["pending", "paid", "cancelled"])
      .withMessage("Status harus pending, paid, atau cancelled."),
    query("period")
      .optional()
      .isIn(["today", "week", "month"])
      .withMessage("Period harus today, week, atau month."),
    query("page").optional().isInt({ min: 1 }).withMessage("page minimal 1."),
    query("limit")
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage("limit antara 1 dan 100."),
  ],
  validateRequest,
  getAllOrders,
);

router.get("/:id", [idParam], validateRequest, getOrderDetail);
router.patch("/:id/pay", [idParam], validateRequest, payOrder);
router.patch("/:id/cancel", [idParam], validateRequest, cancelOrderByAdmin);

export default router;
