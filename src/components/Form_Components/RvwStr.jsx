import React from 'react';
import { CiStar } from 'react-icons/ci';

const RvwStrViewer = ({ numStars, starRatingColor }) => (
    <div className="flex space-x-1">
        {Array.from({ length: numStars }, (_, index) => (
            <CiStar key={index} className={"text-4xl"} style={{ color: starRatingColor }}/>
        ))}
    </div>
);

const RvwStrController = ({ numStars, onNumStarsChange }) => (
    <div className="mt-4 flex flex-col w-[90%]">
        <label htmlFor="numStars" className="mr-2">Max Ratings:</label>
        <select
            id="numStars"
            value={numStars}
            onChange={(event) => onNumStarsChange(Number(event.target.value))}
            className="p-2 appearance-none border border-gray-300 rounded-md"
        >
            {Array.from({ length: 10 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                    {index + 1}
                </option>
            ))}
        </select>
    </div>
);

export { RvwStrViewer, RvwStrController };
