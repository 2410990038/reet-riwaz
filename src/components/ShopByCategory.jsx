// import { useState } from "react";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";

// const products = {
//   women: [
//     { id: "women-1", name: "Silk Saree", price: "₹2,499", priceValue: 2499, rating: 4.5, desc: "Elegant ethnic silk saree", image: "https://vardanethnic.in/wp-content/uploads/2025/08/Vardan-Ethnic-Ast-Shubharambh-Wholesale-Banarasi-Silk-Saree-Collection-6.webp" },
//     { id: "women-2", name: "Lehenga Set", price: "₹4,999", priceValue: 4999, rating: 4.8, desc: "Traditional bridal lehenga", image: "https://maharanidesigner.com/wp-content/uploads/2020/08/Punjabi-Bridal-Lehenga.jpeg.webp" },
//     { id: "women-3", name: "Kurti", price: "₹1,199", priceValue: 1199, rating: 4.3, desc: "Comfortable cotton kurti", image: "https://wholetex.sgp1.cdn.digitaloceanspaces.com/full/women-printed-cotton-kurti-pant-or-dupatta-set-216.jpg" },
//   ],
//   men: [
//     { id: "men-1", name: "Sherwani", price: "₹3,999", priceValue: 3999, rating: 4.7, desc: "Royal embroidered sherwani", image: "https://i.pinimg.com/736x/90/6c/31/906c31109cfc073f74aaba9e07712947.jpg" },
//     { id: "men-2", name: "Kurta Pajama", price: "₹1,799", priceValue: 1799, rating: 4.4, desc: "Classic festive wear", image: "https://i.etsystatic.com/35384727/r/il/f45eaa/6357957683/il_fullxfull.6357957683_4sny.jpg" },
//     { id: "men-3", name: "Nehru Jacket", price: "₹1,299", priceValue: 1299, rating: 4.6, desc: "Stylish Nehru jacket", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaS2QB_8y1jKvfY_-1U_QR_RcG_5y07THy9g&s" },
//   ],
//   kids: [
//     { id: "kids-1", name: "Ethnic Set", price: "₹999", priceValue: 999, rating: 4.5, desc: "Traditional festive outfit", image: "https://peekaabookids.com/cdn/shop/files/173_b1966b97-0cec-4166-aa24-82fd72e40f74.jpg?v=1756801554&width=533" },
//     { id: "kids-2", name: "Kurta Set", price: "₹899", priceValue: 899, rating: 4.2, desc: "Comfortable cotton kurta", image: "https://www.kidbea.com/cdn/shop/files/m1_1024x1024.jpg?v=1754552947" },
//     { id: "kids-3", name: "Frock", price: "₹1,099", priceValue: 1099, rating: 4.7, desc: "Beautiful party frock", image: "https://lagorii.com/cdn/shop/files/purple-ruffled-net-tailback-frock-with-floral-and-butterfly-embellishment-for-girls-lagorii-kids-1_533x.jpg" },
//   ],
// };

// export default function ShopByCategory() {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
//   const navigate = useNavigate();

//   // Update quantity
//   const handleUpdateQuantity = (productId, newQty) => {
//     updateQuantity(productId, newQty);
//   };

//   // Buy Now: add item to cart (if not already) and go straight to checkout
//   const handleBuyNow = (product) => {
//     addToCart({ ...product, qty: 1 });
//     navigate("/checkout");
//   };

//   const cartItemCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
//   const cartTotal = cart.reduce((sum, item) => sum + item.priceValue * (item.qty || 1), 0);

//   // Handler to open category — cart persists across category changes
//   const openCategory = (cat) => {
//     setSelectedCategory(cat);
//   };

//   return (
//     <div className="px-8 pt-16 pb-8 bg-[#fdfbe8] border-t-4 border-orange-300 ">
//       {!selectedCategory && (
//         <section id="categories">
//           <div className="flex justify-between items-center max-w-6xl mx-auto px-4 mb-10">
//             <div>
//               <h2 className="text-4xl font-bold mb-2">Shop by Category</h2>
//               <p className="text-gray-600">
//                 Explore our curated collections of traditional attire
//               </p>
//             </div>
//             {cartItemCount > 0 && (
//               <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold">
//                 Cart: {cartItemCount} items | ₹{cartTotal.toLocaleString()}
//               </div>
//             )}
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
//             {["women", "men", "kids"].map((cat) => (
//               <div
//                 key={cat}
//                 onClick={() => openCategory(cat)}
//                 className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer block"
//               >
//                 <img
//                   src={
//                     cat === "women"
//                       ? "https://t3.ftcdn.net/jpg/06/40/14/32/360_F_640143291_kvoc9eiNU3XdZXNR2EkLPj0PW2PcJxpz.jpg"
//                       : cat === "men"
//                       ? "https://i.pinimg.com/736x/c4/9c/95/c49c95612836a2d6933f0ba70f8ab64d.jpg"
//                       : "https://www.shutterstock.com/image-photo/kuala-lumpur-malaysia-october-252019-260nw-1541710190.jpg"
//                   }
//                   alt={cat}
//                   className="w-full h-64 object-cover opacity-80 transform transition duration-500 group-hover:scale-110"
//                 />
//                 <h3 className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white capitalize">
//                   {cat === "kids" ? "Kids' Collection" : `${cat}'s Wear`}
//                 </h3>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {selectedCategory && (
//         <section id="productSection" className="px-8 py-16">
//           <div className="flex justify-between items-center mb-10">
//             <h2 className="text-4xl font-bold">{selectedCategory.toUpperCase()} COLLECTION</h2>
//             {cartItemCount > 0 && (
//               <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold">
//                 Cart: {cartItemCount} items | ₹{cartTotal.toLocaleString()}
//               </div>
//             )}
//           </div>

//           <div id="productGrid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
//             {products[selectedCategory].map((p) => {
//               const cartItem = cart.find((item) => item.id === p.id);
//               return (
//                 <div key={p.id} className="bg-white rounded-lg shadow-lg p-4 hover:scale-105 transition">
//                   <img src={p.image} alt={p.name} className="rounded-md w-full h-64 object-contain mb-3" />
//                   <h3 className="text-lg font-bold">{p.name}</h3>
//                   <p className="text-gray-600 text-sm">{p.desc}</p>
//                   <p className="text-yellow-500 mt-1">⭐ {p.rating}</p>
//                   <p className="text-green-600 font-semibold">{p.price}</p>

//                   {cartItem ? (
//                     <div className="flex items-center gap-2 mt-4">
//                       <button
//                         onClick={() => handleUpdateQuantity(p.id, (cartItem.qty || 1) - 1)}
//                         className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
//                       >
//                         −
//                       </button>
//                       <span className="flex-1 text-center font-semibold">{cartItem.qty || 1}</span>
//                       <button
//                         onClick={() => handleUpdateQuantity(p.id, (cartItem.qty || 1) + 1)}
//                         className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg"
//                       >
//                         +
//                       </button>
//                       <button
//                         onClick={() => removeFromCart(p.id)}
//                         className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="flex gap-2 mt-4">
//                       <button
//                         onClick={() => addToCart({ ...p, qty: 1 })}
//                         className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
//                       >
//                         Add to Bag
//                       </button>
//                       <button
//                         onClick={() => handleBuyNow(p)}
//                         className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
//                       >
//                         Buy Now
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* Removed in-page mini cart to avoid popup while adding items */}

//           <div className="flex justify-center gap-4 mt-10">
//             <button onClick={() => setSelectedCategory(null)} className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600">
//               ← Back to Categories
//             </button>
//             {cartItemCount > 0 && (
//               <button onClick={() => navigate('/cart')} className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
//                 View Cart ({cartItemCount})
//               </button>
//             )}
//           </div>
//         </section>
//       )}
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000/api";

export default function ShopByCategory() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  // Fetch products when category is selected
  useEffect(() => {
    if (!selectedCategory) return;
    setLoading(true);
    fetch(`${BASE_URL}/products?category=${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedCategory]);

  const handleUpdateQuantity = (productId, newQty) => {
    updateQuantity(productId, newQty);
  };

  const handleBuyNow = (product) => {
    addToCart({ ...product, qty: 1 });
    navigate("/checkout");
  };

  const cartItemCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.priceValue * (item.qty || 1), 0);

  return (
    <div className="px-8 pt-16 pb-8 bg-[#fdfbe8] border-t-4 border-orange-300">
      {!selectedCategory && (
        <section id="categories">
          <div className="flex justify-between items-center max-w-6xl mx-auto px-4 mb-10">
            <div>
              <h2 className="text-4xl font-bold mb-2">Shop by Category</h2>
              <p className="text-gray-600">Explore our curated collections of traditional attire</p>
            </div>
            {cartItemCount > 0 && (
              <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold">
                Cart: {cartItemCount} items | ₹{cartTotal.toLocaleString()}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
            {["women", "men", "kids"].map((cat) => (
              <div
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer"
              >
                <img
                  src={
                    cat === "women"
                      ? "https://t3.ftcdn.net/jpg/06/40/14/32/360_F_640143291_kvoc9eiNU3XdZXNR2EkLPj0PW2PcJxpz.jpg"
                      : cat === "men"
                      ? "https://i.pinimg.com/736x/c4/9c/95/c49c95612836a2d6933f0ba70f8ab64d.jpg"
                      : "https://www.shutterstock.com/image-photo/kuala-lumpur-malaysia-october-252019-260nw-1541710190.jpg"
                  }
                  alt={cat}
                  className="w-full h-64 object-cover opacity-80 transform transition duration-500 group-hover:scale-110"
                />
                <h3 className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white capitalize">
                  {cat === "kids" ? "Kids' Collection" : `${cat}'s Wear`}
                </h3>
              </div>
            ))}
          </div>
        </section>
      )}

      {selectedCategory && (
        <section className="px-8 py-16">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-4xl font-bold">{selectedCategory.toUpperCase()} COLLECTION</h2>
            {cartItemCount > 0 && (
              <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold">
                Cart: {cartItemCount} items | ₹{cartTotal.toLocaleString()}
              </div>
            )}
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-500 text-xl">Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {products.map((p) => {
                // Use _id from MongoDB
                const productId = p._id;
                const cartItem = cart.find((item) => item.id === productId);
                return (
                  <div key={productId} className="bg-white rounded-lg shadow-lg p-4 hover:scale-105 transition">
                    <img src={p.image} alt={p.name} className="rounded-md w-full h-64 object-contain mb-3" />
                    <h3 className="text-lg font-bold">{p.name}</h3>
                    <p className="text-gray-600 text-sm">{p.desc}</p>
                    <p className="text-yellow-500 mt-1">⭐ {p.rating}</p>
                    <p className="text-green-600 font-semibold">{p.price}</p>

                    {cartItem ? (
                      <div className="flex items-center gap-2 mt-4">
                        <button onClick={() => handleUpdateQuantity(productId, (cartItem.qty || 1) - 1)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg">−</button>
                        <span className="flex-1 text-center font-semibold">{cartItem.qty || 1}</span>
                        <button onClick={() => handleUpdateQuantity(productId, (cartItem.qty || 1) + 1)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg">+</button>
                        <button onClick={() => removeFromCart(productId)} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg">Remove</button>
                      </div>
                    ) : (
                      <div className="flex gap-2 mt-4">
                        <button onClick={() => addToCart({ ...p, id: productId, qty: 1 })} className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600">Add to Bag</button>
                        <button onClick={() => handleBuyNow({ ...p, id: productId })} className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700">Buy Now</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex justify-center gap-4 mt-10">
            <button onClick={() => setSelectedCategory(null)} className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600">
              ← Back to Categories
            </button>
            {cartItemCount > 0 && (
              <button onClick={() => navigate('/cart')} className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
                View Cart ({cartItemCount})
              </button>
            )}
          </div>
        </section>
      )}
    </div>
  );
}