import React from 'react';
import {IoIosInformationCircle} from "react-icons/io";

const Language = () => {
    return (
        <div>
            <h4 className={"font-semibold text-lg my-4"}>Language Settings</h4>
            <div className={"rounded-md text-lg text-blue-500 bg-blue-100 w-full p-3 text-sm flex items-center justify-between"}>
                <div className={"flex gap-2 items-center"}>
                    <IoIosInformationCircle />
                    <p>Soon you will be able to set all system messages in your own language.</p>
                </div>
                <p>Upvote this feature</p>
            </div>
        </div>
    );
};

export default Language;