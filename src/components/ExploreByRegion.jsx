import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import ProductReviews from "./ProductReviews";
import { useWishlist } from "../context/WishlistContext";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

function ShareButtons({ product }) {
  const text = `Check out ${product.name} for ${product.price} on ReetRiwaaz! 🛍️`;
  const url = window.location.href;
  return (
    <div className="flex gap-2 mt-3 flex-wrap">
      <span className="text-xs text-gray-500 w-full">Share:</span>
      <a href={`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`} target="_blank" rel="noreferrer"
        className="bg-green-500 text-white text-xs px-3 py-1 rounded-full hover:bg-green-600 transition">📱 WhatsApp</a>
      <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full hover:opacity-90 transition">📸 Instagram</a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`} target="_blank" rel="noreferrer"
        className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-700 transition">👍 Facebook</a>
      <button onClick={() => { navigator.clipboard.writeText(url); alert("Link copied!"); }}
        className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full hover:bg-gray-300 transition">🔗 Copy Link</button>
    </div>
  );
}

const ExploreByRegion = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const navigate = useNavigate();

  const regionData = {
    Rajasthan: [
      { id: "rajasthan-1", name: "Bandhani Saree", desc: "Traditional tie-dye saree from Rajasthan", price: "₹2,499", priceValue: 2499, image: "https://mykaajaipur.com/cdn/shop/files/6-Xh14iris.jpg?v=1723561776" },
      { id: "rajasthan-2", name: "Leheriya Dupatta", desc: "Vibrant leheriya printed dupatta", price: "₹1,199", priceValue: 1199, image: "https://jhakhas.com/cdn/shop/collections/Chiffon_Multicolor_e441abe0-b2fb-4a7e-baa1-36d0840dbe4e.jpg?v=1628246294&width=2048" },
      { id: "rajasthan-3", name: "Rajasthani Poshak", desc: "Traditional Rajasthani attire with mirror work", price: "₹1,199", priceValue: 1199, image: "https://villagerstrend.com/public/uploads/all/7e4I5kqnh4bpTJbnfP8oCqoIwIFoeQbDlPxPtgu9.jpg" },
    ],
    Punjab: [
      { id: "punjab-1", name: "Phulkari Dupatta", desc: "Colorful hand-embroidered dupatta", price: "₹1,499", priceValue: 1499, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzHFBLELdx6uu3x2hyiZ6BYouo6yTvaHpIDA&s" },
      { id: "punjab-2", name: "Patiala Suit", desc: "Classic Punjabi patiala salwar suit", price: "₹1,899", priceValue: 1899, image: "https://www.lavanyathelabel.com/cdn/shop/files/01_lbl101ks461_10.jpg?v=1755064960" },
      { id: "punjab-3", name: "Kurta Pajama", desc: "Classic Punjabi Kurta Pajama", price: "₹1,899", priceValue: 1899, image: "https://www.theamritsaristore.com/cdn/shop/files/Gemini_Generated_Image_45x7lz45x7lz45x7.png?v=1756460210&width=1445" },
    ],
    Gujarat: [
      { id: "gujarat-1", name: "Ghagra Choli", desc: "Traditional garba outfit with mirror work", price: "₹3,299", priceValue: 3299, image: "https://anayadesignerstudio.com/cdn/shop/files/chaniya-choli-for-navratri-online-1.webp?v=1714629370" },
      { id: "gujarat-2", name: "Mirror Work Dupatta", desc: "Handcrafted dupatta with mirror embroidery", price: "₹999", priceValue: 999, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU16yZiTgDKmjvW5lsCEIysyJ-5-4y-9VWVw&s" },
      { id: "gujarat-3", name: "Kediyu", desc: "Embroidered traditional kediyu for men", price: "₹999", priceValue: 999, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCcrZDsaLaLlvHr_k1TJhhxzwqLWkntIRXdw&s" },
    ],
    Bengal: [
      { id: "bengal-1", name: "Red & White Saree", desc: "Iconic Bengali saree for festivals", price: "₹2,199", priceValue: 2199, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4hY72GRHVXUtaJSD9UQKxMK8JDK-D-AO_FQ&s" },
      { id: "bengal-2", name: "Cotton Tant Saree", desc: "Lightweight cotton saree from Bengal", price: "₹1,499", priceValue: 1499, image: "https://m.media-amazon.com/images/I/91iQLltF8qL._AC_UY1100_.jpg" },
      { id: "bengal-3", name: "Dhoti-Kurta Set", desc: "Traditional Bengali dhoti kurta", price: "₹1,499", priceValue: 1499, image: "https://cfw51.rabbitloader.xyz/eyJjIjp0cnVlLCJoIjoibXltYW5kYXAuaW4iLCJ2IjozNTA3MDAwMTg5LCJyIjoxLCJpIjoiMWE5YWE0YzAtMTVlYy00MTZiLWM2N2QtZGQyNTI3NDkzNTAwIn0/wp-content/uploads/2023/06/Vibrant-Color-Bengali-Dhoti-Kurta-for-Wedding.jpg" },
    ],
  };

  const regions = [
    { title: "Rajasthan", image: "https://rajasthancab.b-cdn.net/uploads/blog/1744694612-blog-image.webp" },
    { title: "Punjab", image: "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2021/11/12124443/Punjab.jpg" },
    { title: "Gujarat", image: "https://s7ap1.scene7.com/is/image/incredibleindia/bhadreshwar-jain-temple-kutch-gujarat-1-city-hero?qlt=82&ts=1726734632413" },
    { title: "Bengal", image: "https://www.constructionworld.in/assets/uploads/b2863bce851469df2bf4fa4abcf10fe6.jpg" },
  ];

  const handleBuyNow = (product) => { addToCart(product); navigate("/checkout"); };
  const cartItemCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.priceValue || 0) * (item.qty || 1), 0);

  return (
    <section className="pb-20 pt-10 bg-[#fffde8] border-t-4 border-orange-300">
      {!selectedRegion && (
        <>
          <div className="flex justify-between items-center max-w-6xl mx-auto px-4 mb-10">
            <div>
              <h2 className="text-4xl font-bold text-[#1a1a1a]">Explore by Region</h2>
              <p className="text-gray-600 mt-2">Discover traditional attire from different parts of India</p>
            </div>
            <div className="bg-orange-500 text-white px-4 py-2 rounded-lg">Cart: {cartItemCount} items | ₹{cartTotal.toLocaleString()}</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
            {regions.map((item, index) => (
              <div key={index} onClick={() => setSelectedRegion(item.title)}
                className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer group transition-transform transform hover:scale-105">
                <img src={item.image} alt={item.title} className="w-full h-64 object-cover brightness-90 group-hover:brightness-75 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-semibold drop-shadow-lg">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedRegion && (
        <div className="px-8 py-10">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-4xl font-bold">{selectedRegion} Collection</h2>
            <div className="bg-orange-500 text-white px-4 py-2 rounded-lg">Cart: {cartItemCount} items | ₹{cartTotal.toLocaleString()}</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {regionData[selectedRegion]?.map((p, idx) => {
              const cartItem = cart.find((item) => item.id === p.id);
              const wishlisted = isWishlisted(p.id);
              const selectedSize = selectedSizes[p.id];
              return (
                <div key={idx} className="bg-white rounded-lg shadow-lg p-4 hover:scale-105 transition">
                  <div className="relative">
                    <img src={p.image} alt={p.name} className="rounded-md w-full h-64 object-cover mb-3" />
                    <button onClick={() => toggleWishlist(p)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:scale-110 transition text-xl">
                      {wishlisted ? "❤️" : "🤍"}
                    </button>
                  </div>

                  <h3 className="text-lg font-bold">{p.name}</h3>
                  <p className="text-gray-600 text-sm">{p.desc}</p>
                  <p className="text-green-600 font-semibold mt-1">{p.price}</p>

                  {/* 📏 Size Selector */}
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-1 font-semibold">Select Size:</p>
                    <div className="flex gap-1 flex-wrap">
                      {SIZES.map((size) => (
                        <button key={size} onClick={() => setSelectedSizes((prev) => ({ ...prev, [p.id]: size }))}
                          className={`px-2 py-1 text-xs rounded border font-semibold transition
                            ${selectedSize === size ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-600 border-gray-300 hover:border-orange-400"}`}>
                          {size}
                        </button>
                      ))}
                    </div>
                    {!selectedSize && <p className="text-xs text-red-400 mt-1">Please select a size</p>}
                  </div>

                  {cartItem ? (
                    <div className="flex items-center gap-2 mt-4">
                      <button onClick={() => updateQuantity(p.id, cartItem.qty - 1)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg">−</button>
                      <span className="flex-1 text-center font-semibold">{cartItem.qty}</span>
                      <button onClick={() => updateQuantity(p.id, cartItem.qty + 1)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg">+</button>
                      <button onClick={() => removeFromCart(p.id)} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg">Remove</button>
                    </div>
                  ) : (
                    <div className="flex gap-3 mt-4">
                      <button onClick={() => { if (!selectedSize) return alert("Please select a size first!"); addToCart({ ...p, qty: 1, size: selectedSize }); }}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg w-1/2">Add to Bag</button>
                      <button onClick={() => { if (!selectedSize) return alert("Please select a size first!"); handleBuyNow({ ...p, size: selectedSize }); }}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-1/2">Buy Now</button>
                    </div>
                  )}

                  {/* 📲 Share */}
                  <ShareButtons product={p} />

                  {/* ⭐ Reviews */}
                  <ProductReviews productId={p.id} />
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4 mt-10">
            <button onClick={() => setSelectedRegion(null)} className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600">← Back to Regions</button>
            {cartItemCount > 0 && (
              <button onClick={() => navigate('/cart')} className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">View Cart ({cartItemCount})</button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ExploreByRegion;