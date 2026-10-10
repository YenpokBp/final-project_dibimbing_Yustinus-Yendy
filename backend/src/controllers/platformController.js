import { Platform } from "../models/index.js";
import { HttpError } from "../utils/httpError.js";

export const getPlatform = async (req, res) => {
  const platform = await Platform.findAll({
    order: [["platform_name", "ASC"]],
  });

  res.json({
    success: true,
    message: "Daftar kategori berhasil diambil.",
    data: platform,
  });
};

export const createPlatform = async (req, res) => {
  const { platform_name } = req.body;

  const platform = await Platform.create({ platform_name });

  res.status(201).json({
    success: true,
    message: "Kategori berhasil dibuat.",
    data: platform,
  });
};

export const updatePlatform = async (req, res) => {
  const platform = await Platform.findByPk(req.params.id);
  if (!platform) throw new HttpError(404, "Kategori tidak ditemukan.");

  await platform.update({ platform_name: req.body.platform_name });

  res.json({
    success: true,
    message: "Kategori berhasil diubah.",
    data: platform,
  });
};

export const deletePlatform = async (req, res) => {
  const platform = await Platform.findByPk(req.params.id);
  if (!platform) throw new HttpError(404, "Kategori tidak ditemukan.");

  await platform.destroy();

  res.json({ success: true, message: "Kategori berhasil dihapus." });
};
