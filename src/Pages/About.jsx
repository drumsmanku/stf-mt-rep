import React from "react";
import ContentBox from "../components/ContentBox.jsx";
import Footer from "../components/Footer.jsx";
import NavBar from "../components/NavBar.jsx";

const About = () => {
    const textInAbout = (
        <div>
            <div>
                <p className="mt-2">
                    Hey, this is Davis Baer writing this, the co-founder of striform. I’m
                    going to write this in the first person because I think it’s weird
                    when people write their About page in third person.
                </p>
                <p className="mt-2">
                    We created striform in 2023 with the intention of giving people a
                    Typeform alternative that was fairly priced - but still had a great UI
                    and UX.
                </p>
                <p className="mt-2">
                    I lead striform along with my co-founder Abhishek Chakravarty.
                </p>
                <p className="mt-2">
                    I live in the USA (in Pennsylvania), while Abhishek lives in India (in
                    Bangalore).
                </p>
                <p className="mt-2">
                    Both Abhishek and I have started successful software companies in the
                    past:
                </p>
                <p className="mt-2">
                    I co-founded and grew OneUp (a social media scheduling tool) to
                    millions of dollars in revenue.
                </p>
                <p className="mt-2">
                    Abhishek has built and sold Botflow, a chatbot builder, amongst a
                    handful of other successful products he’s created.
                </p>
                <p className="mt-2">
                    All form data is securely stored with AWS servers in the USA. The
                    official company name is “striform”, and the business is registered in
                    India.
                </p>
                <p className="mt-2">
                    Financially, we are 100% bootstrapped and PROFITABLE, with many paying
                    customers that easily cover our expenses. And we also have nearly
                    infinite runway from the success of our past companies.
                </p>
                <p className="mt-2">
                    I’m not saying this to brag, but rather to give you the confidence
                    that striform WILL be around for years and years to come.
                </p>
                <p className="mt-2">
                    If there’s a feature you’re looking for that we don’t have yet, let us
                    know. We are constantly adding features to make it the best form
                    builder available.
                </p>
                <p className="mt-2">
                    If you have any questions, you can reach out to me directly at
                    davis@striform.io 🙂
                </p>
            </div>
            <div className="h-40 flex justify-around items-center">
                <span>davis</span>
                <span>🤝</span>
                <span>abhishek</span>
            </div>
        </div>
    );

    return (
        <div className={"bg-[#fffbeb]"}>
            <NavBar />
            <div>
                <ContentBox title={"About"} content={textInAbout} />
            </div>
            <Footer />
        </div>
    );
};

export default About;