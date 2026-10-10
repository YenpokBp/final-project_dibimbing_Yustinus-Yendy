import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { HttpError } from "../utils/httpError.js";

export const authenticate = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new HttpError(401, "Token tidak ditemukan.");
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      throw new HttpError(401, "Token tidak valid atau kedaluwarsa.");
    }

    const user = await User.findByPk(payload.user_id);
    if (!user) {
      throw new HttpError(401, "User tidak ditemukan.");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const authorizeRole =
  (...roles) =>
  (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new HttpError(403, "Akses ditolak."));
    }
    next();
  };
