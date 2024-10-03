import React, { useState } from "react";

const SixthPage = ({ onNextClick }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="h-[30vh] w-[30vw] flex flex-col justify-center items-center">
      <div className="p-8 rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">Who are you?</h1>
        <p className="mb-2">This is a dropdown question block.</p>
        <p className="text-sm text-gray-500 mb-8">
          You can choose to randomize the order, so that each person will see
          the options in a different order.
        </p>

        <select
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-6"
          value={selectedOption}
          onChange={handleChange}
        >
          <option value="" disabled hidden>
            Please select an option
          </option>
          <option value="Human being">Human being</option>
          <option value="Customer support">Customer support</option>
          <option value="Student">Student</option>
          <option value="Marketer">Marketer</option>
          <option value="Founder/CEO">Founder/CEO</option>
        </select>

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
        <span className="ml-5 text-sm">
          press <span className="font-semibold"> Ctrl Enter</span>{" "}
          <img
            className="h-2 w-2 inline font-semibold"
            src="https://www.svgrepo.com/show/472392/arrow-turn-left.svg"
            alt=""
          />
        </span>
      </div>
    </div>
  );
};

export default SixthPage;
