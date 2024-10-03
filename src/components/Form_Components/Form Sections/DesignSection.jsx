import React, { useState, useEffect } from 'react';
import { MdOutlineLightMode } from "react-icons/md";
import { GiSettingsKnobs } from "react-icons/gi";
import { IoMoonOutline } from "react-icons/io5";
import { HexColorPicker } from "react-colorful";
import useFormStore from "../../../app/FormStore";
import { useParams } from 'react-router-dom';

const LightTheme = {
    backgroundColor: "#ffffff",
    questionColor: "#000000",
    answerColor: "#000000",
    buttonColor: "#000000",
    buttonTextColor: "#ffffff",
    starRatingColor: "#000000"
};

const DarkTheme = {
    backgroundColor: "#000000",
    questionColor: "#ffffff",
    answerColor: "#ffffff",
    buttonColor: "#ffffff",
    buttonTextColor: "#000000",
    starRatingColor: "#ffffff"
};

const fonts = [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Georgia",
    "Palatino",
    "Garamond",
    "Comic Sans MS",
    "Trebuchet MS"
];

const DesignSection = () => {
    const { formId } = useParams();
    const updateFormDesign = useFormStore(state => state.updateFormDesign);
    const forms = useFormStore(state => state.forms);

    const [currentTheme, setCurrentTheme] = useState('light');
    const [customTheme, setCustomTheme] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const [bkgColors, setBkgColors] = useState([
        { hex: LightTheme.backgroundColor, txt: "Background" },
        { hex: LightTheme.questionColor, txt: "Questions" },
        { hex: LightTheme.answerColor, txt: "Answers" },
        { hex: LightTheme.buttonColor, txt: "Buttons" },
        { hex: LightTheme.buttonTextColor, txt: "Button Text" },
        { hex: LightTheme.starRatingColor, txt: "Star Rating" }
    ]);

    useEffect(() => {
        const form = forms.find(f => f.formId === formId);
        if (form && form.design) {
            setBkgColors([
                { hex: form.design.backgroundColor, txt: "Background" },
                { hex: form.design.questionColor, txt: "Questions" },
                { hex: form.design.answerColor, txt: "Answers" },
                { hex: form.design.buttonColor, txt: "Buttons" },
                { hex: form.design.buttonTextColor, txt: "Button Text" },
                { hex: form.design.starRatingColor, txt: "Star Rating" }
            ]);
            setCurrentTheme('custom');
        } else {
            // Set default theme to light
            updateFormDesign(formId, LightTheme);
        }
    }, [formId, forms, updateFormDesign]);

    const handleColorChange = (color, index) => {
        const updatedColors = [...bkgColors];
        updatedColors[index].hex = color;
        setBkgColors(updatedColors);

        const newCustomTheme = {
            backgroundColor: updatedColors[0].hex,
            questionColor: updatedColors[1].hex,
            answerColor: updatedColors[2].hex,
            buttonColor: updatedColors[3].hex,
            buttonTextColor: updatedColors[4].hex,
            starRatingColor: updatedColors[5].hex
        };
        setCustomTheme(newCustomTheme);
        setCurrentTheme('custom');
        updateFormDesign(formId, newCustomTheme);
    };

    const handleThemeChange = (theme) => {
        setCurrentTheme(theme);
        let newColors;
        if (theme === 'light') {
            newColors = [
                { hex: LightTheme.backgroundColor, txt: "Background" },
                { hex: LightTheme.questionColor, txt: "Questions" },
                { hex: LightTheme.answerColor, txt: "Answers" },
                { hex: LightTheme.buttonColor, txt: "Buttons" },
                { hex: LightTheme.buttonTextColor, txt: "Button Text" },
                { hex: LightTheme.starRatingColor, txt: "Star Rating" }
            ];
        } else if (theme === 'dark') {
            newColors = [
                { hex: DarkTheme.backgroundColor, txt: "Background" },
                { hex: DarkTheme.questionColor, txt: "Questions" },
                { hex: DarkTheme.answerColor, txt: "Answers" },
                { hex: DarkTheme.buttonColor, txt: "Buttons" },
                { hex: DarkTheme.buttonTextColor, txt: "Button Text" },
                { hex: DarkTheme.starRatingColor, txt: "Star Rating" }
            ];
        } else {
            return;
        }
        setBkgColors(newColors);
        setCustomTheme(null);
        updateFormDesign(formId, theme === 'light' ? LightTheme : DarkTheme);
    };

    const themeBtns = [
        { ttl: "Light", icn: <MdOutlineLightMode />, bgcl: "bg-gray-200" },
        { ttl: "Dark", icn: <IoMoonOutline />, bgcl: "bg-gray-800 text-white" },
        { ttl: "Custom", icn: <GiSettingsKnobs />, bgcl: "bg-gray-400" }
    ];

    return (
        <div className={"fixed top-20 right-0 w-[28vw] h-[100vh] overflow-y-auto p-4 z-50"}>
            <div>
                <h3 className={"font-semibold text-xl"}>Design</h3>
                <p className={"text-sm"}>Use light or dark theme or make striform your own by adding your brand
                    color and logo.</p>
            </div>
            <div className={"flex w-full items-center justify-center gap-3 text-sm font-semibold"}>
                {themeBtns.map((btn, index) => (
                    <div key={index}
                         className={`flex flex-col ${btn.bgcl} w-1/3 cursor-pointer items-center justify-center p-2 rounded-md ${currentTheme === btn.ttl.toLowerCase() ? 'ring-2 ring-blue-500' : ''}`}
                         onClick={() => handleThemeChange(btn.ttl.toLowerCase())}>
                        {btn.icn}
                        <p>{btn.ttl}</p>
                    </div>
                ))}
            </div>
            <div className={"font-semibold text-sm w-full"}>
                {bkgColors.map((bkcl, index) => (
                    <div className={"flex p-2 items-center justify-between"} key={index}>
                        <p>{bkcl.txt}</p>
                        <div
                            className={"flex items-center justify-between w-1/2 p-2 rounded-md border border-black/30 shadow-md"}>
                            <p>{bkcl.hex}</p>
                            <div
                                className="w-6 h-6  border border-black/40 rounded-md cursor-pointer"
                                style={{backgroundColor: bkcl.hex}}
                                onClick={() => setSelectedIndex(index)}
                            ></div>
                        </div>
                        {selectedIndex === index && (
                            <div className="absolute z-50">
                                <HexColorPicker color={bkcl.hex}
                                                onChange={(color) => handleColorChange(color, index)}/>
                                <button onClick={() => setSelectedIndex(null)} className="mt-2 p-2 bg-gray-200">
                                    Close
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <p className={"text-sm text-gray-700"}>Note: Any changes made in the Design tab will be saved & published automatically.</p>
        </div>
    );
};

export default DesignSection;
