import React from 'react';

const ContentBox = ({title, content , desc = ""}) => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-center mt-6 mb-2">
                {title}
            </h1>
            <p className="text-center text-gray-500 mb-12">
                {desc}
            </p>

            <div className=" bg-neutral-50 text-gray-800 py-16 px-6 mb-16 lg:px-20 xl:px-40 max-w-4xl mx-auto border border-gray-300 rounded-lg shadow-lg">
                <div className="space-y-8">
                    {content}
                </div>
            </div>
        </div>
    );
};

export default ContentBox;