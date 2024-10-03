import React, { useState } from 'react';

const FrmUpload = ({ onFileChange }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        onFileChange(file);
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-md">
            <div>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="mb-4 p-2 bg-white border rounded"
                />
            </div>
            {selectedFile && (
                <div className="text-gray-700">
                    Selected File: {selectedFile.name}
                </div>
            )}
        </div>
    );
};

export default FrmUpload;
