import { useRecentlyViewed } from "../context/RecentlyViewedContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function RecentlyViewed() {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (recentlyViewed.length === 0) return null;

  return (
    <div className="bg-[#fff8f0] border-t-4 border-orange-200 px-8 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">👀 Recently Viewed</h2>
          <button onClick={clearRecentlyViewed}
            className="text-xs text-gray-400 hover:text-red-400 underline transition">
            Clear all
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {recentlyViewed.map((p) => (
            <div key={p.id} className="bg-white rounded-xl shadow p-3 min-w-[160px] max-w-[160px] hover:shadow-lg transition flex-shrink-0">
              <img src={p.image} alt={p.name}
                className="w-full h-32 object-contain rounded-lg mb-2" />
              <p className="text-sm font-semibold text-gray-800 truncate">{p.name}</p>
              <p className="text-xs text-green-600 font-semibold">{p.price}</p>
              {p.rating && <p className="text-xs text-yellow-500">⭐ {p.rating}</p>}
              <button
                onClick={() => addToCart({ ...p, qty: 1 })}
                className="mt-2 w-full bg-orange-500 text-white text-xs py-1.5 rounded-lg hover:bg-orange-600 transition">
                Add to Bag
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}