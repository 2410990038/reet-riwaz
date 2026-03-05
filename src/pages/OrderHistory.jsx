import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import OrderTracking from "../components/OrderTracking";

const BASE_URL = "http://localhost:5000/api";

export default function OrderHistory() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returnRequests, setReturnRequests] = useState([]);
  const [showReturnForm, setShowReturnForm] = useState(null); // orderId
  const [returnReason, setReturnReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoaded || !user) return;
    fetchOrders();
    fetchMyReturns();
  }, [isLoaded, user]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${BASE_URL}/orders/user/id/${user.id}`);
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyReturns = async () => {
    try {
      const res = await fetch(`${BASE_URL}/returns/my/${user.id}`);
      const data = await res.json();
      setReturnRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch returns:", err);
    }
  };

  const submitReturnRequest = async (order) => {
    if (!returnReason.trim()) return alert("Please enter a reason!");
    setSubmitting(true);
    try {
      const res = await fetch(`${BASE_URL}/returns`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order._id,
          clerkUserId: user.id,
          userEmail: user.primaryEmailAddress?.emailAddress,
          items: order.items,
          reason: returnReason,
          totalAmount: order.totalAmount
        })
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Return request submitted successfully!");
        setShowReturnForm(null);
        setReturnReason("");
        fetchMyReturns();
      } else {
        alert(data.message || "Failed to submit request");
      }
    } catch (err) {
      alert("Error submitting request");
    }
    setSubmitting(false);
  };

  const getReturnStatus = (orderId) => {
    return returnRequests.find((r) => r.orderId === orderId);
  };

  const getReturnStatusColor = (status) => {
    switch (status) {
      case "Approved": return "text-green-600 bg-green-50";
      case "Rejected": return "text-red-600 bg-red-50";
      case "Under Review": return "text-blue-600 bg-blue-50";
      default: return "text-yellow-600 bg-yellow-50";
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcf9eb] pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Order History</h1>
          <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-800">← Back</button>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-4">No orders yet.</p>
            <button onClick={() => navigate('/shop')} className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => {
              const returnRequest = getReturnStatus(o._id);
              const canReturn = o.orderStatus === "Delivered" && !returnRequest;

              return (
                <div key={o._id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">Order #{o._id.slice(-8).toUpperCase()}</div>
                      <div className="text-sm text-gray-500">{new Date(o.createdAt).toLocaleString()}</div>
                      <div className={`text-xs mt-1 font-semibold ${
                        o.orderStatus === 'Cancelled' ? 'text-red-500' :
                        o.orderStatus === 'Delivered' ? 'text-green-600' : 'text-orange-500'
                      }`}>
                        {o.orderStatus}
                      </div>
                    </div>
                    <div className="text-green-700 font-bold">₹{o.totalAmount.toLocaleString()}</div>
                  </div>

                  <div className="mt-4 divide-y">
                    {o.items.map((it, idx) => (
                      <div key={idx} className="py-2 flex justify-between text-sm">
                        <div>
                          <div className="font-medium">{it.name}</div>
                          <div className="text-gray-500">Qty: {it.qty || 1}</div>
                          {it.fitType === 'custom' && <span className="text-xs text-green-700">Custom fit</span>}
                        </div>
                        <div className="font-semibold">₹{(it.priceValue * (it.qty || 1)).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>

                  {/* ✅ Order Tracking */}
                  <OrderTracking order={o} />

                  {/* 🔄 Return/Refund Section */}
                  <div className="mt-4 border-t pt-4">
                    {returnRequest ? (
                      <div className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold ${getReturnStatusColor(returnRequest.status)}`}>
                        <span>🔄 Return Request: {returnRequest.status}</span>
                        {returnRequest.adminNote && (
                          <span className="text-xs font-normal ml-2">Note: {returnRequest.adminNote}</span>
                        )}
                      </div>
                    ) : canReturn ? (
                      <div>
                        {showReturnForm === o._id ? (
                          <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                            <p className="text-sm font-semibold text-gray-700 mb-2">Why do you want to return?</p>
                            <textarea
                              value={returnReason}
                              onChange={(e) => setReturnReason(e.target.value)}
                              placeholder="e.g. Wrong size, damaged product, not as described..."
                              rows={3}
                              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                            />
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={() => submitReturnRequest(o)}
                                disabled={submitting}
                                className="flex-1 bg-orange-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 disabled:opacity-50"
                              >
                                {submitting ? "Submitting..." : "Submit Request"}
                              </button>
                              <button
                                onClick={() => { setShowReturnForm(null); setReturnReason(""); }}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setShowReturnForm(o._id)}
                            className="text-sm text-orange-500 hover:text-orange-600 font-semibold border border-orange-300 px-4 py-1.5 rounded-lg hover:bg-orange-50 transition"
                          >
                            🔄 Request Return / Refund
                          </button>
                        )}
                      </div>
                    ) : o.orderStatus !== "Delivered" && (
                      <p className="text-xs text-gray-400">Return available after delivery</p>
                    )}
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500 capitalize">Payment: {o.paymentMethod}</span>
                    <button
                      onClick={() => {
                        localStorage.setItem('lastOrder', JSON.stringify({
                          id: o._id,
                          items: o.items,
                          shipping: o.shippingAddress,
                          paymentMethod: o.paymentMethod,
                          placedAt: o.createdAt,
                          totals: { grandTotal: o.totalAmount }
                        }));
                        navigate('/order-confirmation');
                      }}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View details →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}