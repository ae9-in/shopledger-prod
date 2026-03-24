import { NavLink, Outlet, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // ignore – clear client state regardless
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const Link = ({ to, label }) => (
    <NavLink to={to} end={to === "/admin"} className={({ isActive }) => `block rounded-lg px-3 py-2 text-sm ${isActive ? "bg-[#1A6BFF] text-white" : "text-slate-600 hover:bg-slate-100"}`}>
      {label}
    </NavLink>
  );

  return (
    <div className="min-h-screen bg-[#F4F6FA]">
      <div className="grid min-h-screen md:grid-cols-[220px_1fr]">
        <aside className="border-r border-slate-200 bg-white p-4 flex flex-col">
          <div className="mb-4 flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#1A6BFF] text-white">A</div>
            <div>
              <p className="font-semibold">ShopLedger Admin</p>
              <p className="text-xs text-slate-500">Control panel</p>
            </div>
          </div>
          <div className="space-y-1 flex-1">
            <Link to="/admin" label="Dashboard" />
            <Link to="/admin/shops" label="Shop Management" />
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 transition"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Logout
          </button>
        </aside>
        <div>
          <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6">
            <h1 className="font-semibold">Admin</h1>
            <div className="flex items-center gap-3">
              <span className="status-badge bg-amber-100 text-amber-700">Admin</span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">logout</span>
                Logout
              </button>
            </div>
          </header>
          <main className="p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;

