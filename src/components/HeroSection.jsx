// import { useNavigate } from "react-router-dom";

// export default function HeroSection() {
//   const navigate = useNavigate();

//   return (
//     <div className="relative h-screen bg-[#fcf9eb] flex flex-col items-center justify-center text-center">
//       <div
//         className="absolute inset-0 bg-cover bg-center opacity-60"
//         style={{
//           backgroundImage: `url("src/assets/landing.png")`,
//         }}
//       ></div>

//       <div className="relative z-10 max-w-2xl">
//         <h1 className="text-5xl font-bold text-gray-800 mb-4">
//           Traditional Elegance, Modern Fit
//         </h1>
//         <p className="text-gray-700 mb-8">
//           Experience the richness of Indian heritage with outfits tailored to
//           your exact measurements. Perfect fit, delivered to your doorstep.
//         </p>
//         <div className="flex gap-4 justify-center">
//           <button
//             onClick={() => navigate("/login")}
//             className="bg-white border border-orange-400 text-orange-600 px-6 py-3 rounded-md hover:bg-orange-100"
//           >
//             Start Shopping
//           </button>
//           <button
//             onClick={() => navigate("/signup")}
//             className="bg-white border border-orange-400 text-orange-600 px-6 py-3 rounded-md hover:bg-orange-100"
//           >
//             Learn More
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// import bgImage from "../assets/landing.png";

// export default function HeroSection({ onStartShopping }) {
//   return (
//     <div
//       className="relative h-screen flex flex-col items-center justify-center text-center text-white"
//       style={{
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="absolute inset-0 bg-black bg-opacity-50"></div>

//       <div className="relative z-10 max-w-3xl px-6 animate-fadeIn">
//         <h1 className="text-5xl md:text-6xl font-bold mb-4 text-orange-100 drop-shadow-lg">
//           Traditional Elegance, Modern Fit
//         </h1>
//         <p className="text-lg md:text-xl mb-8 text-orange-50 leading-relaxed drop-shadow-md">
//           Experience the richness of Indian heritage with outfits tailored to
//           your exact measurements. Perfect fit, delivered to your doorstep.
//         </p>

//         <button
//           onClick={onStartShopping}
//           className="bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition-all shadow-md"
//         >
//           Start Shopping
//         </button>
//       </div>
//     </div>
//   );
// }



// import bgImage from "../assets/landing.png";
// import LearnMoreModal from "../components/LearnMoreModal"; 
// export default function HeroSection({ onStartShopping, isLoggedIn }) {
//   return (
//     <div
//       className="relative h-screen flex flex-col items-center justify-center text-center text-white"
//       style={{
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="absolute inset-0 bg-black bg-opacity-50"></div>

//       <div className="relative z-10 max-w-3xl px-6 animate-fadeIn">
//         <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-orange-100 drop-shadow-lg">
//           Traditional Elegance, Modern Fit
//         </h1>
//         <p className="text-md md:text-lg mb-8 text-orange-50 leading-relaxed drop-shadow-md">
//           Experience the richness of Indian heritage with outfits tailored to
//           your exact measurements. Perfect fit, delivered to your doorstep.
//         </p>

//         <div className="flex gap-4 justify-center">
//           <button
//             onClick={onStartShopping}
//             className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition shadow-md"
//           >
//             Start Shopping
//           </button>

//           <button
//             onClick={() => document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" })}
//             className="bg-transparent border-2 border-orange-400 text-orange-200 px-6 py-3 rounded-md hover:bg-orange-100 hover:text-orange-700 transition"
//           >
//             Learn More
//           </button>
//         </div>
//       </div>

//       {/* Small "about" section to scroll to */}
//       <div id="about-section" className="absolute bottom-10 w-full text-center text-orange-50 opacity-0 md:opacity-100">
//         <p className="text-sm">Handcrafted garments · Custom fit · Free shipping</p>
//       </div>
//     </div>
//   );
// }


import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LearnMoreModal from "../components/LearnMoreModal";
import bgImage from "../assets/landing.png";
import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-react';

export default function HeroSection() {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const [showLearnMore, setShowLearnMore] = useState(false);

  const handleStartShopping = () => {
  if (isSignedIn) {
    navigate("/shop");
  } else {
    navigate("/sign-in");
  }
};

  return (
    <div
      className="relative h-screen flex flex-col items-center justify-center text-center text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0  bg-opacity-50"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl px-6 animate-fadeIn">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-orange-400 drop-shadow-lg">
          Traditional Elegance, Modern Fit
        </h1>

        <p className="text-lg md:text-xl mb-8 text-black leading-relaxed drop-shadow-md">
          Experience the richness of Indian heritage with outfits tailored to
          your exact measurements. Perfect fit, delivered to your doorstep.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handleStartShopping}
            className="bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition-all shadow-md"
          >
            Start Shopping
          </button>

          <button
            onClick={() => setShowLearnMore(true)}
            className="bg-transparent border-2 border-orange-400 text-orange-400 px-8 py-3 rounded-md hover:bg-orange-100 hover:text-orange-700 transition-all"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Learn More Modal */}
      {showLearnMore && <LearnMoreModal onClose={() => setShowLearnMore(false)} />}
    </div>
  );
}




// import { useNavigate } from "react-router-dom";

// export default function HeroSection() {
//   const navigate = useNavigate();

//   return (
//     <div className="relative h-screen bg-[#fcf9eb] flex flex-col items-center justify-center text-center">
//       <div
//         className="absolute inset-0 bg-cover bg-center opacity-60"
//         style={{
//           backgroundImage: `url("/assets/hero-bg.png")`, // your downloaded image path
//         }}
//       ></div>

//       <div className="relative z-10 max-w-2xl">
//         <h1 className="text-5xl font-bold text-gray-800 mb-4">
//           Traditional Elegance, Modern Fit
//         </h1>
//         <p className="text-gray-700 mb-8">
//           Experience the richness of Indian heritage with outfits tailored to
//           your exact measurements. Perfect fit, delivered to your doorstep.
//         </p>

//         <div className="flex gap-4 justify-center">
//           <button
//             onClick={() => navigate("/login")}
//             className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition"
//           >
//             Start Shopping
//           </button>

//           <button
//             onClick={() => navigate("/learnmore")}
//             className="bg-white border border-orange-400 text-orange-600 px-6 py-3 rounded-md hover:bg-orange-100 transition"
//           >
//             Learn More
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useNavigate } from "react-router-dom";

// export default function HeroSection() {
//   const navigate = useNavigate();

//   const handleStartShopping = () => {
//     alert("Please log in first to start shopping!");
//     navigate("/login");
//   };

//   return (
//     <div className="relative h-screen bg-[#fcf9eb] flex flex-col items-center justify-center text-center">
//       <div
//         className="absolute inset-0 bg-cover bg-center opacity-60"
//         style={{
//           backgroundImage: `url("/assets/hero-bg.png")`,
//         }}
//       ></div>

//       <div className="relative z-10 max-w-2xl">
//         <h1 className="text-5xl font-bold text-gray-800 mb-4">
//           Traditional Elegance, Modern Fit
//         </h1>
//         <p className="text-gray-700 mb-8">
//           Experience the richness of Indian heritage with outfits tailored to
//           your exact measurements. Perfect fit, delivered to your doorstep.
//         </p>

//         <div className="flex gap-4 justify-center">
//           <button
//             onClick={handleStartShopping}
//             className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition"
//           >
//             Start Shopping
//           </button>

//           <button
//             onClick={() => navigate("/learnmore")}
//             className="bg-white border border-orange-400 text-orange-600 px-6 py-3 rounded-md hover:bg-orange-100 transition"
//           >
//             Learn More
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
