import React, { useState } from "react";

const FifthPage = ({ onNextClick }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    collectingEmails: false,
    gatherSignups: false,
    collectingFeedback: false,
    other: false,
  });

  const handleDivClick = (option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  return (
    <div className="text-center p-8">
      <h1 className="text-3xl font-semibold mb-4">
        How would you like to use striform?
      </h1>
      <p className="mb-4">
        This is a multiple choice block where you can select as many as you
        want.
      </p>
      <p className="text-sm text-gray-600 mb-8">
        Keyboard shortcuts are supported: Press 1, 2, 3, or 4 (or A, B, C, or D)
      </p>

      {/* Option 1 */}
      <div
        className={`w-64 p-4 mt-6 border-2 rounded-md cursor-pointer flex justify-between items-center ${
          selectedOptions.collectingEmails
            ? "border-green-500"
            : "border-gray-300"
        }`}
        onClick={() => handleDivClick("collectingEmails")}
      >
        Collecting Emails
        {selectedOptions.collectingEmails && (
          <input type="checkbox" className="ml-2 w-5 h-5" checked />
        )}
      </div>

      {/* Option 2 */}
      <div
        className={`w-64 p-4 mt-2 border-2 rounded-md cursor-pointer flex justify-between items-center ${
          selectedOptions.gatherSignups ? "border-green-500" : "border-gray-300"
        }`}
        onClick={() => handleDivClick("gatherSignups")}
      >
        Gather signups for an event
        {selectedOptions.gatherSignups && (
          <input type="checkbox" className="ml-2 w-5 h-5" checked />
        )}
      </div>

      {/* Option 3 */}
      <div
        className={`w-64 p-4 mt-2 border-2 rounded-md cursor-pointer flex justify-between items-center ${
          selectedOptions.collectingFeedback
            ? "border-green-500"
            : "border-gray-300"
        }`}
        onClick={() => handleDivClick("collectingFeedback")}
      >
        Collecting Feedback
        {selectedOptions.collectingFeedback && (
          <input type="checkbox" className="ml-2 w-5 h-5" checked />
        )}
      </div>

      {/* Option 4 */}
      <div
        className={`w-64 p-4 mt-2 border-2 rounded-md cursor-pointer flex justify-between items-center ${
          selectedOptions.other ? "border-green-500" : "border-gray-300"
        }`}
        onClick={() => handleDivClick("other")}
      >
        Other
        {selectedOptions.other && (
          <input type="checkbox" className="ml-2 w-5 h-5" checked />
        )}
      </div>

      <button
        onClick={onNextClick}
        className="mt-6 px-5 py-3 rounded-md font-semibold bg-[#44ad94] text-white hover:bg-green-600"
      >
        Next
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline"
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
  );
};

export default FifthPage;
