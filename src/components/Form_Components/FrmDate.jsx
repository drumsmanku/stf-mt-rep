import React from 'react';

const FrmDate = ({ date }) => {
    return (
        <div>
            <input
                type="text"
                value={date}
                placeholder="yy-mm-dd"
                className="outline-none p-2 border-b border-black w-full"
                readOnly
            />
        </div>
    );
};



export default FrmDate;
