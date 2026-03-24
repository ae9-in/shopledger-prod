import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

function SettingsPage() {
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;

  const [pwForm, setPwForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirmPassword) {
       return toast.error("New passwords do not match");
    }
    try {
       await api.post('/auth/change-password', {
         currentPassword: pwForm.currentPassword,
         newPassword: pwForm.newPassword
       });
       toast.success("Password updated successfully!");
       setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
       toast.error(err.response?.data?.error || "Failed to update password");
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <section className="card shadow-sm border-slate-100">
        <h2 className="text-xl font-bold text-slate-800">Shop Profile</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
             <label className="label">Shop Name</label>
             <input className="input bg-slate-50 font-medium" defaultValue={user?.name || ''} readOnly />
          </div>
          <div>
             <label className="label">Registered Phone</label>
             <input className="input bg-slate-50 font-medium" defaultValue={user?.phone || ''} readOnly />
          </div>
          <div className="sm:col-span-2">
             <label className="label">Email Address (Login ID)</label>
             <input className="input bg-slate-50 font-medium" defaultValue={user?.email || ''} readOnly />
          </div>
          <div className="sm:col-span-2">
             <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider bg-slate-50 p-2 rounded-lg text-center border border-slate-100">Contact admin to update shop registration details.</p>
          </div>
        </div>
      </section>

      <section className="card shadow-sm border-slate-100">
        <h2 className="text-xl font-bold text-slate-800">Change Security Password</h2>
        <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={handlePasswordChange}>
          <div className="sm:col-span-2">
             <label className="label">Current Password</label>
             <input className="input" type="password" value={pwForm.currentPassword} onChange={(e) => setPwForm(f => ({...f, currentPassword: e.target.value}))} required />
          </div>
          <div>
             <label className="label">New Password</label>
             <input className="input" type="password" value={pwForm.newPassword} onChange={(e) => setPwForm(f => ({...f, newPassword: e.target.value}))} required minLength="8" />
          </div>
          <div>
             <label className="label">Confirm New Password</label>
             <input className="input" type="password" value={pwForm.confirmPassword} onChange={(e) => setPwForm(f => ({...f, confirmPassword: e.target.value}))} required />
          </div>
          <div className="sm:col-span-2 mt-2">
             <button className="btn-primary w-full shadow-lg shadow-blue-500/20" type="submit">Update Password</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default SettingsPage;
