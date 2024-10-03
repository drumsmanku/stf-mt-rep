import React from 'react';

const sizeMap = {
    small: 20,
    medium: 40,
    large: 60,
    extraLarge: 80,
};

const FrmTxtBox = ({ value, maxLength, size }) => {
    return (
        <div className="text-base p-2 rounded-md">
            <textarea
                className="border p-2 rounded-md w-full h-full"
                value={value}
                maxLength={maxLength}
                placeholder="Enter your text here..."
                cols={sizeMap[size]}
            />
        </div>
    );
};

const FrmTxtBoxController = ({ value, maxLength, size, onTextChange, onMaxLengthChange, onSizeChange }) => {
    const handleTextChange = (e) => {
        onTextChange(e.target.value);
    };

    const handleMaxLengthChange = (e) => {
        onMaxLengthChange(e.target.value);
    };

    const handleSizeChange = (e) => {
        onSizeChange(e.target.value);
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block font-semibold">Max Length</label>
                <input
                    type="number"
                    className="border p-2 rounded-md w-full"
                    value={maxLength}
                    onChange={handleMaxLengthChange}
                    placeholder="Max characters..."
                />
            </div>
            <div>
                <label className="block font-semibold">Box Size</label>
                <select
                    className="border p-2 rounded-md w-full"
                    value={size}
                    onChange={handleSizeChange}
                >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="extraLarge">Extra Large</option>
                </select>
            </div>
        </div>
    );
};

export { FrmTxtBox, FrmTxtBoxController };
