import React from 'react';
import CustomBtn from "../CustomBtn.jsx";
import TickText from "../TickText.jsx";
import PricingSlider from "../PricingSlider.jsx";

const FeatureSection = () => {
    return (
        <div className={"bg-teal-500"}>
            {/* Feature 1 */}
            <div id={"feature-1-wrapper"}>
                <img className={"w-screen"} src={"/seprator.png"}  alt={"seprator-1"}/>
                {/* main warpper */}
                <div className={"flex flex-col md:flex-row items-center justify-around pb-32 md:pb-0"}>
                   {/* left section */}
                   <div className={"space-y-10 h-[70vh] md:h-screen flex flex-col justify-center items-center"}>
                       <h2 className={"font-bold text-4xl text-center md:text-6xl md:ml-12"}>Fully responsive</h2>
                       <p className={"text-lg px-4 md:px-5 md:text-xl font-semibold text-center md:text-left md:w-[34vw] whitespace-pre-line"}>striform gives you fully responsive forms so your
                           users will be able to fill your forms from mobile,
                           desktop, or tablets.</p>
                       <div id={"tics_&_btn_wrapper"} className={"flex flex-col items-center md:block space-y-6"}>
                           <div>
                               <CustomBtn text={"Create free account"} cls={"bg-[#FF4F7E] text-2xl -rotate-3"}/>
                           </div>
                           <div id={"tick_text_section"} className={"flex flex-col md:flex-row gap-2 items-start w-full md:items-center"}>
                               <TickText text={"Unlimited responses"} cl={"red"}/>
                               <TickText text={"No credit card required"} cl={"red"}/>
                           </div>
                       </div>
                   </div>
                    {/* right section */}
                    {/*<div>*/}
                        <img className={"w-[90%] p-4 md:w-[50vw]"} src={"/ftr1.png"} alt={"feature-1"}/>
                    {/*</div>*/}
                </div>
            </div>

            {/* Feature 2 */}
            <div id={"feature-2-wrapper"} className={"bg-[#FFFBEB] border-t-4 border-black"}>
                {/* main warpper */}
                <div className={"flex flex-col md:flex-row items-center justify-around pb-32 md:pb-0"}>
                    {/* left section */}
                    <div className={"flex items-center justify-center w-full"}>
                        <img className={"w-[90%] p-4 md:w-[50vw]"} src={"/ftr2.png"} alt={"feature-1"}/>
                    </div>
                    {/* right section */}
                    <div className={"space-y-10 h-[70vh] md:h-screen flex flex-col justify-center items-center"}>
                        <h2 className={"font-bold text-3xl md:text-left text-center md:text-4xl md:-ml-3"}>Build forms intuitively</h2>
                        <p className={"text-lg px-4 md:px-5 md:text-xl font-semibold text-center md:text-left md:w-[34vw] whitespace-pre-line"}>Youfrom's intuitive form builder is fully drag-and-drop. Create a live form in just a minute.</p>
                        <div id={"tics_&_btn_wrapper"} className={"flex flex-col items-center md:block space-y-6"}>
                            <div>
                                <CustomBtn text={"Create free account"} cls={"bg-purple-400 text-2xl -rotate-3"}/>
                            </div>
                            <div id={"tick_text_section"} className={"flex flex-col md:flex-row gap-2 items-start w-full md:items-center"}>
                                <TickText text={"Unlimited responses"}/>
                                <TickText text={"No credit card required"}/>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Seprator 2 */}
                <img className={"w-screen"} src={"/seprator2.png"} alt={"Seprator 2"}/>
            </div>

            {/* Feature 3 */}
            <div id={"feature-3-wrapper"} className={"bg-[#FFE711]"}>
                {/* main warpper */}
                <div className={"flex flex-col md:flex-row items-center justify-around bg-[#FFE711] md:mr-[10vw] py-[3vh] md:py-0"}>
                    {/* left section */}
                    <div className={"space-y-10 h-[70vh] md:h-[85vh] flex flex-col justify-center items-center"}>
                        <h2 className={"font-bold text-3xl md:w-[60%] md:-ml-30 w-full px-5 md:px-0 text-center md:text-left md:text-5xl"}>Collect partial data, download everything</h2>
                        <p className={"text-lg px-4 md:px-5 md:text-xl font-semibold text-center md:text-left md:w-[34vw] whitespace-pre-line"}>With striform you can collect partial data as well before your users hit the submit button. You can download all your data from the dashboard.</p>
                        <div id={"tics_&_btn_wrapper"} className={"flex flex-col items-center md:block space-y-6"}>
                            <div>
                                <CustomBtn text={"Create free account"} cls={"bg-teal-500 text-2xl -rotate-3"}/>
                            </div>
                            <div id={"tick_text_section"} className={"flex flex-col md:flex-row gap-2 items-start w-full md:items-center"}>
                                <TickText text={"Unlimited responses"} />
                                <TickText text={"No credit card required"} />
                            </div>
                        </div>
                    </div>
                    {/* right section */}
                    <div className={"border-2 border-black rounded-lg shadow-[7px_10px_0px_0px_#000000]"}>
                        <img className={"w-[80vw] md:w-[55vw] rounded-lg"} src={"/ftr3.png"} alt={"feature-1"}/>
                    </div>
                </div>
            </div>

            {/* Feature 4 */}
            <div id={"feature-1-wrapper"} className={"bg-pink-400"}>
                <img className={"w-screen"} src={"/seprator3.png"}  alt={"seprator-1"}/>
                {/* main warpper */}
                <div className={"flex flex-col items-center text-center justify-evenly gap-10 py-20"}>
                    <h1 className={"text-3xl p-4 md:p-0 md:text-5xl font-bold"}>High Pricing problem ? we hear your !</h1>
                    <p className={"font-semibold text-lg"}>Do you hate the high prices of Typeform? We do too. That's why striform allows UNLIMITED forms and form responses for FREE.</p>
                    <img className={"h-[60vw] p-10"} src={"xcmt.png"} alt={"X.com comments"}/>
                    <div id={"pricing-slider-wrapper"}>
                        <PricingSlider />
                    </div>
                    <h1 className={"text-3xl md:text-5xl font-bold"}>Even <em>Ethan Caldwell</em> recommends Striform.</h1>
                    <div className={"p-4 flex items-center justify-center"}>
                        <img className={"md:rounded-xl rounded-2xl m-4"} src={"/xlvlcmt.png"} alt={"levelio-x-comment"}/>
                    </div>
                    <div id={"btn-wrapper"} className={"w-full text-center"}>
                        <CustomBtn text={"Create free account"} cls={"bg-yellow-300 text-xl w-[80%] md:w-1/2"}/>
                    </div>
                    <p className={"underline underline-offset-2 cursor-pointer text-lg"}>or, check out a sample form</p>

                    <div className={"flex flex-col px-10 md:px-0 md:flex-row md:items-center w-full justify-center gap-3"} id={"tick-text-wrapper"}>
                        <TickText text={"Unlimited responses"} cl={"yellow"}/>
                        <TickText text={"No Credit card required"} cl={"yellow"}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureSection;