import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ManageAccount() {
  const { user, isLoaded } = useUser();
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
  });

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please sign in to manage your account</p>
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      await user?.update({
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      alert("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      alert("Error updating profile: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf9eb] pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Manage Account</h1>
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-800 transition"
            >
              ← Back
            </button>
          </div>

          {/* Profile Picture */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
              <img
                src={user?.imageUrl || "https://via.placeholder.com/100"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-gray-600">Profile Picture</p>
              <p className="text-sm text-gray-500">Managed through your account settings</p>
            </div>
          </div>

          {/* Account Info */}
          <div className="space-y-6">
            {!editMode ? (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <p className="text-gray-800 px-3 py-2 bg-gray-50 rounded-md">
                    {user?.firstName || "Not provided"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <p className="text-gray-800 px-3 py-2 bg-gray-50 rounded-md">
                    {user?.lastName || "Not provided"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <p className="text-gray-800 px-3 py-2 bg-gray-50 rounded-md">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>

                <button
                  onClick={() => setEditMode(true)}
                  className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition font-semibold"
                >
                  Edit Profile
                </button>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address (Read-only)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSaveChanges}
                    className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition font-semibold"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setFormData({
                        firstName: user?.firstName || "",
                        lastName: user?.lastName || "",
                        email: user?.primaryEmailAddress?.emailAddress || "",
                      });
                    }}
                    className="flex-1 bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500 transition font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Account Information</h2>
          <div className="space-y-3 text-gray-600">
            <p>✓ Account created: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</p>
            <p>✓ Last updated: {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : "N/A"}</p>
            <p>✓ Email verified: {user?.primaryEmailAddress?.verification?.status === "verified" ? "Yes" : "Pending"}</p>
          </div>
        </div>

        {/* Fittings quick access */}
        <div className="bg-white rounded-lg shadow-md p-8 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Fittings & Alterations</h2>
          <p className="text-gray-600 mb-4">Save your measurements for faster checkout and perfect fit.</p>
          <button
            onClick={() => navigate("/fittings")}
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
          >
            Open Fittings Page
          </button>
        </div>
      </div>
    </div>
  );
}
