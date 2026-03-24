import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileSidebar from "./MobileSidebar";

const titleMap = {
  "/customers": "Customers",
  "/suppliers": "Suppliers",
  "/cashbook": "Cashbook",
  "/transactions": "Transactions",
  "/reports": "Reports",
  "/settings": "Settings"
};

function AppLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const title = titleMap[pathname] || (pathname.startsWith("/customers/") ? "Customer Ledger" : pathname.startsWith("/suppliers/") ? "Supplier Ledger" : "ShopLedger");

  return (
    <div className="page-shell">
      <div className="hidden md:fixed md:inset-y-0 md:left-0 md:block md:w-60">
        <Sidebar />
      </div>

      {open && (
        <div className="fixed inset-0 z-40 bg-slate-900/50 md:hidden" onClick={() => setOpen(false)}>
          <div className="h-full w-72" onClick={(e) => e.stopPropagation()}>
            <Sidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="md:pl-60">
        <Topbar title={title} onMenu={() => setOpen(true)} />
        <main className="page-transition p-4 pb-24 md:p-6 md:pb-6">
          <Outlet />
        </main>
      </div>

      <MobileSidebar />
    </div>
  );
}

export default AppLayout;
