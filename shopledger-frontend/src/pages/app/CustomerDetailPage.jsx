import { useState } from "react";
import { useParams } from "react-router-dom";
import { customers, partyTransactions } from "../../data/mockData";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

function CustomerDetailPage() {
  const { id } = useParams();
  const customer = customers.find((item) => item.id === id) || customers[0];
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="card flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">{customer.name}</h2>
          <p className="text-sm text-slate-500">{customer.phone} • {customer.email}</p>
          <p className={`mt-2 text-lg font-semibold ${customer.balance >= 0 ? "text-emerald-600" : "text-rose-600"}`}>{customer.balance >= 0 ? "To Receive" : "To Pay"} {formatCurrency(Math.abs(customer.balance))}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setOpen(true)} className="btn-primary">+ Add Transaction</button>
          <button type="button" className="btn-secondary">Send Reminder</button>
          <button type="button" className="btn-secondary">Edit</button>
          <button type="button" className="btn-danger">Delete</button>
        </div>
      </div>

      <div className="card">
        <div className="mb-3 flex flex-wrap gap-2"><input className="input max-w-[220px]" type="date" /><select className="input max-w-[220px]"><option>All Types</option><option>Sale</option><option>Payment</option><option>Return</option></select></div>
        <div className="table-wrap">
          <table className="w-full text-sm">
            <thead className="table-head"><tr><th className="table-cell">Date</th><th className="table-cell">Type</th><th className="table-cell text-right">Amount</th><th className="table-cell">Notes</th><th className="table-cell text-right">Actions</th></tr></thead>
            <tbody>
              {partyTransactions.map((tx, idx) => (
                <tr key={tx.id} className={idx % 2 ? "bg-slate-50" : "bg-white"}>
                  <td className="table-cell">{formatDate(tx.date)}</td><td className="table-cell">{tx.type}</td><td className="table-cell text-right">{formatCurrency(tx.amount)}</td><td className="table-cell">{tx.notes}</td><td className="table-cell text-right">? ??</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm">Opening Balance + Total Credit - Total Debit = <span className="font-semibold">Current Balance</span></p>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-slate-900/40 p-4" onClick={() => setOpen(false)}>
          <div className="card w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold">Add Transaction</h3>
            <form className="mt-3 grid gap-3">
              <div><label className="label">Type</label><div className="flex gap-2"><button type="button" className="btn-primary">Sale</button><button type="button" className="btn-secondary">Payment Received</button><button type="button" className="btn-secondary">Return</button></div></div>
              <div><label className="label">Amount</label><input className="input" inputMode="decimal" placeholder="Rs 0" /></div>
              <div><label className="label">Date</label><input className="input" type="date" /></div>
              <div><label className="label">Notes</label><input className="input" /></div>
              <div className="flex justify-end gap-2"><button type="button" onClick={() => setOpen(false)} className="btn-secondary">Cancel</button><button className="btn-primary" type="submit">Save</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerDetailPage;
