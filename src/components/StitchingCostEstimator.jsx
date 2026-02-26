import React, { useState, useEffect } from "react";

const StitchingCostEstimator = () => {
  const BASE_PRICE = 500;

  const [options, setOptions] = useState(() => {
    return JSON.parse(localStorage.getItem("stitchOptions")) || {
      sleeve: 0,
      neck: 0,
      fabric: 0,
      embroidery: 0,
    };
  });

  const [cost, setCost] = useState(BASE_PRICE);

  useEffect(() => {
    const total =
      BASE_PRICE +
      options.sleeve +
      options.neck +
      options.fabric +
      options.embroidery;

    setCost(total);
    localStorage.setItem("stitchOptions", JSON.stringify(options));
  }, [options]);

  const handleChange = (type, value) => {
    setOptions(prev => ({
      ...prev,
      [type]: Number(value),
    }));
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-xl rounded-xl mt-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-orange-600">
        Stitching Cost Estimator
      </h2>

      <p className="text-gray-600 text-center mb-6">
        Select your preferences to calculate stitching cost instantly.
      </p>

      {/* SLEEVE */}
      <label className="block font-semibold mt-3">Sleeve Style:</label>
      <select
        className="w-full p-2 border rounded mt-1"
        onChange={e => handleChange("sleeve", e.target.value)}
        value={options.sleeve}
      >
        <option value="0">-- Select Sleeve Type --</option>
        <option value="100">Half Sleeve (+₹100)</option>
        <option value="150">Full Sleeve (+₹150)</option>
        <option value="200">Puff Sleeve (+₹200)</option>
      </select>

      {/* NECK */}
      <label className="block font-semibold mt-4">Neck Design:</label>
      <select
        className="w-full p-2 border rounded mt-1"
        onChange={e => handleChange("neck", e.target.value)}
        value={options.neck}
      >
        <option value="0">-- Select Neck Design --</option>
        <option value="80">V-Neck (+₹80)</option>
        <option value="120">Boat Neck (+₹120)</option>
        <option value="150">Designer Neck (+₹150)</option>
      </select>

      {/* FABRIC */}
      <label className="block font-semibold mt-4">Fabric Type:</label>
      <select
        className="w-full p-2 border rounded mt-1"
        onChange={e => handleChange("fabric", e.target.value)}
        value={options.fabric}
      >
        <option value="0">-- Select Fabric --</option>
        <option value="50">Cotton (+₹50)</option>
        <option value="100">Silk (+₹100)</option>
        <option value="150">Organza / Net (+₹150)</option>
      </select>

      {/* EMBROIDERY */}
      <label className="block font-semibold mt-4">Embroidery:</label>
      <select
        className="w-full p-2 border rounded mt-1"
        onChange={e => handleChange("embroidery", e.target.value)}
        value={options.embroidery}
      >
        <option value="0">No Embroidery</option>
        <option value="200">Light Embroidery (+₹200)</option>
        <option value="400">Heavy Embroidery (+₹400)</option>
      </select>

      {/* COST BOX */}
      <div className="mt-6 text-center bg-orange-100 p-4 rounded-lg shadow-inner">
        <h3 className="text-xl font-bold text-gray-900">
          Total Stitching Cost
        </h3>
        <p className="text-3xl font-extrabold text-orange-700">₹{cost}</p>
      </div>

      {/* RESET BUTTON */}
      <button
        onClick={() => {
          setOptions({ sleeve: 0, neck: 0, fabric: 0, embroidery: 0 });
          localStorage.removeItem("stitchOptions");
        }}
        className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
      >
        Reset Selection
      </button>
    </div>
  );
};

export default StitchingCostEstimator;
