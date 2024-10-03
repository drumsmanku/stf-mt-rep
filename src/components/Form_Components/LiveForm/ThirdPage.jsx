import React from "react";

const ThirdPage = ({ onNextClick }) => {
  return (
    <div className={"text-form"}>
      <h1 className="text-3xl font-semibold">Which do you prefer? *</h1>
      <p className="mt-2">
        This is a multiple choice block where you can only select 1 answer.
      </p>
      <p className="mt-4">And yes, you can add an image to your answers 🤓</p>

      <div className="ml-8 flex flex-col items-start justify-center w-40 mt-5 gap-2 p-3 rounded-lg border border-black">
        <p className="text-sm font-semibold capitalize">striform</p>
        <img className="w-48" src="/logo.png" alt="brandlogo" />
      </div>

      <div className="ml-8 flex flex-col items-start justify-center w-40 mt-5 gap-2 p-3 rounded-lg border border-black">
        <p className="text-sm font-semibold capitalize">typeform</p>
        <img className="w-48" src="/logo.png" alt="brandlogo" />
      </div>

      <button
        onClick={onNextClick}
        className="mt-6 px-5 py-3 rounded-md font-semibold bg-[#44ad94]"
      >
        Next
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 inline"
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

export default ThirdPage;
