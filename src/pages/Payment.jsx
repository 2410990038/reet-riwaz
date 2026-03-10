// // import emailjs from '@emailjs/browser';
// // import { useEffect, useMemo, useState, useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useCart } from "../context/CartContext";
// // import { useUser } from "@clerk/clerk-react";

// // const BASE_URL = "https://reet-riwaz-backend.onrender.com/api";

// // export default function Payment() {
// //   const navigate = useNavigate();
// //   const { cart, clearCart } = useCart();
// //   const { user } = useUser();
// //   const [method, setMethod] = useState("cod");
// //   const [processing, setProcessing] = useState(false);
// //   const [error, setError] = useState("");
// //   const orderPlacedRef = useRef(false);

// //   const amountToPay = Number(localStorage.getItem("amountToPay")) || 0;

// //   const checkoutData = useMemo(() => {
// //     try {
// //       const raw = localStorage.getItem("checkoutData");
// //       return raw ? JSON.parse(raw) : null;
// //     } catch {
// //       return null;
// //     }
// //   }, []);

// //   useEffect(() => {
// //     if (cart.length === 0) {
// //       const lastOrder = localStorage.getItem("lastOrder");
// //       if (!lastOrder) navigate("/cart");
// //     }
// //   }, [cart.length, navigate]);

// //   const handlePayNow = async () => {
// //     if (orderPlacedRef.current) return;
// //     orderPlacedRef.current = true;
// //     setProcessing(true);
// //     setError("");

// //     try {
// //       const customerEmail = user?.primaryEmailAddress?.emailAddress || checkoutData?.email || "";

// //       const orderData = {
// //         clerkUserId: user?.id || "guest",
// //         userEmail: customerEmail,
// //         items: cart.map((item) => ({
// //           productId: item.id,
// //           name: item.name,
// //           priceValue: item.priceValue,
// //           qty: item.qty || 1,
// //           image: item.image || "",
// //           fitType: item.fitType || "standard",
// //           measurements: item.measurements || {}
// //         })),
// //         shippingAddress: checkoutData,
// //         paymentMethod: method,
// //         totalAmount: amountToPay
// //       };

// //       const res = await fetch(`${BASE_URL}/orders/place`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(orderData)
// //       });

// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.message || "Order failed");

// //       const orderForConfirmation = {
// //         id: data.order._id,
// //         items: cart,
// //         amountPaid: amountToPay,
// //         shipping: checkoutData,
// //         paymentMethod: method,
// //         placedAt: data.order.createdAt,
// //         totals: { grandTotal: amountToPay }
// //       };

// //       localStorage.setItem("lastOrder", JSON.stringify(orderForConfirmation));

// //       // Send email to CUSTOMER only once
// //       if (customerEmail) {
// //         emailjs.send(
// //           import.meta.env.VITE_EMAILJS_SERVICE_ID,
// //           import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
// //           {
// //             to_email: customerEmail,
// //             email: customerEmail,
// //             customer_name: `${checkoutData?.firstName || ""} ${checkoutData?.lastName || ""}`.trim(),
// //             order_id: data.order._id.slice(-8).toUpperCase(),
// //             total_amount: `₹${amountToPay.toLocaleString()}`,
// //             payment_method: method.toUpperCase(),
// //             shipping_address: `${checkoutData?.address}, ${checkoutData?.city}, ${checkoutData?.state} - ${checkoutData?.pincode}`,
// //             items: cart.map(i => `${i.name} x${i.qty || 1}`).join(", ")
// //           },
// //           import.meta.env.VITE_EMAILJS_PUBLIC_KEY
// //         ).catch((err) => console.error("Email error:", err));
// //       }

// //       clearCart();
// //       navigate("/order-confirmation");

// //     } catch (err) {
// //       orderPlacedRef.current = false;
// //       setError(err.message || "Something went wrong. Please try again.");
// //       setProcessing(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#fdfbe8] pt-24 pb-12">
// //       <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

// //         <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
// //           <h1 className="text-3xl font-bold mb-6">Payment</h1>

// //           {error && (
// //             <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
// //           )}

// //           <div className="space-y-4">
// //             <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${method === "cod" ? "border-green-500" : "border-gray-300"}`}>
// //               <input type="radio" name="method" checked={method === "cod"} onChange={() => setMethod("cod")} />
// //               Cash on Delivery (Recommended)
// //             </label>

// //             <label className={`block p-3 border rounded-lg ${method === "upi" ? "border-green-500" : "border-gray-300"}`}>
// //               <div className="flex items-center gap-3">
// //                 <input type="radio" name="method" checked={method === "upi"} onChange={() => setMethod("upi")} />
// //                 UPI
// //               </div>
// //               {method === "upi" && (
// //                 <input type="text" placeholder="yourname@upi" className="mt-3 w-full border rounded px-3 py-2" />
// //               )}
// //             </label>

// //             <label className={`block p-3 border rounded-lg ${method === "card" ? "border-green-500" : "border-gray-300"}`}>
// //               <div className="flex items-center gap-3">
// //                 <input type="radio" name="method" checked={method === "card"} onChange={() => setMethod("card")} />
// //                 Credit/Debit Card
// //               </div>
// //               {method === "card" && (
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
// //                   <input type="text" placeholder="Card Number" className="border rounded px-3 py-2 col-span-2" />
// //                   <input type="text" placeholder="MM/YY" className="border rounded px-3 py-2" />
// //                   <input type="text" placeholder="CVV" className="border rounded px-3 py-2" />
// //                   <input type="text" placeholder="Name on Card" className="border rounded px-3 py-2 col-span-2" />
// //                 </div>
// //               )}
// //             </label>

// //             <button
// //               disabled={processing}
// //               onClick={handlePayNow}
// //               className={`w-full mt-4 ${processing ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"} text-white py-3 rounded-lg font-bold transition`}
// //             >
// //               {processing ? "Processing..." : `Pay ₹${amountToPay.toLocaleString()}`}
// //             </button>

// //             <button
// //               onClick={() => navigate("/checkout")}
// //               className="w-full bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 font-semibold transition mt-3"
// //             >
// //               Back to Checkout
// //             </button>
// //           </div>
// //         </div>

// //         <div className="bg-white rounded-lg shadow-lg p-6">
// //           <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

// //           <div className="space-y-2 border-b pb-4 mb-4 max-h-64 overflow-y-auto">
// //             {cart.map((item) => (
// //               <div key={item.id} className="flex justify-between text-sm">
// //                 <span className="text-gray-700">{item.name} × {item.qty || 1}</span>
// //                 <span className="font-semibold">₹{(item.priceValue * (item.qty || 1)).toLocaleString()}</span>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="flex justify-between text-2xl font-bold text-green-600 border-b pb-4 mb-4">
// //             <span>Total</span>
// //             <span>₹{amountToPay.toLocaleString()}</span>
// //           </div>

// //           {checkoutData && (
// //             <div className="mt-6 text-sm text-gray-700">
// //               <h3 className="font-semibold mb-2">Shipping to</h3>
// //               <p>{checkoutData.firstName} {checkoutData.lastName}</p>
// //               <p>{checkoutData.address}</p>
// //               <p>{checkoutData.city}, {checkoutData.state} - {checkoutData.pincode}</p>
// //               <p>Phone: {checkoutData.phone}</p>
// //             </div>
// //           )}
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }



// import emailjs from '@emailjs/browser';
// import { useEffect, useMemo, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useUser } from "@clerk/clerk-react";

// const BASE_URL = "https://reet-riwaz-backend.onrender.com/api";

// export default function Payment() {
//   const navigate = useNavigate();
//   const { cart, clearCart } = useCart();
//   const { user } = useUser();
//   const [method, setMethod] = useState("cod");
//   const [processing, setProcessing] = useState(false);
//   const [error, setError] = useState("");
//   const orderPlacedRef = useRef(false);

//   const amountToPay = Number(localStorage.getItem("amountToPay")) || 0;

//   const checkoutData = useMemo(() => {
//     try {
//       const raw = localStorage.getItem("checkoutData");
//       return raw ? JSON.parse(raw) : null;
//     } catch {
//       return null;
//     }
//   }, []);

//   useEffect(() => {
//     if (cart.length === 0) {
//       const lastOrder = localStorage.getItem("lastOrder");
//       if (!lastOrder) navigate("/cart");
//     }
//   }, [cart.length, navigate]);

//   const handlePayNow = async () => {
//     if (orderPlacedRef.current) return;
//     orderPlacedRef.current = true;
//     setProcessing(true);
//     setError("");

//     try {
//       const customerEmail = user?.primaryEmailAddress?.emailAddress || checkoutData?.email || "";

//       const orderData = {
//         clerkUserId: user?.id || "guest",
//         userEmail: customerEmail,
//         items: cart.map((item) => ({
//           productId: item.id,
//           name: item.name,
//           priceValue: item.priceValue,
//           qty: item.qty || 1,
//           image: item.image || "",
//           fitType: item.fitType || "standard",
//           measurements: item.measurements || {}
//         })),
//         shippingAddress: checkoutData,
//         paymentMethod: method,
//         totalAmount: amountToPay
//       };

//       const res = await fetch(`${BASE_URL}/orders/place`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderData)
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Order failed");

//       const orderForConfirmation = {
//         id: data.order._id,
//         items: cart,
//         amountPaid: amountToPay,
//         shipping: checkoutData,
//         paymentMethod: method,
//         placedAt: data.order.createdAt,
//         totals: { grandTotal: amountToPay }
//       };

//       localStorage.setItem("lastOrder", JSON.stringify(orderForConfirmation));

//       // Send email to CUSTOMER only once
//       if (customerEmail) {
//         emailjs.send(
//           import.meta.env.VITE_EMAILJS_SERVICE_ID,
//           import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
//           {
//             to_email: customerEmail,
//             email: customerEmail,
//             customer_name: `${checkoutData?.firstName || ""} ${checkoutData?.lastName || ""}`.trim(),
//             order_id: data.order._id.slice(-8).toUpperCase(),
//             total_amount: `₹${amountToPay.toLocaleString()}`,
//             payment_method: method.toUpperCase(),
//             shipping_address: `${checkoutData?.address}, ${checkoutData?.city}, ${checkoutData?.state} - ${checkoutData?.pincode}`,
//             items: cart.map(i => `${i.name} x${i.qty || 1}`).join(", ")
//           },
//           import.meta.env.VITE_EMAILJS_PUBLIC_KEY
//         ).catch((err) => console.error("Email error:", err));
//       }

//       clearCart();
//       navigate("/order-confirmation");

//     } catch (err) {
//       orderPlacedRef.current = false;
//       setError(err.message || "Something went wrong. Please try again.");
//       setProcessing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#fdfbe8] pt-24 pb-12">
//       <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

//         <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
//           <h1 className="text-3xl font-bold mb-6">Payment</h1>

//           {error && (
//             <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
//           )}

//           <div className="space-y-4">
//             <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${method === "cod" ? "border-green-500" : "border-gray-300"}`}>
//               <input type="radio" name="method" checked={method === "cod"} onChange={() => setMethod("cod")} />
//               Cash on Delivery (Recommended)
//             </label>

//             <label className={`block p-3 border rounded-lg ${method === "upi" ? "border-green-500" : "border-gray-300"}`}>
//               <div className="flex items-center gap-3">
//                 <input type="radio" name="method" checked={method === "upi"} onChange={() => setMethod("upi")} />
//                 UPI
//               </div>
//               {method === "upi" && (
//                 <input type="text" placeholder="yourname@upi" className="mt-3 w-full border rounded px-3 py-2" />
//               )}
//             </label>

//             <label className={`block p-3 border rounded-lg ${method === "card" ? "border-green-500" : "border-gray-300"}`}>
//               <div className="flex items-center gap-3">
//                 <input type="radio" name="method" checked={method === "card"} onChange={() => setMethod("card")} />
//                 Credit/Debit Card
//               </div>
//               {method === "card" && (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
//                   <input type="text" placeholder="Card Number" className="border rounded px-3 py-2 col-span-2" />
//                   <input type="text" placeholder="MM/YY" className="border rounded px-3 py-2" />
//                   <input type="text" placeholder="CVV" className="border rounded px-3 py-2" />
//                   <input type="text" placeholder="Name on Card" className="border rounded px-3 py-2 col-span-2" />
//                 </div>
//               )}
//             </label>

//             <button
//               disabled={processing}
//               onClick={handlePayNow}
//               className={`w-full mt-4 ${processing ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"} text-white py-3 rounded-lg font-bold transition`}
//             >
//               {processing ? "Processing..." : `Pay ₹${amountToPay.toLocaleString()}`}
//             </button>

//             <button
//               onClick={() => navigate("/checkout")}
//               className="w-full bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 font-semibold transition mt-3"
//             >
//               Back to Checkout
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

//           <div className="space-y-2 border-b pb-4 mb-4 max-h-64 overflow-y-auto">
//             {cart.map((item) => (
//               <div key={item.id} className="flex justify-between text-sm">
//                 <span className="text-gray-700">{item.name} × {item.qty || 1}</span>
//                 <span className="font-semibold">₹{(item.priceValue * (item.qty || 1)).toLocaleString()}</span>
//               </div>
//             ))}
//           </div>

//           <div className="flex justify-between text-2xl font-bold text-green-600 border-b pb-4 mb-4">
//             <span>Total</span>
//             <span>₹{amountToPay.toLocaleString()}</span>
//           </div>

//           {checkoutData && (
//             <div className="mt-6 text-sm text-gray-700">
//               <h3 className="font-semibold mb-2">Shipping to</h3>
//               <p>{checkoutData.firstName} {checkoutData.lastName}</p>
//               <p>{checkoutData.address}</p>
//               <p>{checkoutData.city}, {checkoutData.state} - {checkoutData.pincode}</p>
//               <p>Phone: {checkoutData.phone}</p>
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }


import emailjs from '@emailjs/browser';
import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "@clerk/clerk-react";

const BASE_URL = "https://reet-riwaz-backend.onrender.com/api";

// Global flag — persists even if component re-renders
let globalOrderInProgress = false;

export default function Payment() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user } = useUser();
  const [method, setMethod] = useState("cod");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const hasFired = useRef(false);

  const amountToPay = Number(localStorage.getItem("amountToPay")) || 0;

  const checkoutData = useMemo(() => {
    try {
      const raw = localStorage.getItem("checkoutData");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  // Reset global flag when component mounts fresh
  useEffect(() => {
    globalOrderInProgress = false;
    hasFired.current = false;
  }, []);

  useEffect(() => {
    if (cart.length === 0) {
      const lastOrder = localStorage.getItem("lastOrder");
      if (!lastOrder) navigate("/cart");
    }
  }, [cart.length, navigate]);

  const handlePayNow = async () => {
    // Triple guard against double submission
    if (hasFired.current) return;
    if (globalOrderInProgress) return;
    if (buttonDisabled) return;

    hasFired.current = true;
    globalOrderInProgress = true;
    setButtonDisabled(true);
    setProcessing(true);
    setError("");

    try {
      const customerEmail = user?.primaryEmailAddress?.emailAddress || checkoutData?.email || "";

      const orderData = {
        clerkUserId: user?.id || "guest",
        userEmail: customerEmail,
        items: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          priceValue: item.priceValue,
          qty: item.qty || 1,
          image: item.image || "",
          fitType: item.fitType || "standard",
          measurements: item.measurements || {}
        })),
        shippingAddress: checkoutData,
        paymentMethod: method,
        totalAmount: amountToPay
      };

      const res = await fetch(`${BASE_URL}/orders/place`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Order failed");

      const orderForConfirmation = {
        id: data.order._id,
        items: cart,
        amountPaid: amountToPay,
        shipping: checkoutData,
        paymentMethod: method,
        placedAt: data.order.createdAt,
        totals: { grandTotal: amountToPay }
      };

      localStorage.setItem("lastOrder", JSON.stringify(orderForConfirmation));

      // Send email to customer
      if (customerEmail) {
        emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            to_email: customerEmail,
            email: customerEmail,
            customer_name: `${checkoutData?.firstName || ""} ${checkoutData?.lastName || ""}`.trim(),
            order_id: data.order._id.slice(-8).toUpperCase(),
            total_amount: `₹${amountToPay.toLocaleString()}`,
            payment_method: method.toUpperCase(),
            shipping_address: `${checkoutData?.address}, ${checkoutData?.city}, ${checkoutData?.state} - ${checkoutData?.pincode}`,
            items: cart.map(i => `${i.name} x${i.qty || 1}`).join(", ")
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        ).catch((err) => console.error("Email error:", err));
      }

      clearCart();
      navigate("/order-confirmation");

    } catch (err) {
      // Only reset on error so user can retry
      hasFired.current = false;
      globalOrderInProgress = false;
      setButtonDisabled(false);
      setError(err.message || "Something went wrong. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbe8] pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6">Payment</h1>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
          )}

          <div className="space-y-4">
            <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${method === "cod" ? "border-green-500" : "border-gray-300"}`}>
              <input type="radio" name="method" checked={method === "cod"} onChange={() => setMethod("cod")} />
              Cash on Delivery (Recommended)
            </label>

            <label className={`block p-3 border rounded-lg ${method === "upi" ? "border-green-500" : "border-gray-300"}`}>
              <div className="flex items-center gap-3">
                <input type="radio" name="method" checked={method === "upi"} onChange={() => setMethod("upi")} />
                UPI
              </div>
              {method === "upi" && (
                <input type="text" placeholder="yourname@upi" className="mt-3 w-full border rounded px-3 py-2" />
              )}
            </label>

            <label className={`block p-3 border rounded-lg ${method === "card" ? "border-green-500" : "border-gray-300"}`}>
              <div className="flex items-center gap-3">
                <input type="radio" name="method" checked={method === "card"} onChange={() => setMethod("card")} />
                Credit/Debit Card
              </div>
              {method === "card" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <input type="text" placeholder="Card Number" className="border rounded px-3 py-2 col-span-2" />
                  <input type="text" placeholder="MM/YY" className="border rounded px-3 py-2" />
                  <input type="text" placeholder="CVV" className="border rounded px-3 py-2" />
                  <input type="text" placeholder="Name on Card" className="border rounded px-3 py-2 col-span-2" />
                </div>
              )}
            </label>

            <button
              disabled={buttonDisabled}
              onClick={handlePayNow}
              style={{ pointerEvents: buttonDisabled ? 'none' : 'auto' }}
              className={`w-full mt-4 ${buttonDisabled ? "bg-green-400 cursor-not-allowed opacity-70" : "bg-green-600 hover:bg-green-700"} text-white py-3 rounded-lg font-bold transition`}
            >
              {processing ? "Processing... Please wait" : `Pay ₹${amountToPay.toLocaleString()}`}
            </button>

            {!buttonDisabled && (
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 font-semibold transition mt-3"
              >
                Back to Checkout
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-2 border-b pb-4 mb-4 max-h-64 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-700">{item.name} × {item.qty || 1}</span>
                <span className="font-semibold">₹{(item.priceValue * (item.qty || 1)).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-2xl font-bold text-green-600 border-b pb-4 mb-4">
            <span>Total</span>
            <span>₹{amountToPay.toLocaleString()}</span>
          </div>

          {checkoutData && (
            <div className="mt-6 text-sm text-gray-700">
              <h3 className="font-semibold mb-2">Shipping to</h3>
              <p>{checkoutData.firstName} {checkoutData.lastName}</p>
              <p>{checkoutData.address}</p>
              <p>{checkoutData.city}, {checkoutData.state} - {checkoutData.pincode}</p>
              <p>Phone: {checkoutData.phone}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}