import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api, { getErrorMessage } from "../services/api.js";
import { useAuth } from "../context/authContext.jsx";
import ProductCard from "../components/productCard.jsx";

const LIMIT = 8;

export default function Products() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, total_pages: 1, total_items: 0 });
  const [categories, setCategories] = useState([]);
  const [platforms, setPlatforms] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);

  const platformId = searchParams.get("platform_id") || "";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(null); // { type, text }
  const [addingId, setAddingId] = useState(null);

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data.data));
    api.get("/platforms").then((res) => setPlatforms(res.data.data));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    let ignore = false;

    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await api.get("/products", {
          params: {
            search: search || undefined,
            category_id: categoryId || undefined,
            platform_id: platformId || undefined,
            page,
            limit: LIMIT,
          },
        });

        if (!ignore) {
          setProducts(res.data.data);
          setPagination(res.data.pagination);
        }
      } catch (err) {
        if (!ignore) {
          setError(getErrorMessage(err));
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      ignore = true;
    };
  }, [search, categoryId, platformId, page]);

  const handleAdd = async (productId) => {
    if (!user) return navigate("/login");

    setAddingId(productId);
    setNotice(null);

    try {
      await api.post("/cart/items", { product_id: productId, quantity: 1 });
      setNotice({ type: "success", text: "Produk ditambahkan ke keranjang." });
    } catch (err) {
      setNotice({ type: "error", text: getErrorMessage(err) });
    } finally {
      setAddingId(null);
    }
  };

  const resetFilters = () => {
    setSearchInput("");
    setSearch("");
    setCategoryId("");
    setPage(1);
    setSearchParams({});
  };

  const selectClass =
    "w-full sm:w-auto clip-chamfer-sm border border-line bg-panel px-3 py-2 font-mono text-sm text-ink focus:border-primary focus:outline-none";

  const canBuy = user?.role !== "admin";

  return (
    <div className="min-h-screen bg-void px-4 py-8 sm:py-10 font-display">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-primary-glow">
          // Catalog
        </p>
        <h1 className="mt-1 sm:mt-2 text-3xl sm:text-4xl font-bold uppercase tracking-widest text-ink">
          Katalog Game
        </h1>
        <p className="mt-2 mb-6 text-sm sm:text-base text-muted">
          Jelajahi koleksi game fisik untuk konsol pilihanmu.
        </p>

        <div className="mb-6 flex flex-col sm:flex-row flex-wrap gap-3">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Cari nama game..."
            className="w-full sm:min-w-52 sm:flex-1 clip-chamfer-sm border border-line bg-panel px-3 py-2 font-mono text-sm text-ink placeholder:text-muted focus:border-primary focus:outline-none"
          />
          <select
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
              setPage(1);
            }}
            className={selectClass}
          >
            <option value="" className="bg-panel text-ink">Semua kategori</option>
            {categories.map((c) => (
              <option key={c.category_id} value={c.category_id} className="bg-panel text-ink">
                {c.category_name}
              </option>
            ))}
          </select>
          <select
            value={platformId}
            onChange={(e) => {
              const nextPlatformId = e.target.value;
              setSearchParams((prev) => {
                const params = new URLSearchParams(prev);
                if (nextPlatformId) {
                  params.set("platform_id", nextPlatformId);
                } else {
                  params.delete("platform_id");
                }
                return params;
              });
              setPage(1);
            }}
            className={selectClass}
          >
            <option value="" className="bg-panel text-ink">Semua platform</option>
            {platforms.map((p) => (
              <option key={p.platform_id} value={p.platform_id} className="bg-panel text-ink">
                {p.platform_name}
              </option>
            ))}
          </select>
          <button
            onClick={resetFilters}
            className="w-full sm:w-auto clip-chamfer-sm border border-line bg-panel-hi px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted hover:border-primary hover:text-ink transition text-center"
          >
            Reset
          </button>
        </div>

        {notice && (
          <p
            className={`mb-6 clip-chamfer-sm border p-3 font-mono text-sm ${
              notice.type === "success"
                ? "border-success/40 bg-success/10 text-success"
                : "border-danger/40 bg-danger/10 text-danger"
            }`}
          >
            {notice.text}
          </p>
        )}
        {error && (
          <p className="mb-6 clip-chamfer-sm border border-danger/40 bg-danger/10 p-3 font-mono text-sm text-danger">
            {error}
          </p>
        )}

        {loading ? (
          <p className="py-16 text-center font-mono text-muted">Memuat produk...</p>
        ) : products.length === 0 ? (
          <p className="py-16 text-center font-mono text-muted">Produk tidak ditemukan.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
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

        {pagination.total_pages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-4 text-sm">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
              className="clip-chamfer-sm border border-line bg-panel px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink transition hover:border-primary hover:text-primary-glow disabled:cursor-not-allowed disabled:opacity-30"
            >
              Sebelumnya
            </button>
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              Halaman {pagination.page} dari {pagination.total_pages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= pagination.total_pages}
              className="clip-chamfer-sm border border-line bg-panel px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink transition hover:border-primary hover:text-primary-glow disabled:cursor-not-allowed disabled:opacity-30"
            >
              Berikutnya
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
