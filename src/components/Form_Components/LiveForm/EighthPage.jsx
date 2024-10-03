import React, { useState } from "react";

const EighthPage = ({ onNextClick }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleMouseEnter = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="min-h-full w-full flex flex-col items-center justify-center">
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Based on what you've seen so far, what would you rate striform?
        </h2>
        <p className="mb-6 text-gray-600">
          Yes, we actually look at these ratings!
        </p>

        {/* Star rating system */}
        <div className="flex space-x-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleMouseEnter(star)}
              onMouseLeave={handleMouseLeave}
              xmlns="http://www.w3.org/2000/svg"
              className={`h-10 w-10 cursor-pointer transition-colors duration-200 ${
                (hoverRating || rating) >= star
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
              fill={(hoverRating || rating) >= star ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.664 5.123a1 1 0 00.95.69h5.397c.969 0 1.371 1.24.588 1.81l-4.36 3.18a1 1 0 00-.364 1.118l1.664 5.122c.3.922-.755 1.688-1.54 1.118l-4.36-3.18a1 1 0 00-1.175 0l-4.36 3.18c-.784.57-1.838-.196-1.539-1.118l1.664-5.122a1 1 0 00-.364-1.118L2.85 10.55c-.783-.57-.38-1.81.588-1.81h5.397a1 1 0 00.95-.69l1.664-5.123z"
              />
            </svg>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={onNextClick}
          className="mt-6 px-6 py-3 rounded-md font-semibold bg-[#44ad94] text-white hover:bg-green-600 transition-colors duration-200 flex items-center"
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EighthPage;
