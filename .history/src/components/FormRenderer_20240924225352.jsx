import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import {
    renderTitle,
    renderQuestion,
    renderInput,
    renderButton,
} from "../utils/CF_Renderer";
import {FaChevronUp, FaChevronDown} from "react-icons/fa";

const FormRenderer = () => {
    const {formId} = useParams();
    const [formData, setFormData] = useState(null);
    const [formValues, setFormValues] = useState({});
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [direction, setDirection] = useState('next');
    const [transitioning, setTransitioning] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:4000/api/forms/${formId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log("Response data:", response.data);
                if (response.data && response.data.pages) {
                    setFormData(response.data);
                } else {
                    throw new Error("Invalid form data structure");
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching form data:", err);
                setError("Failed to load form. Please try again later.");
                setLoading(false);
            }
        };

        fetchFormData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form values:', formValues);
    };

    const handleNextPage = (e) => {
        e.preventDefault();
        if (currentPageIndex < formData.pages.length - 1 && !transitioning) {
            setDirection('next');
            setTransitioning(true);
            setTimeout(() => {
                setCurrentPageIndex((prevIndex) => prevIndex + 1);
            }, 400);
        }
    };

    const handlePreviousPage = (e) => {
        e.preventDefault();
        if (currentPageIndex > 0 && !transitioning) {
            setDirection('prev');
            setTransitioning(true);
            setTimeout(() => {
                setCurrentPageIndex((prevIndex) => prevIndex - 1);
            }, 400);
        }
    };

    useEffect(() => {
        setTransitioning(false);
    }, [currentPageIndex]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!formData || !formData.pages || formData.pages.length === 0) {
        return <div>No form data available</div>;
    }

    const currentPage = formData.pages[currentPageIndex];
    const design = formData.design || {};

    return (
        <form onSubmit={handleSubmit} className="relative overflow-hidden w-screen h-screen" style={{ backgroundColor: design.backgroundColor || '#ffffff' }}>
            <div 
                key={currentPage.pageId} 
                className={`font-inter w-screen h-screen flex flex-col items-center justify-center text-center absolute transition-all duration-500 ease-in-out ${
                    transitioning 
                        ? direction === 'next' 
                            ? '-translate-y-full opacity-0' 
                            : 'translate-y-full opacity-0'
                        : 'translate-y-0 opacity-100'
                }`}
            >
                {currentPage.componentsMetaData && currentPage.componentsMetaData.map((componentMetaData, metaDataIndex) => (
                    <React.Fragment key={`meta-${metaDataIndex}`}>
                        {componentMetaData.title && (
                            <div>{renderTitle(componentMetaData.title, design)}</div>
                        )}
                        {componentMetaData.question && (
                            <div>{renderQuestion(componentMetaData.question, design)}</div>
                        )}
                        {componentMetaData.input && (
                            <div>
                                {componentMetaData.input.map((input, inputIndex) =>
                                    renderInput(input, inputIndex, currentPage.pageId, formValues, handleChange, design)
                                )}
                            </div>
                        )}
                        {componentMetaData.button && (
                            renderButton(componentMetaData.button, handleNextPage, design)
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex flex-col absolute bottom-1 right-[5vw] md:bottom-10 md:right-10 z-10">
                <div className={"flex text-sm flex-col justify-center items-start"}>
                    <img className={"w-[30vw] md:w-[13vw] opacity-50"} src={"/logo.png"} alt="Logo" />
                </div>
                <div className={"pl-3 space-x-4"}>
                    <button
                        type="button"
                        onClick={handlePreviousPage}
                        className={`w-min p-3 rounded-md bg-teal-400 ${currentPageIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={currentPageIndex === 0 || transitioning}
                    >
                        <FaChevronDown />
                    </button>

                    {currentPageIndex < formData.pages.length - 1 ? (
                        <button
                            type="button"
                            onClick={handleNextPage}
                            className="w-min p-3 rounded-md bg-teal-400"
                            disabled={transitioning}
                        >
                            <FaChevronUp />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="p-2 mb-2 bg-teal-500 text-white rounded hover:bg-green-700"
                            disabled={transitioning}
                        >
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default FormRenderer;
