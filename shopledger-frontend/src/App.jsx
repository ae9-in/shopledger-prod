import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import AdminLayout from "./layouts/AdminLayout";
import LandingPage from "./pages/public/LandingPage";
import RegisterPage from "./pages/auth/RegisterPage";
import VerifyOtpPage from "./pages/auth/VerifyOtpPage";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import PendingApprovalPage from "./pages/auth/PendingApprovalPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import CustomersPage from "./pages/app/CustomersPage";
import CustomerDetailPage from "./pages/app/CustomerDetailReal";
import SuppliersPage from "./pages/app/SuppliersPage";
import SupplierDetailPage from "./pages/app/SupplierDetailReal";
import CashbookPage from "./pages/app/CashbookPage";
import TransactionsPage from "./pages/app/TransactionsPage";
import ReportsPage from "./pages/app/ReportsPage";
import SettingsPage from "./pages/app/SettingsPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminShopsPage from "./pages/admin/AdminShopsPage";
import AdminShopDetail from "./pages/admin/AdminShopDetail";

function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-page px-4">
      <div className="card max-w-md text-center">
        <p className="text-sm text-slate-500">404</p>
        <h1 className="mt-1 text-2xl font-bold text-ink">Page not found</h1>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route element={<AuthLayout />}>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<VerifyOtpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/pending-approval" element={<PendingApprovalPage />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/customers/:id" element={<CustomerDetailPage />} />
        <Route path="/suppliers" element={<SuppliersPage />} />
        <Route path="/suppliers/:id" element={<SupplierDetailPage />} />
        <Route path="/cashbook" element={<CashbookPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="shops" element={<AdminShopsPage />} />
        <Route path="shops/:id" element={<AdminShopDetail />} />
      </Route>

      <Route path="*" element={<NotFound />} />
      <Route path="/app" element={<Navigate to="/customers" replace />} />
    </Routes>
  );
}

export default App;
