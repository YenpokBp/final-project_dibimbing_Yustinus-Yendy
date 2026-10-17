import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import { getErrorMessage } from "../services/api";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/login", { state: { registered: true } });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full clip-chamfer-sm border border-line bg-panel-hi px-3 py-2 font-mono text-sm text-ink placeholder-muted/50 focus:border-violet-main focus:outline-none transition";

  return (
    <div className="px-4 py-16">
      <div className="clip-chamfer mx-auto max-w-md border border-line bg-panel p-8 shadow-[0_0_30px_rgba(124,58,237,0.15)]">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-violet-glow">
          // Registration
        </p>
        <h1 className="mt-1 mb-6 text-3xl font-bold uppercase tracking-widest text-ink">
          Daftar
        </h1>

        {error && (
          <p className="clip-chamfer-sm mb-4 border border-red-500/40 bg-red-950/40 p-3 font-mono text-xs text-red-300">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted">
              Nama
            </label>
            <input name="name" value={form.name} onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted">
              Email
            </label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted">
              Password
            </label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className={inputClass} minLength={6} required />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="clip-chamfer-sm mt-2 w-full bg-violet-main py-2.5 font-mono text-xs uppercase tracking-widest text-white transition hover:bg-violet-deep disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </form>

        <p className="mt-6 text-center font-mono text-xs text-muted">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-violet-glow hover:text-ink underline ml-1">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}