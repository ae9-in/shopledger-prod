import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

function tone(status) {
  if (status === "active")    return "bg-emerald-100 text-emerald-700";
  if (status === "suspended") return "bg-rose-100 text-rose-700";
  return "bg-amber-100 text-amber-700";
}

function AdminShopDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchShop = async () => {
    try {
      const res = await api.get(`/admin/shops/${id}`);
      setShop(res.data.data);
    } catch {
      toast.error("Shop not found");
      navigate("/admin/shops");
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchShop(); }, [id]);

  const handleApprove = async () => {
    try { await api.patch(`/admin/shops/${id}/approve`); toast.success("Shop approved"); fetchShop(); }
    catch { toast.error("Failed to approve"); }
  };

  const handleSuspend = async () => {
    try { await api.patch(`/admin/shops/${id}/suspend`); toast.success("Shop suspended"); fetchShop(); }
    catch { toast.error("Failed to suspend"); }
  };

  if (loading) return <div className="card text-sm text-slate-500">Loading shop details...</div>;
  if (!shop) return null;

  return (
    <div className="card space-y-5 max-w-lg">
      <button className="btn-secondary" onClick={() => navigate("/admin/shops")} type="button">
        Back to Shops
      </button>
      <h2 className="text-xl font-semibold">{shop.name}</h2>
      <div className="grid gap-3 text-sm">
        <div className="flex justify-between border-b pb-2"><span className="text-slate-500">Email</span><span className="font-medium">{shop.owner_email}</span></div>
        <div className="flex justify-between border-b pb-2"><span className="text-slate-500">Phone</span><span className="font-medium">{shop.phone}</span></div>
        <div className="flex justify-between border-b pb-2"><span className="text-slate-500">Registered</span><span className="font-medium">{new Date(shop.created_at).toLocaleDateString()}</span></div>
        <div className="flex justify-between"><span className="text-slate-500">Status</span><span className={"status-badge " + tone(shop.status)}>{shop.status}</span></div>
      </div>
      <div className="flex gap-3 pt-2">
        {shop.status !== "active" && (<button className="btn" style={{background:"#00C48C",color:"white"}} onClick={handleApprove} type="button">Approve Shop</button>)}
        {shop.status !== "suspended" && (<button className="btn-danger" onClick={handleSuspend} type="button">Suspend Shop</button>)}
      </div>
    </div>
  );
}

export default AdminShopDetail;