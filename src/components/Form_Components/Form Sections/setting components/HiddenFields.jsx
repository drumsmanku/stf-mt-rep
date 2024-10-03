import React, { useState } from 'react';

const HiddenFields = () => {
    const options = [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_content",
        "email",
        "utm_term"
    ];

    const [selectedOption, setSelectedOption] = useState("");
    const [customField, setCustomField] = useState("");

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
        setCustomField(""); // clear custom input if selecting from dropdown
    };

    const handleCustomFieldChange = (e) => {
        setCustomField(e.target.value);
        setSelectedOption(""); // clear dropdown selection if typing custom value
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div className={"mb-4"}>
                    <h2 className={"text-lg font-semibold"}>Hidden Fields</h2>
                    <p className={"text-sm text-gray-500"}>Use hidden fields to fill data using URL parameters. You can also use this for UTM parameters.</p>
                </div>
                <button className={"text-white bg-black rounded-md p-2 text-sm"}>Save</button>
            </div>

            <div>
                <p className={"text-sm text-gray-600 mb-2"}>Select from the dropdown or enter your own.</p>

                <select
                    value={selectedOption}
                    onChange={handleSelectChange}
                    className="p-2 border rounded-md w-full mb-3"
                >
                    <option value="">Select an option</option>
                    {options.map((opt, index) => (
                        <option key={index} value={opt}>{opt}</option>
                    ))}
                </select>

                <input
                    type="text"
                    value={customField}
                    onChange={handleCustomFieldChange}
                    placeholder="Enter your own hidden field"
                    className="p-2 border rounded-md w-full"
                />
            </div>
        </div>
    );
};

export default HiddenFields;
