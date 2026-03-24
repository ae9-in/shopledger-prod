function ForgotPasswordPage() {
  return (
    <div className="card">
      <h1 className="text-2xl font-bold">Forgot Password</h1>
      <p className="mt-1 text-sm text-slate-500">Enter email to receive reset code</p>
      <form className="mt-4 space-y-4">
        <div><label className="label">Email</label><input className="input" type="email" placeholder="owner@shop.com" /></div>
        <button className="btn-primary w-full" type="submit">Send Reset Code</button>
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 6 }).map((_, i) => <input key={i} className="input h-11 text-center" maxLength={1} />)}
        </div>
        <div><label className="label">New Password</label><input className="input" type="password" /></div>
        <div><label className="label">Confirm Password</label><input className="input" type="password" /></div>
      </form>
    </div>
  );
}

export default ForgotPasswordPage;
