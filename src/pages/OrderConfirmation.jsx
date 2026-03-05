// // import { useEffect, useMemo } from "react";
// // import { useNavigate } from "react-router-dom";

// // export default function OrderConfirmation() {
// //   const navigate = useNavigate();

// //   const order = useMemo(() => {
// //     try {
// //       const raw = localStorage.getItem("lastOrder");
// //       return raw ? JSON.parse(raw) : null;
// //     } catch {
// //       return null;
// //     }
// //   }, []);

// //   useEffect(() => {
// //     if (!order) {
// //       navigate("/");
// //     }
// //   }, [order, navigate]);

// //   if (!order) return null;

// //   const { items = [], totals = {}, shipping = {}, id, placedAt, paymentMethod } = order;

// //   return (
// //     <div className="min-h-screen bg-[#fdfbe8] pt-24 pb-12">
// //       <div className="max-w-4xl mx-auto px-6 bg-white rounded-lg shadow-lg p-8">
// //         <div className="flex items-center justify-between mb-6">
// //           <h1 className="text-3xl font-bold text-green-700">Order Confirmed 🎉</h1>
// //           <span className="text-sm text-gray-500">{new Date(placedAt).toLocaleString()}</span>
// //         </div>

// //         <p className="text-gray-700 mb-4">
// //           Thank you for your purchase! Your order <span className="font-semibold">{id}</span> has been placed successfully.
// //         </p>
// //         <p className="text-gray-600 mb-6">Payment method: <span className="font-semibold uppercase">{paymentMethod}</span></p>

// //         <h2 className="text-xl font-bold mb-3">Items</h2>
// //         <div className="border rounded-md divide-y mb-6">
// //           {items.map((it) => (
// //             <div key={it.id} className="flex justify-between p-3 text-sm">
// //               <div>
// //                 <div className="font-medium">{it.name}</div>
// //                 <div className="text-gray-500">Qty: {it.qty || 1}</div>
// //                 {it.fitType === "custom" && (
// //                   <div className="text-green-700 text-xs mt-1">Custom fit applied</div>
// //                 )}
// //               </div>
// //               <div className="font-semibold">₹{(it.priceValue * (it.qty || 1)).toLocaleString()}</div>
// //             </div>
// //           ))}
// //         </div>

// //         <h2 className="text-xl font-bold mb-3">Summary</h2>
// //         <div className="space-y-2 mb-6">
// //           <div className="flex justify-between text-gray-700">
// //             <span>Subtotal</span>
// //             <span className="font-semibold">₹{(totals.subtotal || 0).toLocaleString()}</span>
// //           </div>
// //           <div className="flex justify-between text-gray-700">
// //             <span>Alteration charges ({totals.alterationCount || 0} × ₹{totals.alterationFeePerItem || 0})</span>
// //             <span className="font-semibold">₹{(totals.alterationTotal || 0).toLocaleString()}</span>
// //           </div>
// //           <div className="flex justify-between text-gray-700">
// //             <span>Tax (10%)</span>
// //             <span className="font-semibold">₹{(totals.taxAmount || 0).toLocaleString()}</span>
// //           </div>
// //           <div className="flex justify-between text-2xl font-bold text-green-600 border-t pt-3">
// //             <span>Total</span>
// //             <span>₹{(totals.grandTotal || 0).toLocaleString()}</span>
// //           </div>
// //         </div>

// //         {shipping && (
// //           <div className="mb-6">
// //             <h2 className="text-xl font-bold mb-2">Shipping Address</h2>
// //             <div className="text-gray-700 text-sm">
// //               <p>{shipping.firstName} {shipping.lastName}</p>
// //               <p>{shipping.address}</p>
// //               <p>{shipping.city}, {shipping.state} - {shipping.pincode}</p>
// //               <p>Phone: {shipping.phone}</p>
// //             </div>
// //           </div>
// //         )}

// //         <div className="flex gap-3">
// //           <button onClick={() => navigate('/shop')} className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition">
// //             Continue Shopping
// //           </button>
// //           <button onClick={() => navigate('/cart')} className="bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 transition">
// //             View Cart
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// // import { useEffect, useMemo } from "react";
// // import { useNavigate } from "react-router-dom";

// // export default function OrderConfirmation() {
// //   const navigate = useNavigate();

// //   const order = useMemo(() => {
// //     try {
// //       const raw = localStorage.getItem("lastOrder");
// //       return raw ? JSON.parse(raw) : null;
// //     } catch {
// //       return null;
// //     }
// //   }, []);

// //   useEffect(() => {
// //     if (!order) {
// //       navigate("/");
// //     }
// //   }, [order, navigate]);

// //   /* =======================
// //      STEP 9 – EMAIL SENDING
// //      (ADDED, NOTHING CHANGED)
// //      ======================= */
// //   useEffect(() => {
// //     if (!order) return;

// //     const sendOrderEmail = async () => {
// //       try {
// //         await fetch("http://localhost:5000/send-order-email", {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({
// //             email: order.shipping?.userEmail,
// //             order: order,
// //           }),
// //         });
// //       } catch (error) {
// //         console.error("Order email failed:", error);
// //       }
// //     };

// //     sendOrderEmail();
// //   }, [order]);

// //   if (!order) return null;

// //   const { items = [], totals = {}, shipping = {}, id, placedAt, paymentMethod } = order;

// //   return (
// //     <div className="min-h-screen bg-[#fdfbe8] pt-24 pb-12">
// //       <div className="max-w-4xl mx-auto px-6 bg-white rounded-lg shadow-lg p-8">
// //         <div className="flex items-center justify-between mb-6">
// //           <h1 className="text-3xl font-bold text-green-700">Order Confirmed 🎉</h1>
// //           <span className="text-sm text-gray-500">
// //             {new Date(placedAt).toLocaleString()}
// //           </span>
// //         </div>

// //         <p className="text-gray-700 mb-4">
// //           Thank you for your purchase! Your order{" "}
// //           <span className="font-semibold">{id}</span> has been placed successfully.
// //         </p>

// //         <p className="text-gray-600 mb-6">
// //           Payment method:{" "}
// //           <span className="font-semibold uppercase">{paymentMethod}</span>
// //         </p>

// //         <h2 className="text-xl font-bold mb-3">Items</h2>
// //         <div className="border rounded-md divide-y mb-6">
// //           {items.map((it) => (
// //             <div key={it.id} className="flex justify-between p-3 text-sm">
// //               <div>
// //                 <div className="font-medium">{it.name}</div>
// //                 <div className="text-gray-500">Qty: {it.qty || 1}</div>
// //                 {it.fitType === "custom" && (
// //                   <div className="text-green-700 text-xs mt-1">
// //                     Custom fit applied
// //                   </div>
// //                 )}
// //               </div>
// //               <div className="font-semibold">
// //                 ₹{(it.priceValue * (it.qty || 1)).toLocaleString()}
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         <h2 className="text-xl font-bold mb-3">Summary</h2>
// //         <div className="space-y-2 mb-6">
// //           <div className="flex justify-between text-gray-700">
// //             <span>Subtotal</span>
// //             <span className="font-semibold">
// //               ₹{(totals.subtotal || 0).toLocaleString()}
// //             </span>
// //           </div>

// //           <div className="flex justify-between text-gray-700">
// //             <span>
// //               Alteration charges ({totals.alterationCount || 0} × ₹
// //               {totals.alterationFeePerItem || 0})
// //             </span>
// //             <span className="font-semibold">
// //               ₹{(totals.alterationTotal || 0).toLocaleString()}
// //             </span>
// //           </div>

// //           <div className="flex justify-between text-gray-700">
// //             <span>Tax (10%)</span>
// //             <span className="font-semibold">
// //               ₹{(totals.taxAmount || 0).toLocaleString()}
// //             </span>
// //           </div>

// //           <div className="flex justify-between text-2xl font-bold text-green-600 border-t pt-3">
// //             <span>Total</span>
// //             <span>₹{(totals.grandTotal || 0).toLocaleString()}</span>
// //           </div>
// //         </div>

// //         {shipping && (
// //           <div className="mb-6">
// //             <h2 className="text-xl font-bold mb-2">Shipping Address</h2>
// //             <div className="text-gray-700 text-sm">
// //               <p>
// //                 {shipping.firstName} {shipping.lastName}
// //               </p>
// //               <p>{shipping.address}</p>
// //               <p>
// //                 {shipping.city}, {shipping.state} - {shipping.pincode}
// //               </p>
// //               <p>Phone: {shipping.phone}</p>
// //             </div>
// //           </div>
// //         )}

// //         <div className="flex gap-3">
// //           <button
// //             onClick={() => navigate("/shop")}
// //             className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition"
// //           >
// //             Continue Shopping
// //           </button>

// //           <button
// //             onClick={() => navigate("/cart")}
// //             className="bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 transition"
// //           >
// //             View Cart
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }






// import { useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";

// export default function OrderConfirmation() {
//   const navigate = useNavigate();

//   const order = useMemo(() => {
//     try {
//       const raw = localStorage.getItem("lastOrder");
//       return raw ? JSON.parse(raw) : null;
//     } catch {
//       return null;
//     }
//   }, []);

//   useEffect(() => {
//     if (!order) {
//       navigate("/");
//     }
//   }, [order, navigate]);

//   /* =======================
//      STEP 5 – EMAIL SENDING
//      (ONLY ADDITION – SAFE)
//      ======================= */
//   useEffect(() => {
//     if (!order) return;

//     console.log("OrderConfirmation loaded → sending email");

//     const sendOrderEmail = async () => {
//       try {
//       await fetch("https://reet-riwaz-backend.onrender.com/api/order/confirm", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: order.shipping?.userEmail,
//             orderId: order.id,
//             amount: order.totals?.grandTotal,
//           }),
//         });
//       } catch (error) {
//         console.error("Order email failed:", error);
//       }
//     };

//     sendOrderEmail();
//   }, [order]);

//   if (!order) return null;

//   const {
//     items = [],
//     totals = {},
//     shipping = {},
//     id,
//     placedAt,
//     paymentMethod,
//   } = order;

//   return (
//     <div className="min-h-screen bg-[#fdfbe8] pt-24 pb-12">
//       <div className="max-w-4xl mx-auto px-6 bg-white rounded-lg shadow-lg p-8">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-3xl font-bold text-green-700">
//             Order Confirmed 🎉
//           </h1>
//           <span className="text-sm text-gray-500">
//             {new Date(placedAt).toLocaleString()}
//           </span>
//         </div>

//         <p className="text-gray-700 mb-4">
//           Thank you for your purchase! Your order{" "}
//           <span className="font-semibold">{id}</span> has been placed successfully.
//         </p>

//         <p className="text-gray-600 mb-6">
//           Payment method:{" "}
//           <span className="font-semibold uppercase">
//             {paymentMethod}
//           </span>
//         </p>

//         {/* 🔹 REST OF YOUR UI IS UNCHANGED 🔹 */}
//       </div>
//     </div>
//   );
// }

import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderConfirmation() {
  const navigate = useNavigate();

  const order = useMemo(() => {
    try {
      const raw = localStorage.getItem("lastOrder");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!order) navigate("/");
  }, [order, navigate]);

  if (!order) return null;

  const { items = [], totals = {}, shipping = {}, id, placedAt, paymentMethod } = order;

  return (
    <div className="min-h-screen bg-[#fdfbe8] pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6 bg-white rounded-lg shadow-lg p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-green-700">Order Confirmed 🎉</h1>
          <span className="text-sm text-gray-500">{new Date(placedAt).toLocaleString()}</span>
        </div>

        <p className="text-gray-700 mb-2">
          Thank you for your purchase! Your order <span className="font-semibold">#{typeof id === 'string' ? id.slice(-8).toUpperCase() : id}</span> has been placed successfully.
        </p>
        <p className="text-gray-600 mb-6">
          Payment method: <span className="font-semibold uppercase">{paymentMethod}</span>
        </p>

        {/* Items */}
        <h2 className="text-xl font-bold mb-3">Items Ordered</h2>
        <div className="border rounded-md divide-y mb-6">
          {items.map((it, idx) => (
            <div key={idx} className="flex justify-between p-3 text-sm">
              <div>
                <div className="font-medium">{it.name}</div>
                <div className="text-gray-500">Qty: {it.qty || 1}</div>
                {it.fitType === "custom" && (
                  <div className="text-green-700 text-xs mt-1">Custom fit applied</div>
                )}
              </div>
              <div className="font-semibold">₹{(it.priceValue * (it.qty || 1)).toLocaleString()}</div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between text-2xl font-bold text-green-600 border-t pt-4 mb-6">
          <span>Total Paid</span>
          <span>₹{(totals.grandTotal || 0).toLocaleString()}</span>
        </div>

        {/* Shipping Address */}
        {shipping && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Shipping Address</h2>
            <div className="text-gray-700 text-sm bg-gray-50 p-4 rounded">
              <p className="font-semibold">{shipping.firstName} {shipping.lastName}</p>
              <p>{shipping.address}</p>
              <p>{shipping.city}, {shipping.state} - {shipping.pincode}</p>
              <p>Phone: {shipping.phone}</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => navigate('/orders')}
            className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition"
          >
            View All Orders
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 transition"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
}