import { 
  SignedIn, 
  SignedOut, 
  SignInButton, 
  useUser, 
  useAuth,
  useClerk
} from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";

export default function Navbar() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const { isSignedIn } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const { wishlist } = useWishlist();

  const isAdmin = user?.primaryEmailAddress?.emailAddress === "angelpreetk276@gmail.com";

  useEffect(() => {
    const updateCart = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          const cart = JSON.parse(savedCart);
          const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
          setCartCount(count);
        } catch (error) {
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    };

    updateCart();
    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  const goProtected = (path) => {
    if (isSignedIn) {
      navigate(path);
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <nav className="flex justify-between items-center px-8 md:px-12 py-4 bg-[#fcf9eb]/90 backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-30">
      <button
        onClick={() => navigate("/")}
        className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-wide hover:text-orange-600 transition cursor-pointer"
      >
        ReetRiwaaz
      </button>

      {/* 👗 Women's Collection Link */}
      <button
        onClick={() => goProtected("/women")}
        className="hidden md:flex items-center gap-1 text-sm font-semibold text-pink-600 border border-pink-300 px-4 py-2 rounded-full hover:bg-pink-50 hover:border-pink-500 transition"
      >
        👗 Women's Collection
      </button>

      <div className="flex items-center gap-4">

        {/* ❤️ Wishlist Button */}
        <button
          onClick={() => goProtected("/wishlist")}
          className="relative w-10 h-10 bg-pink-500 text-white rounded-full flex justify-center items-center hover:bg-pink-600 transition hover:scale-110"
        >
          <FaHeart className="text-white text-xl" />
          {wishlist.length > 0 && (
            <span className="absolute top-0 right-0 text-xs bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {wishlist.length}
            </span>
          )}
        </button>

        {/* 🛒 Cart Button */}
        <button
          onClick={() => goProtected("/cart")}
          className="relative w-10 h-10 bg-orange-500 text-white rounded-full flex justify-center items-center hover:bg-orange-600 transition hover:scale-110"
        >
          <FaShoppingCart className="text-white text-xl" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
              {cartCount}
            </span>
          )}
        </button>

        <div className="relative">
          <SignedIn>
            <button
              className="w-10 h-10 rounded-full border-2 border-orange-500 overflow-hidden hover:scale-105 transition"
              onClick={() => setShowProfile(!showProfile)}
            >
              <img
                src={user?.imageUrl || "https://via.placeholder.com/40"}
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </button>

            {showProfile && (
              <>
                <div className="absolute right-0 mt-12 w-56 bg-white shadow-xl rounded-lg border border-gray-200 p-4 z-40">
                  <div className="space-y-2">

                    {isAdmin && (
                      <button
                        onClick={() => { navigate("/admin"); setShowProfile(false); }}
                        className="w-full text-left px-3 py-2 text-red-600 font-bold hover:bg-red-50 rounded transition border border-red-200 mb-2"
                      >
                        🛡️ Admin Panel
                      </button>
                    )}

                    <button
                      onClick={() => { navigate("/women"); setShowProfile(false); }}
                      className="w-full text-left px-3 py-2 text-pink-600 hover:bg-pink-50 rounded transition font-semibold"
                    >
                      👗 Women's Collection
                    </button>

                    <button
                      onClick={() => { navigate("/cart"); setShowProfile(false); }}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:bg-orange-50 rounded transition"
                    >
                      🛒 My Cart ({cartCount})
                    </button>

                    <button
                      onClick={() => { navigate("/wishlist"); setShowProfile(false); }}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:bg-pink-50 rounded transition"
                    >
                      🩷 My Wishlist ({wishlist.length})
                    </button>

                    <button
                      onClick={() => { navigate("/user-profile"); setShowProfile(false); }}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:bg-blue-50 rounded transition border-t border-gray-200 mt-2 pt-2"
                    >
                      ⚙️ Manage Account
                    </button>

                    <button
                      onClick={() => { navigate("/fittings"); setShowProfile(false); }}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:bg-purple-50 rounded transition"
                    >
                      📏 Measurements (Fittings)
                    </button>

                    <button
                      onClick={() => { navigate("/orders"); setShowProfile(false); }}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:bg-yellow-50 rounded transition"
                    >
                      📦 Order History
                    </button>

                    <button
                      onClick={() => signOut(() => navigate("/"))}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:bg-red-50 rounded transition"
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                </div>
                <div className="fixed inset-0 z-30" onClick={() => setShowProfile(false)} />
              </>
            )}
          </SignedIn>

          <SignedOut>
            <SignInButton
              afterSignInUrl="/shop"
              afterSignUpUrl="/shop"
              mode="modal"
              appearance={{
                elements: {
                  rootBox: "bg-orange-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-600 transition",
                },
              }}
            />
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}