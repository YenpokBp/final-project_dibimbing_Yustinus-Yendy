import { useState } from "react";
import { formatRupiah } from "../utils/format.js";

export default function ProductCard({ product, canBuy, onAdd, adding }) {
  const [imgError, setImgError] = useState(false);
  const outOfStock = product.stock === 0;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex h-44 items-center justify-center bg-gray-100">
        {product.image_url && !imgError ? (
          <img
            src={`/images/${product.image_url}`}
            alt={product.product_name}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-4xl">🎮</span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex flex-wrap gap-1.5 text-xs">
          <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-indigo-700">
            {product.platform?.platform_name}
          </span>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">
            {product.category?.category_name}
          </span>
        </div>

        <h3 className="flex-1 font-semibold text-gray-900">{product.product_name}</h3>
        <p className="mt-2 text-lg font-bold text-indigo-600">{formatRupiah(product.price)}</p>
        <p className={`text-sm ${outOfStock ? "text-red-600" : "text-gray-500"}`}>
          {outOfStock ? "Stok habis" : `Stok: ${product.stock}`}
        </p>

        {canBuy && (
          <button
            onClick={() => onAdd(product.product_id)}
            disabled={outOfStock || adding}
            className="mt-3 w-full rounded-md bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {adding ? "Menambahkan..." : "Tambah ke Keranjang"}
          </button>
        )}
      </div>
    </div>
  );
}