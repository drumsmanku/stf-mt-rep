import React, { useState } from "react";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import ThirdPage from "./ThirdPage";
import FourthPage from "./FourthPage";
import FifthPage from "./FifthPage";
import SixthPage from "./SixthPage";
import SeventhPage from "./SeventhPage";
import EighthPage from "./EighthPage";
import NinthPage from "./NinthPage";

function Base() {
  const [currentPage, setCurrentPage] = useState("FirstPage");

  const renderPage = () => {
    switch (currentPage) {
      case "FirstPage":
        return <FirstPage onButtonClick={() => setCurrentPage("SecondPage")} />;
      case "SecondPage":
        return (
          <SecondPage
            onNextClick={() => setCurrentPage("ThirdPage")}
            onBackClick={() => setCurrentPage("FirstPage")}
          />
        );
      case "ThirdPage":
        return (
          <ThirdPage
            onNextClick={() => setCurrentPage("FourthPage")}
            onBackClick={() => setCurrentPage("SecondPage")}
          />
        );
      case "FourthPage":
        return (
          <FourthPage
            onNextClick={() => setCurrentPage("FifthPage")}
            onBackClick={() => setCurrentPage("ThirdPage")}
          />
        );
      case "FifthPage":
        return (
          <FifthPage
            onNextClick={() => setCurrentPage("SixthPage")}
            onBackClick={() => setCurrentPage("FourthPage")}
          />
        );
      case "SixthPage":
        return (
          <SixthPage
            onNextClick={() => setCurrentPage("SeventhPage")}
            onBackClick={() => setCurrentPage("FifthPage")}
          />
        );
      case "SeventhPage":
        return (
          <SeventhPage
            onNextClick={() => setCurrentPage("EighthPage")}
            onBackClick={() => setCurrentPage("SixthPage")}
          />
        );
      case "EighthPage":
        return (
          <EighthPage
            onNextClick={() => setCurrentPage("NinthPage")}
            onBackClick={() => setCurrentPage("SeventhPage")}
          />
        );
      case "NinthPage":
        return <NinthPage onBackClick={() => setCurrentPage("EighthPage")} />;
      default:
        return <FirstPage onButtonClick={() => setCurrentPage("SecondPage")} />;
    }
  };

  return (
    <div className="h-screen bg-[#FAF7EC] flex items-center justify-center">
      {renderPage()}
    </div>
  );
}

export default Base;
