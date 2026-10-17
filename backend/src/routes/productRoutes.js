import express from "express";
import { body, param, query } from "express-validator";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { authenticate, authorizeRole } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

const idParam = param("id")
  .isInt({ min: 1 })
  .withMessage("ID produk tidak valid.");

const productBody = [
  body("product_name")
    .trim()
    .notEmpty()
    .withMessage("Nama produk wajib diisi.")
    .isLength({ max: 150 })
    .withMessage("Nama produk maksimal 150 karakter."),
  body("category_id").isInt({ min: 1 }).withMessage("Kategori wajib dipilih."),
  body("platform_id").isInt({ min: 1 }).withMessage("Platform wajib dipilih."),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Harga harus berupa angka minimal 0."),
  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stok harus berupa bilangan bulat minimal 0."),
  body("image_url")
    .optional({ values: "null" })
    .trim()
    .isLength({ max: 255 })
    .withMessage("Nama file gambar maksimal 255 karakter."),
];

router.get(
  "/",
  [
    query("search").optional().isString().trim(),
    query("page").optional().isInt({ min: 1 }).withMessage("page minimal 1."),
    query("limit")
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage("limit antara 1 dan 100."),
    query("category_id")
      .optional()
      .isInt({ min: 1 })
      .withMessage("category_id tidak valid."),
    query("platform_id")
      .optional()
      .isInt({ min: 1 })
      .withMessage("platform_id tidak valid."),
  ],
  validateRequest,
  getProducts,
);

router.get("/:id", [idParam], validateRequest, getProductById);

router.post(
  "/",
  authenticate,
  authorizeRole("admin"),
  productBody,
  validateRequest,
  createProduct,
);

router.put(
  "/:id",
  authenticate,
  authorizeRole("admin"),
  [idParam, ...productBody],
  validateRequest,
  updateProduct,
);

router.delete(
  "/:id",
  authenticate,
  authorizeRole("admin"),
  [idParam],
  validateRequest,
  deleteProduct,
);

export default router;
