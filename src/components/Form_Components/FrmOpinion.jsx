import React from 'react';

const FrmOpinion = ({ selectedNumber }) => (
    <div className="flex flex-col gap-2 w-fit">
        <div className={"flex items-center gap-1"}>
        {Array.from({ length: 10 }, (_, index) => (
            <div
                key={index + 1}
                className={`px-4 py-2 cursor-pointer border bg-gray-200 rounded-md border-black/60`}
            >
                {index + 1}
            </div>
        ))}
        </div>
        <div className={"w-full flex text-sm items-center justify-between"}>
            <p>Not Likely</p>
            <p className={"pl-10"}>Very Likely</p>
        </div>
    </div>
);

const FrmOpinionController = ({ selectedNumber, onNumberSelect }) => (
    <>
    </>
);

export { FrmOpinion, FrmOpinionController };
