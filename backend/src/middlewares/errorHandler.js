import { HttpError } from "../utils/httpError.js";

function normalizeParserError(err) {
  if (err instanceof HttpError) return err;

  // JSON di body rusak (dari express.json)
  if (err.type === "entity.parse.failed") {
    return new HttpError(400, "Format JSON tidak valid.");
  }

  // Error Sequelize -> HttpError
  if (err.name === "SequelizeUniqueConstraintError") {
    return new HttpError(
      409,
      "Data sudah ada.",
      err.errors.map((e) => ({ field: e.path, message: e.message })),
    );
  }
  if (err.name === "SequelizeValidationError") {
    return new HttpError(
      400,
      "Validasi gagal.",
      err.errors.map((e) => ({ field: e.path, message: e.message })),
    );
  }
  if (err.name === "SequelizeForeignKeyConstraintError") {
    return new HttpError(
      409,
      "Data berelasi dengan data lain, aksi tidak dapat dilakukan.",
    );
  }

  return err;
}

export function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);
  err = normalizeParserError(err);
  const known = err instanceof HttpError;
  if (!known) console.error("[server]", err.name, err.message);
  res.status(known ? err.statusCode : 500).json({
    success: false,
    message: known ? err.message : "Terjadi kesalahan pada server.",
    errors: known ? err.errors : [],
  });
}
