import express from "express";
import { body, param } from "express-validator";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { authenticate, authorizeRole } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

const idParam = param("id")
  .isInt({ min: 1 })
  .withMessage("ID kategori tidak valid.");

const categoryBody = [
  body("category_name")
    .trim()
    .notEmpty()
    .withMessage("Nama kategori wajib diisi.")
    .isLength({ max: 100 })
    .withMessage("Nama kategori maksimal 100 karakter."),
];

router.get("/", getCategories);

router.post(
  "/",
  authenticate,
  authorizeRole("admin"),
  categoryBody,
  validateRequest,
  createCategory,
);

router.put(
  "/:id",
  authenticate,
  authorizeRole("admin"),
  [idParam, ...categoryBody],
  validateRequest,
  updateCategory,
);

router.delete(
  "/:id",
  authenticate,
  authorizeRole("admin"),
  [idParam],
  validateRequest,
  deleteCategory,
);

export default router;
