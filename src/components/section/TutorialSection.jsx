import React from 'react';

const TutorialSection = () => {
    return (
        <div className={"w-screen space-y-16"}>
            <div className={"w-full"}>
                <img src={"/hrbg.png"} alt={"Tutorial-bg"}/>
            </div>
            <div className={"flex flex-col items-center justify-center gap-8"}>
                <p className={"text-center text-[4vw] px-4 md:text-xl md:w-1/2"}>
                    “We had the highest conversion with striform compared to Typeform,
                    Google Calendar and even the routing form in Calendly!”
                </p>
                <div className={"flex flex-col items-center justify-center"}>
                    <img className={"size-14 rounded-full self-center"} src={"/user_t_2.jpeg"} alt={"founder"}/>
                    <p className={"text-lg md:text-md"}>Adam Danyal</p>
                    <p className={"text-sm"}>2M Followers on Linkedin</p>
                    <p className={"text-sm"}>Founder Leadership Club.</p>
                </div>
            </div>
        </div>
    );
};

export default TutorialSection;