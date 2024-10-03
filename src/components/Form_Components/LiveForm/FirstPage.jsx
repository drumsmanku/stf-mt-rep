import React from "react";

const FirstPage = ({ onButtonClick }) => {
  return (
    <div className={"text-center"}>
      <h1 className="text-xl md:text-4xl font-bold">👋 Welcome! This is a live striform</h1>
      <p className="text-center mt-4 p-2 text-[2px] md:text-lg">
        Feel free to fill it out to see how a published striform looks and feels
        👀
      </p>
      <button
        onClick={onButtonClick}
        className="flex self-center mx-auto mt-4 px-5 py-3 rounded-md font-semibold bg-[#44ad94]"
      >
        Let's Start
        <svg
          x-show="!isSubmitBlock"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
        </svg>
      </button>
    </div>
  );
};

export default FirstPage;
