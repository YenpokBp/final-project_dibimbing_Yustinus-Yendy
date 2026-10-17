import { useState } from "react";
import { formatRupiah } from "../utils/format.js";

export default function ProductCard({ product, canBuy, onAdd, adding }) {
  const [imgError, setImgError] = useState(false);
  const outOfStock = product.stock === 0;

  return (
    <div className="group clip-chamfer flex flex-col overflow-hidden border border-line bg-panel transition duration-300 hover:border-violet-main hover:shadow-[0_0_20px_rgba(124,58,237,0.25)]">
      <div className="relative flex h-48 items-center justify-center overflow-hidden border-b border-line bg-panel-hi">
        {product.image_url && !imgError ? (
          <img
            src={`/images/${product.image_url}`}
            alt={product.product_name}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover opacity-80 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
          />
        ) : (
          <span className="text-4xl opacity-50">🎮</span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex flex-wrap gap-1.5 text-xs">
          <span className="clip-chamfer-sm border border-violet-main/40 bg-violet-deep/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-violet-glow">
            {product.platform?.platform_name}
          </span>
          <span className="clip-chamfer-sm border border-line bg-panel-hi px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
            {product.category?.category_name}
          </span>
        </div>

        <h3 className="flex-1 font-display text-base font-bold uppercase tracking-wider text-ink line-clamp-2">
          {product.product_name}
        </h3>
        <p className="mt-2 font-mono text-base font-bold text-violet-glow">
          {formatRupiah(product.price)}
        </p>
        <p className={`mt-1 font-mono text-xs uppercase tracking-wider ${outOfStock ? "text-red-400" : "text-muted"}`}>
          {outOfStock ? "// Stok habis" : `// Stok: ${product.stock}`}
        </p>

        {canBuy && (
          <button
            onClick={() => onAdd(product.product_id)}
            disabled={outOfStock || adding}
            className="clip-chamfer-sm mt-3 w-full bg-violet-main py-2 font-mono text-xs uppercase tracking-widest text-white transition hover:bg-violet-deep disabled:cursor-not-allowed disabled:border disabled:border-line disabled:bg-panel-hi disabled:text-muted"
          >
            {adding ? "Menambahkan..." : "Tambah ke Keranjang"}
          </button>
        )}
      </div>
    </div>
  );
}