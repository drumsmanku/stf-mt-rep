import React from 'react';

export const FrmBtn = ({ text, backgroundColor, textColor }) => {
    return (
        <button
            className="px-4 py-2 rounded-md"
            style={{
                backgroundColor: backgroundColor || '#000000', 
                color: textColor || '#ffffff' 
            }}
        >
            {text}
        </button>
    );
};

export const FrmBtnController = ({ text, onTextChange }) => {
    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor="buttonText" className="text-sm font-medium">Button Text</label>
            <input
                id="buttonText"
                type="text"
                value={text}
                onChange={(e) => onTextChange(e.target.value)}
                className="border rounded-md px-2 py-1"
            />
        </div>
    );
};

// ... (rest of the file)
