import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api, { getErrorMessage } from "../services/api.js";
import { formatRupiah, formatDate } from "../utils/format.js";
import StatusBadge from "../components/statusBadge.jsx";

export default function OrderDetail() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    api
      .get(`/orders/${id}`)
      .then((res) => setOrder(res.data.data))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm("Batalkan pesanan ini? Stok akan dikembalikan.")) return;

    setCancelling(true);
    setError("");
    try {
      const res = await api.patch(`/orders/${id}/cancel`);
      setOrder(res.data.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="min-h-screen bg-void px-4 py-8 sm:py-10 font-display">
      <div className="mx-auto max-w-3xl">
        <Link to="/orders" className="font-mono text-sm text-muted hover:text-violet-glow">
          ← Kembali ke pesanan
        </Link>

        {error && (
          <p className="mt-6 border border-red-500/40 bg-red-950/40 p-3 text-sm text-red-300">
            {error}
          </p>
        )}

        {loading ? (
          <p className="mt-10 font-mono text-muted">Memuat pesanan...</p>
        ) : order ? (
          <div className="clip-chamfer mt-6 border border-line bg-panel p-4 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-widest text-ink">
                  Pesanan #{order.order_id}
                </h1>
                <p className="mt-1 text-sm text-muted">{formatDate(order.created_at)}</p>
              </div>
              <StatusBadge status={order.order_status} />
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-105 text-left text-sm">
                <thead className="border-b border-line text-muted">
                  <tr>
                    <th className="py-2 font-normal">Game</th>
                    <th className="py-2 text-right font-normal">Harga</th>
                    <th className="py-2 text-right font-normal">Jml</th>
                    <th className="py-2 text-right font-normal">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.order_item_id} className="border-b border-line/60 text-ink">
                      <td className="py-2 pr-2">{item.product_name}</td>
                      <td className="py-2 text-right font-mono">{formatRupiah(item.unit_price)}</td>
                      <td className="py-2 text-right font-mono">{item.quantity}</td>
                      <td className="py-2 text-right font-mono">{formatRupiah(item.subtotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between text-lg">
              <span className="text-ink">Total</span>
              <span className="font-mono text-violet-glow">
                {formatRupiah(order.total_amount)}
              </span>
            </div>

            {order.order_status === "paid" && (
              <p className="mt-4 text-sm text-muted">
                Dibayar pada {formatDate(order.paid_at)}.
              </p>
            )}

            {order.order_status === "pending" && (
              <div className="mt-6 border-t border-line pt-4">
                <p className="text-sm text-muted">
                  Tunjukkan nomor pesanan ini di toko untuk membayar dan mengambil barang.
                </p>
                <button
                  onClick={handleCancel}
                  disabled={cancelling}
                  className="clip-chamfer-sm mt-3 border border-red-500/50 px-4 py-2 font-mono text-sm text-red-300 transition hover:bg-red-950/40 disabled:opacity-60"
                >
                  {cancelling ? "Membatalkan..." : "Batalkan pesanan"}
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}