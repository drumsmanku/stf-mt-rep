import React from 'react';

const FrmAlnWrapper = ({ children, alignment = "items-center" }) => {
    let alignmentClass = "";
    switch (alignment) {
        case "left":
            alignmentClass = "items-start";
            break;
        case "center":
            alignmentClass = "items-center";
            break;
        case "right":
            alignmentClass = "items-end";
            break;
        default:
            alignmentClass = "items-center";
    }

    return (
        <div className={`w-full h-full flex flex-col justify-center ${alignmentClass} gap-6`}>
            {children}
        </div>
    );
};

const FrmAlnWrapperController = ({ alignment, onAlignmentChange }) => {
    return (
        <div className="space-y-2">
            <p className={"font-semibold"}>Text Align</p>
            <div className="flex justify-around bg-blue-100 w-[90%]">
                <button
                    onClick={() => onAlignmentChange("left")}
                    className={`p-2 border rounded-md ${alignment === "left" ? "bg-gray-300" : ""}`}
                >
                    Left
                </button>
                <button
                    onClick={() => onAlignmentChange("center")}
                    className={`p-2 border rounded-md ${alignment === "center" ? "bg-gray-300" : ""}`}
                >
                    Center
                </button>
                <button
                    onClick={() => onAlignmentChange("right")}
                    className={`p-2 border rounded-md ${alignment === "right" ? "bg-gray-300" : ""}`}
                >
                    Right
                </button>
            </div>
        </div>
    );
};

export { FrmAlnWrapper, FrmAlnWrapperController };
