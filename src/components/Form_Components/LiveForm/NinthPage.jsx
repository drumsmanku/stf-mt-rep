import React from "react";
import SignBoard from "../SignBoard.jsx";

const NinthPage = ({ onSubmit }) => {
  return (
    <div className="h-[30vh] w-[30vw]  flex flex-col items-center justify-center bg-[#f8f5e7]">
      <div className="p-8 rounded-lg w-full">
        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          You can ask for signatures as well{" "}
          <span role="img" aria-label="smiling face with sweat">
            😅
          </span>
          <span className="text-red-500"> *</span>
        </h2>

        {/* Subtext */}
        <p className="mb-6 text-gray-600">
          please sign here{" "}
          <span role="img" aria-label="down finger pointing">
            👇
          </span>
        </p>

        {/* Signature box */}

        <SignBoard
          width={400}
          height={300}
          strokeColor="#000000"
          strokeWidth={2}
        />

        {/* Submit button */}
        <div className="flex items-center">
          <button
            onClick={onSubmit}
            className="mt-4 px-5 py-3 rounded-md font-semibold bg-[#44ad94] text-white hover:bg-green-600 transition-all"
          >
            Submit
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m-7-7l7 7-7 7"
              />
            </svg>
          </button>
          <span className="ml-4 text-sm text-gray-500">
            press <span className="font-semibold">Ctrl Enter</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default NinthPage;
