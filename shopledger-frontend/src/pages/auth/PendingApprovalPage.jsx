import { Link } from "react-router-dom";

function PendingApprovalPage() {
  return (
    <div className="card text-center">
      <span className="status-badge bg-amber-100 text-amber-700">Pending Approval</span>
      <h1 className="mt-4 text-2xl font-bold">Your account is under review</h1>
      <p className="mt-2 text-slate-600">Our team will activate it within 24 hours. You will receive an email once approved.</p>
      <Link className="btn-primary mt-6" to="/login">Go to Login</Link>
    </div>
  );
}

export default PendingApprovalPage;
