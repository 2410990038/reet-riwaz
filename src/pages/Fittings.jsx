import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Fittings() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    shoulder: "",
    chest: "",
    waist: "",
    armLength: "",
    legLength: "",
    hip: "",
  });
  const [status, setStatus] = useState("");

  const storageKey = user ? `fittings:${user.id}` : null;

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) return;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const data = JSON.parse(raw);
        setForm({
          shoulder: data.shoulder || "",
          chest: data.chest || "",
          waist: data.waist || "",
          armLength: data.armLength || "",
          legLength: data.legLength || "",
          hip: data.hip || "",
        });
      }
    } catch (e) {
      // ignore parse errors
    }
  }, [isLoaded, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // allow only numbers and optional decimal
    const cleaned = value.replace(/[^0-9.]/g, "");
    setForm((prev) => ({ ...prev, [name]: cleaned }));
  };

  const handleSave = () => {
    if (!user) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(form));
      setStatus("Saved");
      setTimeout(() => setStatus(""), 1500);
    } catch (e) {
      setStatus("Error saving");
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please sign in to manage fittings</p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const Field = ({ label, name }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label} (cm)</label>
      <input
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder="e.g. 38"
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 appearance-none"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcf9eb] pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Fittings & Alterations</h1>
            <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-800 transition">
              ← Back
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Shoulder" name="shoulder" />
            <Field label="Chest" name="chest" />
            <Field label="Waist" name="waist" />
            <Field label="Arm Length" name="armLength" />
            <Field label="Leg Length" name="legLength" />
            <Field label="Hip" name="hip" />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition font-semibold"
            >
              Save Measurements
            </button>
            <button
              onClick={() => {
                setForm({ shoulder: "", chest: "", waist: "", armLength: "", legLength: "", hip: "" });
              }}
              className="flex-1 bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500 transition font-semibold"
            >
              Clear
            </button>
          </div>
          {status && <p className="text-green-600 mt-3">{status}</p>}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">Tips</h2>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            <li>Use a flexible tape for accurate measurements.</li>
            <li>Measure over light clothing for best results.</li>
            <li>Units are saved in centimeters (cm).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
