import React from 'react';

const FrmQuestion = ({ text, questionColor }) => {
    return (
        <h2 className="text-3xl font-bold" style={{ color: questionColor }}>{text}</h2>
    );
};

const FrmQuestionController = ({ text, onTextChange }) => {
    return (
        <div>
            <label htmlFor="questionText" className="flex flex-col">
                <span className="font-semibold">Question</span>
                <input
                    id="questionText"
                    value={text}
                    className="border outline-none w-[90%] border-black/50 shadow-sm rounded-md p-2"
                    onChange={(e) => onTextChange(e.target.value)}
                />
            </label>
        </div>
    );
};

export { FrmQuestion, FrmQuestionController };
