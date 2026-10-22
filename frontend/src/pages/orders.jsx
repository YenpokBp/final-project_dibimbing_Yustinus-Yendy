import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { getErrorMessage } from "../services/api.js";
import { formatRupiah, formatDate } from "../utils/format.js";
import StatusBadge from "../components/statusBadge.jsx";

const LIMIT = 5;

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, total_pages: 1 });
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const fetchOrders = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await api.get("/orders", {
          params: { status: status || undefined, page, limit: LIMIT },
        });

        if (!ignore) {
          setOrders(res.data.data);
          setPagination(res.data.pagination);
        }
      } catch (err) {
        if (!ignore) setError(getErrorMessage(err));
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchOrders();

    return () => {
      ignore = true;
    };
  }, [status, page]);

  const pageButton =
    "border border-line px-3 py-1.5 text-ink transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="min-h-screen bg-void px-4 py-8 sm:py-10 font-display">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-widest text-ink">Pesanan</h1>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="w-full sm:w-auto clip-chamfer-sm border border-line bg-panel px-3 py-2 font-mono text-sm text-ink focus:border-primary focus:outline-none"
          >
            <option value="">Semua status</option>
            <option value="pending">Menunggu pembayaran</option>
            <option value="paid">Lunas</option>
            <option value="cancelled">Dibatalkan</option>
          </select>
        </div>

        {error && (
          <p className="mt-6 border border-danger/40 bg-danger/10 p-3 text-sm text-danger">
            {error}
          </p>
        )}

        {loading ? (
          <p className="mt-10 font-mono text-muted">Memuat pesanan...</p>
        ) : orders.length === 0 ? (
          <div className="mt-10 border border-line bg-panel p-8 sm:p-10 text-center">
            <p className="text-lg text-ink">Belum ada pesanan.</p>
            <Link
              to="/products"
              className="clip-chamfer-sm mt-5 inline-block bg-primary px-5 py-2 font-mono text-sm text-void hover:bg-primary-glow"
            >
              Lihat katalog
            </Link>
          </div>
        ) : (
          <ul className="mt-8 space-y-3">
            {orders.map((order) => (
              <li key={order.order_id}>
                <Link
                  to={`/orders/${order.order_id}`}
                  className="block border border-line bg-panel p-4 transition hover:border-primary"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-ink">Pesanan #{order.order_id}</span>
                    <StatusBadge status={order.order_status} />
                  </div>
                  <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-sm">
                    <span className="text-muted text-xs sm:text-sm">
                      {formatDate(order.created_at)} · {order.items?.length ?? 0} item
                    </span>
                    <span className="font-mono text-primary-glow font-bold">
                      {formatRupiah(order.total_amount)}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {pagination.total_pages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-4 text-sm">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
              className={pageButton}
            >
              Sebelumnya
            </button>
            <span className="text-muted">
              Halaman {pagination.page} dari {pagination.total_pages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= pagination.total_pages}
              className={pageButton}
            >
              Berikutnya
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
