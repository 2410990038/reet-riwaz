import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart({ ...product, qty: 1 });
    removeFromWishlist(product.id);
  };

  return (
    <div className="min-h-screen bg-[#fdfbe8] pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">🩷 My Wishlist</h1>
          <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-800">← Back</button>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <p className="text-5xl mb-4">🩷</p>
            <p className="text-xl font-semibold text-gray-700 mb-2">Your wishlist is empty!</p>
            <p className="text-gray-500 mb-6">Save products you love by clicking the ❤️ button.</p>
            <button onClick={() => navigate('/shop')}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 font-semibold">
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <p className="text-gray-500 mb-4">{wishlist.length} item{wishlist.length > 1 ? 's' : ''} saved</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {wishlist.map((p) => (
                <div key={p.id} className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition">
                  <div className="relative">
                    <img src={p.image} alt={p.name}
                      className="w-full h-56 object-contain rounded-lg mb-3" />
                    <button
                      onClick={() => removeFromWishlist(p.id)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow text-red-500 hover:bg-red-50 transition"
                      title="Remove from wishlist"
                    >
                      ❤️
                    </button>
                  </div>
                  <h3 className="font-bold text-gray-800">{p.name}</h3>
                  <p className="text-gray-500 text-sm">{p.desc}</p>
                  <p className="text-yellow-500 text-sm mt-1">⭐ {p.rating}</p>
                  <p className="text-green-600 font-semibold mt-1">{p.price}</p>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleMoveToCart(p)}
                      className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 text-sm font-semibold"
                    >
                      Move to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(p.id)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-100 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}