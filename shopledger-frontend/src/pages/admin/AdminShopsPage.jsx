import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

function tone(status) {
  if (status === 'active')    return 'bg-emerald-100 text-emerald-700';
  if (status === 'suspended') return 'bg-rose-100 text-rose-700';
  return 'bg-amber-100 text-amber-700';
}

function AdminShopsPage() {
  const [shops, setShops]     = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchShops = async () => {
    try {
      const res = await api.get('/admin/shops');
      setShops(res.data.data);
    } catch {
      toast.error('Failed to load shops');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchShops(); }, []);

  const handleApprove = async (id) => {
    try {
      await api.patch(`/admin/shops/${id}/approve`);
      toast.success('Shop approved');
      fetchShops();
    } catch { toast.error('Failed to approve'); }
  };

  const handleSuspend = async (id) => {
    try {
      await api.patch(`/admin/shops/${id}/suspend`);
      toast.success('Shop suspended');
      fetchShops();
    } catch { toast.error('Failed to suspend'); }
  };

  if (loading) return <div className="card text-sm text-slate-500">Loading shops...</div>;

  return (
    <div className="card">
      <h2 className="text-xl font-semibold">Shop Management</h2>
      <div className="mt-4 table-wrap">
        <table className="w-full text-sm">
          <thead className="table-head">
            <tr>
              <th className="table-cell">Shop Name</th>
              <th className="table-cell">Owner Email</th>
              <th className="table-cell">Phone</th>
              <th className="table-cell">Registered</th>
              <th className="table-cell">Status</th>
              <th className="table-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shops.length === 0 && (
              <tr>
                <td className="table-cell text-slate-400" colSpan={6}>No shops found.</td>
              </tr>
            )}
            {shops.map((s, idx) => (
              <tr key={s.id} className={idx % 2 ? 'bg-slate-50' : 'bg-white'}>
                <td className="table-cell font-medium">{s.name}</td>
                <td className="table-cell">{s.owner_email}</td>
                <td className="table-cell">{s.phone}</td>
                <td className="table-cell">{new Date(s.created_at).toLocaleDateString()}</td>
                <td className="table-cell">
                  <span className={`status-badge ${tone(s.status)}`}>{s.status}</span>
                </td>
                <td className="table-cell">
                  <div className="flex gap-2 flex-wrap">
                    {s.status !== 'active' && (
                      <button
                        className="btn"
                        style={{ background: '#00C48C', color: 'white' }}
                        onClick={() => handleApprove(s.id)}
                        type="button"
                      >
                        Approve
                      </button>
                    )}
                    {s.status !== 'suspended' && (
                      <button
                        className="btn-danger"
                        onClick={() => handleSuspend(s.id)}
                        type="button"
                      >
                        Suspend
                      </button>
                    )}
                    <Link className="btn-secondary" to={`/admin/shops/${s.id}`}>
                      View Details
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminShopsPage;
