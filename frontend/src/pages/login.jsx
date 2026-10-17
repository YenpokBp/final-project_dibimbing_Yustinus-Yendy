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
    <div className="mx-auto mt-16 max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-2xl font-bold text-gray-900">Masuk</h1>

      {location.state?.registered && (
        <p className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-700">
          Registrasi berhasil. Silakan masuk.
        </p>
      )}
      {error && (
        <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Memproses..." : "Masuk"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-500">
        Belum punya akun?{" "}
        <Link to="/register" className="text-indigo-600 hover:underline">
          Daftar
        </Link>
      </p>
    </div>
  );
}