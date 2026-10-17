import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { getErrorMessage } from "../services/api";
import PlatformCard from "../components/platformCard";

export default function Home() {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/platforms")
      .then((res) => setPlatforms(res.data.data))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-void px-4 py-14 font-display">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-violet-glow">
          // Select platform
        </p>
        <h1 className="mt-2 text-4xl font-bold uppercase tracking-widest text-ink md:text-5xl">
          Pilih platformmu
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          Pilih konsol yang kamu mainkan, lalu lihat game fisik yang tersedia.
        </p>

        {error && (
          <p className="mt-8 border border-red-500/40 bg-red-950/40 p-3 text-sm text-red-300">
            {error}
          </p>
        )}

        {loading ? (
          <p className="mt-12 font-mono text-muted">Memuat platform...</p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {platforms.map((platform, index) => (
              <PlatformCard key={platform.platform_id} platform={platform} index={index} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/products"
            className="clip-chamfer-sm inline-block border border-violet-main px-6 py-2.5 font-mono text-sm uppercase tracking-widest text-violet-glow transition hover:bg-violet-main/20"
          >
            Lihat semua game
          </Link>
        </div>
      </div>
    </div>
  );
}