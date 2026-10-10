import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
export const authenticate = async (req, res, next) => {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res
      .status(401)
      .json({ message: "Token tidak valid atau kedaluwarsa" });
  }

  const user = await User.findByPk(payload.user_id);
  if (!user) {
    return res.status(401).json({ message: "User tidak ditemukan" });
  }

  req.user = user;
  next();
};

export const authorizeRole =
  (...roles) =>
  (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Akses ditolak" });
    }
    next();
  };
