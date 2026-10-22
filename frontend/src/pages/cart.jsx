import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { getErrorMessage } from "../services/api.js";
import { formatRupiah } from "../utils/format.js";

function CartThumb({ item }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center overflow-hidden border border-line bg-panel-hi">
      {item.image_url && !imgError ? (
        <img
          src={`/images/${item.image_url}`}
          alt={item.product_name}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-xl sm:text-2xl">🎮</span>
      )}
    </div>
  );
}

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null); // item yang sedang diubah/dihapus
  const [checkingOut, setCheckingOut] = useState(false);

  // Ambil keranjang saat halaman dibuka
  useEffect(() => {
    api
      .get("/cart")
      .then((res) => setCart(res.data.data))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  // Ubah kuantitas: backend mengembalikan keranjang terbaru
  const handleQuantity = async (item, quantity) => {
    if (quantity < 1) return;

    setBusyId(item.cart_item_id);
    setError("");
    try {
      const res = await api.put(`/cart/items/${item.cart_item_id}`, { quantity });
      setCart(res.data.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (item) => {
    setBusyId(item.cart_item_id);
    setError("");
    try {
      const res = await api.delete(`/cart/items/${item.cart_item_id}`);
      setCart(res.data.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setBusyId(null);
    }
  };

  const handleCheckout = async () => {
    setCheckingOut(true);
    setError("");
    try {
      const res = await api.post("/orders/checkout");
      navigate(`/orders/${res.data.data.order_id}`);
    } catch (err) {
      setError(getErrorMessage(err));
      setCheckingOut(false);
    }
  };

  const items = cart?.items ?? [];

  const qtyButton =
    "h-8 w-8 border border-line text-ink transition hover:border-primary hover:text-primary-glow disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="min-h-screen bg-void px-4 py-8 sm:py-10 font-display">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-widest text-ink">Keranjang</h1>

        {error && (
          <p className="mt-6 border border-danger/40 bg-danger/10 p-3 text-sm text-danger">
            {error}
          </p>
        )}

        {loading ? (
          <p className="mt-10 font-mono text-muted">Memuat keranjang...</p>
        ) : items.length === 0 ? (
          <div className="mt-10 border border-line bg-panel p-8 sm:p-10 text-center">
            <p className="text-lg text-ink">Keranjang masih kosong.</p>
            <p className="mt-1 text-sm text-muted">
              Pilih game dari katalog, lalu tambahkan ke keranjang.
            </p>
            <Link
              to="/products"
              className="clip-chamfer-sm mt-5 inline-block bg-primary px-5 py-2 font-mono text-sm text-void hover:bg-primary-glow"
            >
              Lihat katalog
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_280px]">
            <ul className="space-y-3">
              {items.map((item) => {
                const busy = busyId === item.cart_item_id;

                return (
                  <li
                    key={item.cart_item_id}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 border border-line bg-panel p-4"
                  >
                    <div className="flex items-center gap-3 sm:block">
                      <CartThumb item={item} />
                      <div className="sm:hidden flex-1">
                        <h2 className="font-semibold text-ink leading-tight">{item.product_name}</h2>
                        <p className="font-mono text-xs text-primary-glow mt-0.5">
                          {formatRupiah(item.subtotal)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div className="hidden sm:flex items-start justify-between gap-3">
                        <div>
                          <h2 className="font-semibold text-ink">{item.product_name}</h2>
                          <p className="text-sm text-muted">
                            {formatRupiah(item.price)} · Stok {item.stock}
                          </p>
                        </div>
                        <p className="font-mono text-primary-glow">
                          {formatRupiah(item.subtotal)}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantity(item, item.quantity - 1)}
                            disabled={busy || item.quantity <= 1}
                            aria-label="Kurangi jumlah"
                            className={qtyButton}
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-mono text-ink">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantity(item, item.quantity + 1)}
                            disabled={busy || item.quantity >= item.stock}
                            aria-label="Tambah jumlah"
                            className={qtyButton}
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => handleDelete(item)}
                          disabled={busy}
                          className="text-sm text-muted transition hover:text-danger disabled:opacity-40"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <aside className="clip-chamfer h-fit border border-line bg-panel p-5">
              <h2 className="text-lg font-semibold text-ink">Ringkasan</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">Jumlah barang</dt>
                  <dd className="font-mono text-ink">{cart.total_items}</dd>
                </div>
                <div className="flex justify-between border-t border-line pt-3 text-base">
                  <dt className="text-ink">Total</dt>
                  <dd className="font-mono text-primary-glow">
                    {formatRupiah(cart.total_amount)}
                  </dd>
                </div>
              </dl>

              <button
                onClick={handleCheckout}
                disabled={checkingOut || busyId !== null}
                className="clip-chamfer-sm mt-5 w-full bg-primary py-2.5 font-mono text-sm text-void transition hover:bg-primary-glow disabled:cursor-not-allowed disabled:opacity-60"
              >
                {checkingOut ? "Memproses..." : "Checkout"}
              </button>
              <p className="mt-3 text-xs text-muted">
                Pembayaran dilakukan langsung di toko saat pengambilan barang.
              </p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
