import React from 'react';
import CustomBtn from "../CustomBtn.jsx";
import TickText from "../TickText.jsx";
import Quiz from "../Quiz.jsx";
import {Link} from "react-router-dom";

const HeroSection = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center py-14 w-screen">
            {/* Left Section */}
            <div className="w-full md:w-[60vw] flex flex-col items-center md:items-start justify-center gap-8 px-4 md:pl-[11vw]">
                <div className="text-[9vw] md:text-6xl font-bold space-y-3  text-center md:text-left whitespace-pre-line" id="hero-announcer">
                    <h1>The most affordable
                    Typeform
                    alternative</h1>
                </div>

                <div id="hero-text" className="text-center px-4 md:text-left md:line-clamp-3 md:whitespace-pre-line space-y-2 w-full text-[4vw] md:text-lg">
                    <p>
                        striform is a form builder that provides UNLIMITED forms and responses for FREE.
                        You can add logic, custom domains, upload files, embed forms on your website,
                        and much more 🤓
                    </p>
                </div>


                <div className="flex flex-col items-center md:items-start gap-6 mt-3">
                    <div id="custom-btn-wrapper" className={""}>
                        <CustomBtn text="Create free account" cls="text-2xl bg-orange-400" />
                        <a href="/" className="ml-3 underline block mt-4 underline-offset-4 hover:no-underline md:hidden text-[3.4vw] text-center">or check out a sample form</a>
                    </div>
                    <div id="tick-text-section" className="flex flex-col items-start md:flex-row md:items-center gap-3">
                        <TickText text="Unlimited responses" />
                        <TickText text="No credit card required" />
                    </div>
                </div>

                <div id="single-testimonial-section" className="mt-8 space-y-4 text-center md:text-left">
                    <p className="text-lg font-semibold">"striform is an absolute joy to use"</p>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
                        <img className="w-16 h-16 rounded-full" src="/user_t.jpg" alt="user-img" />
                        <div>
                            <p className="font-medium text-lg">Pieter Levels</p>
                            <p className="text-sm text-gray-600">Founder Nomadlist and RemoteOK.</p>
                            <p className="text-sm text-gray-600">400K+ Followers on Twitter</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="hidden md:flex flex-col items-center justify-center gap-6 w-full md:w-[40vw] mt-10 md:mt-0">
                <Quiz />
                <Link to={"/live-form"} className="underline underline-offset-4 hover:no-underline">or click here to open this form in a new tab</Link>
            </div>
        </div>
    );
};

export default HeroSection;
