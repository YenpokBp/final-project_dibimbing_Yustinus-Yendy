import {
  sequelize,
  Cart,
  CartItem,
  Product,
  Order,
  OrderItem,
} from "../models/index.js";
import { HttpError } from "../utils/httpError.js";

const orderInclude = [{ model: OrderItem, as: "items" }];

export const checkout = async (req, res) => {
  const orderId = await sequelize.transaction(async (t) => {
    const cart = await Cart.findOne({
      where: { user_id: req.user.user_id },
      transaction: t,
    });

    const cartItems = cart
      ? await CartItem.findAll({
          where: { cart_id: cart.cart_id },
          order: [["product_id", "ASC"]], // urutan tetap agar tidak saling mengunci
          transaction: t,
        })
      : [];

    if (cartItems.length === 0) throw new HttpError(400, "Keranjang kosong.");

    let total = 0;
    const orderItems = [];

    for (const item of cartItems) {
      // Kunci baris produk sampai transaksi selesai
      const product = await Product.findByPk(item.product_id, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (item.quantity > product.stock) {
        throw new HttpError(
          400,
          `Stok "${product.product_name}" tidak mencukupi. Stok tersedia: ${product.stock}.`,
        );
      }

      // Harga diambil dari database, bukan dari frontend
      const unit_price = Number(product.price);
      const subtotal = unit_price * item.quantity;
      total += subtotal;

      orderItems.push({
        product_id: product.product_id,
        product_name: product.product_name, // snapshot
        unit_price, // snapshot
        quantity: item.quantity,
        subtotal,
      });

      await product.update(
        { stock: product.stock - item.quantity },
        { transaction: t },
      );
    }

    const order = await Order.create(
      {
        user_id: req.user.user_id,
        order_status: "pending",
        total_amount: total,
      },
      { transaction: t },
    );

    await OrderItem.bulkCreate(
      orderItems.map((item) => ({ ...item, order_id: order.order_id })),
      { transaction: t },
    );

    await CartItem.destroy({
      where: { cart_id: cart.cart_id },
      transaction: t,
    });

    return order.order_id;
  });

  const created = await Order.findByPk(orderId, { include: orderInclude });

  res.status(201).json({
    success: true,
    message: "Checkout berhasil. Pesanan menunggu pembayaran di toko.",
    data: created,
  });
};

export const getMyOrders = async (req, res) => {
  const { status } = req.query;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const where = { user_id: req.user.user_id };
  if (status) where.order_status = status;

  const { count, rows } = await Order.findAndCountAll({
    where,
    include: orderInclude,
    order: [["order_id", "DESC"]],
    limit,
    offset: (page - 1) * limit,
    distinct: true,
  });

  res.json({
    success: true,
    message: "Riwayat pesanan berhasil diambil.",
    data: rows,
    pagination: {
      page,
      limit,
      total_items: count,
      total_pages: Math.ceil(count / limit),
    },
  });
};

export const getMyOrderById = async (req, res) => {
  const order = await Order.findOne({
    where: { order_id: req.params.id, user_id: req.user.user_id },
    include: orderInclude,
  });
  if (!order) throw new HttpError(404, "Pesanan tidak ditemukan.");

  res.json({
    success: true,
    message: "Detail pesanan berhasil diambil.",
    data: order,
  });
};
// Dipakai customer (user_id diisi) dan admin (user_id kosong = semua pesanan)
export const cancelPendingOrder = async (order_id, user_id = null) => {
  await sequelize.transaction(async (t) => {
    const where = { order_id };
    if (user_id) where.user_id = user_id;

    // Kunci baris pesanan agar tidak bisa diubah dua pihak sekaligus
    const order = await Order.findOne({
      where,
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!order) throw new HttpError(404, "Pesanan tidak ditemukan.");

    if (order.order_status !== "pending") {
      throw new HttpError(
        409,
        `Pesanan berstatus ${order.order_status} dan tidak dapat dibatalkan.`,
      );
    }

    const items = await OrderItem.findAll({
      where: { order_id },
      order: [["product_id", "ASC"]],
      transaction: t,
    });

    // Kembalikan stok tiap produk
    for (const item of items) {
      const product = await Product.findByPk(item.product_id, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });
      await product.update(
        { stock: product.stock + item.quantity },
        { transaction: t },
      );
    }

    await order.update({ order_status: "cancelled" }, { transaction: t });
  });

  return Order.findByPk(order_id, { include: orderInclude });
};

export const cancelMyOrder = async (req, res) => {
  const order = await cancelPendingOrder(req.params.id, req.user.user_id);

  res.json({
    success: true,
    message: "Pesanan berhasil dibatalkan.",
    data: order,
  });
};
