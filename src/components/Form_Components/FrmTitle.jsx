import React, { useState } from 'react';

const FrmTitle = ({ text = "Default Title", cl = "" }) => {
    return (
        <h2 className={`text-3xl font-bold ${cl}`}>{text}</h2>
    );
};

const FrmTitleController = ({ text, onTextChange }) => {
    const handleChange = (e) => {
        onTextChange(e.target.value);
    };
    return (
        <div>
            <label htmlFor={"ttl-text"} className={"flex flex-col"}>
                <span className={"font-semibold"}>Title</span>
                <input id={"ttl-text"} value={text} className={"border outline-none w-[90%] border-black/50 shadow-sm rounded-md p-2"} onChange={handleChange} />
            </label>
        </div>
    );
};

export { FrmTitle, FrmTitleController };
