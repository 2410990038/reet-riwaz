// import React from "react";

// const Shop = () => (
//   <div className="h-screen flex flex-col items-center justify-center bg-[#faf7e6]">
//     <h2 className="text-3xl font-bold mb-4">Shop</h2>
//     <p className="text-gray-700">Explore our latest collection.</p>
//   </div>
// );

// export default Shop;
// import ShopByCategory from "../components/ShopbyCategory";
// import ExploreByOccasion from "../components/ExplorebyOccasion";
// import ExploreByRegion from "../components/ExploreByRegion";

// export default function Shop() {
//   return (
//     <div>
//       <ShopByCategory />
//        {/* New Explore by Occasion Section */}
//       <ExploreByOccasion />
//          <ExploreByRegion />
//     </div>
//   );
// }

// import { useState } from "react";
// import ShopByCategory from "../components/ShopbyCategory";
// import ExploreByOccasion from "../components/ExplorebyOccasion";
// import ExploreByRegion from "../components/ExploreByRegion";

// export default function Shop() {
//   const [cartItems, setCartItems] = useState([]);

//   // Add item to cart
//   const handleAddToCart = (item) => {
//     setCartItems((prev) => [...prev, item]);
//   };

//   return (
//     <div className="bg-[#fffce8] min-h-screen p-6">
//       {/* Your existing sections */}
//       <ShopByCategory onAddToCart={handleAddToCart} />
//       <ExploreByOccasion onAddToCart={handleAddToCart} />
//       <ExploreByRegion onAddToCart={handleAddToCart} />

//       {/* Mini Cart Section */}
//       {cartItems.length > 0 && (
//         <div className="mt-10 bg-white shadow-xl rounded-2xl p-6 max-w-3xl mx-auto border border-gray-200">
//           <h2 className="text-2xl font-bold text-center mb-4">🛍️ Items Added to Bag</h2>
//           <ul className="divide-y divide-gray-200">
//             {cartItems.map((item, index) => (
//               <li key={index} className="py-3 flex justify-between items-center">
//                 <span className="font-medium text-gray-700">{item.name}</span>
//                 <span className="text-green-700 font-semibold">₹{item.price}</span>
//               </li>
//             ))}
//           </ul>
//           <div className="text-right mt-4 font-semibold text-lg">
//             Total: ₹{cartItems.reduce((sum, item) => sum + item.price, 0)}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useState } from "react";
import { useCart } from "../context/CartContext";
import ShopByCategory from "../components/ShopbyCategory";
import ExploreByOccasion from "../components/ExplorebyOccasion";
import ExploreByRegion from "../components/ExploreByRegion";

export default function Shop() {
  const { cart } = useCart(); // get cart items

  return (
    <div className="pt-18">
      <ShopByCategory />
      <ExploreByOccasion />
      <ExploreByRegion />

      {/* 🛍️ Added Items Section */}
      {cart.length > 0 && (
        <div className="mt-12 bg-[#fff7e6] border-t-4 border-orange-300 p-6 rounded-lg shadow-md mx-8">
          <h2 className="text-3xl font-bold mb-4 text-center text-orange-600">
            🛒 Items in Your Bag
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cart.map((item, index) => (
              <div key={index} className="bg-white shadow-md p-4 rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-green-700 font-bold">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

