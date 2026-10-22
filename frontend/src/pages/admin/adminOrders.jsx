import { useEffect, useState } from "react";
import api, { getErrorMessage } from "../../services/api.js";
import { formatRupiah, formatDate } from "../../utils/format.js";
import StatusBadge from "../../components/statusBadge.jsx";
import {
  PageHeader,
  Notice,
  Modal,
  Pagination,
  EmptyRow,
  btnGhost,
  btnPrimary,
  btnDanger,
  inputClass,
  tableWrap,
  th,
  td,
} from "../../components/admin/adminUi.jsx";

const LIMIT = 10;

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [status, setStatus] = useState("");
  const [period, setPeriod] = useState("");
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState(null);
  const [selected, setSelected] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get("/admin/orders", {
          params: {
            status: status || undefined,
            period: period || undefined,
            page,
            limit: LIMIT,
          },
        });
        if (ignore) return;
        setOrders(res.data.data);
        setPagination(res.data.pagination);
      } catch (err) {
        if (!ignore) setNotice({ type: "error", text: getErrorMessage(err) });
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, [status, period, page, reload]);

  const act = async (order, action) => {
    const label = action === "pay" ? "mengonfirmasi pembayaran" : "membatalkan";
    if (!window.confirm(`Yakin ${label} pesanan #${order.order_id}?`)) return;

    setBusy(true);
    try {
      const res = await api.patch(`/admin/orders/${order.order_id}/${action}`);
      setNotice({ type: "success", text: res.data.message });
      setSelected(null);
      setReload((n) => n + 1);
    } catch (err) {
      setNotice({ type: "error", text: getErrorMessage(err) });
    } finally {
      setBusy(false);
    }
  };

  const openDetail = async (id) => {
    try {
      const res = await api.get(`/admin/orders/${id}`);
      setSelected(res.data.data);
    } catch (err) {
      setNotice({ type: "error", text: getErrorMessage(err) });
    }
  };

  const renderActions = (order) =>
    order.order_status === "pending" ? (
      <>
        <button className={btnPrimary} disabled={busy} onClick={() => act(order, "pay")}>
          Konfirmasi bayar
        </button>
        <button className={btnDanger} disabled={busy} onClick={() => act(order, "cancel")}>
          Batalkan
        </button>
      </>
    ) : null;

  return (
    <div>
      <PageHeader eyebrow="Admin" title="Pesanan">
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className={`${inputClass} w-auto`}
        >
          <option value="">Semua status</option>
          <option value="pending">Menunggu pembayaran</option>
          <option value="paid">Lunas</option>
          <option value="cancelled">Dibatalkan</option>
        </select>
        <select
          value={period}
          onChange={(e) => {
            setPeriod(e.target.value);
            setPage(1);
          }}
          className={`${inputClass} w-auto`}
        >
          <option value="">Semua waktu</option>
          <option value="today">Hari ini</option>
          <option value="week">Minggu ini</option>
          <option value="month">Bulan ini</option>
        </select>
      </PageHeader>

      <Notice notice={notice} onClose={() => setNotice(null)} />

      <div className={tableWrap}>
        <table className="w-full">
          <thead className="border-b border-line">
            <tr>
              <th className={th}>ID</th>
              <th className={th}>Pelanggan</th>
              <th className={th}>Tanggal</th>
              <th className={th}>Item</th>
              <th className={th}>Total</th>
              <th className={th}>Status</th>
              <th className={th}></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {orders.length === 0 ? (
              <EmptyRow colSpan={7} loading={loading} text="Tidak ada pesanan." />
            ) : (
              orders.map((o) => (
                <tr key={o.order_id} className="hover:bg-panel-hi/50">
                  <td className={`${td} font-mono`}>#{o.order_id}</td>
                  <td className={td}>
                    {o.user?.name}
                    <span className="block font-mono text-xs text-muted">{o.user?.email}</span>
                  </td>
                  <td className={`${td} whitespace-nowrap text-muted`}>{formatDate(o.created_at)}</td>
                  <td className={`${td} font-mono`}>{o.items?.length ?? 0}</td>
                  <td className={`${td} whitespace-nowrap font-mono text-primary-glow`}>
                    {formatRupiah(o.total_amount)}
                  </td>
                  <td className={td}>
                    <StatusBadge status={o.order_status} />
                  </td>
                  <td className={`${td} text-right`}>
                    <button className={btnGhost} onClick={() => openDetail(o.order_id)}>
                      Detail
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination pagination={pagination} page={page} setPage={setPage} />

      {selected && (
        <Modal title={`Pesanan #${selected.order_id}`} onClose={() => setSelected(null)} wide>
          <div className="flex items-center justify-between gap-3">
            <StatusBadge status={selected.order_status} />
            <span className="font-mono text-xs text-muted">{formatDate(selected.created_at)}</span>
          </div>
          <p className="mt-3 text-sm text-ink">
            {selected.user?.name}
            <span className="ml-2 font-mono text-xs text-muted">{selected.user?.email}</span>
          </p>
          {selected.paid_at && (
            <p className="mt-1 font-mono text-xs text-success">
              Dibayar: {formatDate(selected.paid_at)}
            </p>
          )}

          <div className="mt-4 overflow-x-auto border border-line">
            <table className="w-full">
              <thead className="border-b border-line">
                <tr>
                  <th className={th}>Produk</th>
                  <th className={`${th} text-right`}>Harga</th>
                  <th className={`${th} text-right`}>Qty</th>
                  <th className={`${th} text-right`}>Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {selected.items?.map((it) => (
                  <tr key={it.order_item_id}>
                    <td className={td}>{it.product_name}</td>
                    <td className={`${td} text-right font-mono`}>{formatRupiah(it.unit_price)}</td>
                    <td className={`${td} text-right font-mono`}>{it.quantity}</td>
                    <td className={`${td} text-right font-mono`}>{formatRupiah(it.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-lg font-bold text-primary-glow">
              Total {formatRupiah(selected.total_amount)}
            </p>
            <div className="flex gap-2">
              {renderActions(selected)}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
