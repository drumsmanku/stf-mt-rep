import React, { useState } from 'react';
import CustomBtn from "./CustomBtn.jsx";
import {Link} from "react-router-dom";
const navlinks = ["Home", "Pricing"];
const NavBar = () => {
    const [navOpen, setOpen] = useState(false)
    return (
        <header className={"bg-transparent"}>
            <nav className={"w-full flex items-center justify-around p-4 md:py-6 gap-4"}>
                <div id={"logo-section"}>
                    <img className={"w-[45vw] md:w-[10rem]"} src={"/logo.png"} alt={"logo"} />
                </div>
                <div id={"nav-links"} className={"space-x-8 hidden md:block"}>
                    {
                        navlinks.map((lnk, index) => (
                            <Link to={`/${lnk.toLowerCase().replace(/ /g, '-')}`} className={"font-semibold hover:underline cursor-pointer"} key={index}>{lnk}</Link>
                        ))
                    }
                </div>
                <div id={"user-btn-section"} className={"hidden md:flex gap-[1.2rem]"}>
                    <CustomBtn text={"Log in"} cls={"bg-yellow-300"} />
                    <CustomBtn text={"Sign Up"} cls={"bg-teal-500"} />
                </div>
                {/* Hamburger section */}
                <button
                    className={"space-y-1 md:hidden relative flex flex-col justify-around items-center w-10 h-10 transition-transform duration-300"}
                    onClick={() => setOpen(!navOpen)}
                >
                    
                    <div className={`h-[0.6vh] w-10 bg-black rounded-lg ${navOpen ? 'rotate-45 translate-y-2.5 ' : ''}`}></div>
                    <div className={`h-[0.6vh] w-10 bg-black rounded-lg ${navOpen ? 'hidden' : ''}`}></div>
                    <div className={`h-[0.6vh] w-10 bg-black rounded-lg ${navOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></div>
                </button>

            </nav>
            {/* Mobile Nav Links */}
            {navOpen &&
                <div className={`md:hidden p-4 text-lg bg-orange-500 border-2 border-black flex items-center justify-around transition-transform duration-500`}>
                    <div className={"font-semibold space-x-4"}>
                        {
                            navlinks.map((lnk, index) => (
                                <Link to={`/${lnk.toLowerCase().replace(/ /g, '-')}`} key={index}>{lnk}</Link>
                            ))
                        }
                    </div>
                    <CustomBtn text={"Log in"} cls={"bg-pink-300"} />
                </div>
            }
        </header>
    );
};

export default NavBar;