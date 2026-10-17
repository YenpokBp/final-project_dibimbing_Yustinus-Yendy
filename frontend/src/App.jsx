import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import ProtectedRoute from "./components/protectedRoutes.jsx";
import Products from "./pages/products.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import AdminDashboard from "./pages/admin/adminDashboard.jsx";
import Home from "./pages/home";
import Cart from "./pages/cart.jsx";
import Orders from "./pages/orders.jsx";
import OrderDetail from "./pages/orderDetail.jsx";
export default function App() {
  return (
    <div className="min-h-screen bg-void text-ink font-display">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute roles={["customer"]} />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
        </Route>
        {/* Khusus admin */}
        <Route element={<ProtectedRoute roles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </div>
  );
}