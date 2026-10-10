import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

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

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Nama, email, dan password wajib diisi" });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "Password minimal 6 karakter" });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existing = await User.findOne({ where: { email: normalizedEmail } });
  if (existing) {
    return res.status(409).json({ message: "Email sudah terdaftar" });
  }

  const password_hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password_hash,
    role: "customer", // sengaja dipaksa, tidak dari req.body
  });

  res
    .status(201)
    .json({ message: "Registrasi berhasil", user: publicUser(user) });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password wajib diisi" });
  }

  const user = await User.findOne({
    where: { email: email.trim().toLowerCase() },
  });
  const valid = user && (await bcrypt.compare(password, user.password_hash));

  // Pesan sama untuk email salah maupun password salah
  if (!valid) {
    return res.status(401).json({ message: "Email atau password salah" });
  }

  res.json({
    message: "Login berhasil",
    token: signToken(user),
    user: publicUser(user),
  });
};

export const me = async (req, res) => {
  res.json({ user: publicUser(req.user) });
};
