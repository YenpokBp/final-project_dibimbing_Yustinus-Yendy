import { Op } from "sequelize";
import { sequelize, Order, OrderItem, User } from "../models/index.js";
import { HttpError } from "../utils/httpError.js";
import { cancelPendingOrder } from "./orderController.js";

const adminInclude = [
  { model: OrderItem, as: "items" },
  { model: User, as: "user", attributes: ["user_id", "name", "email"] },
];

// Awal periode: hari ini, minggu ini (mulai Senin), atau bulan ini
export const getPeriodStart = (period) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (period === "week") {
    const day = start.getDay(); // 0 = Minggu
    start.setDate(start.getDate() - (day === 0 ? 6 : day - 1));
  }
  if (period === "month") start.setDate(1);

  return start;
};

export const getAllOrders = async (req, res) => {
  const { status, period } = req.query;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const where = {};
  if (status) where.order_status = status;
  if (period) where.created_at = { [Op.gte]: getPeriodStart(period) };

  const { count, rows } = await Order.findAndCountAll({
    where,
    include: adminInclude,
    order: [["order_id", "DESC"]],
    limit,
    offset: (page - 1) * limit,
    distinct: true,
  });

  res.json({
    success: true,
    message: "Daftar pesanan berhasil diambil.",
    data: rows,
    pagination: {
      page,
      limit,
      total_items: count,
      total_pages: Math.ceil(count / limit),
    },
  });
};

export const getOrderDetail = async (req, res) => {
  const order = await Order.findByPk(req.params.id, { include: adminInclude });
  if (!order) throw new HttpError(404, "Pesanan tidak ditemukan.");

  res.json({
    success: true,
    message: "Detail pesanan berhasil diambil.",
    data: order,
  });
};

export const payOrder = async (req, res) => {
  await sequelize.transaction(async (t) => {
    const order = await Order.findByPk(req.params.id, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!order) throw new HttpError(404, "Pesanan tidak ditemukan.");

    if (order.order_status !== "pending") {
      throw new HttpError(
        409,
        `Pesanan berstatus ${order.order_status} dan tidak dapat dibayar.`,
      );
    }

    await order.update(
      { order_status: "paid", paid_at: new Date() },
      { transaction: t },
    );
  });

  const updated = await Order.findByPk(req.params.id, {
    include: adminInclude,
  });
  res.json({
    success: true,
    message: "Pembayaran berhasil dikonfirmasi.",
    data: updated,
  });
};

export const cancelOrderByAdmin = async (req, res) => {
  const order = await cancelPendingOrder(req.params.id);

  res.json({
    success: true,
    message: "Pesanan berhasil dibatalkan.",
    data: order,
  });
};
