import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { HttpError } from "../utils/httpError.js";

const signToken = (user) =>
  jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });

const publicUser = (user) => ({
  user_id: user.user_id,
  name: user.name,
  email: user.email,
  role: user.role,
});

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const normalizedEmail = email.toLowerCase();

  const existing = await User.findOne({ where: { email: normalizedEmail } });
  if (existing) throw new HttpError(409, "Email sudah terdaftar.");

  const password_hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email: normalizedEmail,
    password_hash,
    role: "customer", // sengaja dipaksa, tidak dari req.body
  });

  res.status(201).json({
    success: true,
    message: "Registrasi berhasil.",
    data: publicUser(user),
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email: email.toLowerCase() } });
  const valid = user && (await bcrypt.compare(password, user.password_hash));

  // Pesan sama untuk email salah maupun password salah
  if (!valid) throw new HttpError(401, "Email atau password salah.");

  res.json({
    success: true,
    message: "Login berhasil.",
    data: { token: signToken(user), user: publicUser(user) },
  });
};
