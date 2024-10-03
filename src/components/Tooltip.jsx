import React, { useState } from 'react';

const Tooltip = ({ tooltipContent, children }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {isVisible && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-gray-700 rounded shadow-lg">
                    {tooltipContent}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
