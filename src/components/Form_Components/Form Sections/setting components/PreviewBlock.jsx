import React from 'react';

const PreviewBlock = () => {
    return (
        <div className={"w-full"}>
            <p className={"text-center font-semibold"}>Preview</p>
            <div className={"w-full flex items-center justify-center"}>
                <div className={"border p-5 w-[55%] rounded-md bg-gray-100"}>
                    <img src={"/setting_preview.png"} alt={"preview-image"} className={"rounded-md"}/>
                    <p className={"uppercase"}>striform.com</p>
                    <h5 className={"text-lg font-bold"}>My Form</h5>
                    <p>Fill out my Striform</p>
                </div>
            </div>
        </div>
    );
};

export default PreviewBlock;