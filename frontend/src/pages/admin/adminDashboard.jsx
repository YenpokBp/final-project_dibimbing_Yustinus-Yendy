import { useEffect, useState } from "react";
import api, { getErrorMessage } from "../../services/api.js";
import { formatRupiah } from "../../utils/format.js";
import {
  PageHeader,
  Notice,
  EmptyRow,
  btnPrimary,
  inputClass,
  tableWrap,
  th,
  td,
  downloadCsv,
} from "../../components/admin/adminUi.jsx";

const PERIODS = [
  { value: "", label: "Semua waktu" },
  { value: "today", label: "Hari ini" },
  { value: "week", label: "Minggu ini" },
  { value: "month", label: "Bulan ini" },
];

function StatCard({ label, value, accent }) {
  return (
    <div className="clip-chamfer-sm border border-line bg-panel p-4">
      <p className="font-mono text-xs uppercase tracking-wider text-muted">{label}</p>
      <p className={`mt-2 break-words font-mono text-2xl font-bold ${accent ?? "text-ink"}`}>
        {value}
      </p>
    </div>
  );
}

export default function AdminDashboard() {
  const [period, setPeriod] = useState("");
  const [threshold, setThreshold] = useState(10);
  const [summary, setSummary] = useState(null);
  const [bestSellers, setBestSellers] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const p = period || undefined;
        const [s, b, l] = await Promise.all([
          api.get("/admin/reports/sales-summary", { params: { period: p } }),
          api.get("/admin/reports/best-sellers", { params: { period: p, limit: 5 } }),
          api.get("/admin/reports/low-stock", {
            params: { threshold: threshold === "" ? undefined : threshold },
          }),
        ]);
        if (ignore) return;
        setSummary(s.data.data);
        setBestSellers(b.data.data);
        setLowStock(l.data.data);
      } catch (err) {
        if (!ignore) setError(getErrorMessage(err));
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();
    return () => {
      ignore = true;
    };
  }, [period, threshold]);

  const maxSold = Math.max(1, ...bestSellers.map((b) => b.total_sold));
  const periodLabel = PERIODS.find((p) => p.value === period)?.label;

  const handleDownload = () => {
    if (!summary) return;
    const rows = [
      ["LAPORAN OMNI"],
      ["Periode", periodLabel],
      [],
      ["RINGKASAN"],
      ["Total pendapatan (lunas)", summary.total_revenue],
      ["Total pesanan", summary.orders.total],
      ["Pending", summary.orders.pending],
      ["Lunas", summary.orders.paid],
      ["Dibatalkan", summary.orders.cancelled],
      [],
      ["PRODUK TERLARIS"],
      ["Produk", "Terjual", "Pendapatan"],
      ...bestSellers.map((b) => [b.product_name, b.total_sold, b.total_revenue]),
      [],
      [`STOK RENDAH (<= ${threshold})`],
      ["Produk", "Platform", "Kategori", "Stok"],
      ...lowStock.map((p) => [
        p.product_name,
        p.platform?.platform_name,
        p.category?.category_name,
        p.stock,
      ]),
    ];
    downloadCsv(`laporan-omni-${period || "semua"}.csv`, rows);
  };

  return (
    <div>
      <PageHeader eyebrow="Admin" title="Dashboard">
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className={`${inputClass} w-auto`}
        >
          {PERIODS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        <button onClick={handleDownload} disabled={!summary} className={btnPrimary}>
          Unduh laporan (CSV)
        </button>
      </PageHeader>

      <Notice notice={error && { type: "error", text: error }} />

      <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard
          label="Pendapatan"
          value={summary ? formatRupiah(summary.total_revenue) : "-"}
          accent="text-violet-glow"
        />
        <StatCard label="Total pesanan" value={summary?.orders.total ?? "-"} />
        <StatCard label="Pending" value={summary?.orders.pending ?? "-"} accent="text-yellow-300" />
        <StatCard label="Lunas" value={summary?.orders.paid ?? "-"} accent="text-green-300" />
        <StatCard label="Dibatalkan" value={summary?.orders.cancelled ?? "-"} accent="text-red-300" />
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section>
          <h2 className="text-xl font-bold uppercase tracking-widest text-ink">
            Produk terlaris
          </h2>
          <div className="mt-3 border border-line bg-panel p-4">
            {loading ? (
              <p className="font-mono text-sm text-muted">Memuat data...</p>
            ) : bestSellers.length === 0 ? (
              <p className="font-mono text-sm text-muted">
                Belum ada penjualan lunas pada periode ini.
              </p>
            ) : (
              <ul className="space-y-4">
                {bestSellers.map((b, i) => (
                  <li key={b.product_id}>
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                      <span className="truncate text-ink">
                        <span className="mr-2 font-mono text-violet-glow">#{i + 1}</span>
                        {b.product_name}
                      </span>
                      <span className="shrink-0 font-mono text-muted">{b.total_sold} terjual</span>
                    </div>
                    <div className="mt-1.5 h-2 bg-panel-hi">
                      <div
                        className="h-full bg-violet-main"
                        style={{ width: `${(b.total_sold / maxSold) * 100}%` }}
                      />
                    </div>
                    <p className="mt-1 font-mono text-xs text-muted">
                      {formatRupiah(b.total_revenue)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold uppercase tracking-widest text-ink">Stok rendah</h2>
            <label className="flex items-center gap-2 font-mono text-xs text-muted">
              Batas ≤
              <input
                type="number"
                min="0"
                value={threshold}
                onChange={(e) => {
                  const v = e.target.value;
                  setThreshold(v === "" ? "" : Math.max(0, Number(v)));
                }}
                className={`${inputClass} w-20`}
              />
            </label>
          </div>
          <div className={tableWrap}>
            <table className="w-full">
              <thead className="border-b border-line">
                <tr>
                  <th className={th}>Produk</th>
                  <th className={th}>Platform</th>
                  <th className={`${th} text-right`}>Stok</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {lowStock.length === 0 ? (
                  <EmptyRow colSpan={3} loading={loading} text="Semua stok aman." />
                ) : (
                  lowStock.map((p) => (
                    <tr key={p.product_id}>
                      <td className={td}>{p.product_name}</td>
                      <td className={`${td} text-muted`}>{p.platform?.platform_name}</td>
                      <td
                        className={`${td} text-right font-mono font-bold ${
                          p.stock === 0 ? "text-red-300" : "text-yellow-300"
                        }`}
                      >
                        {p.stock}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
