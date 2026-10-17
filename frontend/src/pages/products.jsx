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
    "rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none";

  const canBuy = user?.role !== "admin";

  return (
    <div className="mx-auto max-w-6xl p-4">
      <h1 className="mb-4 text-2xl font-bold text-gray-900">Katalog Game</h1>

      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Cari nama game..."
          className="min-w-52 flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
        <select
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
            setPage(1);
          }}
          className={selectClass}
        >
          <option value="">Semua kategori</option>
          {categories.map((c) => (
            <option key={c.category_id} value={c.category_id}>{c.category_name}</option>
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
          <option value="">Semua platform</option>
          {platforms.map((p) => (
            <option key={p.platform_id} value={p.platform_id}>{p.platform_name}</option>
          ))}
        </select>
        <button
          onClick={resetFilters}
          className="rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200"
        >
          Reset
        </button>
      </div>

      {notice && (
        <p
          className={`mb-4 rounded-md p-3 text-sm ${
            notice.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {notice.text}
        </p>
      )}
      {error && <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {loading ? (
        <p className="py-12 text-center text-gray-500">Memuat produk...</p>
      ) : products.length === 0 ? (
        <p className="py-12 text-center text-gray-500">Produk tidak ditemukan.</p>
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
        <div className="mt-6 flex items-center justify-center gap-4 text-sm">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page <= 1}
            className="rounded-md bg-white px-3 py-1.5 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 disabled:opacity-40"
          >
            Sebelumnya
          </button>
          <span className="text-gray-600">
            Halaman {pagination.page} dari {pagination.total_pages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= pagination.total_pages}
            className="rounded-md bg-white px-3 py-1.5 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 disabled:opacity-40"
          >
            Berikutnya
          </button>
        </div>
      )}
    </div>
  );
}