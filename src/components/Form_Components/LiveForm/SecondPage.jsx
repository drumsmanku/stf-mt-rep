import React from "react";

const SecondPage = ({ onNextClick }) => {
  return (
    <div className={"p-4"}>
      <h1 className="text-3xl font-semibold">
        How did you hear about striform? 👂 *
      </h1>
      <p className="mt-4">
        You can let us know the real answer (we actually read it!) or just input
        a dummy answer if you wish
      </p>
      <input
        className="my-2 p-2 border-b border-black outline-none bg-transparent w-full"
        type="text"
        placeholder="Your answer here..."
      />
      <button
        onClick={onNextClick}
        className="mt-4 px-5 py-3 rounded-md font-semibold bg-[#44ad94]"
      >
        Next
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          ></path>
        </svg>
      </button>
      <span className="ml-5 text-sm">
        press <span className="font-semibold">Enter</span>{" "}
        <img
          className="h-2 w-2 inline font-semibold"
          src="https://www.svgrepo.com/show/472392/arrow-turn-left.svg"
          alt=""
        />
      </span>
    </div>
  );
};

export default SecondPage;
