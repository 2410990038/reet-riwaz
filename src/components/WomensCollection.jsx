import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import ProductReviews from "./ProductReviews";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const BASE_URL = "https://reet-riwaz-backend.onrender.com/api";

// ─── Cloudinary helper ────────────────────────────────────────────────────────
// If the stored value is already a full URL (http/https) return it as-is.
// If it looks like a Cloudinary public_id (e.g. "reet-riwaz/suits/suit1")
// build the optimised URL automatically.
const CLOUDINARY_BASE = "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/f_auto,q_auto/";

function resolveImage(raw) {
  if (!raw) return "";
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  // bare public_id → build Cloudinary delivery URL
  return `${CLOUDINARY_BASE}${raw}`;
}

// Pick the first truthy image field from a backend product object
function extractAdminImage(p) {
  const candidates = [p.image, p.imageUrl, p.img, p.photo, p.thumbnail, p.picture];
  for (const c of candidates) {
    if (c && typeof c === "string" && c.trim().length > 0) return resolveImage(c.trim());
  }
  return "";
}

// ─── Static catalogue — all images are Cloudinary URLs ───────────────────────
// Replace the placeholder public_ids below with your actual Cloudinary public_ids
// e.g.  "reet-riwaz/suits/embroidered-suit"
// OR keep full https://res.cloudinary.com/... URLs directly.
const defaultWomenCategories = {
  Suits: [
    {
      id: "suit-1",
      name: "Embroidered Punjabi Suit",
      price: "₹1,999",
      priceValue: 1999,
      image: resolveImage("reet-riwaz/suits/suit-1"),   // 🔁 replace with your public_id
      desc: "Elegant embroidered salwar suit",
      rating: 4.5,
    },
    {
      id: "suit-2",
      name: "Cotton Salwar Suit",
      price: "₹1,299",
      priceValue: 1299,
      image: resolveImage("reet-riwaz/suits/suit-2"),
      desc: "Light cotton suit for daily wear",
      rating: 4.3,
    },
    {
      id: "suit-3",
      name: "Anarkali Suit",
      price: "₹2,499",
      priceValue: 2499,
      image: resolveImage("reet-riwaz/suits/suit-3"),
      desc: "Flowy anarkali with dupatta",
      rating: 4.6,
    },
  ],
  Lehengas: [
    {
      id: "lehenga-1",
      name: "Bridal Lehenga",
      price: "₹6,999",
      priceValue: 6999,
      image: resolveImage("reet-riwaz/lehengas/lehenga-1"),
      desc: "Stunning red bridal lehenga",
      rating: 4.9,
    },
    {
      id: "lehenga-2",
      name: "Festive Lehenga",
      price: "₹15,000",
      priceValue: 15000,
      image: resolveImage("reet-riwaz/lehengas/lehenga-2"),
      desc: "Beautiful lehenga for festivals",
      rating: 4.7,
    },
    {
      id: "lehenga-3",
      name: "Bridal Lehenga",
      price: "₹10,000",
      priceValue: 10000,
      image: resolveImage("reet-riwaz/lehengas/lehenga-3"),
      desc: "Navratri special chaniya choli",
      rating: 4.5,
    },
  ],
  Sarees: [
    {
      id: "saree-1",
      name: "Silk Banarasi Saree",
      price: "₹5,000",
      priceValue: 5000,
      image: resolveImage("reet-riwaz/sarees/saree-1"),
      desc: "Elegant Banarasi silk saree",
      rating: 4.8,
    },
    {
      id: "saree-2",
      name: "Organza Saree",
      price: "₹1,999",
      priceValue: 1999,
      image: resolveImage("reet-riwaz/sarees/saree-2"),
      desc: "Vibrant tie-dye Rajasthani saree",
      rating: 4.6,
    },
    {
      id: "saree-3",
      name: "Cotton Saree",
      price: "₹1,499",
      priceValue: 1499,
      image: resolveImage("reet-riwaz/sarees/saree-3"),
      desc: "Lightweight Bengali cotton saree",
      rating: 4.4,
    },
  ],
  Dresses: [
    {
      id: "dress-1",
      name: "Gown Dress",
      price: "₹1,199",
      priceValue: 1199,
      image: resolveImage("reet-riwaz/dresses/dress-1"),
      desc: "Comfortable cotton kurti dress",
      rating: 4.3,
    },
    {
      id: "dress-2",
      name: "Long Flowy Dress",
      price: "₹1,799",
      priceValue: 1799,
      image: resolveImage("reet-riwaz/dresses/dress-2"),
      desc: "Flowy dress",
      rating: 4.5,
    },
    {
      id: "dress-3",
      name: "Frock",
      price: "₹1,099",
      priceValue: 1099,
      image: resolveImage("reet-riwaz/dresses/dress-3"),
      desc: "Beautiful for parties",
      rating: 4.7,
    },
  ],
  Kurtis: [
    {
      id: "kurti-1",
      name: "Cotton Kurti",
      price: "₹799",
      priceValue: 799,
      image: resolveImage("reet-riwaz/kurtis/kurti-1"),
      desc: "Everyday comfort cotton kurti",
      rating: 4.2,
    },
    {
      id: "kurti-2",
      name: "Anarkali Kurti",
      price: "₹1,299",
      priceValue: 1299,
      image: resolveImage("reet-riwaz/kurtis/kurti-2"),
      desc: "Festive embroidered kurti",
      rating: 4.5,
    },
    {
      id: "kurti-3",
      name: "Long Kurti Set",
      price: "₹1,599",
      priceValue: 1599,
      image: resolveImage("reet-riwaz/kurtis/kurti-3"),
      desc: "Long kurti with pants",
      rating: 4.6,
    },
  ],
  Anarkalis: [
    {
      id: "anarkali-1",
      name: "Floor Length Anarkali",
      price: "₹2,999",
      priceValue: 2999,
      image: resolveImage("reet-riwaz/anarkalis/anarkali-1"),
      desc: "Elegant floor length anarkali",
      rating: 4.7,
    },
    {
      id: "anarkali-2",
      name: "Designer Anarkali",
      price: "₹3,499",
      priceValue: 3499,
      image: resolveImage("reet-riwaz/anarkalis/anarkali-2"),
      desc: "Designer anarkali with dupatta",
      rating: 4.8,
    },
    {
      id: "anarkali-3",
      name: "Printed Anarkali",
      price: "₹1,999",
      priceValue: 1999,
      image: resolveImage("reet-riwaz/anarkalis/anarkali-3"),
      desc: "Casual printed anarkali",
      rating: 4.4,
    },
  ],
};

// Maps backend subcategory → our tab key
const SUBCATEGORY_MAP = {
  suits: "Suits", suit: "Suits",
  lehenga: "Lehengas", lehengas: "Lehengas",
  saree: "Sarees", sarees: "Sarees",
  dress: "Dresses", dresses: "Dresses",
  kurti: "Kurtis", kurtis: "Kurtis",
  anarkali: "Anarkalis", anarkalis: "Anarkalis",
};

// ─── SafeImage — Cloudinary-aware fallback ────────────────────────────────────
function SafeImage({ src, alt }) {
  const [errored, setErrored] = useState(false);

  // If src is blank or already errored, show a styled placeholder
  const finalSrc =
    errored || !src
      ? `https://placehold.co/400x500/fce7f3/be185d?text=${encodeURIComponent(alt)}`
      : src;

  return (
    <img
      src={finalSrc}
      alt={alt}
      className="w-full h-full object-cover object-top"
      onError={() => setErrored(true)}
    />
  );
}

// ─── ZoomImage ────────────────────────────────────────────────────────────────
function ZoomImage({ src, alt }) {
  const [zoomed, setZoomed] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      className="relative w-full h-80 overflow-hidden rounded-lg cursor-zoom-in bg-gray-50"
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => setZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <div
        className="w-full h-full transition-transform duration-200"
        style={{
          transform: zoomed ? "scale(2)" : "scale(1)",
          transformOrigin: `${pos.x}% ${pos.y}%`,
        }}
      >
        <SafeImage src={src} alt={alt} />
      </div>
      {!zoomed && (
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-40 text-white text-xs px-2 py-0.5 rounded-full pointer-events-none">
          🔍 Hover to zoom
        </div>
      )}
    </div>
  );
}

// ─── ShareButtons ─────────────────────────────────────────────────────────────
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

// ─── Main Component ───────────────────────────────────────────────────────────
export default function WomensCollection() {
  const [activeTab, setActiveTab] = useState("Suits");
  const [selectedSizes, setSelectedSizes] = useState({});
  const [womenCategories, setWomenCategories] = useState(defaultWomenCategories);
  const [apiLoading, setApiLoading] = useState(true);

  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const navigate = useNavigate();

  const cartItemCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.priceValue || 0) * (item.qty || 1), 0);

  // ── Fetch products from public API (no admin check needed) ──────────────────
  useEffect(() => {
    async function fetchProducts() {
      setApiLoading(true);
      try {
        // Fetch all products, filter for women category
        const res = await fetch(`${BASE_URL}/products?category=women`);
        if (!res.ok) throw new Error("API error");
        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
          // No products from DB, keep static data
          setApiLoading(false);
          return;
        }

        // Organize products by subcategory into tabs
        const merged = {
          Suits: [],
          Lehengas: [],
          Sarees: [],
          Dresses: [],
          Kurtis: [],
          Anarkalis: [],
        };

        data.forEach((p) => {
          // Resolve image from whichever field the backend uses
          const resolvedImage = extractAdminImage(p);

          const normalised = {
            id: p._id,
            name: p.name,
            price: p.price,
            priceValue: p.priceValue || 0,
            image: resolvedImage || p.image,
            desc: p.desc || p.description || "",
            rating: p.rating || 4.0,
          };

          // Add to first category by default (Suits)
          if (merged.Suits.length === 0) {
            merged.Suits.push(normalised);
          } else {
            // Distribute across categories
            const categoryOrder = ["Suits", "Lehengas", "Sarees", "Dresses", "Kurtis", "Anarkalis"];
            const targetCat = categoryOrder[Math.floor(Math.random() * categoryOrder.length)];
            merged[targetCat] = [...merged[targetCat], normalised];
          }
        });

        setWomenCategories(merged);
      } catch (err) {
        console.error("Could not load products from backend:", err);
        // Keep static data as fallback
      } finally {
        setApiLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const products = womenCategories[activeTab] || [];

  const tabEmoji = {
    Suits: "👘", Lehengas: "🥻", Sarees: "🌸",
    Dresses: "👗", Kurtis: "🧣", Anarkalis: "✨",
  };

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
              {tabEmoji[cat] || "🛍️"} {cat}
            </button>
          ))}
        </div>

        {/* Loading skeleton */}
        {apiLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-4 animate-pulse">
                <div className="w-full h-80 bg-gray-200 rounded-lg mb-3" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!apiLoading && (
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
                    {p.isAdminAdded && (
                      <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full z-10 font-semibold">
                        ✨ New
                      </span>
                    )}
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
        )}

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