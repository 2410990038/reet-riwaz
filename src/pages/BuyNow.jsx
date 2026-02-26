import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phone: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart:", error);
        setCart([]);
      }
    }
    setLoading(false);
  }, []);

  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.priceValue * item.qty, 0);
  const taxAmount = Math.round(cartTotal * 0.1);
  const finalTotal = cartTotal + taxAmount;

  const handleNextStep = () => {
    if (currentStep === 1 && validateShippingInfo()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validatePaymentInfo()) {
      setCurrentStep(3);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const validateShippingInfo = () => {
    return Object.values(shippingInfo).every((field) => field !== "");
  };

  const validatePaymentInfo = () => {
    return paymentInfo.cardNumber && paymentInfo.expirationDate && paymentInfo.cvv;
  };

  const handleSubmitOrder = () => {
    // Simulate order submission
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    navigate("/thank-you");
  };

  if (loading) {
    return (
      <div className="p-10 bg-[#fdfbe8] min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-10">🛒 Checkout</h1>
        {/* Loading UI */}
      </div>
    );
  }

  return (
    <div className="p-10 bg-[#fdfbe8] min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10">🛒 Checkout</h1>

      <div className="max-w-6xl mx-auto">
        {/* Stepper */}
        <div className="flex justify-center mb-6">
          <div
            className={`step ${currentStep >= 1 ? "completed" : ""}`}
            onClick={() => setCurrentStep(1)}
          >
            Step 1: Shipping
          </div>
          <div
            className={`step ${currentStep >= 2 ? "completed" : ""}`}
            onClick={() => setCurrentStep(2)}
          >
            Step 2: Review
          </div>
          <div
            className={`step ${currentStep >= 3 ? "completed" : ""}`}
            onClick={() => setCurrentStep(3)}
          >
            Step 3: Payment
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={shippingInfo.name}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded"
                />
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="State"
                    value={shippingInfo.state}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                    className="w-1/2 p-3 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Zip Code"
                    value={shippingInfo.zip}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                    className="w-1/2 p-3 border border-gray-300 rounded"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={shippingInfo.email}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Review Order</h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-3 border-b">
                    <div>{item.name}</div>
                    <div>{item.qty} x ₹{item.priceValue.toLocaleString()}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xl font-bold">
                <span>Subtotal:</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mt-2 text-xl font-bold">
                <span>Tax (10%):</span>
                <span>₹{taxAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mt-2 text-xl font-bold">
                <span>Total:</span>
                <span>₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={paymentInfo.cardNumber}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded"
                />
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Expiration Date (MM/YY)"
                    value={paymentInfo.expirationDate}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, expirationDate: e.target.value })}
                    className="w-1/2 p-3 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={paymentInfo.cvv}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                    className="w-1/2 p-3 border border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <button
              onClick={handlePreviousStep}
              disabled={currentStep === 1}
              className="bg-gray-400 text-white px-6 py-3 rounded font-semibold"
            >
              Back
            </button>
            <button
              onClick={currentStep === 3 ? handleSubmitOrder : handleNextStep}
              className="bg-green-600 text-white px-6 py-3 rounded font-semibold"
            >
              {currentStep === 3 ? "Place Order" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
