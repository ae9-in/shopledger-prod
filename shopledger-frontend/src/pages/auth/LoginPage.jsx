import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Try admin login first
      let res;
      try {
        res = await api.post('/auth/admin/login', {
          email: form.email,
          password: form.password,
        });
        // Admin login succeeded
        const { accessToken, admin } = res.data.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('user', JSON.stringify(admin));
        toast.success(`Welcome back, Admin!`);
        navigate('/admin');
        return;
      } catch (adminErr) {
        // Not an admin — fall through to shop login
        if (adminErr.response?.status !== 401 && adminErr.response?.status !== 403 && adminErr.response?.status !== 404) {
          throw adminErr; // real server error
        }
      }

      // 2. Fall through to shop login
      res = await api.post('/auth/login', {
        email: form.email,
        password: form.password,
      });

      console.log('Shop login success');
      if (!res.data?.data) throw new Error('Invalid server response (missing data)');
      
      const { accessToken, shop } = res.data.data;
      if (!accessToken || !shop) throw new Error('Invalid server response (missing token or shop)');

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userRole', 'shop');
      localStorage.setItem('user', JSON.stringify(shop));
      
      toast.success(`Welcome back, ${shop.name}!`);
      navigate('/customers');

    } catch (err) {
      console.error('Login error:', err);
      const msg = err.response?.data?.error || err.message || 'Login failed. Please check your credentials.';
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
      <h1 className="text-3xl font-black tracking-tight text-slate-900">Welcome back</h1>
      <p className="mt-1 text-sm font-medium text-slate-500">Sign in to your ShopLedger account.</p>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="owner@shop.com"
            required
          />
        </div>
        <div>
          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
        </div>

        <div className="text-right">
          <Link className="text-sm text-[#4F46E5] font-semibold" to="/forgot-password">
            Forgot Password?
          </Link>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm font-bold text-red-600 border border-red-100">
            {error}
          </div>
        )}

        <button
          className="btn-primary w-full shadow-xl shadow-indigo-500/20"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm font-medium text-slate-500">
        Don't have an account?{' '}
        <Link className="text-[#4F46E5] font-bold" to="/register">Register</Link>
      </p>
    </div>
  );
}

export default LoginPage;
