import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

// roles kosong = cukup login; roles diisi = hanya role tersebut
export default function ProtectedRoute({ roles }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;

  return <Outlet />;
}
