import { useParams } from "react-router-dom";
import { suppliers, partyTransactions } from "../../data/mockData";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

function SupplierDetailPage() {
  const { id } = useParams();
  const supplier = suppliers.find((item) => item.id === id) || suppliers[0];

  return (
    <div className="space-y-4">
      <div className="card flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold">{supplier.name}</h2>
          <p className="text-sm text-slate-500">{supplier.phone} • {supplier.email}</p>
          <p className="mt-2 text-lg font-semibold text-rose-600">To Pay {formatCurrency(Math.abs(supplier.balance))}</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-primary" type="button">+ Add Transaction</button>
          <button className="btn-secondary" type="button">Edit</button>
          <button className="btn-danger" type="button">Delete</button>
        </div>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table className="w-full text-sm">
            <thead className="table-head"><tr><th className="table-cell">Date</th><th className="table-cell">Type</th><th className="table-cell text-right">Amount</th><th className="table-cell">Notes</th></tr></thead>
            <tbody>{partyTransactions.map((tx, idx) => <tr key={tx.id} className={idx % 2 ? "bg-slate-50" : "bg-white"}><td className="table-cell">{formatDate(tx.date)}</td><td className="table-cell">{tx.type === "Sale" ? "Purchase" : tx.type}</td><td className="table-cell text-right">{formatCurrency(tx.amount)}</td><td className="table-cell">{tx.notes}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SupplierDetailPage;
