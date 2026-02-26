import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ExploreByOccasion = () => {
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const occasions = [
    {
      title: "Weddings",
      image:
        "https://i.pinimg.com/736x/b8/02/f9/b802f958bf59381408956906babd6a6e.jpg",
      products: [
        {
          id: "wedding-1",
          name: "Bridal Lehenga",
          image:
            "https://www.aishwaryadesignstudio.com/content/images/thumbs/0144879_fascinatingred-designer-bridal-lehenga-choli-for-wedding-and-reception.jpeg",
          price: "₹6,999",
          priceValue: 6999,
        },
        {
          id: "wedding-2",
          name: "Sherwani Set",
          image:
            "https://getethnic.com/wp-content/uploads/2021/07/3-White-Sherwani-.jpg",
          price: "₹5,499",
          priceValue: 5499,
        },
        {
          id: "wedding-3",
          name: "Designer Saree",
          image:
            "https://i0.wp.com/www.sanskriticuttack.com/wp-content/uploads/2023/07/saree_in_half_saree_style.jpg?ssl=1",
          price: "₹3,999",
          priceValue: 3999,
        },
      ],
    },
    {
      title: "Festivals",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzKOsWt50CvFs5jxNG9AGU05tIDZ4E7LO14w&s",
      products: [
        {
          id: "festival-1",
          name: "Anarkali Dress",
          image:
            "https://subhvastra.in/cdn/shop/files/WhatsAppImage2023-06-02at6.50.09PM_800x.jpg?v=1704453598",
          price: "₹2,999",
          priceValue: 2999,
        },
        {
          id: "festival-2",
          name: "Kurta Pajama Set",
          image:
            "https://i.etsystatic.com/35384727/r/il/971410/6318118054/il_570xN.6318118054_p3xj.jpg",
          price: "₹1,999",
          priceValue: 1999,
        },
        {
          id: "festival-3",
          name: "Embroidered Dupatta",
          image:
            "https://inayakhan.shop/cdn/shop/files/light-blue-silk-pom-pom-phulkari-dupatta-with-exquisite-handwork-embroidery-inayakhan-shop.jpg?v=1718874645",
          price: "₹999",
          priceValue: 999,
        },
      ],
    },
    {
      title: "Cultural Events",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGX5E8WYTRP7tfOLWPxXsVmMqZ4z23F5yVvw&s",
      products: [
        {
          id: "cultural-1",
          name: "Phulkari Dupatta",
          image:
            "https://theamritsarstore.com/cdn/shop/files/hand-embroidered-phulkari-dupattas-online-handmade-dupatta-with-different-design-by-the-amritsar-store-175.webp?v=1759830260",
          price: "₹1,499",
          priceValue: 1499,
        },
        {
          id: "cultural-2",
          name: "Punjabi Suit",
          image:
            "https://www.salwari.com/image/cache/product-2025/yellow-embroidered-salwar-suit-107422-308x425.gif",
          price: "₹3,299",
          priceValue: 3299,
        },
        {
          id: "cultural-3",
          name: "Traditional Turban",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuU49wJQtjiTe_JhsV8T4GcY429YGW6WvgvQ&s",
          price: "₹1,099",
          priceValue: 1099,
        },
      ],
    },
  ];


  // Buy Now: add item to cart and go directly to checkout
  const handleBuyNow = (product) => {
    addToCart(product);
    navigate("/checkout");
  };

  // Cart summary info
  const cartItemCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.priceValue || 0) * (item.qty || 1), 0);

  if (!selectedOccasion) {
    return (
      <section className="pb-20 pt-5 bg-[#fffde8] border-t-4 border-orange-300">
        <div className="flex justify-between items-center max-w-6xl mx-auto px-4 mb-10">
          <h2 className="text-4xl font-bold text-[#1a1a1a]">
            Explore by Occasion
          </h2>
          <div className="bg-orange-500 text-white px-4 py-2 rounded-lg">
            Cart: {cartItemCount} items | ₹{cartTotal.toLocaleString()}
          </div>
        </div>
        <p className="text-center text-gray-600 mb-10">
          Discover attire perfect for every celebration and cultural moment
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {occasions.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedOccasion(item)}
              className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer group transition-transform transform hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover brightness-90 group-hover:brightness-75 transition-all duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-2xl font-semibold drop-shadow-lg">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="pb-20 pt-10 bg-[#fffde8] min-h-screen">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-4 mb-10">
        <h2 className="text-4xl font-bold">
          {selectedOccasion.title} Collection
        </h2>
        <div className="bg-orange-500 text-white px-4 py-2 rounded-lg">
          Cart: {cartItemCount} items | ₹{cartTotal.toLocaleString()}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {selectedOccasion.products.map((product, i) => {
          const cartItem = cart.find((item) => item.id === product.id);
          return (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg p-4 transition-transform hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <h3 className="text-xl font-semibold mt-4">{product.name}</h3>
              <p className="text-green-600 font-medium">{product.price}</p>

              {cartItem ? (
                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={() =>
                      updateQuantity(product.id, cartItem.qty - 1)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                  >
                    −
                  </button>
                  <span className="flex-1 text-center font-semibold">
                    {cartItem.qty}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(product.id, cartItem.qty + 1)
                    }
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg w-1/2"
                  >
                    Add to Bag
                  </button>
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-1/2"
                  >
                    Buy Now
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={() => setSelectedOccasion(null)}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
        >
          ← Back to Occasions
        </button>
        {cartItemCount > 0 && (
          <button onClick={() => navigate('/cart')} className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
            View Cart ({cartItemCount})
          </button>
        )}
      </div>
    </section>
  );
};

export default ExploreByOccasion;