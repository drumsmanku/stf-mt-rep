import React, {useState} from 'react';
import General from "./setting components/General.jsx";
import EmailSettings from "./setting components/EmailSettings.jsx";
import Access from "./setting components/Access.jsx";
import HiddenFields from "./setting components/HiddenFields.jsx";
import LinkSetting from "./setting components/LinkSetting.jsx";
import Language from "./setting components/Language.jsx";

const Settings = () => {
    const settingOptions = ["General", "Email Settings", "Access", "Hidden Fields", "Link Settings", "Language"];
    const [currSelected, setCurrSelected] = useState("General");

    const renderPage = () => {
        switch(currSelected) {
            case "General":
                return <General />;
            case "Email Settings":
                return <EmailSettings />;
            case "Access":
                return <Access />;
            case "Hidden Fields":
                return <HiddenFields />;
            case "Link Settings":
                return <LinkSetting />;
            case "Language":
                return <Language />;
            default:
                return <General />;
        }
    };

    return (
        <div className={"flex flex-col items-center justify-center w-screen absolute top-20"}>
            <div className={"p-6 flex flex-col gap-3 w-[90vw]"}>
                <p className={"font-semibold text-md"}>Settings</p>
                <div className={"border rounded-md flex"}>
                    <div id={"left-section"} className={"p-4 space-y-5"}>
                        {
                            settingOptions.map((opt, index) => (
                                <div
                                    onClick={() => {setCurrSelected(opt)}}
                                    className={`${currSelected === opt && "bg-gray-100"} p-3 min-w-max rounded-md cursor-pointer`}
                                    key={index}>
                                    <p>{opt}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className={"h-[60vh] mt-6 w-[1px] bg-black/20"}></div>
                    <div id={"right-section"} className={"p-6 w-full"}>
                        {renderPage()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
