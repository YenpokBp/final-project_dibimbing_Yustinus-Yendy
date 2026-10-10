import "dotenv/config";
import app from "./app.js";
import { sequelize } from "./models/index.js";

const PORT = process.env.PORT || 3000;

try {
  await sequelize.authenticate();
  console.log("Database terhubung");
  app.listen(PORT, () =>
    console.log(`Server berjalan di http://localhost:3000`),
  );
} catch (err) {
  console.error("Gagal start server:", err.message);
  process.exit(1);
}
