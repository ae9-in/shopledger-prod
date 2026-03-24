import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: "group",
    title: "Customer Ledger",
    description: "Manage customer credit and debit records with automated reminders and complete timeline history.",
    gradient: "from-blue-500/10 to-indigo-500/10"
  },
  {
    icon: "local_shipping",
    title: "Supplier Relations",
    description: "Track purchases and payable balances so your supply flow stays predictable and always active.",
    gradient: "from-emerald-500/10 to-teal-500/10"
  },
  {
    icon: "account_balance_wallet",
    title: "Digital Cashbook",
    description: "Capture daily cash-in and cash-out with live balance updates across all devices.",
    gradient: "from-amber-500/10 to-orange-500/10"
  },
  {
    icon: "receipt_long",
    title: "Sales & Receipts",
    description: "Categorize transactions and generate invoice-ready receipts in seconds for your clients.",
    gradient: "from-rose-500/10 to-pink-500/10"
  },
  {
    icon: "monitoring",
    title: "Advanced Reports",
    description: "Weekly, monthly, and yearly insights with one-click export for accounting and tax planning.",
    gradient: "from-violet-500/10 to-purple-500/10"
  },
  {
    icon: "security",
    title: "Bank-Grade Security",
    description: "Your data is encrypted and backed up 24/7. Access your shop records from anywhere safely.",
    gradient: "from-cyan-500/10 to-blue-500/10"
  }
];

const onboardingSteps = [
  { num: "01", title: "Create Shop Profile", desc: "Register your business in 60 seconds." },
  { num: "02", title: "Add Your Parties", desc: "Import customers and suppliers easily." },
  { num: "03", title: "Grow with Data", desc: "Make informed decisions with live stats." }
];

const testimonials = [
  {
    quote: "ShopLedger saved me over 10 hours weekly. Payment follow-ups are now fully automated and professional.",
    author: "Ahmed R.",
    role: "Owner, Central Groceries"
  },
  {
    quote: "Switching from paper records was the best move. Tax reporting is now stress-free and accurate.",
    author: "Dr. David M.",
    role: "City Pharmacy Group"
  },
  {
    quote: "Inventory visibility across branches is finally clear. This changed how we plan our monthly purchases.",
    author: "Sarah K.",
    role: "Founder, Bloom Boutique"
  }
];

function Icon({ name, className = "" }) {
  return <span className={`material-symbols-outlined ${className}`}>{name}</span>;
}

function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#4F46E5]/10">
      {/* 🚀 NAVBAR */}
      <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white/80 border-b border-slate-200 backdrop-blur-md py-3" : "bg-transparent py-5"}`}>
        <div className="section-container flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#6366F1] shadow-lg shadow-indigo-500/20">
               <span className="font-black text-white text-xl">S</span>
            </div>
            <span className="text-xl font-black tracking-tight text-[#0F172A]">ShopLedger</span>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-[#475569] md:flex">
            <a href="#features" className="hover:text-[#4F46E5] transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-[#4F46E5] transition-colors">Testimonials</a>
            <a href="#pricing" className="hover:text-[#4F46E5] transition-colors">Pricing</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden sm:block text-sm font-bold text-[#475569] hover:text-[#0F172A] transition-colors">Login</Link>
            <Link to="/register" className="btn-primary !h-11 !px-6 !text-xs !uppercase !tracking-widest">Get Started</Link>
          </div>
        </div>
      </header>

      <main>
        {/* 🚀 HERO SECTION */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="glow-bg left-1/2 -top-20 -translate-x-1/2" />
          
          <div className="section-container text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#4F46E5] animate-fade-in">
               <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span></span>
               The Future of Shop Management
            </div>
            
            <h1 className="mt-8 text-5xl font-black leading-[1.1] tracking-tight text-[#0F172A] sm:text-7xl animate-fade-in reveal-delay-1">
              Run Your Shop <br />
              <span className="hero-gradient-text">With Pure Precision</span>
            </h1>
            
            <p className="mt-8 text-xl text-[#475569] leading-relaxed animate-fade-in reveal-delay-2 max-w-2xl mx-auto">
              Everything you need to manage ledger, customers, and cash flow. 
              Ditch the notebooks for a high-end digital experience.
            </p>

            <div className="mt-12 flex flex-wrap justify-center items-center gap-5 animate-fade-in reveal-delay-3">
               <Link to="/register" className="btn-primary !h-14 !px-10 !text-base shadow-2xl">Start Your Trial</Link>
               <button className="btn-secondary !h-14 !px-10 !text-base shadow-sm">
                  <Icon name="play_circle" className="mr-2" />
                  View Product Demo
               </button>
            </div>
          </div>

          {/* Dashboard Mockup Component */}
          <div className="section-container mt-20 md:mt-32 max-w-5xl animate-fade-in" style={{ animationDelay: '500ms' }}>
             <div className="dashboard-mockup rounded-[32px] bg-slate-100 p-2 overflow-hidden border border-slate-200">
                <div className="rounded-[28px] bg-white shadow-2xl overflow-hidden p-6 sm:p-10 border border-slate-100">
                   <div className="flex items-center justify-between gap-4 mb-10">
                      <div className="flex gap-1.5">
                         <div className="h-3 w-3 rounded-full bg-rose-400" />
                         <div className="h-3 w-3 rounded-full bg-amber-400" />
                         <div className="h-3 w-3 rounded-full bg-emerald-400" />
                      </div>
                      <div className="h-4 w-40 rounded-full bg-slate-100" />
                      <div className="h-8 w-8 rounded-full bg-indigo-50 border border-indigo-100" />
                   </div>
                   
                   <div className="grid grid-cols-3 gap-6 mb-10">
                      <div className="h-24 rounded-2xl bg-[#4F46E5] p-5 text-white shadow-lg shadow-indigo-500/20">
                         <div className="h-2 w-12 bg-white/30 rounded mb-2" />
                         <div className="h-6 w-24 bg-white/90 rounded" />
                      </div>
                      <div className="h-24 rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
                         <div className="h-2 w-12 bg-slate-100 rounded mb-2" />
                         <div className="h-6 w-24 bg-slate-200 rounded" />
                      </div>
                      <div className="h-24 rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
                         <div className="h-2 w-12 bg-slate-100 rounded mb-2" />
                         <div className="h-6 w-24 bg-slate-200 rounded" />
                      </div>
                   </div>
                   
                   <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-xl border border-slate-50 bg-slate-50/30">
                         <div className="flex items-center gap-3"><div className="h-10 w-10 rounded-full bg-slate-100" /><div className="space-y-1.5"><div className="h-3 w-20 bg-slate-200 rounded" /><div className="h-2 w-12 bg-slate-100 rounded" /></div></div>
                         <div className="h-4 w-16 bg-emerald-100 rounded" />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-xl border border-slate-50 bg-slate-50/30">
                         <div className="flex items-center gap-3"><div className="h-10 w-10 rounded-full bg-slate-100" /><div className="space-y-1.5"><div className="h-3 w-20 bg-slate-200 rounded" /><div className="h-2 w-12 bg-slate-100 rounded" /></div></div>
                         <div className="h-4 w-16 bg-rose-100 rounded" />
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* 📦 FEATURES SECTION */}
        <section id="features" className="section-spacing bg-white border-y border-slate-100">
           <div className="section-container">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                 <div className="max-w-xl">
                    <h2 className="text-4xl font-black tracking-tight text-[#0F172A] sm:text-5xl">Engineered for Merchants.</h2>
                    <p className="mt-4 text-xl text-[#475569]">Ditch paper for real-time visibility into your business health.</p>
                 </div>
                 <Link to="/register" className="btn-ghost !text-base">Browse all features <Icon name="arrow_forward" className="ml-2" /></Link>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                 {features.map((feature, idx) => (
                    <div key={feature.title} className="premium-card premium-card-hover p-8 group">
                       <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl mb-6 bg-gradient-to-br ${feature.gradient} transition-transform group-hover:scale-110 group-hover:rotate-3 duration-500`}>
                          <Icon name={feature.icon} className="text-[#4F46E5] text-3xl" />
                       </div>
                       <h3 className="text-2xl font-black text-[#0F172A] tracking-tight">{feature.title}</h3>
                       <p className="mt-3 text-lg text-[#475569] leading-relaxed">{feature.description}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* 🧱 HOW IT WORKS */}
        <section className="section-spacing overflow-hidden">
           <div className="section-container">
              <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                 <div>
                    <h2 className="text-4xl font-black tracking-tight text-[#0F172A] sm:text-5xl">Simple Onboarding.</h2>
                    <p className="mt-5 text-xl text-[#475569]">Start managing your business in less than 2 minutes without any complex training.</p>
                    
                    <div className="mt-12 space-y-10">
                       {onboardingSteps.map((step) => (
                          <div key={step.num} className="flex gap-6">
                             <span className="text-4xl font-black text-[#4F46E5]/20">{step.num}</span>
                             <div>
                                <h4 className="text-xl font-bold text-[#0F172A]">{step.title}</h4>
                                <p className="mt-1 text-[#475569]">{step.desc}</p>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
                 
                 <div className="relative">
                    <div className="aspect-square rounded-[40px] bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-2xl">
                       <div className="h-full w-full rounded-[38px] bg-white p-10 flex flex-col justify-center">
                          <Icon name="verified_user" className="text-6xl text-[#4F46E5] mb-6" />
                          <h3 className="text-4xl font-black text-[#0F172A] tracking-tighter">Verified & Secure.</h3>
                          <p className="mt-4 text-xl text-[#475569] leading-relaxed">Join 50k+ merchants who trust us with their life's work. Daily backups and 256-bit encryption come standard.</p>
                       </div>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />
                 </div>
              </div>
           </div>
        </section>

        {/* 💬 TESTIMONIALS SECTION */}
        <section id="testimonials" className="section-spacing bg-[#F1F5F9]/50 border-y border-slate-100">
           <div className="section-container">
              <h2 className="text-center text-4xl font-black tracking-tight text-[#0F172A] mb-16">Loved by merchants everywhere.</h2>
              <div className="grid gap-6 md:grid-cols-3">
                 {testimonials.map((t) => (
                    <div key={t.author} className="premium-card p-8 flex flex-col justify-between">
                       <p className="text-xl text-[#0F172A] font-medium leading-relaxed italic">"{t.quote}"</p>
                       <div className="mt-10 flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-slate-100 grid place-items-center font-black text-[#4F46E5]">
                             {t.author.charAt(0)}
                          </div>
                          <div>
                             <p className="font-bold text-[#0F172A]">{t.author}</p>
                             <p className="text-sm text-[#475569] font-medium">{t.role}</p>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* 📢 CTA SECTION */}
        <section className="section-spacing">
           <div className="section-container">
              <div className="relative rounded-[48px] overflow-hidden bg-gradient-to-br from-[#4F46E5] to-[#6366F1] px-10 py-24 text-center text-white shadow-2xl">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
                 <div className="relative z-10">
                    <h2 className="text-5xl font-black tracking-tight mb-6">Ready to scale your shop?</h2>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12">Join thousands of merchants simplifying operations. No credit card required. Cancel anytime.</p>
                    <div className="flex flex-wrap justify-center gap-5">
                       <Link to="/register" className="btn h-16 px-12 bg-white text-[#4F46E5] text-lg font-black rounded-2xl shadow-xl hover:scale-105 transition-transform">Get Started Free</Link>
                       <button className="btn h-16 px-12 border-2 border-white/30 text-white text-lg font-black rounded-2xl hover:bg-white/10 transition-colors">Speak to Sales</button>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      </main>

      {/* 🧾 FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-16">
         <div className="section-container">
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
               <div>
                  <div className="flex items-center gap-2.5 mb-6">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#6366F1]">
                       <span className="font-black text-white text-base">S</span>
                    </div>
                    <span className="text-lg font-black tracking-tight text-[#0F172A]">ShopLedger</span>
                  </div>
                  <p className="text-sm text-[#475569] leading-6">Premium SaaS for modern shop management. Scale your business with data, not paper.</p>
               </div>
               
               <div>
                  <h5 className="font-black text-[#0F172A] uppercase text-[10px] tracking-widest mb-6">Product</h5>
                  <ul className="space-y-4 text-sm font-semibold text-[#475569]">
                     <li><a href="#" className="hover:text-[#4F46E5] hover:underline underline-offset-4 decoration-2 transition-all">Features</a></li>
                     <li><a href="#" className="hover:text-[#4F46E5] hover:underline underline-offset-4 decoration-2 transition-all">Integrations</a></li>
                     <li><a href="#" className="hover:text-[#4F46E5] hover:underline underline-offset-4 decoration-2 transition-all">Pricing</a></li>
                  </ul>
               </div>

               <div>
                  <h5 className="font-black text-[#0F172A] uppercase text-[10px] tracking-widest mb-6">Company</h5>
                  <ul className="space-y-4 text-sm font-semibold text-[#475569]">
                     <li><a href="#" className="hover:text-[#4F46E5] hover:underline underline-offset-4 decoration-2 transition-all">About Us</a></li>
                     <li><a href="#" className="hover:text-[#4F46E5] hover:underline underline-offset-4 decoration-2 transition-all">Privacy</a></li>
                     <li><a href="#" className="hover:text-[#4F46E5] hover:underline underline-offset-4 decoration-2 transition-all">Terms</a></li>
                  </ul>
               </div>

               <div>
                  <h5 className="font-black text-[#0F172A] uppercase text-[10px] tracking-widest mb-6">Connect</h5>
                  <ul className="space-y-4 text-sm font-semibold text-[#475569]">
                     <li><a href="#" className="hover:text-[#4F46E5] hover:underline underline-offset-4 decoration-2 transition-all">Twitter</a></li>
                     <li><a href="#" className="hover:text-[#4F46E5] hover:underline underline-offset-4 decoration-2 transition-all">LinkedIn</a></li>
                     <li><a href="#" className="hover:text-[#4F46E5] hover:underline underline-offset-4 decoration-2 transition-all">Support</a></li>
                  </ul>
               </div>
            </div>
            
            <div className="mt-20 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
               <p className="text-xs font-bold text-[#94A3B8]">© 2024 ShopLedger Global Inc. Built for merchants.</p>
               <p className="text-xs font-bold text-[#94A3B8]">🔒 Secured by Stripe & SSL</p>
            </div>
         </div>
      </footer>
    </div>
  );
}

export default LandingPage;
