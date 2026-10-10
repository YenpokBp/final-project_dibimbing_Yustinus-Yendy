import { Category } from "../models/index.js";
import { HttpError } from "../utils/httpError.js";

export const getCategories = async (req, res) => {
  const categories = await Category.findAll({
    order: [["category_name", "ASC"]],
  });

  res.json({
    success: true,
    message: "Daftar kategori berhasil diambil.",
    data: categories,
  });
};

export const createCategory = async (req, res) => {
  const { category_name } = req.body;

  const category = await Category.create({ category_name });

  res.status(201).json({
    success: true,
    message: "Kategori berhasil dibuat.",
    data: category,
  });
};

export const updateCategory = async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) throw new HttpError(404, "Kategori tidak ditemukan.");

  await category.update({ category_name: req.body.category_name });

  res.json({
    success: true,
    message: "Kategori berhasil diubah.",
    data: category,
  });
};

export const deleteCategory = async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) throw new HttpError(404, "Kategori tidak ditemukan.");

  await category.destroy();

  res.json({ success: true, message: "Kategori berhasil dihapus." });
};
