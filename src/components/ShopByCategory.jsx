import { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import SearchFilter from "./SearchFilter";
import ProductReviews from "./ProductReviews";
import { useWishlist } from "../context/WishlistContext";

const BASE_URL = "http://localhost:5000/api";
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

// 🔍 Zoom Image Component
function ZoomImage({ src, alt, outOfStock }) {
  const [zoomed, setZoomed] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  };

  return (
    <div
      ref={imgRef}
      className={`relative w-full h-64 overflow-hidden rounded-md mb-3 cursor-zoom-in ${outOfStock ? "opacity-50" : ""}`}
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => setZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain transition-transform duration-200"
        style={{
          transform: zoomed ? "scale(2)" : "scale(1)",
          transformOrigin: `${pos.x}% ${pos.y}%`,
        }}
      />
      {/* Zoom hint */}
      {!zoomed && (
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-40 text-white text-xs px-2 py-0.5 rounded-full pointer-events-none">
          🔍 Hover to zoom
        </div>
      )}
    </div>
  );
}

export default function ShopByCategory() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState({});
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedCategory) return;
    setLoading(true);
    fetch(`${BASE_URL}/products?category=${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => {
        const result = Array.isArray(data) ? data : [];
        setProducts(result);
        setFilteredProducts(result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedCategory]);

  const handleUpdateQuantity = (productId, newQty) => updateQuantity(productId, newQty);

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
              <div key={cat} onClick={() => setSelectedCategory(cat)}
                className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer">
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
        <section className="py-8">
          <div className="flex justify-between items-center mb-6 max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold">{selectedCategory.toUpperCase()} COLLECTION</h2>
            {cartItemCount > 0 && (
              <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold">
                Cart: {cartItemCount} items | ₹{cartTotal.toLocaleString()}
              </div>
            )}
          </div>

          <div className="max-w-6xl mx-auto">
            <SearchFilter products={products} onFilter={setFilteredProducts} />
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-500 text-xl">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-500 text-xl">😕 No products found. Try different filters!</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {filteredProducts.map((p) => {
                const productId = p._id;
                const cartItem = cart.find((item) => item.id === productId);
                const wishlisted = isWishlisted(productId);
                const selectedSize = selectedSizes[productId];
                const outOfStock = !p.inStock || p.stock === 0;

                return (
                  <div key={productId} className="bg-white rounded-lg shadow-lg p-4 hover:scale-105 transition">

                    {/* 🔍 Zoom Image + Heart + Stock Badge */}
                    <div className="relative">
                      <ZoomImage src={p.image} alt={p.name} outOfStock={outOfStock} />
                      <button onClick={() => toggleWishlist({ ...p, id: productId })}
                        className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:scale-110 transition text-xl z-10">
                        {wishlisted ? "❤️" : "🤍"}
                      </button>
                      <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-full z-10 ${outOfStock ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
                        {outOfStock ? "❌ Out of Stock" : `✅ In Stock (${p.stock})`}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold">{p.name}</h3>
                    <p className="text-gray-600 text-sm">{p.desc}</p>
                    <p className="text-yellow-500 mt-1">⭐ {p.rating}</p>
                    <p className="text-green-600 font-semibold">{p.price}</p>

                    {/* Size Selector */}
                    {!outOfStock && (
                      <div className="mt-3">
                        <p className="text-xs text-gray-500 mb-1 font-semibold">Select Size:</p>
                        <div className="flex gap-1 flex-wrap">
                          {SIZES.map((size) => (
                            <button key={size} onClick={() => setSelectedSizes((prev) => ({ ...prev, [productId]: size }))}
                              className={`px-2 py-1 text-xs rounded border font-semibold transition
                                ${selectedSize === size ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-600 border-gray-300 hover:border-orange-400"}`}>
                              {size}
                            </button>
                          ))}
                        </div>
                        {!selectedSize && <p className="text-xs text-red-400 mt-1">Please select a size</p>}
                      </div>
                    )}

                    {/* Cart Buttons */}
                    {outOfStock ? (
                      <button disabled className="w-full mt-4 bg-gray-300 text-gray-500 py-2 rounded cursor-not-allowed font-semibold">
                        Out of Stock
                      </button>
                    ) : cartItem ? (
                      <div className="flex items-center gap-2 mt-4">
                        <button onClick={() => handleUpdateQuantity(productId, (cartItem.qty || 1) - 1)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg">−</button>
                        <span className="flex-1 text-center font-semibold">{cartItem.qty || 1}</span>
                        <button onClick={() => handleUpdateQuantity(productId, (cartItem.qty || 1) + 1)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg">+</button>
                        <button onClick={() => removeFromCart(productId)} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg">Remove</button>
                      </div>
                    ) : (
                      <div className="flex gap-2 mt-4">
                        <button onClick={() => { if (!selectedSize) return alert("Please select a size first!"); addToCart({ ...p, id: productId, qty: 1, size: selectedSize }); }}
                          className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600">Add to Bag</button>
                        <button onClick={() => { if (!selectedSize) return alert("Please select a size first!"); handleBuyNow({ ...p, id: productId, size: selectedSize }); }}
                          className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700">Buy Now</button>
                      </div>
                    )}

                    <ShareButtons product={p} />
                    <ProductReviews productId={productId} />
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex justify-center gap-4 mt-10">
            <button onClick={() => { setSelectedCategory(null); setProducts([]); setFilteredProducts([]); }}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600">
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