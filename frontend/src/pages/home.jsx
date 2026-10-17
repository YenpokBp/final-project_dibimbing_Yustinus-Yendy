import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { getErrorMessage } from "../services/api.js";
import { useAuth } from "../context/authContext.jsx";
import PlatformCard from "../components/platformCard.jsx";
import ProductCard from "../components/productCard.jsx";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [platforms, setPlatforms] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(null);
  const [addingId, setAddingId] = useState(null);

  useEffect(() => {
    // Scroll jika ada hash #platforms
    if (window.location.hash === "#platforms") {
      setTimeout(() => {
        const el = document.getElementById("platforms");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }

    Promise.all([
      api.get("/platforms"),
      api.get("/products", { params: { limit: 4 } }),
    ])
      .then(([platRes, prodRes]) => {
        setPlatforms(platRes.data.data);
        setFeaturedProducts(prodRes.data.data);
      })
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (productId) => {
    if (!user) return navigate("/login");

    setAddingId(productId);
    setNotice(null);

    try {
      await api.post("/cart/items", { product_id: productId, quantity: 1 });
      setNotice({ type: "success", text: "Game berhasil ditambahkan ke keranjang." });
    } catch (err) {
      setNotice({ type: "error", text: getErrorMessage(err) });
    } finally {
      setAddingId(null);
    }
  };

  const canBuy = user?.role !== "admin";

  return (
    <div className="min-h-screen bg-void font-display text-ink selection:bg-violet-main selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-line py-16 sm:py-24 px-4">
        {/* Glow ambient background effects */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-main/15 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 right-0 h-64 w-64 rounded-full bg-violet-deep/20 blur-2xl" />

        <div className="relative mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 clip-chamfer-sm border border-violet-main/40 bg-violet-deep/25 px-3 py-1 font-mono text-xs uppercase tracking-[0.25em] text-violet-glow mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-glow animate-pulse" />
            // OMNI TACTICAL INVENTORY // LIVE VAULT
          </div>

          <h1 className="text-3xl font-bold uppercase tracking-wider text-ink sm:text-5xl md:text-6xl max-w-4xl mx-auto leading-tight">
            Pusat Arsip & Distribusi <span className="text-violet-glow">Game Fisik</span> Konsol
          </h1>

          <p className="mt-5 max-w-2xl mx-auto font-mono text-sm sm:text-base text-muted leading-relaxed">
            Kurasi kaset, disc, dan cartridge fisik original untuk PlayStation 5, Xbox Series X,
            dan Nintendo Switch. Amankan pesananmu secara online, lalu bayar dan ambil langsung di markas toko OMNI.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#platforms"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("platforms");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="clip-chamfer-sm w-full sm:w-auto bg-violet-main px-8 py-3.5 font-mono text-sm uppercase tracking-widest text-white transition hover:bg-violet-deep shadow-[0_0_20px_rgba(124,58,237,0.4)]"
            >
              Pilih Platform ↓
            </a>
            <Link
              to="/products"
              className="clip-chamfer-sm w-full sm:w-auto border border-violet-main/60 bg-panel px-8 py-3.5 font-mono text-sm uppercase tracking-widest text-violet-glow transition hover:bg-violet-main/20 hover:border-violet-main"
            >
              Katalog Lengkap →
            </Link>
          </div>

          {/* Quick Metrics Ticker */}
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-4xl mx-auto">
            <div className="clip-chamfer-sm border border-line bg-panel/70 p-3 text-left">
              <span className="font-mono text-xs text-violet-glow">// ECOSYSTEM</span>
              <p className="mt-1 font-mono text-sm sm:text-base font-bold text-ink">3 PLATFORM</p>
              <p className="text-[11px] text-muted">PS5 · Xbox · Switch</p>
            </div>
            <div className="clip-chamfer-sm border border-line bg-panel/70 p-3 text-left">
              <span className="font-mono text-xs text-violet-glow">// AUTHENTIC</span>
              <p className="mt-1 font-mono text-sm sm:text-base font-bold text-ink">100% ORIGINAL</p>
              <p className="text-[11px] text-muted">Segel Resmi Pabrik</p>
            </div>
            <div className="clip-chamfer-sm border border-line bg-panel/70 p-3 text-left">
              <span className="font-mono text-xs text-violet-glow">// PAYMENT</span>
              <p className="mt-1 font-mono text-sm sm:text-base font-bold text-ink">BAYAR DI TOKO</p>
              <p className="text-[11px] text-muted">Cek Dulu Baru Bayar</p>
            </div>
            <div className="clip-chamfer-sm border border-line bg-panel/70 p-3 text-left">
              <span className="font-mono text-xs text-violet-glow">// SECURITY</span>
              <p className="mt-1 font-mono text-sm sm:text-base font-bold text-ink">LOCK STOK</p>
              <p className="text-[11px] text-muted">Booking Tanpa Antre</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PLATFORMS SECTION */}
      <section id="platforms" className="scroll-mt-20 border-b border-line px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-violet-glow">
                // SYSTEM SELECT // 01
              </p>
              <h2 className="mt-1 text-3xl font-bold uppercase tracking-widest text-ink sm:text-4xl">
                Pilih Platform Konsol
              </h2>
              <p className="mt-2 text-sm sm:text-base text-muted">
                Pilih konsol yang kamu mainkan untuk langsung melihat katalog game fisik yang siap diambil.
              </p>
            </div>
            <Link
              to="/products"
              className="font-mono text-xs uppercase tracking-widest text-violet-glow hover:text-ink transition"
            >
              Lihat semua tanpa filter →
            </Link>
          </div>

          {error && (
            <p className="mt-6 clip-chamfer-sm border border-red-500/40 bg-red-950/40 p-3 font-mono text-sm text-red-300">
              {error}
            </p>
          )}

          {loading ? (
            <p className="mt-12 text-center font-mono text-muted">Memuat platform...</p>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {platforms.map((platform, index) => (
                <PlatformCard key={platform.platform_id} platform={platform} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SECTION */}
      <section className="border-b border-line px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-violet-glow">
                // VAULT HIGHLIGHTS // 02
              </p>
              <h2 className="mt-1 text-3xl font-bold uppercase tracking-widest text-ink sm:text-4xl">
                Game Fisik Terpopuler
              </h2>
              <p className="mt-2 text-sm sm:text-base text-muted">
                Rekomendasi judul favorit yang paling banyak diburu kolektor saat ini.
              </p>
            </div>
            <Link
              to="/products"
              className="clip-chamfer-sm border border-violet-main/50 bg-panel px-4 py-2 font-mono text-xs uppercase tracking-widest text-violet-glow hover:bg-violet-main/20 transition self-start sm:self-auto"
            >
              Semua Game ({featuredProducts.length}+) →
            </Link>
          </div>

          {notice && (
            <p
              className={`mt-6 clip-chamfer-sm border p-3 font-mono text-sm ${
                notice.type === "success"
                  ? "border-emerald-500/40 bg-emerald-950/40 text-emerald-300"
                  : "border-red-500/40 bg-red-950/40 text-red-300"
              }`}
            >
              {notice.text}
            </p>
          )}

          {loading ? (
            <p className="mt-12 text-center font-mono text-muted">Memuat game pilihan...</p>
          ) : featuredProducts.length === 0 ? (
            <p className="mt-12 text-center font-mono text-muted">Belum ada data game.</p>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.product_id}
                  product={product}
                  canBuy={canBuy}
                  onAdd={handleAdd}
                  adding={addingId === product.product_id}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. WHY PHYSICAL / VALUE PROPOSITION */}
      <section className="border-b border-line px-4 py-16 bg-panel/40">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-violet-glow">
              // PHYSICAL MATTERS // 03
            </p>
            <h2 className="mt-1 text-3xl font-bold uppercase tracking-widest text-ink sm:text-4xl">
              Kenapa Memilih Kaset Fisik?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted">
              Di era serba digital, rilisan fisik tetap menjadi tahta tertinggi kepemilikan sejati bagi gamer sejati.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="clip-chamfer border border-line bg-panel p-6 hover:border-violet-main transition">
              <span className="text-3xl">🛡️</span>
              <h3 className="mt-4 font-mono text-sm font-bold uppercase tracking-wider text-ink">
                Hak Milik Mutlak
              </h3>
              <p className="mt-2 font-mono text-xs text-muted leading-relaxed">
                Game fisik adalah milikmu selamanya. Tidak ada risiko kehilangan akses akibat lisensi digital yang dicabut server.
              </p>
            </div>

            <div className="clip-chamfer border border-line bg-panel p-6 hover:border-violet-main transition">
              <span className="text-3xl">💎</span>
              <h3 className="mt-4 font-mono text-sm font-bold uppercase tracking-wider text-ink">
                Nilai Koleksi & Jual
              </h3>
              <p className="mt-2 font-mono text-xs text-muted leading-relaxed">
                Cover art, case original, dan disc koleksi yang indah dipajang serta bernilai tinggi saat ingin kamu jual kembali.
              </p>
            </div>

            <div className="clip-chamfer border border-line bg-panel p-6 hover:border-violet-main transition">
              <span className="text-3xl">🔍</span>
              <h3 className="mt-4 font-mono text-sm font-bold uppercase tracking-wider text-ink">
                Pasti Aman di Toko
              </h3>
              <p className="mt-2 font-mono text-xs text-muted leading-relaxed">
                Bebas risiko paket rusak di kurir atau penipuan online. Periksa segel kaset langsung di toko sebelum bayar.
              </p>
            </div>

            <div className="clip-chamfer border border-line bg-panel p-6 hover:border-violet-main transition">
              <span className="text-3xl">⚡</span>
              <h3 className="mt-4 font-mono text-sm font-bold uppercase tracking-wider text-ink">
                Plug & Play Praktis
              </h3>
              <p className="mt-2 font-mono text-xs text-muted leading-relaxed">
                Tinggal masukkan disc atau cartridge ke konsol. Sangat ramah kuota internet dan mudah dipinjamkan ke teman.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROTOKOL PEMESANAN (HOW IT WORKS) */}
      <section className="border-b border-line px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-violet-glow">
              // PROTOCOL // 04
            </p>
            <h2 className="mt-1 text-3xl font-bold uppercase tracking-widest text-ink sm:text-4xl">
              Alur Pemesanan Taktis
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted">
              4 langkah mudah mengamankan game fisik impianmu dengan sistem Click & Collect.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="clip-chamfer border border-line bg-panel p-6 relative">
              <span className="font-mono text-xs text-violet-glow">// TAHAP 01</span>
              <h3 className="mt-2 text-lg font-bold uppercase text-ink">Pilih Game</h3>
              <p className="mt-2 font-mono text-xs text-muted">
                Jelajahi katalog dan pilih game yang kompatibel dengan platform konsolmu.
              </p>
            </div>

            <div className="clip-chamfer border border-line bg-panel p-6 relative">
              <span className="font-mono text-xs text-violet-glow">// TAHAP 02</span>
              <h3 className="mt-2 text-lg font-bold uppercase text-ink">Kunci Stok</h3>
              <p className="mt-2 font-mono text-xs text-muted">
                Tambahkan ke keranjang dan lakukan checkout untuk mengamankan stok tanpa bayar di awal.
              </p>
            </div>

            <div className="clip-chamfer border border-line bg-panel p-6 relative">
              <span className="font-mono text-xs text-violet-glow">// TAHAP 03</span>
              <h3 className="mt-2 text-lg font-bold uppercase text-ink">Datang ke Store</h3>
              <p className="mt-2 font-mono text-xs text-muted">
                Kunjungi markas toko OMNI dan tunjukkan nomor pesanan (Order ID) ke staf kasir kami.
              </p>
            </div>

            <div className="clip-chamfer border border-line bg-panel p-6 relative">
              <span className="font-mono text-xs text-violet-glow">// TAHAP 04</span>
              <h3 className="mt-2 text-lg font-bold uppercase text-ink">Bayar & Main</h3>
              <p className="mt-2 font-mono text-xs text-muted">
                Periksa kondisi fisik barang, selesaikan pembayaran tunai/QRIS, dan bawa pulang game-mu!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STORE HQ & PICKUP POINT */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="clip-chamfer border border-line bg-linear-to-br from-panel-hi to-panel p-6 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-violet-glow">
                  // STORE HEADQUARTERS // PICKUP POINT
                </p>
                <h2 className="mt-1 text-3xl font-bold uppercase tracking-widest text-ink sm:text-4xl">
                  Markas Toko Fisik OMNI
                </h2>
                <p className="mt-3 text-muted text-sm sm:text-base leading-relaxed">
                  Semua transaksi diselesaikan langsung di toko fisik kami untuk menjamin keaslian produk dan kepuasan pelanggan secara tatap muka.
                </p>

                <div className="mt-6 space-y-3 font-mono text-xs sm:text-sm">
                  <div className="flex items-start gap-3 text-ink">
                    <span className="text-violet-glow font-bold">LOKASI:</span>
                    <span className="text-muted">Omni Gaming Store, Lantai 2 Unit 24B, Kedurus, Surabaya</span>
                  </div>
                  <div className="flex items-start gap-3 text-ink">
                    <span className="text-violet-glow font-bold">JAM BUKA:</span>
                    <span className="text-muted">Setiap Hari · 10:00 – 21:00 WIB</span>
                  </div>
                  <div className="flex items-start gap-3 text-ink">
                    <span className="text-violet-glow font-bold">METODE:</span>
                    <span className="text-muted">Tunai, QRIS, Debit, & Kartu Kredit</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-6 border border-line bg-void/50 clip-chamfer-sm text-center">
                <span className="text-4xl">🎮</span>
                <h3 className="mt-3 text-xl font-bold uppercase text-ink">Siap Bermain?</h3>
                <p className="mt-1 text-xs text-muted max-w-xs">
                  Ribuan judul game fisik original menunggu untuk mengisi koleksi rak konsolmu.
                </p>
                <Link
                  to="/products"
                  className="clip-chamfer-sm mt-5 inline-block bg-violet-main px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-white transition hover:bg-violet-deep"
                >
                  Buka Katalog Sekarang →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="border-t border-line py-8 px-4 text-center font-mono text-xs text-muted">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-violet-glow uppercase tracking-widest font-bold">
            OMNI // PHYSICAL GAME STORE
          </p>
          <p>© 2026 OMNI. Sistem Pemesanan Game Fisik Konsol.</p>
          <div className="flex gap-4 uppercase tracking-wider text-[11px]">
            <Link to="/" className="hover:text-ink transition">Beranda</Link>
            <a href="#platforms" className="hover:text-ink transition">Platform</a>
            <Link to="/products" className="hover:text-ink transition">Katalog</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}