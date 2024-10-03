import React from 'react';
import {Link} from "react-router-dom";

const CustomBtn = ({text, cls}) => {
    return (
        <Link to={`/${text.toLowerCase().replace(/ /g, '-')}`}>
            <button className={`px-6 p-2 shadow-[3px_4px_0px_0px_#000000] hover:shadow-[3px_4px_0px_2px_#000000] rounded-md border-2 border-black ${cls}`}>{text}</button>
        </Link>

    );
};

export default CustomBtn;