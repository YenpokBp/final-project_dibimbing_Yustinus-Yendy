import {
  sequelize,
  Product,
  Category,
  Platform,
  User,
  Cart,
  Order,
  OrderItem,
} from "./models/index.js";

(async () => {
  try {
    await sequelize.authenticate();

    const products = await Product.findAll({
      include: [
        { model: Category, as: "category", attributes: ["category_name"] },
        { model: Platform, as: "platform", attributes: ["platform_name"] },
      ],
    });

    products.forEach((p) => {
      console.log(
        `${p.product_name} | ${p.category.category_name} | ${p.platform.platform_name} | Rp${p.price} | stok ${p.stock}`,
      );
    });

    // Cek association lain tidak error saat query dibangun (tabel masih kosong)
    await User.findAll({
      include: [
        { model: Cart, as: "cart" },
        {
          model: Order,
          as: "orders",
          include: [{ model: OrderItem, as: "items" }],
        },
      ],
    });
    console.log("Association User -> Cart/Order -> OrderItem valid");
  } catch (err) {
    console.error("Gagal:", err.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
})();
