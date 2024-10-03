import React from 'react';
import Base from "./Form_Components/LiveForm/Base.jsx";

const Quiz = () => {
    return (
        <div className={"relative flex flex-col p-1 items-center justify-between h-[90vh] w-[35vw] rounded-md border-2 border-black text-center space-y-10 bg-[#FEFBEB] shadow-[9px_9px_0px_0px_#000000]"}>
            <Base />
        </div>
    );
};

export default Quiz;