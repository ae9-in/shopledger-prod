function ResetPasswordPage() {
  return (
    <div className="card">
      <h1 className="text-2xl font-bold">Reset Password</h1>
      <p className="mt-1 text-sm text-slate-500">Set a new password for your account.</p>
      <form className="mt-4 space-y-4">
        <div><label className="label">New Password</label><input className="input" type="password" /></div>
        <div><label className="label">Confirm New Password</label><input className="input" type="password" /></div>
        <button className="btn-primary w-full" type="submit">Update Password</button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
