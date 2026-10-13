import express from "express";
import { body } from "express-validator";
import { register, login } from "../controllers/authController.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Nama wajib diisi.")
      .isLength({ max: 100 })
      .withMessage("Nama maksimal 100 karakter."),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email wajib diisi.")
      .isEmail()
      .withMessage("Format email tidak valid.")
      .isLength({ max: 100 })
      .withMessage("Email maksimal 100 karakter."),
    body("password")
      .isString()
      .withMessage("Password wajib diisi.")
      .isLength({ min: 6 })
      .withMessage("Password minimal 6 karakter."),
  ],
  validateRequest,
  register,
);

router.post(
  "/login",
  [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email wajib diisi.")
      .isEmail()
      .withMessage("Format email tidak valid."),
    body("password").notEmpty().withMessage("Password wajib diisi."),
  ],
  validateRequest,
  login,
);

export default router;
