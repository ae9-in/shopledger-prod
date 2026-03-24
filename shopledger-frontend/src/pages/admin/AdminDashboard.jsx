import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

function tone(status) {
  if (status === 'active')    return 'bg-emerald-100 text-emerald-700';
  if (status === 'suspended') return 'bg-rose-100 text-rose-700';
  return 'bg-amber-100 text-amber-700';   // pending
}

function AdminDashboard() {
  const [stats, setStats]   = useState(null);
  const [shops, setShops]   = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [statsRes, shopsRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/shops'),
      ]);
      setStats(statsRes.data.data);
      setShops(shopsRes.data.data);
    } catch (err) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleApprove = async (id) => {
    try {
      await api.patch(`/admin/shops/${id}/approve`);
      toast.success('Shop approved');
      fetchData();
    } catch { toast.error('Failed to approve shop'); }
  };

  const handleSuspend = async (id) => {
    try {
      await api.patch(`/admin/shops/${id}/suspend`);
      toast.success('Shop suspended');
      fetchData();
    } catch { toast.error('Failed to suspend shop'); }
  };

  if (loading) return <div className="card text-sm text-slate-500">Loading dashboard...</div>;

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <p className="text-xs text-slate-500">Total Shops</p>
          <p className="mt-1 text-2xl font-bold">{stats?.total ?? '—'}</p>
        </div>
        <div className="card">
          <p className="text-xs text-slate-500">Pending Approval</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">{stats?.pending ?? '—'}</p>
        </div>
        <div className="card">
          <p className="text-xs text-slate-500">Active Shops</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">{stats?.active ?? '—'}</p>
        </div>
        <div className="card">
          <p className="text-xs text-slate-500">Suspended</p>
          <p className="mt-1 text-2xl font-bold text-rose-600">{stats?.suspended ?? '—'}</p>
        </div>
      </div>

      {/* Recent Registrations */}
      <div className="card">
        <h2 className="text-lg font-semibold">Recent Registrations</h2>
        <div className="mt-4 table-wrap">
          <table className="w-full text-sm">
            <thead className="table-head">
              <tr>
                <th className="table-cell">Shop Name</th>
                <th className="table-cell">Email</th>
                <th className="table-cell">Phone</th>
                <th className="table-cell">Registered</th>
                <th className="table-cell">Status</th>
                <th className="table-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shops.length === 0 && (
                <tr>
                  <td className="table-cell text-slate-400" colSpan={6}>No shops registered yet.</td>
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
                    <div className="flex gap-2">
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
