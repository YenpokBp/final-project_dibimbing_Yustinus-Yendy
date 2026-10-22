import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

const linkClass = ({ isActive }) =>
  `font-mono text-sm uppercase tracking-widest transition ${
    isActive ? "text-primary-glow" : "text-muted hover:text-ink"
  }`;

const mobileLinkClass = ({ isActive }) =>
  `block w-full py-2.5 px-3 font-mono text-sm uppercase tracking-widest transition ${
    isActive
      ? "border-l-2 border-primary bg-primary-deep/30 text-primary-glow"
      : "text-muted hover:bg-panel-hi hover:text-ink"
  }`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const handlePlatformClick = (e) => {
    setMobileMenuOpen(false);
    if (location.pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("platforms");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-void/95 backdrop-blur font-display">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl font-bold uppercase tracking-[0.35em] text-primary-glow transition hover:opacity-90"
        >
          Omni
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-5">
          <NavLink to="/" end className={linkClass}>
            Beranda
          </NavLink>
          <a
            href="/#platforms"
            onClick={handlePlatformClick}
            className="cursor-pointer font-mono text-sm uppercase tracking-widest text-muted transition hover:text-ink"
          >
            Platform
          </a>
          <NavLink to="/products" className={linkClass}>
            Semua Game
          </NavLink>
          {user?.role === "customer" && (
            <>
              <NavLink to="/cart" className={linkClass}>
                Keranjang
              </NavLink>
              <NavLink to="/orders" className={linkClass}>
                Pesanan
              </NavLink>
            </>
          )}
          {user?.role === "admin" && (
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          )}

          {user ? (
            <>
              <span className="font-mono text-xs text-muted">
                // {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="clip-chamfer-sm border border-line px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-ink transition hover:border-primary hover:text-primary-glow"
              >
                Keluar
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Masuk
              </NavLink>
              <Link
                to="/register"
                className="clip-chamfer-sm bg-primary px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-void transition hover:bg-primary-glow"
              >
                Daftar
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-3 md:hidden">
          {user && (
            <span className="max-w-30 truncate font-mono text-xs text-muted">
              // {user.name}
            </span>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="clip-chamfer-sm border border-line p-2 text-ink hover:border-primary hover:text-primary-glow focus:outline-none"
            aria-label="Menu navigasi"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-line bg-panel px-4 py-3 md:hidden space-y-1">
          <NavLink to="/" end onClick={closeMenu} className={mobileLinkClass}>
            Beranda
          </NavLink>
          <a
            href="/#platforms"
            onClick={handlePlatformClick}
            className="block w-full py-2.5 px-3 font-mono text-sm uppercase tracking-widest text-muted hover:bg-panel-hi hover:text-ink transition"
          >
            Platform
          </a>
          <NavLink to="/products" onClick={closeMenu} className={mobileLinkClass}>
            Semua Game
          </NavLink>
          {user?.role === "customer" && (
            <>
              <NavLink to="/cart" onClick={closeMenu} className={mobileLinkClass}>
                Keranjang
              </NavLink>
              <NavLink to="/orders" onClick={closeMenu} className={mobileLinkClass}>
                Pesanan
              </NavLink>
            </>
          )}
          {user?.role === "admin" && (
            <NavLink to="/admin" onClick={closeMenu} className={mobileLinkClass}>
              Admin
            </NavLink>
          )}

          <div className="mt-3 border-t border-line/70 pt-3">
            {user ? (
              <button
                onClick={handleLogout}
                className="clip-chamfer-sm w-full border border-line py-2 text-center font-mono text-xs uppercase tracking-widest text-ink transition hover:border-primary hover:text-primary-glow"
              >
                Keluar ({user.name})
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-1">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="clip-chamfer-sm border border-line py-2 text-center font-mono text-xs uppercase tracking-widest text-ink transition hover:border-primary hover:text-primary-glow"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="clip-chamfer-sm bg-primary py-2 text-center font-mono text-xs uppercase tracking-widest text-void transition hover:bg-primary-glow"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
