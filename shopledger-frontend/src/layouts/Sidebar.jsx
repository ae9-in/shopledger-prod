import { NavLink, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const sectionStyle = "px-4 pt-6 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400";
const itemStyle =
  "mx-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white";

function Sidebar({ onNavigate }) {
  const navigate = useNavigate();
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;
  const shopName = user?.name || "My Shop";

  const handleLogout = async () => {
    try { await api.post("/auth/logout"); } 
    catch { /* ignore */ }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
    if (onNavigate) onNavigate();
  };

  const Item = ({ to, icon, label }) => (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        `${itemStyle} ${isActive ? "bg-[#1A6BFF]/20 text-white border-l-2 border-[#1A6BFF]" : ""}`
      }
    >
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
      {label}
    </NavLink>
  );

  return (
    <aside className="h-full w-full bg-[#0F172A] text-white">
      <div className="border-b border-white/10 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#1A6BFF] font-semibold">
            {shopName[0].toUpperCase()}
          </div>
          <div>
            <p className="font-semibold">ShopLedger</p>
            <p className="text-xs text-slate-400 capitalize">{shopName}</p>
          </div>
        </div>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400" /> Online
        </div>
      </div>

      <p className={sectionStyle}>Ledger Management</p>
      <div className="space-y-1">
        <Item to="/customers" icon="group" label="Customers" />
        <Item to="/suppliers" icon="local_shipping" label="Suppliers" />
        <Item to="/cashbook" icon="wallet" label="Cashbook" />
        <Item to="/transactions" icon="receipt_long" label="Transactions" />
      </div>

      <p className={sectionStyle}>Reports</p>
      <div className="space-y-1">
        <Item to="/reports" icon="monitoring" label="Summary Report" />
      </div>

      <p className={sectionStyle}>Account</p>
      <div className="space-y-1">
        <Item to="/settings" icon="settings" label="Settings" />
      </div>

      <p className="absolute bottom-3 left-4 text-xs text-slate-500">v1.0.0</p>
    </aside>
  );
}

export default Sidebar;
