import React from 'react';
import NavBar from "../components/NavBar.jsx";
import HeroSection from "../components/section/HeroSection.jsx";
import TutorialSection from "../components/section/TutorialSection.jsx";
import FeatureSection from "../components/section/FeatureSection.jsx";
import Footer from "../components/Footer.jsx";

const HomePage = () => {
    return (
        <main className={"overflow-x-hidden text-[1.2vw]"}>
            <div
                className={
                    "bg-[#F6E1A8] bg-[url('/bnr.png')] bg-cover bg-no-repeat bg-center"
                }
            >
                <NavBar />
                <HeroSection />
                <TutorialSection />
            </div>
            <FeatureSection />
            {/* TODO: Add other sections down here ! */}
            <Footer />
        </main>
    );
};

export default HomePage;