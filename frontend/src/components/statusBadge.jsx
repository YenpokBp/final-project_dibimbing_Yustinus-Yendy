const STYLES = {
  pending: "border-warning/40 bg-warning/10 text-warning",
  paid: "border-success/40 bg-success/10 text-success",
  cancelled: "border-danger/40 bg-danger/10 text-danger",
};

const LABELS = {
  pending: "Menunggu pembayaran",
  paid: "Lunas",
  cancelled: "Dibatalkan",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-block border px-2 py-0.5 font-mono text-xs ${STYLES[status] ?? ""}`}
    >
      {LABELS[status] ?? status}
    </span>
  );
}
