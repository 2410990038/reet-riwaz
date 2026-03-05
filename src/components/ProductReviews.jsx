import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const BASE_URL = "http://localhost:5000/api";

export default function ProductReviews({ productId }) {
  const { user, isSignedIn } = useUser();
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [myRating, setMyRating] = useState(5);
  const [myComment, setMyComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hovered, setHovered] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${BASE_URL}/reviews/${productId}`);
      const data = await res.json();
      setReviews(data.reviews || []);
      setAvgRating(data.avgRating || 0);
      setTotalReviews(data.totalReviews || 0);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  const handleSubmit = async () => {
    if (!myComment.trim()) return alert("Please write a comment!");
    setSubmitting(true);
    try {
      await fetch(`${BASE_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          userId: user.id,
          userName: user.fullName || user.firstName || "User",
          userImage: user.imageUrl || "",
          rating: myRating,
          comment: myComment
        })
      });
      setMyComment("");
      setMyRating(5);
      setShowForm(false);
      fetchReviews();
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
    setSubmitting(false);
  };

  const userAlreadyReviewed = reviews.some((r) => r.userId === user?.id);
  const visibleReviews = showAll ? reviews : reviews.slice(0, 2);

  return (
    <div className="mt-4 border-t pt-4">
      {/* Rating Summary */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-yellow-500 text-lg">⭐</span>
          <span className="font-bold text-gray-800">{avgRating}</span>
          <span className="text-gray-500 text-sm">({totalReviews} reviews)</span>
        </div>
        {isSignedIn && !userAlreadyReviewed && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="text-xs bg-orange-500 text-white px-3 py-1 rounded-full hover:bg-orange-600 transition"
          >
            {showForm ? "Cancel" : "✍️ Write Review"}
          </button>
        )}
        {userAlreadyReviewed && (
          <span className="text-xs text-green-600 font-semibold">✅ Reviewed</span>
        )}
        {!isSignedIn && (
          <span className="text-xs text-gray-400">Sign in to review</span>
        )}
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="bg-orange-50 rounded-xl p-3 mb-3 border border-orange-100">
          <p className="text-sm font-semibold mb-2 text-gray-700">Your Rating:</p>
          <div className="flex gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setMyRating(star)}
                className="text-2xl transition"
              >
                {star <= (hovered || myRating) ? "⭐" : "☆"}
              </button>
            ))}
          </div>
          <textarea
            value={myComment}
            onChange={(e) => setMyComment(e.target.value)}
            placeholder="Share your experience..."
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
          />
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="mt-2 w-full bg-orange-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <p className="text-xs text-gray-400 text-center py-2">No reviews yet. Be the first!</p>
      ) : (
        <div className="space-y-2">
          {visibleReviews.map((r) => (
            <div key={r._id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <img
                  src={r.userImage || "https://via.placeholder.com/24"}
                  alt={r.userName}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs font-semibold text-gray-700">{r.userName}</span>
                <span className="text-yellow-500 text-xs">{"⭐".repeat(r.rating)}</span>
              </div>
              <p className="text-xs text-gray-600">{r.comment}</p>
              <p className="text-xs text-gray-400 mt-1">{new Date(r.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
          {reviews.length > 2 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-xs text-orange-500 hover:underline w-full text-center mt-1"
            >
              {showAll ? "Show less ▲" : `Show all ${reviews.length} reviews ▼`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}