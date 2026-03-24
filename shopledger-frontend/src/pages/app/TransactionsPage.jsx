import { useEffect, useState } from "react";
import api from "../../services/api";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    partyType: 'customer', // customer, supplier
    party_id: '',
    type: 'cash_in', // cash_in, cash_out
    category: 'Payment',
    amount: '',
    txn_date: new Date().toISOString().split('T')[0],
    note: ''
  });

  const fetchData = async () => {
    try {
      const [resTx, resCust, resSup] = await Promise.all([
        api.get('/transactions'),
        api.get('/customers'),
        api.get('/suppliers')
      ]);
      setTransactions(resTx.data.data);
      setCustomers(resCust.data.data);
      setSuppliers(resSup.data.data);
    } catch (err) {
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (!form.party_id) throw new Error(`Select a ${form.partyType}`);
      
      const payload = {
        ...form,
        party_id: parseInt(form.party_id)
      };
      
      await api.post('/transactions', payload);
      toast.success("Transaction recorded!");
      setOpen(false);
      setForm(prev => ({ ...prev, amount: '', note: '' }));
      fetchData();
    } catch (err) {
      toast.error(err.message || "Failed to record transaction");
    }
  };

  if (loading) return <div className="p-10 text-center text-slate-500 animate-pulse">Initializing transactions...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Transactions History</h2>
        <button 
          onClick={() => setOpen(true)} 
          className="btn-primary flex items-center gap-2 px-6 shadow-indigo-500/20" 
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">add_task</span>
          Add Record
        </button>
      </div>

      <div className="premium-card overflow-hidden">
        <div className="table-wrap border-none shadow-none rounded-none">
          <table className="w-full text-sm">
            <thead className="table-head">
              <tr>
                <th className="table-cell">Party Name</th>
                <th className="table-cell">Category</th>
                <th className="table-cell">Type</th>
                <th className="table-cell text-right">Amount</th>
                <th className="table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.length === 0 && (
                 <tr>
                   <td colSpan="5" className="table-cell text-center py-20">
                     <span className="material-symbols-outlined text-4xl text-slate-200 block mb-2">receipt_long</span>
                     <p className="text-slate-400 font-medium tracking-tight">Your transaction ledger is empty.</p>
                   </td>
                 </tr>
              )}
              {transactions.map((tx, idx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="table-cell">
                     <p className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{tx.party_name || 'Walk-in'}</p>
                     <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
                       {tx.party_type}
                     </p>
                  </td>
                  <td className="table-cell">
                    <span className="px-2 py-1 rounded-lg bg-slate-100/80 text-slate-600 text-[11px] font-black uppercase tracking-wide">
                      {tx.category || 'General'}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className={`status-badge ${tx.type === 'cash_in' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${tx.type === 'cash_in' ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
                      {tx.type === 'cash_in' ? 'Money In' : 'Money Out'}
                    </span>
                  </td>
                  <td className={`table-cell text-right font-black text-base ${tx.type === 'cash_in' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {formatCurrency(tx.amount)}
                  </td>
                  <td className="table-cell text-slate-500 font-medium">{formatDate(tx.txn_date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-white/90 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg overflow-hidden rounded-[32px] bg-white border border-slate-200 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-slate-50/50 px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Add Record</h3>
                <button onClick={() => setOpen(false)} className="h-8 w-8 grid place-items-center rounded-full hover:bg-slate-200 transition-colors">
                   <span className="material-symbols-outlined text-slate-400 text-[20px]">close</span>
                </button>
              </div>

              <form className="p-8 space-y-6" onSubmit={handleSave}>
                <div className="flex gap-1 p-1 bg-slate-100 rounded-2xl">
                  <button 
                    type="button" 
                    onClick={() => setForm(f => ({...f, partyType: 'customer', party_id: ''}))} 
                    className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${form.partyType === 'customer' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    Customer
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setForm(f => ({...f, partyType: 'supplier', party_id: ''}))} 
                    className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${form.partyType === 'supplier' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    Supplier
                  </button>
                </div>

                <div>
                  <label className="label">Select {form.partyType}*</label>
                  <select 
                    className="input bg-white border-slate-200" 
                    name="party_id" 
                    value={form.party_id} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="">-- Choose {form.partyType} --</option>
                    {(form.partyType === 'customer' ? customers : suppliers).map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Transaction Type</label>
                    <select className="input bg-white border-slate-200" name="type" value={form.type} onChange={handleChange}>
                       <option value="cash_in">Money In (+)</option>
                       <option value="cash_out">Money Out (-)</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">Amount*</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                      <input 
                        className="input bg-white border-slate-200 pl-8 font-black text-lg" 
                        type="number" 
                        name="amount" 
                        value={form.amount} 
                        onChange={handleChange} 
                        required 
                        placeholder="0" 
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Category</label>
                    <input className="input bg-white border-slate-200" name="category" value={form.category} onChange={handleChange} placeholder="e.g. Sales" />
                  </div>
                  <div>
                    <label className="label">Date</label>
                    <input className="input bg-white border-slate-200" type="date" name="txn_date" value={form.txn_date} onChange={handleChange} />
                  </div>
                </div>

                <div>
                  <label className="label">Note (Optional)</label>
                  <textarea className="input bg-white border-slate-200 min-h-[80px] py-4" name="note" value={form.note} onChange={handleChange} placeholder="Add some details..." />
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setOpen(false)} className="btn-secondary flex-1 rounded-2xl">Discard</button>
                  <button className="btn-primary flex-[1.5] rounded-2xl shadow-indigo-200/50" type="submit">Record Transaction</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TransactionsPage;
