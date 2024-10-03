import React, { useRef } from "react";

const SeventhPage = ({ onNextClick }) => {
  // Ref to the hidden file input element
  const fileInputRef = useRef(null);

  // Function to trigger the file input click
  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
      // You can now use the selectedFile for further processing
    }
  };

  return (
    <div className="h-[30vh] w-full flex flex-col items-center justify-center">
      <div className="p-10 rounded-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Please upload a file</h2>
        <p className="mb-6 text-gray-700">
          This is a file upload block. With all block types, you can make them
          either required or optional. For example, this one is optional.
        </p>

        {/* File upload box */}
        <div
          onClick={handleFileClick}
          className="border-dashed border-2 border-gray-400 p-6 rounded flex justify-center items-center cursor-pointer mb-4"
        >
          <span className="text-gray-700">Upload a file</span>
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Next button */}
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

export default SeventhPage;
