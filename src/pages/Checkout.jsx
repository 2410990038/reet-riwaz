import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import StitchingCostEstimator from "../components/StitchingCostEstimator";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart } = useCart();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  // Redirect if no items
  if (cart.length === 0) {
    return (
      <div className="p-10 bg-[#fdfbe8] min-h-screen flex items-center justify-center">
        <div className="text-center bg-white rounded-lg shadow-lg p-8">
          <p className="text-2xl font-bold text-gray-700 mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600"
          >
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  // Base cart total
  const cartTotal = cart.reduce((sum, item) => sum + item.priceValue * (item.qty || 1), 0);

  const taxAmount = Math.round(cartTotal * 0.1);

  // 🔥 Stitching Cost Logic
  const stitchOptions = JSON.parse(localStorage.getItem("stitchOptions")) || {};
  const stitchCost =
    500 +
    (stitchOptions.sleeve || 0) +
    (stitchOptions.neck || 0) +
    (stitchOptions.fabric || 0) +
    (stitchOptions.embroidery || 0);

  const finalTotal = cartTotal + taxAmount + stitchCost;

  // Form Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🟢 UPDATED FUNCTION HERE
  const handleProceedToPayment = () => {
    if (validateForm()) {
      localStorage.setItem("checkoutData", JSON.stringify(formData));
      localStorage.setItem("amountToPay", finalTotal); // ⭐ Added
      navigate("/payment");
    }
  };

  return (
    <div className="p-10 bg-[#fdfbe8] min-h-screen pt-24">
      <h1 className="text-4xl font-bold text-center mb-10">Checkout</h1>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* FORM */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">

              <h2 className="text-2xl font-bold mb-6">Delivery Address</h2>
              
              {/* 🔥 Stitching Component */}
              <div className="mb-10">
                <StitchingCostEstimator />
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`} placeholder="John"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`} placeholder="Doe"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`} placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`} placeholder="9876543210"
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
                <textarea
                  name="address" value={formData.address} onChange={handleInputChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`} placeholder="123 Main St" rows="3"
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                  <input
                    type="text" name="city" value={formData.city} onChange={handleInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    }`} placeholder="Mumbai"
                  />
                  {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                  <input
                    type="text" name="state" value={formData.state} onChange={handleInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 ${
                      errors.state ? "border-red-500" : "border-gray-300"
                    }`} placeholder="Maharashtra"
                  />
                  {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode *</label>
                  <input
                    type="text" name="pincode" value={formData.pincode} onChange={handleInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 ${
                      errors.pincode ? "border-red-500" : "border-gray-300"
                    }`} placeholder="400001"
                  />
                  {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">

              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 border-b pb-4 mb-4 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.name} × {item.qty || 1}
                    </span>
                    <span className="font-semibold">
                      ₹{(item.priceValue * (item.qty || 1)).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Block */}
              <div className="space-y-3 border-b pb-4 mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{cartTotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Stitching Cost</span>
                  <span className="font-semibold">₹{stitchCost.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Tax (10%)</span>
                  <span className="font-semibold">₹{taxAmount.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
              </div>

              {/* Final Total */}
              <div className="flex justify-between text-2xl font-bold mb-6 text-green-600">
                <span>Total</span>
                <span>₹{finalTotal.toLocaleString()}</span>
              </div>

              <button
                onClick={handleProceedToPayment}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-bold transition"
              >
                Proceed to Payment
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="w-full bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 font-semibold transition mt-3"
              >
                Back to Cart
              </button>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
