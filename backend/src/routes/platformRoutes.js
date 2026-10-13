import express from "express";
import { body, param } from "express-validator";
import {
  getPlatforms,
  createPlatform,
  updatePlatform,
  deletePlatform,
} from "../controllers/platformController.js";
import { authenticate, authorizeRole } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

const idParam = param("id")
  .isInt({ min: 1 })
  .withMessage("ID platform tidak valid.");

const platformBody = [
  body("platform_name")
    .trim()
    .notEmpty()
    .withMessage("Nama platform wajib diisi.")
    .isLength({ max: 100 })
    .withMessage("Nama platform maksimal 100 karakter."),
];

router.get("/", getPlatforms);

router.post(
  "/",
  authenticate,
  authorizeRole("admin"),
  platformBody,
  validateRequest,
  createPlatform,
);

router.put(
  "/:id",
  authenticate,
  authorizeRole("admin"),
  [idParam, ...platformBody],
  validateRequest,
  updatePlatform,
);

router.delete(
  "/:id",
  authenticate,
  authorizeRole("admin"),
  [idParam],
  validateRequest,
  deletePlatform,
);

export default router;
