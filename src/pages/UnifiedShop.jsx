import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartManager } from "../hooks/useCartManager";

// All product data
const allProducts = {
  categories: {
    women: [
      { id: "women-1", name: "Silk Saree", price: "₹2,499", priceValue: 2499, rating: 4.5, desc: "Elegant ethnic silk saree", image: "https://vardanethnic.in/wp-content/uploads/2025/08/Vardan-Ethnic-Ast-Shubharambh-Wholesale-Banarasi-Silk-Saree-Collection-6.webp" },
      { id: "women-2", name: "Lehenga Set", price: "₹4,999", priceValue: 4999, rating: 4.8, desc: "Traditional bridal lehenga", image: "https://maharanidesigner.com/wp-content/uploads/2020/08/Punjabi-Bridal-Lehenga.jpeg.webp" },
      { id: "women-3", name: "Kurti", price: "₹1,199", priceValue: 1199, rating: 4.3, desc: "Comfortable cotton kurti", image: "https://wholetex.sgp1.cdn.digitaloceanspaces.com/full/women-printed-cotton-kurti-pant-or-dupatta-set-216.jpg" },
    ],
    men: [
      { id: "men-1", name: "Sherwani", price: "₹3,999", priceValue: 3999, rating: 4.7, desc: "Royal embroidered sherwani", image: "https://i.pinimg.com/736x/90/6c/31/906c31109cfc073f74aaba9e07712947.jpg" },
      { id: "men-2", name: "Kurta Pajama", price: "₹1,799", priceValue: 1799, rating: 4.4, desc: "Classic festive wear", image: "https://i.etsystatic.com/35384727/r/il/f45eaa/6357957683/il_fullxfull.6357957683_4sny.jpg" },
      { id: "men-3", name: "Nehru Jacket", price: "₹1,299", priceValue: 1299, rating: 4.6, desc: "Stylish Nehru jacket", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaS2QB_8y1jKvfY_-1U_QR_RcG_5y07THy9g&s" },
    ],
    kids: [
      { id: "kids-1", name: "Ethnic Set", price: "₹999", priceValue: 999, rating: 4.5, desc: "Traditional festive outfit", image: "https://peekaabookids.com/cdn/shop/files/173_b1966b97-0cec-4166-aa24-82fd72e40f74.jpg?v=1756801554&width=533" },
      { id: "kids-2", name: "Kurta Set", price: "₹899", priceValue: 899, rating: 4.2, desc: "Comfortable cotton kurta", image: "https://www.kidbea.com/cdn/shop/files/m1_1024x1024.jpg?v=1754552947" },
      { id: "kids-3", name: "Frock", price: "₹1,099", priceValue: 1099, rating: 4.7, desc: "Beautiful party frock", image: "https://lagorii.com/cdn/shop/files/purple-ruffled-net-tailback-frock-with-floral-and-butterfly-embellishment-for-girls-lagorii-kids-1_533x.jpg" },
    ],
  },
  occasions: {
    Weddings: [
      { id: "wedding-1", name: "Bridal Lehenga", price: "₹6,999", priceValue: 6999, image: "https://www.aishwaryadesignstudio.com/content/images/thumbs/0144879_fascinatingred-designer-bridal-lehenga-choli-for-wedding-and-reception.jpeg" },
      { id: "wedding-2", name: "Sherwani Set", price: "₹5,499", priceValue: 5499, image: "https://getethnic.com/wp-content/uploads/2021/07/3-White-Sherwani-.jpg" },
      { id: "wedding-3", name: "Designer Saree", price: "₹3,999", priceValue: 3999, image: "https://i0.wp.com/www.sanskriticuttack.com/wp-content/uploads/2023/07/saree_in_half_saree_style.jpg?ssl=1" },
    ],
    Festivals: [
      { id: "festival-1", name: "Anarkali Dress", price: "₹2,999", priceValue: 2999, image: "https://subhvastra.in/cdn/shop/files/WhatsAppImage2023-06-02at6.50.09PM_800x.jpg?v=1704453598" },
      { id: "festival-2", name: "Kurta Pajama Set", price: "₹1,999", priceValue: 1999, image: "https://i.etsystatic.com/35384727/r/il/971410/6318118054/il_570xN.6318118054_p3xj.jpg" },
      { id: "festival-3", name: "Embroidered Dupatta", price: "₹999", priceValue: 999, image: "https://inayakhan.shop/cdn/shop/files/light-blue-silk-pom-pom-phulkari-dupatta-with-exquisite-handwork-embroidery-inayakhan-shop.jpg?v=1718874645" },
    ],
    "Cultural Events": [
      { id: "cultural-1", name: "Phulkari Dupatta", price: "₹1,499", priceValue: 1499, image: "https://theamritsarstore.com/cdn/shop/files/hand-embroidered-phulkari-dupattas-online-handmade-dupatta-with-different-design-by-the-amritsar-store-175.webp?v=1759830260" },
      { id: "cultural-2", name: "Punjabi Suit", price: "₹3,299", priceValue: 3299, image: "https://www.salwari.com/image/cache/product-2025/yellow-embroidered-salwar-suit-107422-308x425.gif" },
      { id: "cultural-3", name: "Traditional Turban", price: "₹1,099", priceValue: 1099, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuU49wJQtjiTe_JhsV8T4GcY429YGW6WvgvQ&s" },
    ],
  },
  regions: {
    Rajasthan: [
      { id: "rajasthan-1", name: "Bandhani Saree", desc: "Traditional tie-dye saree", price: "₹2,499", priceValue: 2499, image: "https://mykaajaipur.com/cdn/shop/files/6-Xh14iris.jpg?v=1723561776" },
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
      { id: "gujarat-3", name: "Kediyu", desc: "Embroided traditional kediyu for men", price: "₹999", priceValue: 999, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCcrZDsaLaLlvHr_k1TJhhxzwqLWkntIRXdw&s" },
    ],
    Bengal: [
      { id: "bengal-1", name: "Red & White Saree", desc: "Iconic Bengali saree for festivals", price: "₹2,199", priceValue: 2199, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4hY72GRHVXUtaJSD9UQKxMK8JDK-D-AO_FQ&s" },
      { id: "bengal-2", name: "Cotton Tant Saree", desc: "Lightweight cotton saree from Bengal", price: "₹1,499", priceValue: 1499, image: "https://m.media-amazon.com/images/I/91iQLltF8qL._AC_UY1100_.jpg" },
      { id: "bengal-3", name: "Dhoti-Kurta Set", desc: "Traditional Bengali dhoti kurta", price: "₹1,499", priceValue: 1499, image: "https://cfw51.rabbitloader.xyz/eyJjIjp0cnVlLCJoIjoibXltYW5kYXAuaW4iLCJ2IjozNTA3MDAwMTg5LCJyIjoxLCJpIjoiMWE5YWE0YzAtMTVlYy00MTZiLWM2N2QtZGQyNTI3NDkzNTAwIn0/wp-content/uploads/2023/06/Vibrant-Color-Bengali-Dhoti-Kurta-for-Wedding.jpg" },
    ],
  },
};

export default function UnifiedShop() {
  const [view, setView] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const navigate = useNavigate();

  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartItemCount,
    getCartTotal,
    getCartItem,
  } = useCartManager();

  const cartCount = getCartItemCount();
  const cartTotal = getCartTotal();

  // Product Card Component
  const ProductCard = ({ product }) => {
    const cartItem = getCartItem(product.id);

    return (
      <div className="bg-white rounded-lg shadow-lg p-4 hover:scale-105 transition h-full flex flex-col">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-md w-full h-64 object-cover mb-3"
        />
        <h3 className="text-lg font-bold">{product.name}</h3>
        {product.desc && <p className="text-gray-600 text-sm flex-grow">{product.desc}</p>}
        {product.rating && <p className="text-yellow-500 mt-2">⭐ {product.rating}</p>}
        <p className="text-green-600 font-semibold mt-2">{product.price}</p>

        {cartItem ? (
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => updateQuantity(product.id, cartItem.qty - 1)}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded flex-1 text-sm"
            >
              −
            </button>
            <span className="flex-1 text-center font-bold">{cartItem.qty}</span>
            <button
              onClick={() => updateQuantity(product.id, cartItem.qty + 1)}
              className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded flex-1 text-sm"
            >
              +
            </button>
            <button
              onClick={() => removeFromCart(product.id)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded flex-1 text-sm"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 text-sm font-semibold"
            >
              Add to Bag
            </button>
            <button
              onClick={() => {
                addToCart(product);
                navigate("/checkout");
              }}
              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm font-semibold"
            >
              Buy Now
            </button>
          </div>
        )}
      </div>
    );
  };

  // Cart Badge
  const CartBadge = () =>
    cartCount > 0 ? (
      <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold">
        Cart: {cartCount} | ₹{cartTotal.toLocaleString()}
      </div>
    ) : null;

  // HOME VIEW
  if (view === "home") {
    return (
      <div className="px-8 pt-16 pb-8 bg-[#fdfbe8] min-h-screen">
        <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold">ReetRiwaaz</h1>
          <CartBadge />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => setView("categories")}
            className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer h-64"
          >
            <img src="https://t3.ftcdn.net/jpg/06/40/14/32/360_F_640143291_kvoc9eiNU3XdZXNR2EkLPj0PW2PcJxpz.jpg" alt="Category" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" />
            <h2 className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white bg-black/30">Shop by Category</h2>
          </button>

          <button
            onClick={() => setView("occasions")}
            className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer h-64"
          >
            <img src="https://i.pinimg.com/736x/b8/02/f9/b802f958bf59381408956906babd6a6e.jpg" alt="Occasion" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" />
            <h2 className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white bg-black/30">Shop by Occasion</h2>
          </button>

          <button
            onClick={() => setView("regions")}
            className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer h-64"
          >
            <img src="https://rajasthancab.b-cdn.net/uploads/blog/1744694612-blog-image.webp" alt="Region" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" />
            <h2 className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white bg-black/30">Shop by Region</h2>
          </button>
        </div>

        {cartCount > 0 && (
          <div className="max-w-6xl mx-auto mt-8">
            <button
              onClick={() => navigate("/cart")}
              className="w-full bg-green-600 text-white py-4 rounded-lg text-lg font-bold hover:bg-green-700"
            >
              View Cart ({cartCount} items) - ₹{cartTotal.toLocaleString()}
            </button>
          </div>
        )}
      </div>
    );
  }

  // CATEGORIES VIEW
  if (view === "categories") {
    if (!selectedCategory) {
      return (
        <div className="px-8 pt-16 pb-8 bg-[#fdfbe8] min-h-screen">
          <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold">Shop by Category</h2>
            <CartBadge />
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {["women", "men", "kids"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer h-64"
              >
                <img
                  src={cat === "women" ? "https://t3.ftcdn.net/jpg/06/40/14/32/360_F_640143291_kvoc9eiNU3XdZXNR2EkLPj0PW2PcJxpz.jpg" : cat === "men" ? "https://i.pinimg.com/736x/c4/9c/95/c49c95612836a2d6933f0ba70f8ab64d.jpg" : "https://www.shutterstock.com/image-photo/kuala-lumpur-malaysia-october-252019-260nw-1541710190.jpg"}
                  alt={cat}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
                />
                <h3 className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white bg-black/30 capitalize">{cat === "kids" ? "Kids' Collection" : `${cat}'s Wear`}</h3>
              </button>
            ))}
          </div>

          <div className="max-w-6xl mx-auto">
            <button onClick={() => setView("home")} className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600">← Back to Home</button>
          </div>
        </div>
      );
    }

    return (
      <div className="px-8 pt-16 pb-8 bg-[#fdfbe8] min-h-screen">
        <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold capitalize">{selectedCategory} Collection</h2>
          <CartBadge />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {allProducts.categories[selectedCategory].map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="max-w-6xl mx-auto flex gap-4">
          <button onClick={() => setSelectedCategory(null)} className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600">← Back to Categories</button>
          {cartCount > 0 && (
            <button onClick={() => navigate("/cart")} className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700">View Cart ({cartCount})</button>
          )}
        </div>
      </div>
    );
  }

  // OCCASIONS VIEW
  if (view === "occasions") {
    if (!selectedOccasion) {
      return (
        <div className="px-8 pt-16 pb-8 bg-[#fdfbe8] min-h-screen">
          <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold">Explore by Occasion</h2>
            <CartBadge />
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Object.keys(allProducts.occasions).map((occasion) => (
              <button
                key={occasion}
                onClick={() => setSelectedOccasion(occasion)}
                className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer h-64"
              >
                <img src={allProducts.occasions[occasion][0].image} alt={occasion} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" />
                <h3 className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white bg-black/30">{occasion}</h3>
              </button>
            ))}
          </div>

          <div className="max-w-6xl mx-auto">
            <button onClick={() => setView("home")} className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600">← Back to Home</button>
          </div>
        </div>
      );
    }

    return (
      <div className="px-8 pt-16 pb-8 bg-[#fdfbe8] min-h-screen">
        <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold">{selectedOccasion} Collection</h2>
          <CartBadge />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {allProducts.occasions[selectedOccasion].map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="max-w-6xl mx-auto flex gap-4">
          <button onClick={() => setSelectedOccasion(null)} className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600">← Back to Occasions</button>
          {cartCount > 0 && (
            <button onClick={() => navigate("/cart")} className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700">View Cart ({cartCount})</button>
          )}
        </div>
      </div>
    );
  }

  // REGIONS VIEW
  if (view === "regions") {
    if (!selectedRegion) {
      return (
        <div className="px-8 pt-16 pb-8 bg-[#fdfbe8] min-h-screen">
          <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold">Explore by Region</h2>
            <CartBadge />
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {Object.keys(allProducts.regions).map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer h-64"
              >
                <img src={allProducts.regions[region][0].image} alt={region} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" />
                <h3 className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white bg-black/30">{region}</h3>
              </button>
            ))}
          </div>

          <div className="max-w-6xl mx-auto">
            <button onClick={() => setView("home")} className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600">← Back to Home</button>
          </div>
        </div>
      );
    }

    return (
      <div className="px-8 pt-16 pb-8 bg-[#fdfbe8] min-h-screen">
        <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold">{selectedRegion} Collection</h2>
          <CartBadge />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {allProducts.regions[selectedRegion].map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="max-w-6xl mx-auto flex gap-4">
          <button onClick={() => setSelectedRegion(null)} className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600">← Back to Regions</button>
          {cartCount > 0 && (
            <button onClick={() => navigate("/cart")} className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700">View Cart ({cartCount})</button>
          )}
        </div>
      </div>
    );
  }
}