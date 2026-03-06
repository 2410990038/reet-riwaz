// import AdminPanel from "./pages/AdminPanel";
// import { SignIn } from "@clerk/clerk-react";
// import { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LandingPage from "./pages/LandingPage";
// import LoginModal from "./pages/LoginModal";
// import { ClerkProvider } from "@clerk/clerk-react";
// import Shop from "./pages/Shop";
// import CartPage from "./pages/CartPage";
// import Navbar from "./components/Navbar";
// import BuyNow from "./pages/BuyNow";
// import ManageAccount from "./pages/ManageAccount";
// import Fittings from "./pages/Fittings";
// import Checkout from "./pages/Checkout";
// import Payment from "./pages/Payment";
// import OrderConfirmation from "./pages/OrderConfirmation";
// import OrderHistory from "./pages/OrderHistory";
// import Wishlist from "./pages/Wishlist";
// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
// import { WishlistProvider } from "./context/WishlistContext";
// import WomensCollection from "./components/WomensCollection";

// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key");
// }

// export default function App() {
//   const [showLogin, setShowLogin] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);

//   const openLogin = () => setShowLogin(true);

//   return (
//     <Router>
//       <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
//         <WishlistProvider>
          
//           <Navbar
//             onLoginClick={openLogin}
//             isLoggedIn={isLoggedIn}
//             onLogout={() => setIsLoggedIn(false)}
//           />
//           <Routes>
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/login" element={<LoginModal />} />
//             <Route path="/shop" element={<Shop />} />
//             <Route path="/cart" element={<CartPage />} />
//             <Route path="/buynow" element={<BuyNow />} />
//             <Route path="/user-profile" element={<ManageAccount />} />
//             <Route path="/fittings" element={<Fittings />} />
//             <Route path="/checkout" element={<Checkout />} />
//             <Route path="/payment" element={<Payment />} />
//             <Route path="/order-confirmation" element={<OrderConfirmation />} />
//             <Route path="/orders" element={<OrderHistory />} />
//             <Route path="/wishlist" element={<Wishlist />} />
//             <Route path="/sign-in" element={
//               <div className="min-h-screen bg-[#fdfbe8] flex items-center justify-center pt-16">
//                 <SignIn routing="path" path="/sign-in" afterSignInUrl="/shop" />
//               </div>
//             } />
//             <Route path="/admin" element={<AdminPanel />} />
//             <Route path="/women" element={<WomensCollection />} />
//           </Routes>
//         </WishlistProvider>
//       </ClerkProvider>
//     </Router>
//   );
// }



import AdminPanel from "./pages/AdminPanel";
import { SignIn, useAuth } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginModal from "./pages/LoginModal";
import { ClerkProvider } from "@clerk/clerk-react";
import Shop from "./pages/Shop";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import BuyNow from "./pages/BuyNow";
import ManageAccount from "./pages/ManageAccount";
import Fittings from "./pages/Fittings";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderHistory from "./pages/OrderHistory";
import Wishlist from "./pages/Wishlist";
import { WishlistProvider } from "./context/WishlistContext";
import WomensCollection from "./components/WomensCollection";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// Loading spinner shown while Clerk initializes
function AppContent() {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#fdfbe8] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-orange-500 font-semibold text-lg">Loading ReetRiwaaz...</p>
      </div>
    );
  }

  return (
    <WishlistProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/buynow" element={<BuyNow />} />
        <Route path="/user-profile" element={<ManageAccount />} />
        <Route path="/fittings" element={<Fittings />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/sign-in" element={
          <div className="min-h-screen bg-[#fdfbe8] flex items-center justify-center pt-16">
            <SignIn routing="path" path="/sign-in" afterSignInUrl="/shop" />
          </div>
        } />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/women" element={<WomensCollection />} />
      </Routes>
    </WishlistProvider>
  );
}

export default function App() {
  return (
    <Router>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <AppContent />
      </ClerkProvider>
    </Router>
  );
}