import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Client pages
import HomePage from '../pages/client/HomePage';
import ShopPage from '../pages/client/ShopPage';
import ProductPage from '../pages/client/ProductPage';
import CartPage from '../pages/client/CartPage';
import CheckoutPage from '../pages/client/CheckoutPage';
import OrderConfirmationPage from '../pages/client/OrderConfirmationPage';
import AboutUsPage from '../pages/client/AboutUsPage';
import ContactPage from '../pages/client/ContactPage';

// Admin pages
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import DashboardPage from '../pages/admin/DashboardPage';
import ProductsPage from '../pages/admin/ProductsPage';
import AddProductPage from '../pages/admin/AddProductPage';
import EditProductPage from '../pages/admin/EditProductPage';
import OrdersPage from '../pages/admin/OrdersPage';
import SalesPage from '../pages/admin/SalesPage';
import PaymentsPage from '../pages/admin/PaymentsPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Client routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin public */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Admin protected */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/add" element={<AddProductPage />} />
          <Route path="products/edit/:id" element={<EditProductPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="sales" element={<SalesPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
