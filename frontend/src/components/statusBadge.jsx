const STYLES = {
  pending: "border-yellow-500/40 bg-yellow-950/40 text-yellow-300",
  paid: "border-green-500/40 bg-green-950/40 text-green-300",
  cancelled: "border-red-500/40 bg-red-950/40 text-red-300",
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