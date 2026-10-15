import { Cart, CartItem, Product } from "../models/index.js";
import { HttpError } from "../utils/httpError.js";

// Ambil keranjang milik user, buat kalau belum ada
const getOrCreateCart = async (user_id) => {
  const [cart] = await Cart.findOrCreate({ where: { user_id } });
  return cart;
};

// Susun isi keranjang + hitung subtotal dan total di backend
const buildCartResponse = async (cart) => {
  const items = await CartItem.findAll({
    where: { cart_id: cart.cart_id },
    include: [
      {
        model: Product,
        as: "product",
        attributes: [
          "product_id",
          "product_name",
          "price",
          "stock",
          "image_url",
        ],
      },
    ],
    order: [["cart_item_id", "ASC"]],
  });

  const data = items.map((item) => {
    const price = Number(item.product.price);
    return {
      cart_item_id: item.cart_item_id,
      product_id: item.product_id,
      product_name: item.product.product_name,
      image_url: item.product.image_url,
      price,
      stock: item.product.stock,
      quantity: item.quantity,
      subtotal: price * item.quantity,
    };
  });

  return {
    cart_id: cart.cart_id,
    items: data,
    total_items: data.reduce((sum, item) => sum + item.quantity, 0),
    total_amount: data.reduce((sum, item) => sum + item.subtotal, 0),
  };
};

// Cari item hanya jika milik keranjang user yang login
const findOwnedItem = async (cart_item_id, user_id) => {
  const item = await CartItem.findOne({
    where: { cart_item_id },
    include: [{ model: Cart, as: "cart", where: { user_id }, attributes: [] }],
  });
  if (!item) throw new HttpError(404, "Item keranjang tidak ditemukan.");
  return item;
};

const ensureStock = (product, quantity) => {
  if (quantity > product.stock) {
    throw new HttpError(
      400,
      `Stok tidak mencukupi. Stok tersedia: ${product.stock}.`,
    );
  }
};

export const getCart = async (req, res) => {
  const cart = await getOrCreateCart(req.user.user_id);

  res.json({
    success: true,
    message: "Keranjang berhasil diambil.",
    data: await buildCartResponse(cart),
  });
};

export const addItem = async (req, res) => {
  const { product_id, quantity = 1 } = req.body;

  const product = await Product.findByPk(product_id);
  if (!product) throw new HttpError(404, "Produk tidak ditemukan.");

  const cart = await getOrCreateCart(req.user.user_id);
  const existing = await CartItem.findOne({
    where: { cart_id: cart.cart_id, product_id },
  });

  const newQuantity = (existing ? existing.quantity : 0) + Number(quantity);
  ensureStock(product, newQuantity);

  if (existing) {
    await existing.update({ quantity: newQuantity });
  } else {
    await CartItem.create({
      cart_id: cart.cart_id,
      product_id,
      quantity: newQuantity,
    });
  }

  res.status(201).json({
    success: true,
    message: "Produk berhasil ditambahkan ke keranjang.",
    data: await buildCartResponse(cart),
  });
};

export const updateItem = async (req, res) => {
  const item = await findOwnedItem(req.params.id, req.user.user_id);

  const product = await Product.findByPk(item.product_id);
  if (!product) throw new HttpError(404, "Produk tidak ditemukan.");

  const quantity = Number(req.body.quantity);
  ensureStock(product, quantity);

  await item.update({ quantity });

  const cart = await getOrCreateCart(req.user.user_id);
  res.json({
    success: true,
    message: "Kuantitas berhasil diubah.",
    data: await buildCartResponse(cart),
  });
};

export const deleteItem = async (req, res) => {
  const item = await findOwnedItem(req.params.id, req.user.user_id);
  await item.destroy();

  const cart = await getOrCreateCart(req.user.user_id);
  res.json({
    success: true,
    message: "Item berhasil dihapus dari keranjang.",
    data: await buildCartResponse(cart),
  });
};
