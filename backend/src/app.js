import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import platformRoutes from "./routes/platformRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
const app = express();

// CORS middleware
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server GameVault siap");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/platforms", platformRoutes);
app.use("/api/platforms", platformRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use(errorHandler);

export default app;
