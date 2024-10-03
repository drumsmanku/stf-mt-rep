import React, { useState } from 'react';
import { FrmQuestion, FrmQuestionController } from '../FrmQuestion';
import { FrmDesc, FrmDescController } from '../FrmDesc';
import { FrmBtn, FrmBtnController } from '../FrmBtn';
import { FrmSch, FrmSchController } from '../FrmSch';

const Schedule = () => {
    // Condensed state management
    const [formState, setFormState] = useState({
        questionText: "When we can meet?",
        descText: "",
        scheduleWith: "cal.com",
        openerText: "",
        btnText: "Schedule Now",
    });

    const handleStateChange = (key, value) => {
        setFormState(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    return (
        <>
            {/* Viewer for displaying the components */}
            <div className="space-y-8" id="viewer">
                <div>
                <FrmQuestion text={formState.questionText} />
                <FrmDesc text={formState.descText} />
                </div>
                <div>
                    <FrmSch scheduleWith={formState.scheduleWith} openerText={formState.openerText} />
                </div>
                <FrmBtn text={formState.btnText} />
            </div>

            {/* Controller for managing the components */}
            <div id="controls" className="text-sm w-[27vw] p-4 h-[86.9vh] fixed bg-gray-100 bottom-0 -right-10 flex flex-col space-y-4 overflow-y-scroll">
                <FrmQuestionController text={formState.questionText} onTextChange={value => handleStateChange('questionText', value)} />
                <FrmDescController text={formState.descText} onTextChange={value => handleStateChange('descText', value)} />
                <FrmSchController
                    scheduleWith={formState.scheduleWith}
                    onScheduleWithChange={value => handleStateChange('scheduleWith', value)}
                    openerText={formState.openerText}
                    onOpenerTextChange={value => handleStateChange('openerText', value)}
                />
                <FrmBtnController text={formState.btnText} onTextChange={value => handleStateChange('btnText', value)} />
            </div>
        </>
    );
};

export default Schedule;
