import React, { useState } from 'react';

const FrmDesc = ({ text }) => {
    return (
        <div className="text-base p-2 rounded-md">
            <p>{text}</p>
        </div>
    );
};

const FrmDescController = ({ text, onTextChange }) => {
    const [styles, setStyles] = useState({
        bold: false,
        italic: false,
        underline: false,
    });

    const handleChange = (e) => {
        onTextChange(e.target.value);
    };

    const toggleStyle = (style) => {
        setStyles(prev => ({
            ...prev,
            [style]: !prev[style],
        }));
    };

    const getStyleClass = (style) => {
        return styles[style] ? `${style}` : '';
    };

    return (
        <div>
            <label className="block font-semibold">Description</label>
            <div className="border rounded-md flex flex-col items-start justify-center">
                <div className="flex space-x-2 bg-gray-100 w-[90%]">
                    <button
                        className={`p-2 px-3 border rounded-md font-bold ${getStyleClass('font-bold')}`}
                        onClick={() => toggleStyle('font-bold')}
                    >
                        B
                    </button>
                    <button
                        className={`p-2 px-3 border rounded-md italic ${getStyleClass('italic')}`}
                        onClick={() => toggleStyle('italic')}
                    >
                        I
                    </button>
                    <button
                        className={`p-2 px-3 border rounded-md underline ${getStyleClass('underline')}`}
                        onClick={() => toggleStyle('underline')}
                    >
                        U
                    </button>
                </div>
                <textarea
                    className={`w-[90%] p-2 border rounded-md ${getStyleClass('font-bold')} ${getStyleClass('italic')} ${getStyleClass('underline')}`}
                    value={text}
                    onChange={handleChange}
                    placeholder="Mind filling out this form?"
                    cols={10}
                />
            </div>
        </div>
    );
};

export { FrmDesc, FrmDescController };
