import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import ProductReviews from "./ProductReviews";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const womenCategories = {
  Suits: [
    { id: "suit-1", name: "Embroidered Punjabi Suit", price: "₹1,999", priceValue: 1999, image: "https://www.lavanyathelabel.com/cdn/shop/files/01_lbl101ks461_10.jpg?v=1755064960", desc: "Elegant embroidered salwar suit", rating: 4.5 },
    { id: "suit-2", name: "Cotton Salwar Suit", price: "₹1,299", priceValue: 1299, image: "https://www.salwari.com/image/cache/product-2025/yellow-embroidered-salwar-suit-107422-308x425.gif", desc: "Light cotton suit for daily wear", rating: 4.3 },
    { id: "suit-3", name: "Anarkali Suit", price: "₹2,499", priceValue: 2499, image: "https://subhvastra.in/cdn/shop/files/WhatsAppImage2023-06-02at6.50.09PM_800x.jpg?v=1704453598", desc: "Flowy anarkali with dupatta", rating: 4.6 },
  ],
  Lehengas: [
    { id: "lehenga-1", name: "Bridal Lehenga", price: "₹6,999", priceValue: 6999, image: "https://www.aishwaryadesignstudio.com/content/images/thumbs/0144879_fascinatingred-designer-bridal-lehenga-choli-for-wedding-and-reception.jpeg", desc: "Stunning red bridal lehenga", rating: 4.9 },
    { id: "lehenga-2", name: "Festive Lehenga", price: "₹3,999", priceValue: 3999, image: "https://maharanidesigner.com/wp-content/uploads/2020/08/Punjabi-Bridal-Lehenga.jpeg.webp", desc: "Beautiful lehenga for festivals", rating: 4.7 },
    { id: "lehenga-3", name: "Chaniya Choli", price: "₹2,999", priceValue: 2999, image: "https://anayadesignerstudio.com/cdn/shop/files/chaniya-choli-for-navratri-online-1.webp?v=1714629370", desc: "Navratri special chaniya choli", rating: 4.5 },
  ],
  Sarees: [
    { id: "saree-1", name: "Silk Banarasi Saree", price: "₹2,499", priceValue: 2499, image: "https://vardanethnic.in/wp-content/uploads/2025/08/Vardan-Ethnic-Ast-Shubharambh-Wholesale-Banarasi-Silk-Saree-Collection-6.webp", desc: "Elegant Banarasi silk saree", rating: 4.8 },
    { id: "saree-2", name: "Bandhani Saree", price: "₹1,999", priceValue: 1999, image: "https://mykaajaipur.com/cdn/shop/files/6-Xh14iris.jpg?v=1723561776", desc: "Vibrant tie-dye Rajasthani saree", rating: 4.6 },
    { id: "saree-3", name: "Cotton Tant Saree", price: "₹1,499", priceValue: 1499, image: "https://m.media-amazon.com/images/I/91iQLltF8qL._AC_UY1100_.jpg", desc: "Lightweight Bengali cotton saree", rating: 4.4 },
  ],
  Dresses: [
    { id: "dress-1", name: "Printed Kurti Dress", price: "₹1,199", priceValue: 1199, image: "https://wholetex.sgp1.cdn.digitaloceanspaces.com/full/women-printed-cotton-kurti-pant-or-dupatta-set-216.jpg", desc: "Comfortable cotton kurti dress", rating: 4.3 },
    { id: "dress-2", name: "Ethnic Maxi Dress", price: "₹1,799", priceValue: 1799, image: "https://i0.wp.com/www.sanskriticuttack.com/wp-content/uploads/2023/07/saree_in_half_saree_style.jpg?ssl=1", desc: "Flowy ethnic maxi dress", rating: 4.5 },
    { id: "dress-3", name: "Party Frock", price: "₹1,099", priceValue: 1099, image: "https://lagorii.com/cdn/shop/files/purple-ruffled-net-tailback-frock-with-floral-and-butterfly-embellishment-for-girls-lagorii-kids-1_533x.jpg", desc: "Beautiful net frock for parties", rating: 4.7 },
  ],
  Kurtis: [
    { id: "kurti-1", name: "Cotton Kurti", price: "₹799", priceValue: 799, image: "https://wholetex.sgp1.cdn.digitaloceanspaces.com/full/women-printed-cotton-kurti-pant-or-dupatta-set-216.jpg", desc: "Everyday comfort cotton kurti", rating: 4.2 },
    { id: "kurti-2", name: "Embroidered Kurti", price: "₹1,299", priceValue: 1299, image: "https://inayakhan.shop/cdn/shop/files/light-blue-silk-pom-pom-phulkari-dupatta-with-exquisite-handwork-embroidery-inayakhan-shop.jpg?v=1718874645", desc: "Festive embroidered kurti", rating: 4.5 },
    { id: "kurti-3", name: "Long Kurti Set", price: "₹1,599", priceValue: 1599, image: "https://www.lavanyathelabel.com/cdn/shop/files/01_lbl101ks461_10.jpg?v=1755064960", desc: "Long kurti with pants and dupatta", rating: 4.6 },
  ],
  Anarkalis: [
    { id: "anarkali-1", name: "Floor Length Anarkali", price: "₹2,999", priceValue: 2999, image: "https://subhvastra.in/cdn/shop/files/WhatsAppImage2023-06-02at6.50.09PM_800x.jpg?v=1704453598", desc: "Elegant floor length anarkali", rating: 4.7 },
    { id: "anarkali-2", name: "Designer Anarkali", price: "₹3,499", priceValue: 3499, image: "https://anayadesignerstudio.com/cdn/shop/files/chaniya-choli-for-navratri-online-1.webp?v=1714629370", desc: "Designer anarkali with dupatta", rating: 4.8 },
    { id: "anarkali-3", name: "Printed Anarkali", price: "₹1,999", priceValue: 1999, image: "https://www.salwari.com/image/cache/product-2025/yellow-embroidered-salwar-suit-107422-308x425.gif", desc: "Casual printed anarkali", rating: 4.4 },
  ],
};

// Zoom Image Component
function ZoomImage({ src, alt }) {
  const [zoomed, setZoomed] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const ref = useState(null);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  };

  return (
    <div
      className="relative w-full h-64 overflow-hidden rounded-lg cursor-zoom-in"
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => setZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src} alt={alt}
        className="w-full h-full object-cover transition-transform duration-200"
        style={{ transform: zoomed ? "scale(2)" : "scale(1)", transformOrigin: `${pos.x}% ${pos.y}%` }}
      />
      {!zoomed && (
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-40 text-white text-xs px-2 py-0.5 rounded-full pointer-events-none">
          🔍 Hover to zoom
        </div>
      )}
    </div>
  );
}

function ShareButtons({ product }) {
  const text = `Check out ${product.name} for ${product.price} on ReetRiwaaz! 🛍️`;
  const url = window.location.href;
  return (
    <div className="flex gap-2 mt-3 flex-wrap">
      <span className="text-xs text-gray-500 w-full">Share:</span>
      <a href={`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`} target="_blank" rel="noreferrer" className="bg-green-500 text-white text-xs px-3 py-1 rounded-full hover:bg-green-600">📱 WhatsApp</a>
      <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full hover:opacity-90">📸 Instagram</a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-700">👍 Facebook</a>
      <button onClick={() => { navigator.clipboard.writeText(url); alert("Link copied!"); }} className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full hover:bg-gray-300">🔗 Copy Link</button>
    </div>
  );
}

export default function WomensCollection() {
  const [activeTab, setActiveTab] = useState("Suits");
  const [selectedSizes, setSelectedSizes] = useState({});
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const navigate = useNavigate();

  const cartItemCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.priceValue || 0) * (item.qty || 1), 0);

  const products = womenCategories[activeTab] || [];

  return (
    <div className="min-h-screen bg-[#fdfbe8] pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">👗 Women's Collection</h1>
            <p className="text-gray-500 mt-1">Explore our curated ethnic wear for every occasion</p>
          </div>
          {cartItemCount > 0 && (
            <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold">
              Cart: {cartItemCount} items | ₹{cartTotal.toLocaleString()}
            </div>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {Object.keys(womenCategories).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition ${
                activeTab === cat
                  ? "bg-pink-500 text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-pink-400 hover:text-pink-500"
              }`}
            >
              {cat === "Suits" ? "👘 Suits" :
               cat === "Lehengas" ? "🥻 Lehengas" :
               cat === "Sarees" ? "🌸 Sarees" :
               cat === "Dresses" ? "👗 Dresses" :
               cat === "Kurtis" ? "🧣 Kurtis" : "✨ Anarkalis"}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => {
            const cartItem = cart.find((item) => item.id === p.id);
            const wishlisted = isWishlisted(p.id);
            const selectedSize = selectedSizes[p.id];

            return (
              <div key={p.id} className="bg-white rounded-2xl shadow-lg p-4 hover:scale-105 transition">

                {/* Image + Heart */}
                <div className="relative">
                  <ZoomImage src={p.image} alt={p.name} />
                  <button
                    onClick={() => toggleWishlist(p)}
                    className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:scale-110 transition text-xl z-10"
                  >
                    {wishlisted ? "❤️" : "🤍"}
                  </button>
                </div>

                <h3 className="text-lg font-bold mt-3">{p.name}</h3>
                <p className="text-gray-500 text-sm">{p.desc}</p>
                <p className="text-yellow-500 mt-1">⭐ {p.rating}</p>
                <p className="text-green-600 font-semibold text-lg">{p.price}</p>

                {/* Size Selector */}
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-1 font-semibold">Select Size:</p>
                  <div className="flex gap-1 flex-wrap">
                    {SIZES.map((size) => (
                      <button key={size}
                        onClick={() => setSelectedSizes((prev) => ({ ...prev, [p.id]: size }))}
                        className={`px-2 py-1 text-xs rounded border font-semibold transition
                          ${selectedSize === size ? "bg-pink-500 text-white border-pink-500" : "bg-white text-gray-600 border-gray-300 hover:border-pink-400"}`}>
                        {size}
                      </button>
                    ))}
                  </div>
                  {!selectedSize && <p className="text-xs text-red-400 mt-1">Please select a size</p>}
                </div>

                {/* Cart Buttons */}
                {cartItem ? (
                  <div className="flex items-center gap-2 mt-4">
                    <button onClick={() => updateQuantity(p.id, (cartItem.qty || 1) - 1)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg">−</button>
                    <span className="flex-1 text-center font-semibold">{cartItem.qty || 1}</span>
                    <button onClick={() => updateQuantity(p.id, (cartItem.qty || 1) + 1)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg">+</button>
                    <button onClick={() => removeFromCart(p.id)} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg">Remove</button>
                  </div>
                ) : (
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => { if (!selectedSize) return alert("Please select a size first!"); addToCart({ ...p, qty: 1, size: selectedSize }); }}
                      className="flex-1 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 font-semibold">
                      Add to Bag
                    </button>
                    <button
                      onClick={() => { if (!selectedSize) return alert("Please select a size first!"); addToCart({ ...p, qty: 1, size: selectedSize }); navigate("/checkout"); }}
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-semibold">
                      Buy Now
                    </button>
                  </div>
                )}

                <ShareButtons product={p} />
                <ProductReviews productId={p.id} />
              </div>
            );
          })}
        </div>

        {/* Back + View Cart */}
        <div className="flex justify-center gap-4 mt-10">
          <button onClick={() => navigate(-1)} className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600">← Back</button>
          {cartItemCount > 0 && (
            <button onClick={() => navigate('/cart')} className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">View Cart ({cartItemCount})</button>
          )}
        </div>
      </div>
    </div>
  );
}