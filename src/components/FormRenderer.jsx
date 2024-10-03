import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import {
    renderTitle,
    renderQuestion,
    renderInput,
    renderButton,
    renderDropdown,
    renderScale
} from "../utils/CF_Renderer";

const FormRenderer = () => {
    const { formId } = useParams();
    const [formData, setFormData] = useState(null);
    const [formValues, setFormValues] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                const response = await axios.get(`https://your-api-url.com/api/forms/${formId}`);
                setFormData(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load form. Please try again later.");
                setLoading(false);
            }
        };

        fetchFormData();
    }, [formId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!formData || !formData.componentsMetaData || formData.componentsMetaData.length === 0) {
        return <div>No form data available</div>;
    }

    const currentPage = formData.componentsMetaData[0]; // Assuming single page structure

    return (
        <form className="relative overflow-hidden w-screen h-screen">
            {currentPage.title && renderTitle(currentPage.title, {})}
            {currentPage.question && renderQuestion(currentPage.question, {})}
            {currentPage.input && currentPage.input.map((input, index) => 
                renderInput(input, index, formData.pageId, formValues, handleChange, {})
            )}
            {currentPage.dropdown && renderDropdown(currentPage.dropdown, `${formData.pageId}-dropdown`, formValues, handleChange, {})}
            {currentPage.button && renderButton(currentPage.button, () => {}, {})}
        </form>
    );
};

export default FormRenderer;
