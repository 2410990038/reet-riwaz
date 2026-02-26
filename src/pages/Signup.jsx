// import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    // Signup logic here
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#fcf9eb]">
      <div className="bg-white shadow-lg p-10 rounded-xl w-96">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Create Account
        </h2>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
          >
            Create Account
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-600 font-medium">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
