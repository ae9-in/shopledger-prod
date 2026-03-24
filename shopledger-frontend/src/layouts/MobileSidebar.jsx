import { NavLink } from "react-router-dom";

const tabs = [
  { to: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { to: "/customers", label: "Customers", icon: "group" },
  { to: "/cashbook", label: "Cashbook", icon: "wallet" },
  { to: "/suppliers", label: "Suppliers", icon: "local_shipping" },
  { to: "/reports", label: "More", icon: "menu" }
];

function MobileSidebar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 grid h-16 grid-cols-5 border-t border-slate-200 bg-white md:hidden">
      {tabs.map((tab) => (
        <NavLink key={tab.to} to={tab.to} className={({ isActive }) => `grid place-items-center text-[11px] ${isActive ? "text-[#1A6BFF]" : "text-slate-500"}`}>
          <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default MobileSidebar;
