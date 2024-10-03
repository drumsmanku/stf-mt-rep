import React, {useState} from 'react';
import {MdOutlineRemoveRedEye} from "react-icons/md";
import {IoMdSettings} from "react-icons/io";

const FrmInput = ({ text, label, placeholder, answerColor }) => {
    return (
        <div className="p-2">
            <label className="block mb-1">{label}</label>
            <input
                type="text"
                value={text}
                readOnly
                placeholder={placeholder}
                className="border-b border-black outline-none p-2 w-full"
                style={{ color: answerColor }}
            />
        </div>
    );
};

const FrmInputController = ({ label = "Input #", placeholder, onLabelChange, onPlaceholderChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const handleLabelChange = (e) => {
        if (onLabelChange && typeof onLabelChange === 'function') {
            onLabelChange(e.target.value);
        }
    };
    
    const handlePlaceholderChange = (e) => {
        if (onPlaceholderChange && typeof onPlaceholderChange === 'function') {
            onPlaceholderChange(e.target.value);
        }
    };
    
    const handleOpenClick = (e) => {
        setIsOpen(!isOpen);
    }
    
    return (
        <div className='font-inter text-sm'>
            <div id={"viewable"} className={"flex items-center justify-between w-[90%]"}>
                <p className={"text-gray-500"}>{label}</p>
                <div className={"flex gap-2 items-center justify-center text-gray-600"}>
                    <MdOutlineRemoveRedEye />
                    <IoMdSettings onClick={handleOpenClick} />
                </div>
            </div>
            <div className={`${isOpen ? 'block':'hidden'} w-[90%] bg-gray-50 rounded-md p-4`}>
                <div className="mb-4">
                    <label htmlFor="input-label" className="flex flex-col">
                        <span className="font-semibold">Label</span>
                        <input
                            id="input-label"
                            value={label}
                            className="border outline-none w-[90%] border-black/50 shadow-sm rounded-md p-2"
                            onChange={handleLabelChange}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="input-placeholder" className="flex flex-col">
                        <span className="font-semibold">Placeholder</span>
                        <input
                            id="input-placeholder"
                            value={placeholder}
                            className="border outline-none w-[90%] border-black/50 shadow-sm rounded-md p-2"
                            onChange={handlePlaceholderChange}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};

export { FrmInput, FrmInputController };
