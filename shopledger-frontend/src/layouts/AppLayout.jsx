import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

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
      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:left-0 md:block md:w-60">
        <Sidebar />
      </div>

      {/* Mobile Drawer (Animated) */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-40 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            {/* Drawer Content */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="relative h-full w-72 max-w-[85vw] shadow-2xl z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar onNavigate={() => setOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="md:pl-60">
        <Topbar title={title} onMenu={() => setOpen(true)} />
        <main className="page-transition p-4 pb-8 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
