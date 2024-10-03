import React from 'react';
import {RxCrossCircled} from "react-icons/rx";

const InfoBar = ({text, cl = "bg-red-50"}) => {
    return (
        <div className={`text-sm text-red-800 flex items-center justify-between p-2 px-4 rounded-md gap-3 ${cl}`}>
            <RxCrossCircled />
            <p>{text}</p>
        </div>
    );
};

export default InfoBar;