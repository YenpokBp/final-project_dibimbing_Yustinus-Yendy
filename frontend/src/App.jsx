import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import ProtectedRoute from "./components/protectedRoutes.jsx";
import Products from "./pages/products.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import AdminDashboard from "./pages/admin/adminDashboard.jsx";
import Home from "./pages/home";
export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        {/* Khusus admin */}
        <Route element={<ProtectedRoute roles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </div>
  );
}