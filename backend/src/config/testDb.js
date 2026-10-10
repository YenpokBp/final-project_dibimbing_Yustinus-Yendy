import sequelize from "./db.js";
import Product from "../models/product.js";
import User from "../models/user.js";
import "../models/category.js";
import "../models/platform.js";
import "../models/cart.js";
import "../models/cartItem.js";
import "../models/order.js";
import "../models/orderItem.js";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Koneksi ke gamevault_db berhasil");

    const products = await Product.findAll({ raw: true });
    console.log(`Jumlah produk: ${products.length}`);
    console.log(products[0]);

    const users = await User.count();
    console.log(`Jumlah user: ${users}`);
  } catch (err) {
    console.error("Gagal:", err.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
})();
