import express from "express";
import { body, param } from "express-validator";
import {
  getCart,
  addItem,
  updateItem,
  deleteItem,
} from "../controllers/cartController.js";
import { authenticate, authorizeRole } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

// Semua endpoint keranjang hanya untuk customer yang sudah login
router.use(authenticate, authorizeRole("customer"));

const idParam = param("id")
  .isInt({ min: 1 })
  .withMessage("ID item tidak valid.");

router.get("/", getCart);

router.post(
  "/items",
  [
    body("product_id").isInt({ min: 1 }).withMessage("Produk wajib dipilih."),
    body("quantity")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Kuantitas minimal 1."),
  ],
  validateRequest,
  addItem,
);

router.put(
  "/items/:id",
  [
    idParam,
    body("quantity").isInt({ min: 1 }).withMessage("Kuantitas minimal 1."),
  ],
  validateRequest,
  updateItem,
);

router.delete("/items/:id", [idParam], validateRequest, deleteItem);

export default router;
