import React from 'react';

const NotPublishedPage = () => {
    return (
        <div className={"w-screen h-screen flex items-center justify-center"}>
            <h5 className={"text-lg font-semibold"}>This form is not published yet.</h5>
            <p className={"text-gray-100"}>If you are the form owner then please publish it from dashboard.</p>
        </div>
    );
};

export default NotPublishedPage;