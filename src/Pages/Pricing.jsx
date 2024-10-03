import React from "react";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import CustomBtn from "../components/CustomBtn.jsx";
import FAQ from "../components/FAQ.jsx";
import PricingTable from "../components/PricingTable.jsx";
import PricingSlider from "../components/PricingSlider.jsx";

const Pricing = () => {
  return (
    <>
      <div className="bg-[#f7e1a8] min-h-[12vh] text-center">
        <NavBar />

        <h2 className="mt-10 text-5xl font-bold text-orange-600">
           Striform is FREE to use{" "}
          <span className="text-black">for unlimited</span>
        </h2>
        <h2 className="text-5xl font-bold text-black">
          forms and unlimited responses
        </h2>
        <p className="mt-4 text-lg">
          If you need advanced features, you can upgrade to PRO for $29/month
        </p>
        <CustomBtn
          text="Create free account"
          cls="text-xl bg-teal-400 mt-20 px-6 py-3"
        />
      </div>

      <div className="bg-[#fffbeb]">
          <img className={"w-full object-cover"} src="/pricingBackground.png" alt="" />
        <h2 className="my-10 text-3xl font-bold text-center mb-8">
          Compare Youform Plans
        </h2>
        <div className="container mx-auto">
          <PricingTable />
        </div>
      </div>
      <div className={" w-full flex items-center justify-center bg-[#fffbeb]"}>
        <PricingSlider />
      </div>
      <div className="bg-[#fffbeb] py-16">
        <h2 className="text-5xl font-extrabold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="container mx-auto">
          <FAQ />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
