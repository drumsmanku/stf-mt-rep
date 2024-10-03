import React from 'react';
import {FaCircleInfo} from "react-icons/fa6";
import {FaArrowRight} from "react-icons/fa";

const Share = () => {
    return (
        <div className={"flex flex-col items-center justify-center w-screen absolute top-20"}>
            <div className={"p-6 flex flex-col gap-3 w-[90vw]"}>
                <div className={"bg-red-100 p-4 text-red-500 flex items-center justify-between rounded-md"}>
                    <div className={"flex items-center gap-2"}>
                        <FaCircleInfo/>
                        <p>You haven't published the form yet.</p>
                    </div>
                    <button className={"flex items-center gap-2"}>
                        <p>Publish Now</p>
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Share;