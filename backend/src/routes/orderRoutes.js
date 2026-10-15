import express from "express";
import { param, query } from "express-validator";
import {
  checkout,
  getMyOrders,
  getMyOrderById,
} from "../controllers/orderController.js";
import { authenticate, authorizeRole } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

router.use(authenticate, authorizeRole("customer"));

router.post("/checkout", checkout);

router.get(
  "/",
  [
    query("status")
      .optional()
      .isIn(["pending", "paid", "cancelled"])
      .withMessage("Status harus pending, paid, atau cancelled."),
    query("page").optional().isInt({ min: 1 }).withMessage("page minimal 1."),
    query("limit")
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage("limit antara 1 dan 100."),
  ],
  validateRequest,
  getMyOrders,
);

router.get(
  "/:id",
  [param("id").isInt({ min: 1 }).withMessage("ID pesanan tidak valid.")],
  validateRequest,
  getMyOrderById,
);

export default router;
