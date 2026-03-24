import { useState } from "react";

function VerifyOtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  return (
    <div className="card">
      <h1 className="text-2xl font-bold">Verify Your Email</h1>
      <p className="mt-1 text-sm text-slate-600">We sent a 6-digit code to your@email.com</p>
      <div className="mt-6 flex gap-2">
        {otp.map((digit, idx) => (
          <input key={idx} value={digit} onChange={(e) => { const next = [...otp]; next[idx] = e.target.value.slice(-1); setOtp(next); }} className="input h-12 w-12 text-center" maxLength={1} />
        ))}
      </div>
      <button type="button" className="btn-primary mt-6 w-full">Verify</button>
      <p className="mt-3 text-center text-sm text-slate-500">Resend OTP in 60s</p>
    </div>
  );
}

export default VerifyOtpPage;
