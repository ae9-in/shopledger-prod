import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const FEATURES = [
  { icon: "🧾", title: "Customer Ledger", desc: "Track credit & debit with full history", color: "indigo", rotate: "6deg", top: "12%", left: "8%" },
  { icon: "🚚", title: "Supplier Relations", desc: "Manage payables and supply flow", color: "violet", rotate: "12deg", top: "55%", left: "70%" },
  { icon: "💰", title: "Digital Cashbook", desc: "Live cash-in/out with balance sync", color: "emerald", rotate: "-6deg", top: "10%", left: "29%" },
  { icon: "📊", title: "Advanced Reports", desc: "Weekly, monthly & yearly insights", color: "rose", rotate: "8deg", top: "52%", left: "16%" },
  { icon: "🔒", title: "Bank-Grade Security", desc: "256-bit encrypted, backed up daily", color: "amber", rotate: "18deg", top: "12%", left: "72%" },
  { icon: "🧾", title: "Sales & Receipts", desc: "Invoice-ready receipts in seconds", color: "cyan", rotate: "-3deg", top: "42%", left: "44%" },
];

export const DragCards = () => {
  const containerRef = useRef(null);

  return (
    <section className="relative grid min-h-screen w-full place-content-center overflow-hidden bg-neutral-950 select-none">
      <h2 className="relative z-0 text-[15vw] font-black text-neutral-800 md:text-[180px] tracking-tighter pointer-events-none select-none">
        FEATURES.
      </h2>
      <div className="absolute inset-0 z-10" ref={containerRef}>
        {FEATURES.map((feat, index) => (
          <Card key={index} containerRef={containerRef} {...feat} />
        ))}
      </div>
    </section>
  );
};

const Card = ({ containerRef, icon, title, desc, color, rotate, top, left }) => {
  const [zIndex, setZIndex] = useState(0);

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-elements");
    let maxZIndex = -Infinity;
    els.forEach((el) => {
      const z = parseInt(window.getComputedStyle(el).getPropertyValue("z-index"));
      if (!isNaN(z) && z > maxZIndex) {
        maxZIndex = z;
      }
    });
    setZIndex(maxZIndex + 1);
  };

  const colorStyles = {
    indigo: {
      glow: "shadow-[0_0_25px_rgba(99,102,241,0.15)] hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]",
      iconBg: "bg-indigo-500/20 text-indigo-400 border-indigo-500/20",
      accentGlow: "bg-indigo-500/10",
      border: "border-indigo-500/20 hover:border-indigo-500/40"
    },
    violet: {
      glow: "shadow-[0_0_25px_rgba(139,92,246,0.15)] hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]",
      iconBg: "bg-violet-500/20 text-violet-400 border-violet-500/20",
      accentGlow: "bg-violet-500/10",
      border: "border-violet-500/20 hover:border-violet-500/40"
    },
    emerald: {
      glow: "shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]",
      iconBg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/20",
      accentGlow: "bg-emerald-500/10",
      border: "border-emerald-500/20 hover:border-emerald-500/40"
    },
    rose: {
      glow: "shadow-[0_0_25px_rgba(244,63,94,0.15)] hover:shadow-[0_0_40px_rgba(244,63,94,0.4)]",
      iconBg: "bg-rose-500/20 text-rose-400 border-rose-500/20",
      accentGlow: "bg-rose-500/10",
      border: "border-rose-500/20 hover:border-rose-500/40"
    },
    amber: {
      glow: "shadow-[0_0_25px_rgba(245,158,11,0.15)] hover:shadow-[0_0_40px_rgba(245,158,11,0.4)]",
      iconBg: "bg-amber-500/20 text-amber-400 border-amber-500/20",
      accentGlow: "bg-amber-500/10",
      border: "border-amber-500/20 hover:border-amber-500/40"
    },
    cyan: {
      glow: "shadow-[0_0_25px_rgba(6,182,212,0.15)] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)]",
      iconBg: "bg-cyan-500/20 text-cyan-400 border-cyan-500/20",
      accentGlow: "bg-cyan-500/10",
      border: "border-cyan-500/20 hover:border-cyan-500/40"
    }
  };

  const style = colorStyles[color] || colorStyles.indigo;

  return (
    <motion.div
      onMouseDown={updateZIndex}
      onTouchStart={updateZIndex}
      style={{
        top,
        left,
        rotate,
        zIndex,
      }}
      className={twMerge(
        "drag-elements absolute cursor-grab active:cursor-grabbing",
        "w-52 md:w-72 min-h-[200px] p-7 rounded-2xl select-none",
        "bg-white/10 backdrop-blur-md border border-white/20",
        "transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden",
        style.glow,
        style.border
      )}
      drag
      dragConstraints={containerRef}
      dragElastic={0.65}
      whileHover={{ scale: 1.02 }}
      whileDrag={{ scale: 1.05 }}
    >
      {/* Soft Colored Accent Glow inside the card */}
      <div className={twMerge("absolute -right-8 -top-8 w-24 h-24 rounded-full blur-2xl pointer-events-none", style.accentGlow)} />

      <div className="flex flex-col gap-4 h-full relative z-10">
        {/* Emoji or Icon with Colored Gradient Circle Background */}
        <div className={twMerge("w-12 h-12 rounded-full flex items-center justify-center text-2xl border", style.iconBg)}>
          {icon}
        </div>

        <div className="space-y-1.5">
          <h3 className="text-base font-black text-white leading-snug tracking-tight">{title}</h3>
          <p className="text-xs text-neutral-300 leading-relaxed font-semibold">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
};
