// import { useState } from "react";

// export default function SearchFilter({ products, onFilter }) {
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("all");
//   const [rating, setRating] = useState("all");
//   const [sort, setSort] = useState("default");

//   const handleFilter = (newSearch, newCategory, newRating, newSort) => {
//     let filtered = [...products];

//     if (newSearch) {
//       filtered = filtered.filter((p) =>
//         p.name.toLowerCase().includes(newSearch.toLowerCase())
//       );
//     }

//     if (newCategory !== "all") {
//       filtered = filtered.filter((p) => p.category === newCategory);
//     }

//     if (newRating !== "all") {
//       filtered = filtered.filter((p) => p.rating >= parseFloat(newRating));
//     }

//     if (newSort === "low") {
//       filtered.sort((a, b) => a.priceValue - b.priceValue);
//     } else if (newSort === "high") {
//       filtered.sort((a, b) => b.priceValue - a.priceValue);
//     }

//     onFilter(filtered);
//   };

//   const handleSearch = (e) => { setSearch(e.target.value); handleFilter(e.target.value, category, rating, sort); };
//   const handleCategory = (e) => { setCategory(e.target.value); handleFilter(search, e.target.value, rating, sort); };
//   const handleRating = (e) => { setRating(e.target.value); handleFilter(search, category, e.target.value, sort); };
//   const handleSort = (e) => { setSort(e.target.value); handleFilter(search, category, rating, e.target.value); };

//   const handleReset = () => {
//     setSearch(""); setCategory("all"); setRating("all"); setSort("default");
//     onFilter(products);
//   };

//   const hasFilters = search || category !== "all" || rating !== "all" || sort !== "default";

//   return (
//     <div className="bg-white rounded-2xl shadow-md p-4 mb-8 border border-orange-100">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

//         {/* Search */}
//         <div className="relative">
//           <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
//           <input type="text" value={search} onChange={handleSearch}
//             placeholder="Search products..."
//             className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm" />
//         </div>

//         {/* Category */}
//         <select value={category} onChange={handleCategory}
//           className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm text-gray-700">
//           <option value="all">All Categories</option>
//           <option value="women">Women</option>
//           <option value="men">Men</option>
//           <option value="kids">Kids</option>
//         </select>

//         {/* Rating */}
//         <select value={rating} onChange={handleRating}
//           className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm text-gray-700">
//           <option value="all">All Ratings</option>
//           <option value="4.5">⭐ 4.5 & above</option>
//           <option value="4">⭐ 4.0 & above</option>
//           <option value="3.5">⭐ 3.5 & above</option>
//         </select>

//         {/* Sort */}
//         <select value={sort} onChange={handleSort}
//           className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm text-gray-700">
//           <option value="default">Sort by Price</option>
//           <option value="low">💰 Low to High</option>
//           <option value="high">💰 High to Low</option>
//         </select>
//       </div>

//       {/* Active filters */}
//       <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
//         <div className="flex gap-2 flex-wrap">
//           {search && <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full">🔍 "{search}"</span>}
//           {category !== "all" && <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full capitalize">📂 {category}</span>}
//           {rating !== "all" && <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full">⭐ {rating}+</span>}
//           {sort !== "default" && <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full">💰 {sort === "low" ? "Low→High" : "High→Low"}</span>}
//         </div>
//         {hasFilters && (
//           <button onClick={handleReset} className="text-xs text-red-500 hover:text-red-700 font-semibold underline">
//             Clear all filters
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }



import { useState } from "react";

export default function SearchFilter({ products, onFilter }) {
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("all");
  const [sort, setSort] = useState("default");

  const handleFilter = (newSearch, newRating, newSort) => {
    let filtered = [...products];

    if (newSearch) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(newSearch.toLowerCase())
      );
    }

    if (newRating !== "all") {
      filtered = filtered.filter((p) => p.rating >= parseFloat(newRating));
    }

    if (newSort === "low") {
      filtered.sort((a, b) => a.priceValue - b.priceValue);
    } else if (newSort === "high") {
      filtered.sort((a, b) => b.priceValue - a.priceValue);
    }

    onFilter(filtered);
  };

  const handleSearch = (e) => { setSearch(e.target.value); handleFilter(e.target.value, rating, sort); };
  const handleRating = (e) => { setRating(e.target.value); handleFilter(search, e.target.value, sort); };
  const handleSort = (e) => { setSort(e.target.value); handleFilter(search, rating, e.target.value); };

  const handleReset = () => {
    setSearch(""); setRating("all"); setSort("default");
    onFilter(products);
  };

  const hasFilters = search || rating !== "all" || sort !== "default";

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-8 border border-orange-100">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

        {/* Search */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input type="text" value={search} onChange={handleSearch}
            placeholder="Search products..."
            className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm" />
        </div>

        {/* Rating */}
        <select value={rating} onChange={handleRating}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm text-gray-700">
          <option value="all">All Ratings</option>
          <option value="4.5">⭐ 4.5 & above</option>
          <option value="4">⭐ 4.0 & above</option>
          <option value="3.5">⭐ 3.5 & above</option>
        </select>

        {/* Sort */}
        <select value={sort} onChange={handleSort}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm text-gray-700">
          <option value="default">Sort by Price</option>
          <option value="low">💰 Low to High</option>
          <option value="high">💰 High to Low</option>
        </select>
      </div>

      {/* Active filters */}
      <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          {search && <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full">🔍 "{search}"</span>}
          {rating !== "all" && <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full">⭐ {rating}+</span>}
          {sort !== "default" && <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full">💰 {sort === "low" ? "Low→High" : "High→Low"}</span>}
        </div>
        {hasFilters && (
          <button onClick={handleReset} className="text-xs text-red-500 hover:text-red-700 font-semibold underline">
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}