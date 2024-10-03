import React from 'react';
import PreviewBlock from "./PreviewBlock.jsx";

const LinkSetting = () => {
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold">Link Settings</h2>
                    <p className="text-sm text-gray-400">Setup how your forms will appear in social media like Facebook, X, etc.</p>
                </div>
                <button className="text-white bg-black rounded-md py-2 px-4 text-sm">Save</button>
            </div>
            <div className="mb-6">
                <p className="font-semibold mb-2">Title</p>
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Max 60 Characters</p>
            </div>
            <div className="mb-6">
                <p className="font-semibold mb-2">Description</p>
                <textarea
                    className="textarea border h-24 w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="Fill out my Striform."
                />
                <p className="text-xs text-gray-500 mt-1">Max 110 Characters</p>
            </div>
            <div className="mb-6">
                <h2 className="font-semibold mb-2">Social Preview Image</h2>
                <input
                    type="file"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-gray-100 file:rounded-md file:text-gray-700 hover:file:bg-gray-200"
                />
                <p className="text-xs text-gray-500 mt-1">Recommended size 1200x630. Should be less than 5MB.</p>
            </div>
            <div className="mb-6">
                <h2 className="font-semibold mb-2">Favicon</h2>
                <input
                    type="file"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-gray-100 file:rounded-md file:text-gray-700 hover:file:bg-gray-200"
                />
                <p className="text-xs text-gray-500 mt-1">Recommended size 60x60. Ideally .ico or .png image.</p>
            </div>

            <div className="mt-6">
                <PreviewBlock />
            </div>
        </div>
    );
};

export default LinkSetting;
