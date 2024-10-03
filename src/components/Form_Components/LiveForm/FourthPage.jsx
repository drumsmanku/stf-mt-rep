import React from "react";

const FourthPage = ({ onNextClick }) => {
  return (
    <div>
      <h1 className="text-3xl text-center font-semibold">
        You chose correctly 😃
      </h1>
      <p className="text-center p-2 mt-6">
        This is striform's "Logic" feature in action.
      </p>
      <p className="text-center p-2 mt-4">
        If you had chosen Typeform, you would have seen "That is incorrect"
        instead.
      </p>
      <button
        onClick={onNextClick}
        className="flex self-center mx-auto mt-6 px-5 py-3 rounded-md font-semibold bg-[#44ad94]"
      >
        Continue
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default FourthPage;
