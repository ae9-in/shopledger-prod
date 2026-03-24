import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

function Icon({ name, className = "" }) {
  return <span className={`material-symbols-outlined ${className}`}>{name}</span>;
}

function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const [form, setForm] = useState({
    name:            '',
    email:           '',
    phone:           '',
    password:        '',
    confirmPassword: '',
  });

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/register', {
        name:     form.name,
        email:    form.email,
        phone:    form.phone,
        password: form.password,
      });

      toast.success('Account created! Awaiting admin approval.');
      navigate('/pending-approval');

    } catch (err) {
      const msg = err.response?.data?.error || 'Registration failed. Try again.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card text-left">
      <Link to="/" className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800 transition">
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Back to home
      </Link>
      
      <div className="mb-6 flex items-center justify-between">
        <span className="px-3 py-1 bg-indigo-50 text-[#4F46E5] text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-100">Step 1: Account</span>
        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">2: Verify</span>
      </div>

      <h1 className="text-3xl font-black tracking-tight text-[#0F172A]">Start your journey</h1>
      <p className="mt-1 text-sm font-medium text-slate-500 tracking-tight leading-relaxed">Join 50k+ merchants scaling with ShopLedger.</p>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>

        <div>
          <label className="label">Shop Name</label>
          <input
            className="input"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Agarwal Stores"
            required
          />
        </div>

        <div>
          <label className="label">Owner Email</label>
          <input
            className="input"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="owner@shop.com"
            required
          />
        </div>

        <div>
          <label className="label">Phone Number</label>
          <div className="flex gap-2">
            <select className="input w-24">
              <option>+91</option>
            </select>
            <input
              className="input"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="98765 43210"
              required
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Password</label>
            <input
              className="input"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="label">Confirm Password</label>
            <input
              className="input"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {error && (
          <div className="rounded-xl bg-rose-50 p-4 text-sm font-bold text-rose-600 border border-rose-100 italic">
            {error}
          </div>
        )}

        <button
          className="btn-primary w-full shadow-2xl shadow-indigo-500/20"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>

      </form>

      <p className="mt-6 text-center text-sm font-medium text-slate-500">
        Already have an account?{' '}
        <Link className="text-[#4F46E5] font-bold hover:underline underline-offset-4" to="/login">Login</Link>
      </p>

      <div className="mt-6 p-4 bg-slate-50 border border-slate-100 rounded-xl">
        <p className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-tight">
          <Icon name="verified" className="text-indigo-500 text-base" />
          Review in Progress
        </p>
        <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">Your account will be reviewed and activated within 24 hours.</p>
      </div>
    </div>
  );
}

export default RegisterPage;
