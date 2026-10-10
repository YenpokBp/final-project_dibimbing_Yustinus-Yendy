import { Op } from "sequelize";
import { Product, Category, Platform } from "../models/index.js";
import { HttpError } from "../utils/httpError.js";

// Relasi yang selalu ikut dimuat agar respons berisi nama kategori & platform
const productInclude = [
  {
    model: Category,
    as: "category",
    attributes: ["category_id", "category_name"],
  },
  {
    model: Platform,
    as: "platform",
    attributes: ["platform_id", "platform_name"],
  },
];

export const getProducts = async (req, res) => {
  const { search, category_id, platform_id } = req.query;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const where = {};
  if (search) where.product_name = { [Op.like]: `%${search}%` };
  if (category_id) where.category_id = Number(category_id);
  if (platform_id) where.platform_id = Number(platform_id);

  const { count, rows } = await Product.findAndCountAll({
    where,
    include: productInclude,
    order: [["product_id", "DESC"]],
    limit,
    offset: (page - 1) * limit,
  });

  res.json({
    success: true,
    message: "Daftar produk berhasil diambil.",
    data: rows,
    pagination: {
      page,
      limit,
      total_items: count,
      total_pages: Math.ceil(count / limit),
    },
  });
};

export const getProductById = async (req, res) => {
  const product = await Product.findByPk(req.params.id, {
    include: productInclude,
  });
  if (!product) throw new HttpError(404, "Produk tidak ditemukan.");

  res.json({
    success: true,
    message: "Detail produk berhasil diambil.",
    data: product,
  });
};

// Pastikan kategori & platform yang dipilih benar-benar ada
const ensureRelationsExist = async (category_id, platform_id) => {
  if (!(await Category.findByPk(category_id))) {
    throw new HttpError(404, "Kategori tidak ditemukan.");
  }
  if (!(await Platform.findByPk(platform_id))) {
    throw new HttpError(404, "Platform tidak ditemukan.");
  }
};

export const createProduct = async (req, res) => {
  const { product_name, category_id, platform_id, price, stock, image_url } =
    req.body;
  await ensureRelationsExist(category_id, platform_id);

  const product = await Product.create({
    product_name,
    category_id,
    platform_id,
    price,
    stock,
    image_url,
  });

  const created = await Product.findByPk(product.product_id, {
    include: productInclude,
  });
  res
    .status(201)
    .json({ success: true, message: "Produk berhasil dibuat.", data: created });
};

export const updateProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) throw new HttpError(404, "Produk tidak ditemukan.");

  const { product_name, category_id, platform_id, price, stock, image_url } =
    req.body;
  await ensureRelationsExist(category_id, platform_id);

  await product.update({
    product_name,
    category_id,
    platform_id,
    price,
    stock,
    image_url,
  });

  const updated = await Product.findByPk(product.product_id, {
    include: productInclude,
  });
  res.json({
    success: true,
    message: "Produk berhasil diubah.",
    data: updated,
  });
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) throw new HttpError(404, "Produk tidak ditemukan.");

  await product.destroy();
  res.json({ success: true, message: "Produk berhasil dihapus." });
};
