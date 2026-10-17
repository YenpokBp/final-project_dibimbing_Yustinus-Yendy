import { Op, fn, col } from "sequelize";
import {
  Order,
  OrderItem,
  Product,
  Category,
  Platform,
} from "../models/index.js";
import { getPeriodStart } from "./adminOrderController.js";

export const getBestSellers = async (req, res) => {
  const { period } = req.query;
  const limit = Number(req.query.limit) || 5;

  const orderWhere = { order_status: "paid" };
  if (period) orderWhere.created_at = { [Op.gte]: getPeriodStart(period) };

  const rows = await OrderItem.findAll({
    attributes: [
      "product_id",
      [fn("MAX", col("OrderItem.product_name")), "product_name"],
      [fn("SUM", col("OrderItem.quantity")), "total_sold"],
      [fn("SUM", col("OrderItem.subtotal")), "total_revenue"],
    ],
    include: [
      {
        model: Order,
        as: "order",
        attributes: [],
        where: orderWhere,
        required: true,
      },
    ],
    group: ["OrderItem.product_id"],
    order: [[fn("SUM", col("OrderItem.quantity")), "DESC"]],
    limit,
    raw: true,
  });

  const data = rows.map((row) => ({
    product_id: row.product_id,
    product_name: row.product_name,
    total_sold: Number(row.total_sold),
    total_revenue: Number(row.total_revenue),
  }));

  res.json({
    success: true,
    message: "Laporan produk terlaris berhasil diambil.",
    data,
  });
};

export const getLowStock = async (req, res) => {
  const threshold =
    req.query.threshold === undefined ? 10 : Number(req.query.threshold);

  const products = await Product.findAll({
    where: { stock: { [Op.lte]: threshold } },
    include: [
      { model: Category, as: "category", attributes: ["category_name"] },
      { model: Platform, as: "platform", attributes: ["platform_name"] },
    ],
    order: [
      ["stock", "ASC"],
      ["product_id", "ASC"],
    ],
  });

  res.json({
    success: true,
    message: "Laporan stok rendah berhasil diambil.",
    threshold,
    data: products,
  });
};

export const getSalesSummary = async (req, res) => {
  const { period } = req.query;

  const where = {};
  if (period) where.created_at = { [Op.gte]: getPeriodStart(period) };

  const rows = await Order.findAll({
    attributes: [
      "order_status",
      [fn("COUNT", col("order_id")), "total_orders"],
      [fn("SUM", col("total_amount")), "total_amount"],
    ],
    where,
    group: ["order_status"],
    raw: true,
  });

  const summary = {
    period: period || "all",
    orders: { pending: 0, paid: 0, cancelled: 0, total: 0 },
    total_revenue: 0,
  };

  for (const row of rows) {
    const count = Number(row.total_orders);
    summary.orders[row.order_status] = count;
    summary.orders.total += count;
    if (row.order_status === "paid")
      summary.total_revenue = Number(row.total_amount);
  }

  res.json({
    success: true,
    message: "Ringkasan penjualan berhasil diambil.",
    data: summary,
  });
};
