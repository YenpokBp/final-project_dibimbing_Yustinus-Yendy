import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import { getErrorMessage } from "../services/api";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(email, password);
      navigate(user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-10 sm:py-16">
      <div className="clip-chamfer mx-auto max-w-md border border-line bg-panel p-6 sm:p-8 shadow-[0_0_30px_rgba(124,58,237,0.15)]">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-violet-glow">
          // Authentication
        </p>
        <h1 className="mt-1 mb-6 text-3xl font-bold uppercase tracking-widest text-ink">
          Masuk
        </h1>

        {location.state?.registered && (
          <p className="clip-chamfer-sm mb-4 border border-emerald-500/40 bg-emerald-950/40 p-3 font-mono text-xs text-emerald-300">
            Registrasi berhasil. Silakan masuk.
          </p>
        )}
        {error && (
          <p className="clip-chamfer-sm mb-4 border border-red-500/40 bg-red-950/40 p-3 font-mono text-xs text-red-300">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full clip-chamfer-sm border border-line bg-panel-hi px-3 py-2 font-mono text-sm text-ink placeholder-muted/50 focus:border-violet-main focus:outline-none transition"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full clip-chamfer-sm border border-line bg-panel-hi px-3 py-2 font-mono text-sm text-ink placeholder-muted/50 focus:border-violet-main focus:outline-none transition"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="clip-chamfer-sm mt-2 w-full bg-violet-main py-2.5 font-mono text-xs uppercase tracking-widest text-white transition hover:bg-violet-deep disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="mt-6 text-center font-mono text-xs text-muted">
          Belum punya akun?{" "}
          <Link to="/register" className="text-violet-glow hover:text-ink underline ml-1">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}