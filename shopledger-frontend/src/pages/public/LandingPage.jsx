import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";

const features = [
  {
    icon: "group",
    title: "Customer Ledger",
    description: "Manage customer credit and debit records with automated reminders and complete timeline history.",
    gradient: "from-[#5C6FFF]/10 to-[#8B5CF6]/10",
    accent: "shadow-indigo-100 border-t-[#5C6FFF]",
    color: "#5C6FFF"
  },
  {
    icon: "local_shipping",
    title: "Supplier Relations",
    description: "Track purchases and payable balances so your supply flow stays predictable.",
    gradient: "from-[#10B981]/10 to-emerald-500/10",
    accent: "shadow-emerald-100 border-t-[#10B981]",
    color: "#10B981"
  },
  {
    icon: "account_balance_wallet",
    title: "Digital Cashbook",
    description: "Capture daily cash-in and cash-out with live balance updates across all devices.",
    gradient: "from-amber-500/10 to-orange-500/10",
    accent: "shadow-amber-100 border-t-amber-500",
    color: "#f59e0b"
  },
  {
    icon: "receipt_long",
    title: "Sales & Receipts",
    description: "Categorize transactions and generate invoice-ready receipts in seconds.",
    gradient: "from-rose-500/10 to-pink-500/10",
    accent: "shadow-rose-100 border-t-rose-500",
    color: "#f43f5e"
  },
  {
    icon: "monitoring",
    title: "Advanced Reports",
    description: "Weekly, monthly, and yearly insights with one-click export for accounting.",
    gradient: "from-[#8B5CF6]/10 to-purple-500/10",
    accent: "shadow-purple-100 border-t-[#8B5CF6]",
    color: "#8B5CF6"
  },
  {
    icon: "security",
    title: "Bank-Grade Security",
    description: "Your data is encrypted and backed up 24/7. Access records from anywhere safely.",
    gradient: "from-cyan-500/10 to-[#5C6FFF]/10",
    accent: "shadow-cyan-100 border-t-cyan-500",
    color: "#06b6d4"
  }
];

const onboardingSteps = [
  { 
    num: "01", 
    title: "Create Shop Profile", 
    desc: "Register your business and setup details in 60 seconds." 
  },
  { 
    num: "02", 
    title: "Add Your Parties", 
    desc: "Import customers and suppliers easily from contacts or excel." 
  },
  { 
    num: "03", 
    title: "Grow with Data", 
    desc: "Make informed choices with live stats and smart ledger analytics." 
  }
];

const testimonialsRow1 = [
  {
    quote: "ShopLedger saved me over 10 hours weekly. Payment follow-ups are now fully automated and professional.",
    author: "Ahmed R.",
    role: "Owner, Central Groceries",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces"
  },
  {
    quote: "Switching from paper records was the best move. Tax reporting is now stress-free and accurate.",
    author: "Dr. David M.",
    role: "City Pharmacy Group",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces"
  },
  {
    quote: "The interface is beautiful and so easy to use. My shop staff learned it in less than an hour.",
    author: "Elena P.",
    role: "Manager, Luxe Boutique",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces"
  }
];

const testimonialsRow2 = [
  {
    quote: "Inventory visibility across branches is finally clear. This changed how we plan our monthly purchases.",
    author: "Sarah K.",
    role: "Founder, Bloom Boutique",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces"
  },
  {
    quote: "Best accounting support I've ever seen. Extremely quick and responsive on Whatsapp.",
    author: "Rajesh G.",
    role: "Tech Hardware Hub",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces"
  },
  {
    quote: "Highly recommended SaaS application. The double-entry cash flow is absolute gold.",
    author: "Marcus T.",
    role: "Distributor, Apex Goods",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=faces"
  }
];

function Icon({ name, className = "", style = {} }) {
  return <span className={`material-symbols-outlined select-none ${className}`} style={style}>{name}</span>;
}

const dragCardsData = [
  { icon: "🧾", title: "Customer Ledger", desc: "Track credit & debit with full history", color: "indigo", rotate: "6deg", top: "12%", left: "8%" },
  { icon: "🚚", title: "Supplier Relations", desc: "Manage payables and supply flow", color: "violet", rotate: "12deg", top: "55%", left: "70%" },
  { icon: "💰", title: "Digital Cashbook", desc: "Live cash-in/out with balance sync", color: "emerald", rotate: "-6deg", top: "10%", left: "29%" },
  { icon: "📊", title: "Advanced Reports", desc: "Weekly, monthly & yearly insights", color: "rose", rotate: "8deg", top: "52%", left: "16%" },
  { icon: "🔒", title: "Bank-Grade Security", desc: "256-bit encrypted, backed up daily", color: "amber", rotate: "18deg", top: "12%", left: "72%" },
  { icon: "🧾", title: "Sales & Receipts", desc: "Invoice-ready receipts in seconds", color: "cyan", rotate: "-3deg", top: "42%", left: "44%" },
];

const DragCard = ({ containerRef, icon, title, desc, color, rotate, top, left }) => {
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
      <div className={twMerge("absolute -right-8 -top-8 w-24 h-24 rounded-full blur-2xl pointer-events-none", style.accentGlow)} />

      <div className="flex flex-col gap-4 h-full relative z-10">
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


export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSector, setActiveSector] = useState(0);

  // Auto-rotation timer refs
  const stepperTimerRef = useRef(null);
  const wheelTimerRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stepper autoplay
  useEffect(() => {
    stepperTimerRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % onboardingSteps.length);
    }, 5000);
    return () => clearInterval(stepperTimerRef.current);
  }, []);

  // Money Wheel autoplay (every 4 seconds, rotates 90 degrees)
  useEffect(() => {
    wheelTimerRef.current = setInterval(() => {
      setActiveSector((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(wheelTimerRef.current);
  }, []);

  const handleStepClick = (idx) => {
    setActiveStep(idx);
    if (stepperTimerRef.current) {
      clearInterval(stepperTimerRef.current);
      stepperTimerRef.current = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % onboardingSteps.length);
      }, 5000);
    }
  };

  const handleSectorClick = (idx) => {
    setActiveSector(idx);
    if (wheelTimerRef.current) {
      clearInterval(wheelTimerRef.current);
      wheelTimerRef.current = setInterval(() => {
        setActiveSector((prev) => (prev + 1) % 4);
      }, 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Framer Motion presets
  const scrollReveal = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemFade = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  const heroWords = "Run Your Shop With Pure Precision".split(" ");

  // Money Wheel Segment Data
  const wheelSectors = [
    { label: "Cash Book", icon: "account_balance_wallet", color: "#10B981" },
    { label: "Credit Ledger", icon: "payments", color: "#F59E0B" },
    { label: "Growth Report", icon: "bar_chart", color: "#8B5CF6" },
    { label: "Safe Vault", icon: "shield", color: "#06B6D4" }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased selection:bg-[#5C6FFF]/20 overflow-x-hidden relative">
      
      {/* 🚀 NAVBAR */}
      <motion.header 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled 
            ? "bg-white/90 border-b border-slate-100 backdrop-blur-xl py-3.5 shadow-sm" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="section-container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#5C6FFF] to-[#8B5CF6] shadow-lg shadow-indigo-500/20">
               <span className="font-heading font-black text-white text-2xl tracking-tighter">S</span>
            </div>
            <span className={`text-2xl font-heading font-black tracking-tight transition-colors duration-300 ${
              scrolled ? "text-[#0F172A]" : "text-white"
            }`}>
              ShopLedger
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
            {["features", "testimonials", "pricing"].map((link) => (
              <a 
                key={link} 
                href={`#${link}`} 
                className={`transition-colors duration-300 relative py-1 group ${
                  scrolled ? "text-[#475569] hover:text-[#0F172A]" : "text-slate-300 hover:text-white"
                }`}
              >
                <span className="capitalize">{link}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#5C6FFF] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <Link 
              to="/login" 
              className={`text-sm font-bold transition-colors duration-300 px-4 py-2 ${
                scrolled ? "text-[#475569] hover:text-[#0F172A]" : "text-slate-300 hover:text-white"
              }`}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="relative group overflow-hidden bg-gradient-to-r from-[#5C6FFF] to-[#8B5CF6] text-white font-bold text-xs uppercase tracking-widest px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Started
            </Link>
          </div>

          {/* Hamburger Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors duration-300 md:hidden ${
              scrolled 
                ? "border-slate-200 bg-white/80 text-[#0F172A] hover:bg-slate-50" 
                : "border-white/10 bg-white/5 text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            <Icon name={mobileMenuOpen ? "close" : "menu"} className="text-current text-2xl" />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-lg overflow-hidden md:hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                {["features", "testimonials", "pricing"].map((link) => (
                  <a 
                    key={link} 
                    href={`#${link}`} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-semibold text-[#475569] hover:text-[#0F172A] capitalize transition-colors"
                  >
                    {link}
                  </a>
                ))}
                <div className="h-[1px] bg-slate-100 my-2" />
                <div className="flex flex-col gap-4">
                  <Link 
                    to="/login" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center font-bold text-[#475569] hover:text-[#0F172A] transition-colors py-2"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center bg-gradient-to-r from-[#5C6FFF] to-[#8B5CF6] text-white font-bold py-3.5 rounded-xl shadow-md"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main className="relative z-10">
        
        {/* 🚀 HERO SECTION (Dark theme background, Left-aligned text, Split screen with Rotating Money Wheel) */}
        <section className="relative pt-36 pb-28 md:pt-48 md:pb-40 min-h-screen flex flex-col justify-center overflow-hidden bg-[#0A0F1E] text-white dot-pattern">
          
          {/* Decorative Mesh Backgrounds */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-80">
            <div className="absolute top-[-10%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-[#5C6FFF]/10 blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-[#8B5CF6]/10 blur-[120px]" />
          </div>

          <div className="section-container grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Column: Left-Aligned Text */}
            <div className="lg:col-span-7 text-left space-y-8">
              

              
              <motion.h1 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
              >
                {heroWords.map((word, idx) => (
                  <motion.span 
                    key={idx}
                    variants={itemFade}
                    className={`inline-block mr-3 md:mr-4 ${
                      word === "Pure" || word === "Precision"
                        ? "bg-gradient-to-r from-[#5C6FFF] via-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent"
                        : ""
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-base md:text-lg text-[#94A3B8] leading-relaxed max-w-xl font-medium"
              >
                Everything you need to manage ledger, customers, and cash flow. 
                Ditch the notebooks for a high-end digital experience.
              </motion.p>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <Link 
                  to="/register" 
                  className="h-14 px-8 flex items-center justify-center font-heading font-black text-white bg-gradient-to-r from-[#5C6FFF] to-[#8B5CF6] rounded-xl shadow-xl shadow-indigo-500/15 hover:shadow-indigo-500/35 hover:scale-[1.02] transition-all duration-300"
                >
                  Start Your Trial
                </Link>
                <a 
                  href="#features"
                  className="h-14 px-8 flex items-center justify-center font-semibold text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  Explore Features
                </a>
              </motion.div>


            </div>

            {/* Right Column: 90-Degree Rotating Money Wheel */}
            <div className="lg:col-span-5 flex justify-center items-center py-6 relative">
              
              {/* Spinning background glow */}
              <div 
                className="absolute w-72 h-72 rounded-full blur-[80px] opacity-25 mix-blend-screen pointer-events-none transition-all duration-1000"
                style={{
                  backgroundColor: wheelSectors[activeSector].color
                }}
              />

              {/* The Interactive Orbit Path */}
              <div className="w-80 h-80 sm:w-[420px] sm:h-[420px] lg:w-[480px] lg:h-[480px] rounded-full border border-white/10 relative flex items-center justify-center shadow-inner">
                
                {/* Rotating wheel container */}
                <motion.div 
                  animate={{ rotate: activeSector * -90 }}
                  transition={{ type: "spring", stiffness: 60, damping: 15 }}
                  className="absolute w-full h-full rounded-full"
                >
                  {wheelSectors.map((sector, idx) => {
                    // Position math for nodes at 0, 90, 180, 270 degrees
                    const angle = idx * 90; // deg
                    const rad = (angle * Math.PI) / 180;
                    // Circle radius is ~45% to keep nodes sitting nicely on orbit border
                    const x = 50 + 45 * Math.sin(rad);
                    const y = 50 - 45 * Math.cos(rad);
                    const isActive = activeSector === idx;

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSectorClick(idx)}
                        className="absolute cursor-pointer flex items-center justify-center focus:outline-none z-20"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: "translate(-50%, -50%)"
                        }}
                      >
                        {/* Counter-rotating node element to stay upright */}
                        <motion.div
                          animate={{ 
                            rotate: activeSector * 90,
                            scale: isActive ? 1.15 : 1
                          }}
                          transition={{ type: "spring", stiffness: 60, damping: 15 }}
                          className={`h-12 w-12 sm:h-14 sm:w-14 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                            isActive 
                              ? "bg-white border-white text-[#0A0F1E] shadow-lg" 
                              : "bg-[#0A0F1E]/80 border-white/10 text-[#94A3B8] hover:border-white/20 hover:text-white"
                          }`}
                          style={{
                            boxShadow: isActive ? `0 0 20px ${sector.color}40` : "none"
                          }}
                        >
                          <Icon name={sector.icon} className="text-xl sm:text-2xl" style={{ color: isActive ? sector.color : undefined }} />
                        </motion.div>
                      </button>
                    );
                  })}
                </motion.div>

                {/* Central Animation Card (Shows current sector detail & animation) */}
                <div className="w-44 h-44 sm:w-[220px] sm:h-[220px] lg:w-[260px] lg:h-[260px] bg-[#0A0F1E]/90 rounded-full border border-white/15 flex flex-col items-center justify-center p-6 md:p-8 text-center shadow-2xl relative z-10 overflow-hidden bg-dot-pattern">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSector}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.3 }}
                      className="w-full flex flex-col items-center justify-center"
                    >
                      {/* Active sector details */}
                      <p className="text-[10px] sm:text-xs uppercase font-black tracking-widest text-[#64748B] mb-1.5">
                        {wheelSectors[activeSector].label}
                      </p>
                      
                      {/* Interactive Money Animations in Center */}
                      <div className="h-16 sm:h-20 flex items-center justify-center my-2 sm:my-3 relative w-full">
                        {activeSector === 0 && (
                          // Cashbook: Floating coins / cash stream
                          <div className="flex gap-1.5 items-end justify-center">
                            <motion.span 
                              animate={{ y: [0, -35, 0], opacity: [0, 1, 0] }}
                              transition={{ repeat: Infinity, duration: 1.8, delay: 0 }}
                              className="text-emerald-400 font-bold text-lg"
                            >$</motion.span>
                            <motion.span 
                              animate={{ y: [0, -45, 0], opacity: [0, 1, 0] }}
                              transition={{ repeat: Infinity, duration: 2.0, delay: 0.4 }}
                              className="text-emerald-400 text-2xl font-bold"
                            >💵</motion.span>
                            <motion.span 
                              animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }}
                              transition={{ repeat: Infinity, duration: 1.6, delay: 0.8 }}
                              className="text-emerald-400 font-bold text-lg"
                            >🪙</motion.span>
                          </div>
                        )}

                        {activeSector === 1 && (
                          // Credit Ledger: A mini balance meter with shifting credits
                          <div className="flex flex-col items-center justify-center space-y-1">
                            <div className="flex items-center gap-4 text-xs font-black">
                              <span className="text-rose-400 font-bold">Credit</span>
                              <span className="text-[#10B981] font-bold">Debit</span>
                            </div>
                            <div className="flex gap-2">
                              <motion.span 
                                animate={{ scale: [1, 1.2, 1] }} 
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="text-rose-400 font-black text-sm"
                              >-$450</motion.span>
                              <span className="text-white/20">|</span>
                              <motion.span 
                                animate={{ scale: [1.2, 1, 1.2] }} 
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="text-[#10B981] font-black text-sm"
                              >+$980</motion.span>
                            </div>
                          </div>
                        )}

                        {activeSector === 2 && (
                          // Growth Report: Shifting / growing bar charts
                          <div className="flex items-end gap-2.5 h-12">
                            <motion.div 
                              animate={{ height: ["20%", "70%", "20%"] }}
                              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                              className="w-3 rounded bg-[#8B5CF6]/80"
                            />
                            <motion.div 
                              animate={{ height: ["40%", "95%", "40%"] }}
                              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                              className="w-3 rounded bg-[#8B5CF6]"
                            />
                            <motion.div 
                              animate={{ height: ["10%", "50%", "10%"] }}
                              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                              className="w-3 rounded bg-[#8B5CF6]/50"
                            />
                          </div>
                        )}

                        {activeSector === 3 && (
                          // Security: Expanding radar shield pulse
                          <div className="relative flex items-center justify-center">
                            <Icon name="verified_user" className="text-cyan-400 text-3xl z-10" />
                            <motion.div 
                              animate={{ scale: [0.9, 1.8], opacity: [0.6, 0] }}
                              transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
                              className="absolute w-12 h-12 rounded-full border border-cyan-400/50"
                            />
                            <motion.div 
                              animate={{ scale: [0.9, 2.2], opacity: [0.4, 0] }}
                              transition={{ repeat: Infinity, duration: 1.8, delay: 0.5, ease: "easeOut" }}
                              className="absolute w-12 h-12 rounded-full border border-cyan-400/30"
                            />
                          </div>
                        )}
                      </div>

                      <span 
                        className="text-xs sm:text-sm font-bold text-white transition-colors duration-300 mt-1 sm:mt-2"
                        style={{ color: wheelSectors[activeSector].color }}
                      >
                        {activeSector === 0 && "Manage incoming cashflow"}
                        {activeSector === 1 && "Balance customer credits"}
                        {activeSector === 2 && "Automate growth analytics"}
                        {activeSector === 3 && "Secure tenant databases"}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 🧱 INTERACTIVE DRAGGABLE CARDS DECK (Visual workspace overhaul) */}
        <section id="features" className="relative min-h-[750px] w-full flex flex-col items-center justify-center overflow-hidden bg-neutral-950 border-y border-white/5 py-24 select-none">
          {/* Huge background text */}
          <h2 className="absolute select-none pointer-events-none text-[15vw] font-black text-neutral-800 md:text-[180px] tracking-tighter leading-none z-0">
            FEATURES.
          </h2>

          <div className="section-container text-center max-w-2xl mx-auto mb-16 relative z-10 pointer-events-none">
            <h2 className="text-4xl font-heading font-black tracking-tight text-white sm:text-5xl">
              Interactive Workspace.
            </h2>
            <p className="mt-4 text-base text-neutral-400 font-semibold">
              👋 Drag and arrange the ledger cards below to explore how ShopLedger helps your business scale.
            </p>
          </div>

          {/* Draggable Cards Workspace */}
          <div className="absolute inset-0 z-10" ref={cardsContainerRef}>
            {dragCardsData.map((feat, index) => (
              <DragCard key={index} containerRef={cardsContainerRef} {...feat} />
            ))}
          </div>
        </section>

        {/* 🧱 INTERACTIVE STEPPER / HOW IT WORKS SECTION (Dark theme background) */}
        <section id="how-it-works" className="section-spacing relative bg-[#0D1224] text-white border-y border-white/5 dot-pattern">
          <div className="section-container">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scrollReveal}
              className="text-center max-w-2xl mx-auto mb-20"
            >
              <h2 className="text-4xl font-heading font-black tracking-tight text-white sm:text-5xl">Simple Onboarding.</h2>
              <p className="mt-4 text-lg text-[#94A3B8] font-medium">Start managing your business in less than 2 minutes without any complex training.</p>
            </motion.div>

            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              
              {/* Stepper Steps (Left Side) */}
              <div className="relative">
                {/* Stepper Progress Bar Line */}
                <div className="absolute top-[52px] bottom-[52px] left-[51px] w-0.5 bg-white/10 z-0">
                  <motion.div 
                    className="w-full bg-[#5C6FFF] origin-top" 
                    initial={{ height: 0 }}
                    animate={{ height: `${(activeStep / (onboardingSteps.length - 1)) * 100}%` }}
                    transition={{ duration: 0.4 }}
                    style={{ height: "100%" }}
                  />
                </div>

                <div className="space-y-8 relative z-10">
                  {onboardingSteps.map((step, idx) => {
                    const isSelected = activeStep === idx;
                    return (
                      <button 
                        key={step.num} 
                        onClick={() => handleStepClick(idx)}
                        className="w-full text-left flex gap-6 p-6 rounded-2xl border border-transparent transition-all duration-300 hover:bg-white/3 focus:outline-none"
                        style={{
                          backgroundColor: isSelected ? "rgba(92, 111, 255, 0.08)" : "transparent",
                          borderColor: isSelected ? "rgba(92, 111, 255, 0.15)" : "transparent"
                        }}
                      >
                        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-black transition-all duration-300 border border-white/5 relative z-10 ${
                          isSelected 
                            ? "bg-gradient-to-br from-[#5C6FFF] to-[#8B5CF6] text-white shadow-lg shadow-indigo-500/25 border-transparent" 
                            : "bg-[#131A35] text-[#94A3B8]"
                        }`}>
                          {step.num}
                        </div>
                        <div>
                          <h4 className={`text-xl font-heading font-black transition-colors ${isSelected ? "text-white" : "text-[#94A3B8]"}`}>
                            {step.title}
                          </h4>
                          <p className="mt-2 text-sm text-[#64748B] leading-relaxed font-semibold">
                            {step.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stepper Mockup Previews (Right Side) */}
              <div className="relative aspect-video rounded-[32px] bg-gradient-to-br from-[#5C6FFF]/20 to-[#8B5CF6]/20 p-[1px] shadow-2xl overflow-hidden">
                <div className="w-full h-full rounded-[31px] bg-[#0A0F1E]/95 p-8 flex flex-col justify-center border border-white/5 relative">
                  
                  {/* Step 1 Visual Mockup */}
                  {activeStep === 0 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4"
                    >
                      <h5 className="text-[#5C6FFF] text-xs font-black uppercase tracking-widest">Create Profile</h5>
                      <div className="p-4 bg-white/3 rounded-xl border border-white/5 space-y-3">
                        <div className="flex gap-3">
                          <div className="h-9 w-9 bg-[#5C6FFF]/20 rounded-lg flex items-center justify-center"><Icon name="storefront" className="text-[#5C6FFF]" /></div>
                          <div className="space-y-1.5 w-full"><div className="h-3 w-1/3 bg-white/20 rounded" /><div className="h-2 w-1/2 bg-white/10 rounded" /></div>
                        </div>
                        <div className="h-[1px] bg-white/5" />
                        <div className="grid grid-cols-2 gap-3">
                          <div className="h-7 bg-white/5 rounded border border-white/5" />
                          <div className="h-7 bg-[#5C6FFF]/20 rounded border border-[#5C6FFF]/30 flex items-center justify-center text-[10px] font-bold text-white">Save</div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2 Visual Mockup */}
                  {activeStep === 1 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4"
                    >
                      <h5 className="text-[#10B981] text-xs font-black uppercase tracking-widest font-heading">Add Parties</h5>
                      <div className="p-4 bg-white/3 rounded-xl border border-white/5 space-y-2.5">
                        <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                          <span className="text-[#94A3B8]">Name</span>
                          <span className="text-[#94A3B8]">Type</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span>Alex Carter</span>
                          <span className="px-2 py-0.5 bg-[#5C6FFF]/10 border border-[#5C6FFF]/20 rounded-full text-[9px] text-[#5C6FFF] font-bold">Customer</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span>Sarah Miller</span>
                          <span className="px-2 py-0.5 bg-[#10B981]/10 border border-[#10B981]/20 rounded-full text-[9px] text-[#10B981] font-bold">Supplier</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3 Visual Mockup */}
                  {activeStep === 2 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4"
                    >
                      <h5 className="text-[#8B5CF6] text-xs font-black uppercase tracking-widest font-heading">Grow with insights</h5>
                      <div className="p-4 bg-white/3 rounded-xl border border-white/5 space-y-3">
                        <div className="flex justify-between items-center"><span className="text-xs">Ledger Health</span><span className="text-[10px] text-[#10B981] font-bold">99.8% Balanced</span></div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-[#5C6FFF] to-[#8B5CF6] w-[85%] rounded-full" /></div>
                        <div className="flex justify-between text-[9px] text-[#64748B]"><span>Daily activity</span><span>+24.5% Growth</span></div>
                      </div>
                    </motion.div>
                  )}
                  
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 💬 TESTIMONIALS SECTION (INFINITE SCROLLING MARQUEE - Light theme background) */}
        <section id="testimonials" className="section-spacing bg-slate-100/70 border-y border-slate-200/50 overflow-hidden">
          <div className="section-container">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scrollReveal}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="text-4xl font-heading font-black tracking-tight text-[#0F172A]">Loved by merchants everywhere.</h2>
              <p className="mt-4 text-[#475569] font-medium text-lg">See how digital shop management helps business owners scale every day.</p>
            </motion.div>
          </div>

          {/* Marquee Row 1 (Left to Right) */}
          <div className="relative flex overflow-x-hidden gap-6 w-full py-4 pointer-events-none">
            <div className="flex gap-6 animate-marquee shrink-0">
              {[...testimonialsRow1, ...testimonialsRow1].map((t, idx) => (
                <div key={idx} className="w-[340px] shrink-0 bg-white p-6 rounded-2xl border border-slate-200/60 border-t-2 border-t-[#5C6FFF]/30 shadow-md flex flex-col justify-between transition-shadow hover:shadow-lg">
                  <div>
                    <div className="flex gap-1 mb-4 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Icon key={i} name="star" className="text-base fill-current" />
                      ))}
                    </div>
                    <p className="text-[#334155] font-semibold text-sm leading-relaxed italic">"{t.quote}"</p>
                  </div>
                  <div className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-4">
                    <img src={t.avatar} alt={t.author} className="h-10 w-10 rounded-full object-cover border border-[#5C6FFF]/20" />
                    <div>
                      <p className="font-bold text-[#0F172A] text-xs">{t.author}</p>
                      <p className="text-[10px] text-[#64748B] font-bold">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Marquee Row 2 (Right to Left) */}
          <div className="relative flex overflow-x-hidden gap-6 w-full py-4 mt-2 pointer-events-none">
            <div className="flex gap-6 animate-marquee-reverse shrink-0">
              {[...testimonialsRow2, ...testimonialsRow2].map((t, idx) => (
                <div key={idx} className="w-[340px] shrink-0 bg-white p-6 rounded-2xl border border-slate-200/60 border-t-2 border-t-[#8B5CF6]/30 shadow-md flex flex-col justify-between transition-shadow hover:shadow-lg">
                  <div>
                    <div className="flex gap-1 mb-4 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Icon key={i} name="star" className="text-base fill-current" />
                      ))}
                    </div>
                    <p className="text-[#334155] font-semibold text-sm leading-relaxed italic">"{t.quote}"</p>
                  </div>
                  <div className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-4">
                    <img src={t.avatar} alt={t.author} className="h-10 w-10 rounded-full object-cover border border-[#8B5CF6]/20" />
                    <div>
                      <p className="font-bold text-[#0F172A] text-xs">{t.author}</p>
                      <p className="text-[10px] text-[#64748B] font-bold">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 📢 CTA SECTION (Dark theme shifting background) */}
        <section className="section-spacing relative overflow-hidden bg-[#0A0F1E]">
          <div className="section-container">
            <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#311042] px-6 py-20 md:py-24 text-center text-white border border-white/5 shadow-2xl dot-pattern">
              <div className="absolute inset-0 bg-[#5C6FFF]/5 mix-blend-overlay pointer-events-none" />
              <div className="relative z-10 max-w-3xl mx-auto">
                

                <h2 className="text-4xl font-heading font-black tracking-tight mb-6 sm:text-5xl md:text-6xl leading-[1.15]">
                  Ready to scale your shop?
                </h2>
                
                <p className="text-base text-[#94A3B8] max-w-2xl mx-auto mb-10 font-semibold leading-relaxed">
                  Join thousands of merchants simplifying operations. No credit card required. Cancel anytime.
                </p>
                
                <div className="flex flex-wrap justify-center gap-5">
                  <Link 
                    to="/register" 
                    className="h-14 px-10 flex items-center justify-center font-heading font-black text-[#0A0F1E] bg-white rounded-2xl shadow-xl hover:scale-105 hover:bg-slate-50 active:scale-95 transition-all"
                  >
                    Get Started Free
                  </Link>
                  <button className="h-14 px-10 flex items-center justify-center border-2 border-white/10 hover:border-white/20 text-white font-black rounded-2xl hover:bg-white/5 hover:scale-105 active:scale-95 transition-all duration-300">
                    Speak to Sales
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 🧾 FOOTER (Dark background) */}
      <footer className="bg-[#05070F] border-t border-white/5 py-16 relative z-10 grid-pattern">
        <div className="section-container">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Logo and newsletter */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#5C6FFF] to-[#8B5CF6]">
                  <span className="font-heading font-black text-white text-lg tracking-tighter">S</span>
                </div>
                <span className="text-xl font-heading font-black tracking-tight text-white">ShopLedger</span>
              </div>
              <p className="text-xs text-[#64748B] font-semibold leading-5">
                Premium SaaS for modern shop management. Scale your business with data, not paper.
              </p>
              
              {/* Newsletter form */}
              <div className="space-y-2">
                <p className="text-[10px] uppercase font-black tracking-widest text-[#94A3B8]">Join Newsletter</p>
                <div className="flex gap-2 max-w-sm">
                  <input 
                    type="email" 
                    placeholder="Enter email" 
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#5C6FFF] w-full text-white" 
                  />
                  <button className="bg-[#5C6FFF] hover:bg-[#4E5EEB] transition-colors rounded-xl px-4 text-xs font-bold text-white">
                    Join
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-heading font-black text-white uppercase text-[10px] tracking-widest mb-6">Product</h5>
              <ul className="space-y-3.5 text-sm font-semibold text-[#64748B]">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-heading font-black text-white uppercase text-[10px] tracking-widest mb-6">Company</h5>
              <ul className="space-y-3.5 text-sm font-semibold text-[#64748B]">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-heading font-black text-white uppercase text-[10px] tracking-widest mb-6">Connect</h5>
              <ul className="space-y-3.5 text-sm font-semibold text-[#64748B]">
                <li><a href="#" className="hover:text-[#5C6FFF] transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-[#5C6FFF] transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs font-semibold text-[#64748B]">© 2024 ShopLedger Global Inc. Built for merchants.</p>

          </div>
        </div>
      </footer>

      {/* 🚀 Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-xl bg-[#5C6FFF] text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 border border-[#5C6FFF]/20 hover:bg-[#4E5EEB] transition-all hover:scale-105"
            aria-label="Back to top"
          >
            <Icon name="arrow_upward" className="text-xl" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
