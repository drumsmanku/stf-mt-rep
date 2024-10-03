import React, { useState } from 'react';

const EmailSettings = () => {
    const [switchStates, setSwitchStates] = useState({
        CloseForm: false,
        CloseFormByDate : false,
        reCaptcha: false,
        CloseFormBySubmission: false,
    });

    const toggleSwitch = (setting) => {
        setSwitchStates(prevState => ({
            ...prevState,
            [setting]: !prevState[setting]
        }));
    };

    const settings = [
        {
            ttl: "Close Form",
            key: "CloseForm"
        },
        {
            ttl: "Close Form By Date",
            key: "CloseFormByDate "
        },
        {
            ttl: "Close Form By Submissions",
            key: "CloseFormBySubmissions"
        },
    ];

    return (
        <div>
            <h4 className={"font-semibold text-lg ml-2 mb-4"}>Access & Scheduling</h4>
            <div className={"space-y-4"}>
                {
                    settings.map((setting, index) => (
                        <div key={index} className={"flex text-sm items-center justify-between p-2 border rounded-md"}>
                            <div>
                                <p className="font-medium">{setting.ttl}</p>
                            </div>
                            <div>
                                {/* Switch Button */}
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={switchStates[setting.key]}
                                        onChange={() => toggleSwitch(setting.key)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default EmailSettings;
