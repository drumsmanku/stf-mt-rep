import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
import { IoAddCircleOutline } from 'react-icons/io5';
import { HiChevronUpDown } from "react-icons/hi2";

const FrmDrpdwn = ({ options }) => {
    return (
        <div className="relative w-full flex items-center justify-between border rounded-md">
            <select className="block appearance-none w-full hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                {options.map((option, index) => (
                    <option key={index}>{option}</option>
                ))}
            </select>
            <HiChevronUpDown className="absolute right-2 top-1/2 transform -translate-y-1/2" />
        </div>
    );
};

const FrmDrpdwnController = ({ options, onOptionsChange }) => {
    const [localOptions, setLocalOptions] = useState(options);

    const handleAddOption = () => {
        const newOptions = [...localOptions, `Option ${localOptions.length + 1}`];
        setLocalOptions(newOptions);
        onOptionsChange(newOptions);
    };

    const handleOptionChange = (index, newValue) => {
        const updatedOptions = localOptions.map((opt, idx) => (idx === index ? newValue : opt));
        setLocalOptions(updatedOptions);
        onOptionsChange(updatedOptions);
    };

    const handleRemoveOption = (index) => {
        const updatedOptions = localOptions.filter((_, idx) => idx !== index);
        setLocalOptions(updatedOptions);
        onOptionsChange(updatedOptions);
    };

    const handleMoveOption = (index, direction) => {
        if ((direction === -1 && index === 0) || (direction === 1 && index === localOptions.length - 1)) {
            return;
        }
        const newOptions = [...localOptions];
        const temp = newOptions[index];
        newOptions[index] = newOptions[index + direction];
        newOptions[index + direction] = temp;
        setLocalOptions(newOptions);
        onOptionsChange(newOptions);
    };

    return (
        <div>
            <div className="w-[90%] flex items-center justify-between mb-2">
                <p>Options</p>
                <button onClick={handleAddOption} className="p-2">
                    <IoAddCircleOutline />
                </button>
            </div>
            <div className="space-y-2 w-[90%] text-sm">
                {localOptions.map((option, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            className="outline-none p-2 rounded-md flex-grow"
                        />
                        <div className="flex items-center space-x-2">
                            <button onClick={() => handleMoveOption(index, -1)} className="p-1" disabled={index === 0}>
                                <RiArrowUpSLine />
                            </button>
                            <button onClick={() => handleMoveOption(index, 1)} className="p-1" disabled={index === localOptions.length - 1}>
                                <RiArrowDownSLine />
                            </button>
                            <button onClick={() => handleRemoveOption(index)} className="p-1">
                                <IoMdClose />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { FrmDrpdwn, FrmDrpdwnController };
