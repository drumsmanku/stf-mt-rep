import React from "react";

function Modal({ isOpen, onClose, content }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg relative max-w-[90vw] max-h-[90vh] overflow-auto">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
                >
                    ✕
                </button>
                <div className="p-6">
                    {content}
                </div>
            </div>
        </div>
    );
}

export default Modal;
