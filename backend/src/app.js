import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Terjadi kesalahan pada server" });
});

export default app;
