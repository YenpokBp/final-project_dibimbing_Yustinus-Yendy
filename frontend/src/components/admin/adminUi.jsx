/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";

export const inputClass =
  "w-full clip-chamfer-sm border border-line bg-panel-hi px-3 py-2 font-mono text-sm text-ink placeholder:text-muted focus:border-primary focus:outline-none";

export const btnPrimary =
  "clip-chamfer-sm bg-primary px-4 py-2 font-mono text-sm text-void transition hover:bg-primary-glow disabled:cursor-not-allowed disabled:opacity-50";

export const btnGhost =
  "clip-chamfer-sm border border-line px-3 py-1.5 font-mono text-xs text-ink transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-40";

export const btnDanger =
  "clip-chamfer-sm border border-danger/40 px-3 py-1.5 font-mono text-xs text-danger transition hover:bg-danger/20 disabled:cursor-not-allowed disabled:opacity-40";

export function PageHeader({ eyebrow, title, children }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary-glow">
          // {eyebrow}
        </p>
        <h1 className="mt-1 text-3xl font-bold uppercase tracking-widest text-ink sm:text-4xl">
          {title}
        </h1>
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
}

export function Notice({ notice, onClose }) {
  if (!notice) return null;
  const style =
    notice.type === "error"
      ? "border-danger/40 bg-danger/10 text-danger"
      : "border-success/40 bg-success/10 text-success";
  return (
    <div
      className={`mt-4 flex items-start justify-between gap-3 border p-3 text-sm ${style}`}
    >
      <span>{notice.text}</span>
      {onClose && (
        <button onClick={onClose} className="font-mono text-xs opacity-70 hover:opacity-100">
          ✕
        </button>
      )}
    </div>
  );
}

export function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-xs uppercase tracking-wider text-muted">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-danger">{error}</span>}
    </label>
  );
}

export function Modal({ title, onClose, children, wide = false }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`clip-chamfer max-h-[90vh] w-full overflow-y-auto border border-primary/50 bg-panel p-5 sm:p-6 ${wide ? "max-w-2xl" : "max-w-md"}`}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold uppercase tracking-widest text-ink">{title}</h2>
          <button onClick={onClose} className="font-mono text-muted hover:text-ink">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Pagination({ pagination, page, setPage }) {
  if (!pagination || pagination.total_pages <= 1) return null;
  return (
    <div className="mt-5 flex items-center justify-center gap-4 text-sm">
      <button className={btnGhost} disabled={page <= 1} onClick={() => setPage(page - 1)}>
        Sebelumnya
      </button>
      <span className="text-muted">
        Halaman {pagination.page} dari {pagination.total_pages}
      </span>
      <button
        className={btnGhost}
        disabled={page >= pagination.total_pages}
        onClick={() => setPage(page + 1)}
      >
        Berikutnya
      </button>
    </div>
  );
}

export function EmptyRow({ colSpan, loading, text = "Tidak ada data." }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-8 text-center font-mono text-sm text-muted">
        {loading ? "Memuat data..." : text}
      </td>
    </tr>
  );
}

export const tableWrap = "mt-5 overflow-x-auto border border-line bg-panel";
export const th =
  "whitespace-nowrap px-4 py-3 text-left font-mono text-xs uppercase tracking-wider text-muted";
export const td = "px-4 py-3 text-sm text-ink";

// Unduh CSV (BOM agar Excel membaca UTF-8 dengan benar)
export function downloadCsv(filename, rows) {
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = rows.map((r) => r.map(esc).join(",")).join("\r\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
