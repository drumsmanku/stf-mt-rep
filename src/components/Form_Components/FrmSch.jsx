import React, { useState } from 'react';
import InfoBar from "../InfoBar.jsx";

const FrmSch = ({ scheduleWith, openerText }) => {
    return (
        <div className="space-y-8" id="viewer">
            <InfoBar text={"Please add Calendly link from the right editor."}/>
        </div>
    );
};

const FrmSchController = ({ scheduleWith, onScheduleWithChange, openerText, onOpenerTextChange }) => {
    return (
        <div id="controls" className="w-[90%] text-sm">
            <div className="flex flex-col space-y-2">
                <label>Schedule with:</label>
                <select
                    value={scheduleWith}
                    onChange={(e) => onScheduleWithChange(e.target.value)}
                    className="p-2 border rounded-md"
                >
                    <option value="cal.com">cal.com</option>
                    <option value="calendly">calendly</option>
                    <option value="savvyCal">savvyCal</option>
                </select>
            </div>

            <div className="flex flex-col space-y-2">
                <label>Opener Text:</label>
                <input
                    type="text"
                    value={openerText}
                    onChange={(e) => onOpenerTextChange(e.target.value)}
                    className="p-2 border rounded-md"
                    placeholder="Enter the opener text"
                />
            </div>

            <div className="flex flex-col space-y-2">
                <label>calendly Link:</label>
                <input
                    type="text"
                    className="p-2 border rounded-md"
                    placeholder="http://calendly/23sh/cal1.com"
                />
            </div>
        </div>
    );
};

export { FrmSch, FrmSchController };
