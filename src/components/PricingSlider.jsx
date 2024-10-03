import React, { useState } from 'react';

const PricingSlider = () => {
    const [rg, setRg] = useState(5000);
    const [typeformPrice, setTypeformPrice] = useState("99 😟");
    const [StriformEmoji, setStriformEmoji] = useState("😊");
    const [isPro, setIsPro] = useState(false);

    const range_value_table = {
        "0": ["0 😊", "😊"],
        "100": ["29 🙂", "😃"],
        "200": ["59 😐", "😄"],
        "1100": ["99 😟", "😁"],
        "10100": ["149 😰", "😂"],
        "15100": ["249 😩", "🤣"],
        "25100": ["499 😭", "🥳"],
    };

    const updatePrice = (value) => {
        if (range_value_table.hasOwnProperty(value)) {
            setTypeformPrice(range_value_table[value][0]);
            setStriformEmoji(range_value_table[value][1]);
        }
    };

    return (
        <div className={"space-y-3"}>
            <h2 className={"text-2xl md:text-4xl font-black"}>Striform vs Typeform pricing</h2>
            <div className={"text-center space-y-1"}>
                <p className={"text-gray-500 p-3 md:p-0 text-lg"}>Your expected number of submissions per month?</p>
                <input
                    className={"w-full accent-green-500 bg-gray-200"}
                    value={rg}
                    onChange={(e) => {
                        const value = e.target.value;
                        setRg(value);
                        updatePrice(value);
                    }}
                    type={"range"}
                    min={0}
                    max={50000}
                    step={100}
                />
                <p className={"text-gray-500 p-3 md:p-0 text-lg"}>{rg} submissions per month</p>
                <div className={"flex items-center justify-center"}>
                    <label htmlFor={"prchk"} className={"flex items-center gap-3 font-lg font-semibold"}>
                        <input id={"prchk"} type={"checkbox"} checked={isPro} onChange={() => setIsPro(!isPro)} />
                        <p className={"text-gray-300 p-3 md:p-0 text-lg"}>I need Striform pro</p>
                    </label>
                </div>
            </div>
            <div className={"flex items-center justify-around text-center"}>
                <div>
                    <h3 className={"font-bold text-3xl"}>Typeform</h3>
                    <p className={"font-semibold text-2xl"}>${typeformPrice}</p>
                </div>
                <div>
                    <h3 className={"font-bold text-3xl"}>Striform</h3>
                    <p className={"font-semibold text-2xl"}>{isPro ? "$24" : "$0"} {StriformEmoji}</p>
                </div>
            </div>
        </div>
    );
};

export default PricingSlider;
