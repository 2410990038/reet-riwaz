// 

import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000/api";

export default function OrderHistory() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(`${BASE_URL}/orders/my/${user.id}`);
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isLoaded, user]);

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
            {orders.map((o) => (
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
                        {it.fitType === 'custom' && (
                          <span className="text-xs text-green-700">Custom fit</span>
                        )}
                      </div>
                      <div className="font-semibold">₹{(it.priceValue * (it.qty || 1)).toLocaleString()}</div>
                    </div>
                  ))}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}