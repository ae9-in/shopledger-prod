import { useEffect, useState } from "react";
import api from "../../services/api";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import toast from "react-hot-toast";

function ReportsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await api.get('/reports/summary');
      setData(res.data.data);
    } catch (err) {
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="p-10 text-center text-slate-500">Generating report...</div>;
  if (!data) return <div className="p-10 text-center text-rose-500 font-bold">Failed to load data.</div>;

  const { ledger, cash, recent } = data;

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Financial Summary</h2>
        <button onClick={() => window.print()} className="btn-secondary flex items-center gap-2 bg-white shadow-sm border-slate-200">
          <span className="material-symbols-outlined text-[18px]">print</span>
          Print Report
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="card shadow-sm hover:shadow-md transition">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Ledger Metrics</h3>
          <div className="mt-4 space-y-4">
             <div><p className="text-xs text-slate-500">Total Receivable</p><p className="text-2xl font-black text-emerald-600">{formatCurrency(ledger.receivable)}</p></div>
             <div><p className="text-xs text-slate-500">Total Payable</p><p className="text-2xl font-black text-rose-600">{formatCurrency(ledger.payable)}</p></div>
          </div>
        </div>
        <div className="card shadow-sm hover:shadow-md transition">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Cashbook Metrics</h3>
          <div className="mt-4 space-y-4">
             <div><p className="text-xs text-slate-500">Total Cash In</p><p className="text-2xl font-black text-emerald-600">{formatCurrency(cash.total_in)}</p></div>
             <div><p className="text-xs text-slate-500">Total Cash Out</p><p className="text-2xl font-black text-rose-600">{formatCurrency(cash.total_out)}</p></div>
          </div>
        </div>
        <div className="card shadow-sm hover:shadow-md transition bg-gradient-to-br from-slate-50 to-blue-50">
          <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Profit & Loss (Est.)</h3>
          <div className="mt-4 space-y-4">
             <div><p className="text-xs text-slate-500">Gross Result</p><p className={`text-4xl font-black ${(cash.total_in - cash.total_out) >= 0 ? "text-indigo-600" : "text-rose-600"}`}>{formatCurrency(cash.total_in - cash.total_out)}</p></div>
             <p className="text-[10px] text-slate-400 font-bold uppercase">Based on Cashbook In/Out</p>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-5">Recent All-Module Activity</h2>
        <div className="table-wrap">
          <table className="w-full text-sm">
            <thead className="table-head">
              <tr>
                <th className="table-cell">Date</th>
                <th className="table-cell">Source</th>
                <th className="table-cell">Activity</th>
                <th className="table-cell text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((item, idx) => (
                <tr key={`${item.source}-${idx}`} className={idx % 2 ? "bg-slate-50/50" : "bg-white"}>
                  <td className="table-cell text-slate-600">{formatDate(item.date)}</td>
                  <td className="table-cell uppercase text-[10px] font-bold text-slate-400 tracking-wider">[{item.source}]</td>
                  <td className="table-cell font-medium text-slate-700">{item.type}</td>
                  <td className={`table-cell text-right font-black ${item.type === 'IN' || item.type === 'Credit' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {formatCurrency(item.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="rounded-3xl bg-blue-600 p-8 text-white text-center shadow-xl shadow-blue-500/20">
         <h1 className="text-2xl font-black tracking-tight">Automated PDF Reports Coming Soon</h1>
         <p className="mt-2 text-blue-100 font-medium opacity-90">We are integrating detailed PDF exports for tax filing and bank statements. Stay tuned!</p>
      </div>
    </div>
  );
}

export default ReportsPage;
