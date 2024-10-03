import React from 'react';
import {FaRegFaceMeh} from "react-icons/fa6";
import {Link} from "react-router-dom";

const PaymentCancel = () => {
    return (
        <div className={"flex items-center justify-center w-screen h-screen gap-3"}>
            <div className={"flex items-center justify-center flex-col gap-4"}>
                <div className={"text-red-500 text-5xl"}>
                    <FaRegFaceMeh />
                </div>
                <h2 className={"text-3xl font-semibold"}>Sorry, Payment failed !</h2>
                <Link className={"text-white bg-red-500 p-2 px-3"} to={"/dashboard"}>Return to Dashboard</Link>
            </div>
        </div>
    );
};

export default PaymentCancel;