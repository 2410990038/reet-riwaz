import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { getAdminProducts, createProduct, deleteProductData, getAdminStats } from "../utils/api";

const ADMIN_EMAIL = "angelpreetk2315@gmail.com";
const BASE_URL = "https://reet-riwaz-backend.onrender.com/api";

export default function AdminPanel() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [tab, setTab] = useState("products");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    priceValue: "",
    rating: 4.5,
    desc: "",
    image: "",
    category: "women",
    stock: 10
  });

  const adminEmail = user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    if (!isLoaded || !adminEmail) return;
    if (adminEmail !== ADMIN_EMAIL) return;
    fetchAll();
  }, [isLoaded, adminEmail]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const productsData = await getAdminProducts(adminEmail);
      setProducts(Array.isArray(productsData) ? productsData : []);

      const statsData = await getAdminStats(adminEmail);
      setStats(typeof statsData === "object" && !Array.isArray(statsData) ? statsData : {});

      const ordersRes = await fetch(`${BASE_URL}/admin/orders`, {
        headers: { "admin-email": adminEmail }
      });
      const ordersData = await ordersRes.json();
      setOrders(Array.isArray(ordersData) ? ordersData : []);
    } catch (err) {
      console.error("fetchAll error:", err);
    }
    setLoading(false);
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      return alert("Please fill all required fields!");
    }

    try {
      const productData = {
        ...newProduct,
        priceValue: Number(newProduct.priceValue),
        stock: Number(newProduct.stock),
        rating: Number(newProduct.rating)
      };

      const result = await createProduct(adminEmail, productData);

      if (result.message === "Product added") {
        alert("Product added successfully!");
        setNewProduct({
          name: "",
          price: "",
          priceValue: "",
          rating: 4.5,
          desc: "",
          image: "",
          category: "women",
          stock: 10
        });
        fetchAll();
      }
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Error adding product");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const result = await deleteProductData(adminEmail, productId);
      if (result.message === "Product deleted") {
        alert("Product deleted successfully!");
        fetchAll();
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${BASE_URL}/admin/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "admin-email": adminEmail
        },
        body: JSON.stringify({ orderStatus: newStatus })
      });
      if (res.ok) {
        fetchAll();
      }
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (isLoaded && adminEmail !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfbe8]">
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">You don't have admin access.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Orders", value: stats.totalOrders || 0, color: "bg-blue-500" },
            { label: "Pending Orders", value: stats.pendingOrders || 0, color: "bg-yellow-500" },
            { label: "Total Products", value: stats.totalProducts || 0, color: "bg-green-500" },
            {
              label: "Total Revenue",
              value: `?${(stats.totalRevenue || 0).toLocaleString()}`,
              color: "bg-orange-500"
            }
          ].map((s) => (
            <div key={s.label} className={`${s.color} text-white rounded-lg p-4 text-center`}>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setTab("products")}
            className={`px-6 py-2 rounded-lg font-semibold ${
              tab === "products" ? "bg-orange-500 text-white" : "bg-white text-gray-700"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setTab("orders")}
            className={`px-6 py-2 rounded-lg font-semibold ${
              tab === "orders" ? "bg-orange-500 text-white" : "bg-white text-gray-700"
            }`}
          >
            Orders
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading...</div>
        ) : (
          <>
            {tab === "products" && (
              <div>
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4">? Add New Product</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      placeholder="Product Name *"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="border rounded px-3 py-2"
                    />
                    <input
                      placeholder="Display Price (e.g. ?1,999) *"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="border rounded px-3 py-2"
                    />
                    <input
                      placeholder="Price Value (e.g. 1999) *"
                      type="number"
                      value={newProduct.priceValue}
                      onChange={(e) => setNewProduct({ ...newProduct, priceValue: e.target.value })}
                      className="border rounded px-3 py-2"
                    />
                    <input
                      placeholder="Rating (0-5)"
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={newProduct.rating}
                      onChange={(e) => setNewProduct({ ...newProduct, rating: e.target.value })}
                      className="border rounded px-3 py-2"
                    />
                    <textarea
                      placeholder="Description"
                      value={newProduct.desc}
                      onChange={(e) => setNewProduct({ ...newProduct, desc: e.target.value })}
                      className="border rounded px-3 py-2 sm:col-span-2"
                      rows="3"
                    />
                    <input
                      placeholder="Image URL"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                      className="border rounded px-3 py-2 sm:col-span-2"
                    />
                    <input
                      placeholder="Stock Quantity"
                      type="number"
                      min="0"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      className="border rounded px-3 py-2"
                    />
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="border rounded px-3 py-2"
                    >
                      <option value="women">Women</option>
                      <option value="men">Men</option>
                      <option value="kids">Kids</option>
                    </select>
                    <button
                      onClick={handleAddProduct}
                      className="bg-green-600 text-white rounded px-6 py-2 hover:bg-green-700 font-semibold sm:col-span-2"
                    >
                      Add Product
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold mb-4">?? All Products ({products.length})</h2>
                  {products.length === 0 ? (
                    <p className="text-gray-500">No products yet. Add your first product above!</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {products.map((p) => (
                        <div key={p._id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-40 object-cover bg-gray-200"
                          />
                          <div className="p-3">
                            <h3 className="font-semibold text-sm line-clamp-2">{p.name}</h3>
                            <p className="text-green-600 font-bold text-sm">{p.price}</p>
                            <p className="text-xs text-gray-500 capitalize mb-2">{p.category}</p>
                            <p className="text-xs text-gray-600 mb-3">
                              Stock: <span className="font-semibold">{p.stock}</span>
                            </p>
                            <button
                              onClick={() => handleDeleteProduct(p._id)}
                              className="w-full bg-red-500 text-white py-1.5 rounded hover:bg-red-600 text-xs font-semibold"
                            >
                               Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {tab === "orders" && (
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <p className="text-gray-500">No orders yet.</p>
                ) : (
                  orders.map((o) => (
                    <div key={o._id} className="bg-white rounded-lg shadow p-6">
                      <div className="flex justify-between items-start flex-wrap gap-4">
                        <div>
                          <div className="font-bold">Order #{o._id.slice(-8).toUpperCase()}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(o.createdAt).toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {o.shippingAddress?.firstName} {o.shippingAddress?.lastName} | {o.userEmail}
                          </div>
                          <div className="text-sm text-gray-600">
                            Items: {o.items?.map((i) => i.name).join(", ")}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600 text-lg">
                            ?{o.totalAmount?.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500 capitalize">{o.paymentMethod}</div>
                          <select
                            value={o.orderStatus}
                            onChange={(e) => handleUpdateOrderStatus(o._id, e.target.value)}
                            className="mt-2 border rounded px-2 py-1 text-sm"
                          >
                            {[
                              "Placed",
                              "Processing",
                              "Shipped",
                              "Out for Delivery",
                              "Delivered",
                              "Cancelled"
                            ].map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
