import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import { 
  Store, 
  CreditCard, 
  Database, 
  Trash2, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  Globe,
  CalendarDays,
  Smartphone,
  Info,
  ExternalLink,
  ChevronDown,
  RefreshCw,
  Clock,
  Download,
  AlertTriangle,
  Mail
} from "lucide-react";

function SettingsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/shops/profile');
      setProfile(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch shop profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try { await api.post("/auth/logout"); } catch {}
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (loading) return (
    <div className="flex h-[400px] items-center justify-center">
      <RefreshCw className="animate-spin text-blue-500" size={32} />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-black text-slate-900 mb-8 px-2">Settings</h1>
      
      <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
        {/* Sidebar */}
        <div className="w-full lg:w-[320px] space-y-2">
          <TabButton id="profile" icon={Store} label="Book Settings" current={activeTab} set={setActiveTab} />
          <TabButton id="security" icon={ShieldCheck} label="Security & Privacy" current={activeTab} set={setActiveTab} />
          <TabButton id="backup" icon={Database} label="Backup Information" current={activeTab} set={setActiveTab} />
          <TabButton id="plans" icon={CreditCard} label="Plans & Billing" current={activeTab} set={setActiveTab} />
          <TabButton id="recycle" icon={Trash2} label="Recycle Bin" current={activeTab} set={setActiveTab} />
          <TabButton id="help" icon={HelpCircle} label="Help & Support" current={activeTab} set={setActiveTab} />
          <hr className="my-4 border-slate-100" />
          <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-50 transition-all font-bold"
            >
                <LogOut size={20} />
                Logout
            </button>
        </div>

        {/* Content Panel */}
        <div className="flex-grow bg-white border border-slate-100 rounded-3xl shadow-sm p-8">
          {activeTab === 'profile' && <BookSettings profile={profile} onUpdate={fetchProfile} />}
          {activeTab === 'security' && <SecurityPrivacy />}
          {activeTab === 'backup' && <BackupInfo />}
          {activeTab === 'plans' && <PlansBilling />}
          {activeTab === 'recycle' && <RecycleBin />}
          {activeTab === 'help' && <HelpSupport />}
        </div>
      </div>
    </div>
  );
}

const TabButton = ({ id, icon: Icon, label, current, set }) => {
    const active = current === id;
    return (
        <button 
            onClick={() => set(id)}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                active ? 'bg-blue-50 text-blue-600 shadow-sm shadow-blue-100/50' : 'text-slate-500 hover:bg-slate-50'
            }`}
        >
            <div className="flex items-center gap-3 font-bold text-sm tracking-tight">
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                {label}
            </div>
            {active && <ChevronRight size={16} />}
        </button>
    );
};

/* --- TAB: BOOK SETTINGS --- */
function BookSettings({ profile, onUpdate }) {
    const [formData, setFormData] = useState({
        name: profile?.name || '',
        email: profile?.email || '',
        phone: profile?.phone || '',
        currency: profile?.currency || '₹',
        date_format: profile?.date_format || 'DD/MM/YYYY'
    });
    const [confirmDelete, setConfirmDelete] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.patch('/shops/profile', formData);
            toast.success("Profile updated!");
            onUpdate();
        } catch (err) {
            toast.error("Failed to update profile");
        }
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-right-4">
            <section className="space-y-6">
                <div>
                    <h2 className="text-xl font-black text-slate-800">Shop Profile</h2>
                    <p className="text-sm text-slate-400 font-medium">Manage your shop registration and contact details</p>
                </div>
                <form onSubmit={handleUpdate} className="grid md:grid-cols-2 gap-6">
                    <FormGroup label="Shop Name" value={formData.name} onChange={v => setFormData({...formData, name: v})} />
                    <FormGroup label="Owner Email" value={formData.email} onChange={v => setFormData({...formData, email: v})} />
                    <FormGroup label="Phone Number" value={formData.phone} onChange={v => setFormData({...formData, phone: v})} />
                    <div className="md:col-span-2 flex justify-end">
                        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
                            Save Changes
                        </button>
                    </div>
                </form>
            </section>

            <section className="space-y-6 border-t border-slate-50 pt-10">
                <h2 className="text-xl font-black text-slate-800">Currency & Region</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Primary Currency</label>
                        <select 
                            value={formData.currency}
                            onChange={e => setFormData({...formData, currency: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl font-bold text-slate-700 appearance-none"
                        >
                            <option value="₹">Indian Rupee (₹)</option>
                            <option value="$">US Dollar ($)</option>
                            <option value="£">British Pound (£)</option>
                            <option value="€">Euro (€)</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                         <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 font-bold">Date Format</label>
                         <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100 overflow-hidden">
                            {['DD/MM/YYYY', 'MM/DD/YYYY'].map(fmt => (
                                <button 
                                    key={fmt}
                                    onClick={() => setFormData({...formData, date_format: fmt})}
                                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                                        formData.date_format === fmt ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'
                                    }`}
                                >
                                    {fmt}
                                </button>
                            ))}
                         </div>
                    </div>
                </div>
            </section>

            <section className="bg-rose-50/50 border border-rose-100 rounded-3xl p-6 mt-12 space-y-4">
                <div className="flex items-center gap-3 text-rose-600">
                    <AlertTriangle size={20} />
                    <h2 className="text-lg font-black tracking-tight">Danger Zone</h2>
                </div>
                <div className="space-y-4">
                    <p className="text-sm text-rose-800/70 font-medium leading-relaxed">
                        Permanently delete this shop and all associated data. This action is irreversible. 
                        To confirm, please type <span className="font-black underline">{profile?.name}</span> below.
                    </p>
                    <div className="flex gap-4">
                        <input 
                            placeholder="Enter shop name to confirm"
                            className="bg-white border border-rose-200 p-3 rounded-xl flex-grow text-sm font-bold"
                            value={confirmDelete}
                            onChange={e => setConfirmDelete(e.target.value)}
                        />
                        <button 
                            disabled={confirmDelete !== profile?.name}
                            className="bg-rose-600 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest disabled:opacity-30 transition-all hover:bg-rose-700 shadow-xl shadow-rose-100"
                        >
                            Delete Book
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

function FormGroup({ label, value, onChange, type = "text" }) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 font-bold">
                {label}
            </label>
            <input 
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none"
            />
        </div>
    );
}

/* --- TAB: SECURITY & PRIVACY --- */
function SecurityPrivacy() {
    const [pwForm, setPwForm] = useState({ current: '', new: '', confirm: '' });
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        try {
            const res = await api.get('/shops/sessions');
            setSessions(res.data.data);
        } catch {}
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (pwForm.new !== pwForm.confirm) return toast.error("Passwords don't match");
        try {
            await api.post('/auth/change-password', {
                currentPassword: pwForm.current,
                newPassword: pwForm.new
            });
            toast.success("Password changed!");
            setPwForm({ current: '', new: '', confirm: '' });
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to change password");
        }
    };

    const revokeSession = async (id) => {
        try {
            await api.delete(`/shops/sessions/${id}`);
            toast.success("Session revoked");
            fetchSessions();
        } catch {}
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-right-4">
             <section className="space-y-6">
                <div>
                    <h2 className="text-xl font-black text-slate-800">Change Password</h2>
                    <p className="text-sm text-slate-400 font-medium font-bold">Update your login security regularly</p>
                </div>
                <form onSubmit={handleChangePassword} className="grid md:grid-cols-2 gap-6">
                    <FormGroup label="Current Password" type="password" value={pwForm.current} onChange={v => setPwForm({...pwForm, current: v})} />
                    <div className="hidden md:block" />
                    <FormGroup label="New Password" type="password" value={pwForm.new} onChange={v => setPwForm({...pwForm, new: v})} />
                    <FormGroup label="Confirm Password" type="password" value={pwForm.confirm} onChange={v => setPwForm({...pwForm, confirm: v})} />
                    <div className="md:col-span-2 flex justify-end">
                        <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-xl shadow-slate-200 hover:bg-black transition-all">
                            Update Security
                        </button>
                    </div>
                </form>
            </section>

            <section className="space-y-6 border-t border-slate-50 pt-10">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black text-slate-800">Active Sessions</h2>
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{sessions.length} Active</span>
                </div>
                <div className="space-y-3">
                    {sessions.map(s => (
                        <div key={s.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="flex gap-4">
                                <div className="p-2.5 bg-white text-slate-400 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
                                    <Smartphone size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-700">{s.ip_address || 'Unknown IP'}</h4>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase truncate max-w-[200px]">{s.user_agent || 'Web Browser'}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => revokeSession(s.id)}
                                className="text-xs font-black text-rose-500 hover:bg-rose-50 px-4 py-2 rounded-lg transition-all"
                            >
                                Revoke
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

/* --- TAB: BACKUP INFO --- */
function BackupInfo() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-xl font-black text-slate-800">Backup & Infrastructure</h2>
            <div className="grid gap-4">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                             <RefreshCw size={24} />
                        </div>
                        <span className="flex items-center gap-1.5 bg-emerald-100/50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            Synced
                        </span>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Last Backup</p>
                        <h3 className="text-lg font-black text-slate-700 mt-1">Today, 03:45 PM</h3>
                    </div>
                </div>
            </div>
            
            <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-1 font-bold">Database Health</h3>
                <div className="grid grid-cols-3 gap-4">
                    <StatItem label="Customers" value="24" />
                    <StatItem label="Transactions" value="156" />
                    <StatItem label="Cash Items" value="12" />
                </div>
            </div>
        </div>
    );
}
const StatItem = ({ label, value }) => (
    <div className="text-center p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
        <p className="text-xl font-black text-slate-900">{value}</p>
        <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mt-1">{label}</p>
    </div>
);

/* --- TAB: PLANS & BILLING --- */
function PlansBilling() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-xl font-black text-slate-800">Plans & Billing</h2>
            <div className="p-8 bg-blue-600 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl shadow-blue-200">
                <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between">
                        <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em]">Current Plan</span>
                         <span className="bg-white text-blue-600 px-4 py-1.5 rounded-full text-xs font-black">LIFETIME ACCESS</span>
                    </div>
                    <div>
                        <h3 className="text-4xl font-black tracking-tight">Free Tier</h3>
                        <p className="text-blue-100 font-medium mt-2">Perfect for small individual shops</p>
                    </div>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-2 text-sm font-bold"><ShieldCheck size={18} /> Unlimited Customers</li>
                        <li className="flex items-center gap-2 text-sm font-bold"><ShieldCheck size={18} /> Daily Automated Backups</li>
                    </ul>
                    <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-blue-50 transition-all active:scale-95">
                        Upgrade To Pro <span className="opacity-50 ml-1">(Coming Soon)</span>
                    </button>
                </div>
                <CreditCard size={180} className="absolute -right-12 -bottom-12 text-white/10 rotate-12" />
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-1 font-bold">Invoice History</h3>
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-12 text-center text-slate-400 font-medium">
                    <Info size={32} className="mx-auto mb-3 opacity-20" />
                    No transactions found
                </div>
            </div>
        </div>
    );
}

/* --- TAB: RECYCLE BIN --- */
function RecycleBin() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
             <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-black text-slate-800">Recycle Bin</h2>
                    <p className="text-sm text-slate-400 font-medium">Restore or permanently delete data</p>
                </div>
                <button className="text-[11px] font-black text-rose-500 uppercase tracking-widest hover:underline">Empty Bin</button>
            </div>

            <div className="flex gap-2 p-1 bg-slate-50 rounded-2xl border border-slate-100 max-w-fit">
                {['Customers', 'Suppliers', 'Transactions'].map(t => (
                    <button key={t} className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all ${t === 'Customers' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}>
                        {t}
                    </button>
                ))}
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-16 text-center text-slate-400 italic font-medium">
                The Recycle Bin is currently empty
            </div>
        </div>
    );
}

/* --- TAB: HELP & SUPPORT --- */
function HelpSupport() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Help & Documentation</h2>
            
            <div className="grid gap-3">
                <FAQItem q="How does the balance work?" a="ShopLedger calculates your total balance by subtracting total 'Giving' from total 'Receiving' across all parties." />
                <FAQItem q="What is Cash In/Out?" a="Cash In represents money entering your shop till, and Cash Out represents operational expenses or payments made." />
                <FAQItem q="How to add a customer?" a="Navigate to the Customers screen and click the 'Add New Customer' button in the top right corner." />
            </div>

            <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-100/50 space-y-6">
                <div>
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                        <Mail size={20} className="text-blue-500" />
                        Contact Support
                    </h3>
                    <p className="text-sm text-slate-500 font-medium mt-1">Usually responds within 24 hours</p>
                </div>
                <div className="space-y-4">
                    <input className="w-full bg-white border border-blue-100 p-3 rounded-xl text-sm font-bold" placeholder="Subject" />
                    <textarea className="w-full bg-white border border-blue-100 p-3 rounded-xl text-sm font-bold h-32" placeholder="Tell us what's wrong..." />
                    <button className="w-full py-3.5 bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-blue-100">Send Message</button>
                </div>
            </div>

            <div className="pt-4 flex items-center justify-between text-slate-300">
                <p className="text-xs font-bold">ShopLedger Cloud v1.0.0-PRO-BETA</p>
                <button className="flex items-center gap-1 text-xs font-black uppercase tracking-widest hover:text-slate-500 transition-colors">Documentation <ExternalLink size={12} /></button>
            </div>
        </div>
    );
}
const FAQItem = ({ q, a }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white">
            <button 
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-all"
            >
                <span className="text-sm font-bold text-slate-700 tracking-tight">{q}</span>
                <ChevronDown size={18} className={`text-slate-300 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && <div className="p-4 pt-0 text-sm text-slate-500 font-medium border-t border-slate-50 bg-slate-50/20">{a}</div>}
        </div>
    );
}

export default SettingsPage;
