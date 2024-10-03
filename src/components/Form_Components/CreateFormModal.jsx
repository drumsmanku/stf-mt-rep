import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import useFormStore from "../../app/FormStore.js";

const CreateFormModal = ({ onClose }) => {
    const [formName, setFormName] = useState('');
    const navigate = useNavigate();
    const addForms = useFormStore((state) => state.addForms);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formName.trim()) {
            const user = JSON.parse(localStorage.getItem('user'));
            const newForm = {
                formId: uuidv4(),
                formName: formName.trim(),
                userId: user ? user.id : null,
                pages: [],
                isLocal: true
            };

            addForms(newForm);
            onClose();
            navigate(`/form-builder/${newForm.formId}`);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Create New Form</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Enter form name"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    required
                />
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="mr-2 px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateFormModal;