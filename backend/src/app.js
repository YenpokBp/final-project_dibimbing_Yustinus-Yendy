import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// CORS middleware
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server GameVault siap");
});

app.use("/api/auth", authRoutes);
// route lain (products, categories, platforms, cart, orders) ditambahkan per tahap

app.use(errorHandler);

export default app;
