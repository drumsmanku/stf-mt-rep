import React, {useState} from 'react';
import ProBadge from "../../ProBadge.jsx";

const Results = () => {
    const [rsTabs, SetRsTabs] = useState(["Completed", "Partial"]);
    return (
        <div className={"flex flex-col items-center justify-center w-screen absolute top-20"}>
            <div className={"p-6 flex flex-col gap-3 w-full"}>
                <p>Submissions of My Form</p>
                <div className={"flex gap-3 w-full shadow-md p-3"}>
                    <div className={"flex gap-3"}>
                        <p>Completed</p>
                        <ProBadge text={"0"} cls={"bg-blue-300 rounded-full"}/>
                    </div>
                    <div className={"flex gap-3"}>
                        <p>Partial</p>
                        <ProBadge text={"0"} cls={"bg-blue-300 rounded-full"}/>
                    </div>
                </div>
                <div className={"flex gap-3 w-full shadow-md p-3"}>
                    <p>No complete submissions yet. Please share your form to the world to start collecting submissions.</p>
                </div>
            </div>
        </div>
    );
};

export default Results;