import { useState } from "react";
import { Link } from "react-router-dom";

// "PlayStation 5" -> "playstation-5" (nama file gambar)
const toSlug = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function PlatformCard({ platform, index }) {
  const [imgError, setImgError] = useState(false);
  const slug = toSlug(platform.platform_name);

  return (
    <Link
      to={`/products?platform_id=${platform.platform_id}`}
      className="group clip-chamfer relative block h-72 overflow-hidden border border-line bg-linear-to-br from-panel-hi to-panel transition duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_0_30px_rgba(14,165,198,0.35)]"
    >
      {!imgError && (
        <img
          src={`/images/platforms/${slug}.jpg`}
          alt=""
          onError={() => setImgError(true)}
          className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-300 group-hover:scale-105 group-hover:opacity-70"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-void via-void/60 to-transparent" />

      <div className="relative flex h-full flex-col justify-between p-6">
        <span className="font-mono text-sm text-primary-glow">
          // {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h2 className="text-3xl font-bold uppercase tracking-widest text-ink">
            {platform.platform_name}
          </h2>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted transition group-hover:text-primary-glow">
            Lihat game →
          </p>
        </div>
      </div>
    </Link>
  );
}