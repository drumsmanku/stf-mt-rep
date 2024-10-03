import React, {useState} from 'react';
import {Link} from "react-router-dom";

const MiniMenuBtn = () => {
    const [miniMenuVisible, setMiniMenuVisible] = useState(false);
    const miniLinks = ["👤 Contact Us",];
    const handleCpyTxt = (val) => {
        navigator.clipboard.writeText(val);
        console.log(val);
    }

    return (
        <>
            { miniMenuVisible && <div
                className={"fixed bg-white border-black bottom-16 right-10 flex flex-col gap-3 border p-2 shadow-[4px_3px_0px_0px_#000000] rounded-md"}>
                {
                    miniLinks.map((lnk, index)=>(
                        <div key={index}>
                            <button onClick={()=>handleCpyTxt(lnk)} className={"hover:bg-gray-50"} key={index}>{lnk}</button>
                            <hr />
                        </div>
                        ))
                    }
            </div>}
            <button type="button"
                    onClick={()=> setMiniMenuVisible(!miniMenuVisible)}
                    className="fixed bottom-4 right-5 rounded-full p-2 bg-orange-500 shadow-[4px_3px_0px_0px_#000000] text-black z-40 border-black drop-shadow-3xl hover:drop-shadow-2xl border flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M16.712 4.33a9.027 9.027 0 0 1 1.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 0 0-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 0 1 0 9.424m-4.138-5.976a3.736 3.736 0 0 0-.88-1.388 3.737 3.737 0 0 0-1.388-.88m2.268 2.268a3.765 3.765 0 0 1 0 2.528m-2.268-4.796a3.765 3.765 0 0 0-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 0 1-1.388.88m2.268-2.268 4.138 3.448m0 0a9.027 9.027 0 0 1-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0-3.448-4.138m3.448 4.138a9.014 9.014 0 0 1-9.424 0m5.976-4.138a3.765 3.765 0 0 1-2.528 0m0 0a3.736 3.736 0 0 1-1.388-.88 3.737 3.737 0 0 1-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 0 1-1.652-1.306 9.027 9.027 0 0 1-1.306-1.652m0 0 4.138-3.448M4.33 16.712a9.014 9.014 0 0 1 0-9.424m4.138 5.976a3.765 3.765 0 0 1 0-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 0 1 1.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 0 0-1.652 1.306A9.025 9.025 0 0 0 4.33 7.288"></path>
                </svg>
            </button>
        </>
    );
};

export default MiniMenuBtn;