import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { category } = useParams();

  const readableName =
    category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf7e6] text-center">
      <h2 className="text-4xl font-bold text-orange-600 mb-4">
        {readableName} Collection
      </h2>
      <p className="text-gray-700 text-lg">
        Discover beautiful designs and traditional outfits tailored for {readableName}.
      </p>
    </div>
  );
}
