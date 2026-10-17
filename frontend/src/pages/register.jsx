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
    "w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none";

  return (
    <div className="mx-auto mt-16 max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-2xl font-bold text-gray-900">Daftar</h1>

      {error && (
        <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Nama</label>
          <input name="name" value={form.name} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} className={inputClass} minLength={6} required />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Memproses..." : "Daftar"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-500">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-indigo-600 hover:underline">
          Masuk
        </Link>
      </p>
    </div>
  );
}