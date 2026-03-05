import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000/api";

export default function AdminPanel() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [tab, setTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [returns, setReturns] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", priceValue: "", rating: 4.5, desc: "", image: "", category: "women", stock: 10 });
  const [adminNotes, setAdminNotes] = useState({});

  const adminEmail = user?.primaryEmailAddress?.emailAddress;
  const headers = { "Content-Type": "application/json", "admin-email": adminEmail || "" };

  useEffect(() => {
    if (!isLoaded || !adminEmail) return;
    fetchAll();
  }, [isLoaded, adminEmail]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [ordersRes, productsRes, statsRes, returnsRes] = await Promise.all([
        fetch(`${BASE_URL}/admin/orders`, { headers }),
        fetch(`${BASE_URL}/admin/products`, { headers }),
        fetch(`${BASE_URL}/admin/stats`, { headers }),
        fetch(`${BASE_URL}/returns/all`, { headers })
      ]);
      const ordersData = await ordersRes.json();
      const productsData = await productsRes.json();
      const statsData = await statsRes.json();
      const returnsData = await returnsRes.json();
      setOrders(Array.isArray(ordersData) ? ordersData : []);
      setProducts(Array.isArray(productsData) ? productsData : []);
      setStats(typeof statsData === 'object' && !Array.isArray(statsData) ? statsData : {});
      setReturns(Array.isArray(returnsData) ? returnsData : []);
    } catch (err) {
      console.error("fetchAll error:", err);
      setOrders([]); setProducts([]); setStats({}); setReturns([]);
    }
    setLoading(false);
  };

  const updateStatus = async (orderId, newStatus) => {
    await fetch(`${BASE_URL}/admin/orders/${orderId}/status`, {
      method: "PUT", headers,
      body: JSON.stringify({ orderStatus: newStatus })
    });
    fetchAll();
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm("Delete this product?")) return;
    await fetch(`${BASE_URL}/admin/products/${productId}`, { method: "DELETE", headers });
    fetchAll();
  };

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) return alert("Fill all required fields!");
    await fetch(`${BASE_URL}/admin/products`, {
      method: "POST", headers,
      body: JSON.stringify({ ...newProduct, priceValue: Number(newProduct.priceValue), stock: Number(newProduct.stock) })
    });
    setNewProduct({ name: "", price: "", priceValue: "", rating: 4.5, desc: "", image: "", category: "women", stock: 10 });
    fetchAll();
  };

  const updateStock = async (productId, newStock) => {
    await fetch(`${BASE_URL}/admin/products/${productId}/stock`, {
      method: "PUT", headers,
      body: JSON.stringify({ stock: Number(newStock) })
    });
    fetchAll();
  };

  const updateReturnStatus = async (returnId, status) => {
    await fetch(`${BASE_URL}/returns/${returnId}/status`, {
      method: "PUT", headers,
      body: JSON.stringify({ status, adminNote: adminNotes[returnId] || "" })
    });
    fetchAll();
  };

  const getReturnStatusColor = (status) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-700";
      case "Rejected": return "bg-red-100 text-red-700";
      case "Under Review": return "bg-blue-100 text-blue-700";
      default: return "bg-yellow-100 text-yellow-700";
    }
  };

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (isLoaded && user?.publicMetadata?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfbe8]">
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">You don't have admin access.</p>
          <button onClick={() => navigate("/")} className="bg-orange-500 text-white px-6 py-2 rounded">Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-6">🛠️ Admin Panel</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {[
            { label: "Total Orders", value: stats.totalOrders || 0, color: "bg-blue-500" },
            { label: "Pending Orders", value: stats.pendingOrders || 0, color: "bg-yellow-500" },
            { label: "Total Products", value: stats.totalProducts || 0, color: "bg-green-500" },
            { label: "Total Revenue", value: `₹${(stats.totalRevenue || 0).toLocaleString()}`, color: "bg-orange-500" },
            { label: "Out of Stock", value: stats.outOfStock || 0, color: "bg-red-500" },
          ].map((s) => (
            <div key={s.label} className={`${s.color} text-white rounded-lg p-4 text-center`}>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button onClick={() => setTab("orders")} className={`px-6 py-2 rounded-lg font-semibold ${tab === "orders" ? "bg-orange-500 text-white" : "bg-white text-gray-700"}`}>Orders</button>
          <button onClick={() => setTab("products")} className={`px-6 py-2 rounded-lg font-semibold ${tab === "products" ? "bg-orange-500 text-white" : "bg-white text-gray-700"}`}>Products</button>
          <button onClick={() => setTab("returns")} className={`px-6 py-2 rounded-lg font-semibold relative ${tab === "returns" ? "bg-orange-500 text-white" : "bg-white text-gray-700"}`}>
            Returns
            {returns.filter(r => r.status === "Requested").length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {returns.filter(r => r.status === "Requested").length}
              </span>
            )}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading...</div>
        ) : (
          <>
            {/* ORDERS TAB */}
            {tab === "orders" && (
              <div className="space-y-4">
                {orders.length === 0 ? <p className="text-gray-500">No orders yet.</p> : orders.map((o) => (
                  <div key={o._id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-start flex-wrap gap-4">
                      <div>
                        <div className="font-bold">Order #{o._id.slice(-8).toUpperCase()}</div>
                        <div className="text-sm text-gray-500">{new Date(o.createdAt).toLocaleString()}</div>
                        <div className="text-sm text-gray-600 mt-1">{o.shippingAddress?.firstName} {o.shippingAddress?.lastName} | {o.userEmail}</div>
                        <div className="text-sm text-gray-600">Items: {o.items?.map(i => i.name).join(", ")}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600 text-lg">₹{o.totalAmount?.toLocaleString()}</div>
                        <div className="text-sm text-gray-500 capitalize">{o.paymentMethod}</div>
                        <select value={o.orderStatus} onChange={(e) => updateStatus(o._id, e.target.value)} className="mt-2 border rounded px-2 py-1 text-sm">
                          {["Placed", "Processing", "Shipped", "Out for Delivery", "Delivered", "Cancelled"].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PRODUCTS TAB */}
            {tab === "products" && (
              <div>
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4">Add New Product</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input placeholder="Name *" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="border rounded px-3 py-2" />
                    <input placeholder="Price (e.g. ₹1,999) *" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="border rounded px-3 py-2" />
                    <input placeholder="Price Value (e.g. 1999) *" value={newProduct.priceValue} onChange={e => setNewProduct({...newProduct, priceValue: e.target.value})} className="border rounded px-3 py-2" />
                    <input placeholder="Rating (e.g. 4.5)" value={newProduct.rating} onChange={e => setNewProduct({...newProduct, rating: e.target.value})} className="border rounded px-3 py-2" />
                    <input placeholder="Description" value={newProduct.desc} onChange={e => setNewProduct({...newProduct, desc: e.target.value})} className="border rounded px-3 py-2" />
                    <input placeholder="Image URL" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} className="border rounded px-3 py-2" />
                    <input placeholder="Stock quantity (e.g. 10)" type="number" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} className="border rounded px-3 py-2" />
                    <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="border rounded px-3 py-2">
                      <option value="women">Women</option>
                      <option value="men">Men</option>
                      <option value="kids">Kids</option>
                    </select>
                    <button onClick={addProduct} className="bg-green-600 text-white rounded px-6 py-2 hover:bg-green-700 font-semibold col-span-1 sm:col-span-2">Add Product</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {products.map((p) => (
                    <div key={p._id} className="bg-white rounded-lg shadow p-4">
                      <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded mb-3" />
                      <div className="font-bold">{p.name}</div>
                      <div className="text-green-600 font-semibold">{p.price}</div>
                      <div className="text-sm text-gray-500 capitalize mb-2">{p.category}</div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {p.inStock ? "✅ In Stock" : "❌ Out of Stock"}
                        </span>
                        <span className="text-xs text-gray-500">Qty: {p.stock ?? 0}</span>
                      </div>
                      <div className="flex gap-2 mb-3">
                        <input type="number" defaultValue={p.stock ?? 0} min="0" className="border rounded px-2 py-1 text-sm w-20" id={`stock-${p._id}`} />
                        <button onClick={() => updateStock(p._id, document.getElementById(`stock-${p._id}`).value)} className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600">Update Stock</button>
                      </div>
                      <button onClick={() => deleteProduct(p._id)} className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-600 text-sm">Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RETURNS TAB */}
            {tab === "returns" && (
              <div className="space-y-4">
                {returns.length === 0 ? (
                  <p className="text-gray-500">No return requests yet.</p>
                ) : returns.map((r) => (
                  <div key={r._id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-start flex-wrap gap-4">
                      <div>
                        <div className="font-bold">Order #{r.orderId.slice(-8).toUpperCase()}</div>
                        <div className="text-sm text-gray-500">{new Date(r.createdAt).toLocaleString()}</div>
                        <div className="text-sm text-gray-600 mt-1">📧 {r.userEmail}</div>
                        <div className="text-sm text-gray-600">Items: {r.items?.map(i => i.name).join(", ")}</div>
                        <div className="text-sm text-orange-600 font-semibold mt-1">Reason: {r.reason}</div>
                        <div className="text-sm font-bold text-green-700 mt-1">Refund: ₹{r.totalAmount?.toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${getReturnStatusColor(r.status)}`}>
                          {r.status}
                        </span>
                      </div>
                    </div>

                    {/* Admin Actions */}
                    <div className="mt-4 border-t pt-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Admin Note (optional):</p>
                      <input
                        type="text"
                        placeholder="e.g. Refund will be processed in 5-7 days"
                        value={adminNotes[r._id] || r.adminNote || ""}
                        onChange={(e) => setAdminNotes(prev => ({ ...prev, [r._id]: e.target.value }))}
                        className="w-full border rounded px-3 py-2 text-sm mb-3"
                      />
                      <div className="flex gap-2 flex-wrap">
                        <button onClick={() => updateReturnStatus(r._id, "Under Review")}
                          className={`px-4 py-1.5 rounded text-sm font-semibold ${r.status === "Under Review" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700 hover:bg-blue-200"}`}>
                          🔍 Under Review
                        </button>
                        <button onClick={() => updateReturnStatus(r._id, "Approved")}
                          className={`px-4 py-1.5 rounded text-sm font-semibold ${r.status === "Approved" ? "bg-green-500 text-white" : "bg-green-100 text-green-700 hover:bg-green-200"}`}>
                          ✅ Approve
                        </button>
                        <button onClick={() => updateReturnStatus(r._id, "Rejected")}
                          className={`px-4 py-1.5 rounded text-sm font-semibold ${r.status === "Rejected" ? "bg-red-500 text-white" : "bg-red-100 text-red-700 hover:bg-red-200"}`}>
                          ❌ Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}