import { useState } from "react";
import { formatRupiah, getImageSrc } from "../utils/format.js";
export default function ProductCard({ product, canBuy, onAdd, adding }) {
  const [imgError, setImgError] = useState(false);
  const outOfStock = product.stock === 0;

  return (
    <div className="group clip-chamfer flex flex-col overflow-hidden border border-line bg-panel transition duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_0_30px_rgba(14,165,198,0.35)]">
      {/* Cover game, rasio potret 3:4 */}
      <div className="relative flex aspect-3/4 items-center justify-center overflow-hidden bg-panel-hi">
        {product.image_url && !imgError ? (
          <img
            src={getImageSrc(product.image_url)}
            alt={product.product_name}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setImgError(true)}
            className={`h-full w-full object-cover transition duration-300 group-hover:scale-105 ${
              outOfStock ? "opacity-40 grayscale" : ""
            }`}
          />
        ) : (
          <span className="text-5xl">🎮</span>
        )}

        {outOfStock && (
          <span className="absolute left-3 top-3 border border-danger/40 bg-void/80 px-2 py-0.5 font-mono text-xs uppercase tracking-widest text-danger">
            Stok habis
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 font-display">
        <div className="mb-2 flex flex-wrap gap-1.5 font-mono text-xs">
          <span className="border border-primary/40 bg-primary/10 px-2 py-0.5 text-primary-glow">
            {product.platform?.platform_name}
          </span>
          <span className="border border-line bg-panel-hi px-2 py-0.5 text-muted">
            {product.category?.category_name}
          </span>
        </div>

        <h3 className="flex-1 text-lg font-semibold leading-tight text-ink">
          {product.product_name}
        </h3>
        <p className="mt-2 font-mono text-lg text-primary-glow">
          {formatRupiah(product.price)}
        </p>
        <p className={`font-mono text-xs ${outOfStock ? "text-danger" : "text-muted"}`}>
          {outOfStock ? "Tidak tersedia" : `Stok: ${product.stock}`}
        </p>

        {canBuy && (
          <button
            onClick={() => onAdd(product.product_id)}
            disabled={outOfStock || adding}
            className="clip-chamfer-sm mt-3 w-full bg-primary py-2 font-mono text-sm uppercase tracking-widest text-void transition hover:bg-primary-glow disabled:cursor-not-allowed disabled:bg-line disabled:text-muted"
          >
            {adding ? "Menambahkan..." : "Tambah ke Keranjang"}
          </button>
        )}
      </div>
    </div>
  );
}