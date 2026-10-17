import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

const linkClass = ({ isActive }) =>
  `font-mono text-sm uppercase tracking-widest transition ${
    isActive ? "text-violet-glow" : "text-muted hover:text-ink"
  }`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="border-b border-line bg-void font-display">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          to="/"
          className="text-2xl font-bold uppercase tracking-[0.35em] text-violet-glow"
        >
          Omni
        </Link>

        <div className="flex items-center gap-5">
          <NavLink to="/" end className={linkClass}>
            Platform
          </NavLink>
          <NavLink to="/products" className={linkClass}>
            Semua Game
          </NavLink>
          {user?.role === "admin" && (
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          )}

          {user ? (
            <>
              <span className="hidden font-mono text-xs text-muted sm:inline">
                // {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="clip-chamfer-sm border border-line px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-ink hover:border-violet-main hover:text-violet-glow"
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
                className="clip-chamfer-sm bg-violet-main px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-white hover:bg-violet-deep"
              >
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}