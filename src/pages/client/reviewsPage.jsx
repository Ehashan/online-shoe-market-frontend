import { useState } from "react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([
    {
      name: "Eranda",
      rating: 5,
      comment: "Great quality shoes! Highly recommend.",
    },
    {
      name: "Nimal",
      rating: 4,
      comment: "Good service and fast delivery.",
    },
  ]);

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  function addReview() {
    if (!name || !comment) return;

    const newReview = { name, rating, comment };
    setReviews([newReview, ...reviews]);

    setName("");
    setComment("");
    setRating(5);
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-10">

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Customer Reviews ⭐
      </h1>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md mb-10">
        
        <h2 className="text-xl font-semibold mb-4">Write a Review</h2>

        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <textarea
          placeholder="Your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full mb-4 px-4 py-2 border rounded-xl"
        >
          <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
          <option value={4}>⭐⭐⭐⭐ (4)</option>
          <option value={3}>⭐⭐⭐ (3)</option>
          <option value={2}>⭐⭐ (2)</option>
          <option value={1}>⭐ (1)</option>
        </select>

        <button
          onClick={addReview}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-xl hover:bg-indigo-700 transition"
        >
          Submit Review
        </button>
      </div>

      <div className="max-w-4xl mx-auto grid gap-6">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800">{review.name}</h3>
              <span className="text-yellow-500">
                {"⭐".repeat(review.rating)}
              </span>
            </div>
            <p className="text-gray-600 text-sm">{review.comment}</p>
          </div>
        ))}
      </div>

    </div>
  );
}