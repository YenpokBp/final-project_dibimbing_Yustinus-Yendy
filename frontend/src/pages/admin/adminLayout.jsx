import { NavLink, Outlet } from "react-router-dom";

const TABS = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/orders", label: "Pesanan" },
  { to: "/admin/products", label: "Produk" },
  { to: "/admin/master", label: "Kategori & Platform" },
];

export default function AdminLayout() {
  const linkClass = ({ isActive }) =>
    `clip-chamfer-sm whitespace-nowrap border px-4 py-2 font-mono text-sm transition ${
      isActive
        ? "border-violet-main bg-violet-deep/40 text-ink"
        : "border-line text-muted hover:border-violet-main hover:text-ink"
    }`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 font-display sm:py-10">
      <nav className="mb-8 flex gap-2 overflow-x-auto pb-1">
        {TABS.map((t) => (
          <NavLink key={t.to} to={t.to} end={t.end} className={linkClass}>
            {t.label}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
