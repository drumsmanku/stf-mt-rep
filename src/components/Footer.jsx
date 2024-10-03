import React from "react";
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="h-auto w-full flex flex-col md:flex-row items-center justify-center text-center space-x-0 space-y-8 md:space-y-0 md:space-x-10 px-3">
        <img
          src="/striform-logo.png"
          alt="Logo"
          className="h-28 w-28 mb-4 md:mb-0"
        />
        <ul className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-10">
          <li>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="h-5 w-5 fill-slate-400 pl-1"
              >
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 20 3.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 .8 7.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.095 4.095 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 0 16.407a11.615 11.615 0 0 0 6.29 1.84"></path>
              </svg>
            </a>
          </li>
          {
            ["About", "Pricing", "Privacy", "Terms",].map((nv,index)=>(
                <li key={index} className={"text-xl font-semibold md:font-normal md:text-md hover:underline cursor-pointer"}>
                  <Link to={`/${nv.toLowerCase().replace(/ /g, '-')}`}>{nv}</Link>
                </li>
            ))
          }
        </ul>
      </div>

      <div className="w-full text-center mt-6">
        <p className="flex items-center justify-center text-sm text-gray-500">
          <span className="mr-2">🔒</span> Data securely stored with AWS in the
          USA
        </p>
      </div>
    </footer>
  );
};

export default Footer;
