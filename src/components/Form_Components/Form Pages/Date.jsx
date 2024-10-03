import React, { useState } from 'react';
import { FrmQuestion, FrmQuestionController } from '../FrmQuestion';
import { FrmDesc, FrmDescController } from '../FrmDesc';
import { FrmBtn, FrmBtnController } from '../FrmBtn';
import FrmDate from "../FrmDate.jsx";

const Date = () => {
    const [formState, setFormState] = useState({
        questionText: "Please select a date",
        descText: "",
        date: "dd-mm-yy",
        btnText: "Next",
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
            <div className="space-y-6" id="viewer">
                <div>
                    <FrmQuestion text={formState.questionText} />
                    <FrmDesc text={formState.descText} />
                </div>
                <FrmDate date={formState.date} />
                <FrmBtn text={formState.btnText} />
            </div>

            {/* Controller for managing the components */}
            <div id="controls" className="w-[27vw] p-4 h-[86.9vh] fixed bg-gray-100 bottom-0 -right-10 flex flex-col space-y-4 overflow-y-scroll">
                <FrmQuestionController text={formState.questionText} onTextChange={value => handleStateChange('questionText', value)} />
                <FrmDescController text={formState.descText} onTextChange={value => handleStateChange('descText', value)} />
                <FrmBtnController text={formState.btnText} onTextChange={value => handleStateChange('btnText', value)} />
            </div>
        </>
    );
};

export default Date;
