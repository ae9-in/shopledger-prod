import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import toast from "react-hot-toast";

function CustomerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    type: 'Credit',
    amount: '',
    category: 'Payment',
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });

  const fetchData = async () => {
    try {
      const [resCust, resTx] = await Promise.all([
        api.get(`/customers/${id}`),
        api.get('/transactions')
      ]);
      setCustomer(resCust.data.data);
      setTransactions(resTx.data.data.filter(t => t.customer_id === id));
    } catch (err) {
      toast.error("Failed to load customer details");
      navigate('/customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSaveTx = async (e) => {
    e.preventDefault();
    try {
      await api.post('/transactions', { ...form, customer_id: id });
      toast.success("Transaction recorded!");
      setOpen(false);
      setForm({ type: 'Credit', amount: '', category: 'Payment', notes: '', date: new Date().toISOString().split('T')[0] });
      fetchData();
    } catch (err) {
      toast.error("Failed to save transaction");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this customer?")) return;
    try {
      await api.delete(`/customers/${id}`);
      toast.success("Customer deleted");
      navigate('/customers');
    } catch (err) {
      toast.error("Failed to delete customer");
    }
  };

  if (loading) return <div className="p-10 text-center text-slate-500 font-bold">Loading...</div>;
  if (!customer) return <div className="p-10 text-center text-rose-500 font-bold tracking-tight">Customer Not Found.</div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/customers" className="grid h-10 w-10 place-items-center rounded-xl bg-white text-slate-400 hover:text-blue-600 shadow-sm border border-slate-200 transition-all">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{customer.name}</h2>
            <p className="text-sm font-black text-slate-400 uppercase tracking-tighter">{customer.phone || 'No Contact Info'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button onClick={handleDelete} className="px-4 py-2 text-sm font-black text-rose-500 hover:text-rose-700 uppercase tracking-widest transition-all" type="button">Delete</button>
           <button onClick={() => setOpen(true)} className="btn-primary flex items-center gap-2 shadow-lg shadow-blue-500/20" type="button">
             <span className="material-symbols-outlined text-[20px]">add_card</span>
             New Entry
           </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
         <div className="card shadow-md border-l-4 border-l-blue-500 md:col-span-1 bg-white">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Ledger Balance</p>
            <p className={`mt-2 text-4xl font-black ${Number(customer.balance) >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
               {formatCurrency(Math.abs(customer.balance))}
            </p>
            <p className="mt-2 text-xs font-bold text-slate-500 flex items-center gap-1.5 opacity-80 uppercase tracking-wider">
               {Number(customer.balance) >= 0 ? "You will receive" : "You need to pay"}
            </p>
         </div>
         <div className="card shadow-sm md:col-span-2 bg-slate-50/50 border-white">
            <h3 className="text-xs font-black text-slate-400 tracking-widest uppercase mb-4">Profile Information</h3>
            <div className="grid gap-6 sm:grid-cols-2">
               <div><p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Email</p><p className="font-bold text-slate-700">{customer.email || 'N/A'}</p></div>
               <div><p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Address</p><p className="font-bold text-slate-700">{customer.address || 'N/A'}</p></div>
            </div>
         </div>
      </div>

      <div className="card shadow-xl shadow-slate-200/50 border-slate-100">
         <h3 className="text-xl font-black text-slate-800 tracking-tight mb-6">Ledger Timeline</h3>
         <div className="table-wrap">
            <table className="w-full text-sm">
               <thead>
                  <tr className="bg-slate-50 text-slate-400 font-black uppercase tracking-widest text-[10px]">
                     <th className="table-cell">Date</th>
                     <th className="table-cell">Type</th>
                     <th className="table-cell">Category</th>
                     <th className="table-cell text-right">Amount</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {transactions.length === 0 && (
                     <tr><td colSpan="4" className="table-cell text-center py-16 text-slate-400 font-bold uppercase tracking-widest opacity-50">No activity yet.</td></tr>
                  )}
                  {transactions.map((tx) => (
                     <tr key={tx.id}>
                        <td className="table-cell text-slate-500 font-bold">{formatDate(tx.date)}</td>
                        <td className="table-cell">
                           <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${tx.type === "Credit" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                              {tx.type}
                           </span>
                        </td>
                        <td className="table-cell font-bold text-slate-700">{tx.category || 'General'}</td>
                        <td className={`table-cell text-right font-black text-base ${tx.type === "Credit" ? "text-emerald-600" : "text-rose-600"}`}>
                           {formatCurrency(tx.amount)}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in" onClick={() => setOpen(false)}>
          <div className="card w-full max-w-md shadow-2xl p-0 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className={`p-6 text-white ${form.type === 'Credit' ? 'bg-emerald-600' : 'bg-rose-600'}`}>
               <h3 className="text-2xl font-black tracking-tight">{form.type === 'Credit' ? 'Record Credit' : 'Record Payment'}</h3>
               <p className="text-white/80 text-sm font-bold mt-1 opacity-90 uppercase tracking-wider">For {customer.name}</p>
            </div>
            <form className="p-6 space-y-4" onSubmit={handleSaveTx}>
              <div className="grid grid-cols-2 gap-3 bg-slate-100 p-1.5 rounded-2xl">
                 <button type="button" onClick={() => setForm(f => ({...f, type: 'Credit'}))} className={`py-2 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${form.type === 'Credit' ? 'bg-white text-emerald-600 shadow-md' : 'text-slate-500'}`}>Credit Out</button>
                 <button type="button" onClick={() => setForm(f => ({...f, type: 'Debit'}))} className={`py-2 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${form.type === 'Debit' ? 'bg-white text-rose-600 shadow-md' : 'text-slate-500'}`}>Payment In</button>
              </div>
              <div>
                 <label className="text-[10px] font-black uppercase text-slate-400 absolute left-3 top-3.5 z-10">Amount*</label>
                 <span className="absolute left-3 bottom-3 text-slate-400 font-black text-xl">₹</span>
                 <input className="input pl-8 pt-8 pb-3 text-3xl font-black text-slate-900 border-none focus:ring-0 bg-slate-50 rounded-xl" type="number" name="amount" value={form.amount} onChange={(e) => setForm(f => ({...f, amount: e.target.value}))} required placeholder="0.00" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="relative">
                    <label className="text-[10px] font-black uppercase text-slate-400 absolute left-3 top-2.5 z-10">Category</label>
                    <input className="input pt-6" name="category" value={form.category} onChange={(e) => setForm(f => ({...f, category: e.target.value}))} />
                 </div>
                 <div className="relative">
                    <label className="text-[10px] font-black uppercase text-slate-400 absolute left-3 top-2.5 z-10">Date</label>
                    <input className="input pt-6" type="date" name="date" value={form.date} onChange={(e) => setForm(f => ({...f, date: e.target.value}))} />
                 </div>
              </div>
              <textarea className="input min-h-[80px] pt-4" name="notes" placeholder="Notes..." value={form.notes} onChange={(e) => setForm(f => ({...f, notes: e.target.value}))} />
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setOpen(false)} className="px-6 py-2 text-xs font-black text-slate-400 uppercase tracking-widest">Cancel</button>
                <button className={`btn h-12 px-10 text-white font-black text-xs uppercase tracking-widest shadow-lg ${form.type === 'Credit' ? 'bg-emerald-600 shadow-emerald-500/20' : 'bg-rose-600 shadow-rose-500/20'}`} type="submit">Submit Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerDetailPage;
