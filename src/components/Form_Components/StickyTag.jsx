import React from 'react';
import {IoTrash} from "react-icons/io5";

const StickyTag = ({text, cl}) => {

    return (
        <div className={`w-full flex items-center justify-between px-4 p-2 rounded-md border border-black text-[10px] border-dotted ${cl}`}>
            <p>{text}</p>
            <button className={"text-lg hover:text-red-600"}>
                <IoTrash />
            </button>
        </div>
    );
};

export default StickyTag;