// export default function LearnMoreModal({ onClose }) {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-40">
//       <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-2xl p-8 relative animate-fadeIn">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-lg"
//         >
//           ✕
//         </button>

//         <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
//           Why ReetRiwaaz?
//         </h2>

//         <div className="space-y-6 text-gray-700 text-lg">
//           <div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               💠 Perfect Fit Guarantee
//             </h3>
//             <p>
//               Every outfit at ReetRiwaaz is tailored to your exact measurements.
//               We ensure that your traditional attire not only looks elegant but
//               feels comfortable and fits flawlessly.
//             </p>
//           </div>

//           <div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               🧵 Authentic Craftsmanship
//             </h3>
//             <p>
//               Our artisans bring generations of expertise to every stitch. Each
//               piece reflects the soul of Indian heritage — handcrafted with
//               precision, love, and tradition.
//             </p>
//           </div>

//           <div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               ✨ Why Choose Us?
//             </h3>
//             <p>
//               ReetRiwaaz bridges the gap between timeless tradition and modern
//               comfort. Our curated collection helps you celebrate culture with
//               confidence and grace.
//             </p>
//           </div>
//         </div>

//         <div className="mt-8 text-center">
//           <button
//             onClick={onClose}
//             className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function LearnMoreModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg- bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-2xl p-8 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-lg"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Why ReetRiwaaz?
        </h2>

        <div className="space-y-6 text-gray-700 text-lg">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              💠 Perfect Fit Guarantee
            </h3>
            <p>
              Every outfit at ReetRiwaaz is tailored to your exact measurements.
              We ensure that your traditional attire not only looks elegant but
              feels comfortable and fits flawlessly.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              🧵 Authentic Craftsmanship
            </h3>
            <p>
              Our artisans bring generations of expertise to every stitch. Each
              piece reflects the soul of Indian heritage — handcrafted with
              precision, love, and tradition.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              ✨ Why Choose Us
            </h3>
            <p>
              ReetRiwaaz bridges the gap between timeless tradition and modern
              comfort. Our curated collection helps you celebrate culture with
              confidence and grace.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
