import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { FrmQuestion, FrmQuestionController } from '../FrmQuestion';
import { FrmInput, FrmInputController } from '../FrmInput';
import { FrmBtn, FrmBtnController } from '../FrmBtn';
import useFormStore from '../../../app/FormStore';
import { FrmDesc, FrmDescController } from '../FrmDesc';

const defaultMetadata = {
    question: { text: "What's your contact information?", description: "" },
    input: [
        { label: "Email", placeholder: "Enter your email" },
        { label: "Phone", placeholder: "Enter your phone number" },
        { label: "Name", placeholder: "Enter your name" },
        { label: "Address", placeholder: "Enter your address" },
        { label: "Company", placeholder: "Enter your company name" }
    ],
    button: { val: "Submit" }
};

const Contact = ({ pageData }) => {
    const { formId } = useParams();
    const updateForm = useFormStore((state) => state.updateForm);
    const forms = useFormStore((state) => state.forms);
    console.log("this is page data",pageData)

    const [formState, setFormState] = useState(() => ({
        ...pageData,
        componentsMetaData: {
            question: pageData?.componentsMetaData[0]?.question || defaultMetadata.question,
            input: pageData.componentsMetaData[0]?.input || defaultMetadata.input,
            button: pageData.componentsMetaData[0]?.button || defaultMetadata.button
        }
    }));

    useEffect(() => {
        setFormState(prevState => ({
            ...pageData,
            componentsMetaData: {
                question: pageData.componentsMetaData[0]?.question || prevState.componentsMetaData.question,
                input: pageData.componentsMetaData[0]?.input || prevState.componentsMetaData.input,
                button: pageData.componentsMetaData[0]?.button || prevState.componentsMetaData.button
            }
        }));
    }, [pageData]);

    const handleChange = useCallback((path, value) => {
        setFormState(prevState => {
            const newState = JSON.parse(JSON.stringify(prevState));
            let current = newState;
            const keys = path.split('.');

            for (let i = 0; i < keys.length - 1; i++) {
                if (Array.isArray(current[keys[i]])) {
                    const index = parseInt(keys[i + 1]);
                    if (!isNaN(index)) {
                        current = current[keys[i]][index];
                        i++;
                    } else {
                        current = current[keys[i]];
                    }
                } else {
                    current = current[keys[i]];
                }
            }

            const lastKey = keys[keys.length - 1];
            if (typeof value === 'function') {
                current[lastKey] = value(current[lastKey]);
            } else {
                current[lastKey] = value;
            }

            const currentForm = forms.find(form => form.formId === formId);
            if (currentForm) {
                updateForm({
                    ...currentForm,
                    pages: currentForm.pages.map(page =>
                        page.pageId === newState.pageId ? newState : page
                    )
                });
            }

            return newState;
        });
    }, [formId, forms, updateForm]);

    if (!formState) {
        return <div>Loading...</div>;
    }

    const inputFields = formState.componentsMetaData.input || [];

    return (
        <>
            <div className="p-4 pointer-events-none" id="viewport">
                <FrmQuestion text={formState.componentsMetaData[0]?.question?.text || ''} />
                <FrmDesc text={formState.componentsMetaData[0]?.question?.description || ''} />
                <div className='flex flex-wrap space-x-4'>
                    {inputFields.map((input, index) => (
                        <FrmInput
                            key={index}
                            label={input?.label || ''}
                            placeholder={input?.placeholder || ''}
                        />
                    ))}
                </div>
                <FrmBtn text={formState.componentsMetaData[0]?.button?.val || ''} />
            </div>
            <div id="controls" className="w-[27vw] p-4 h-[86.9vh] fixed bottom-0 -right-10 flex flex-col space-y-4 overflow-y-auto">
                <FrmQuestionController
                    text={formState.componentsMetaData[0]?.question?.text || ''}
                    onTextChange={(newText) => handleChange('componentsMetaData.question.text', newText)}
                />
                <FrmDescController
                    text={formState.componentsMetaData[0]?.question?.description || ''}
                    onTextChange={(newText) => handleChange('componentsMetaData.question.description', newText)}
                />
                {inputFields.map((input, index) => (
                    <FrmInputController
                        key={index}
                        label={input?.label || ''}
                        placeholder={input?.placeholder || ''}
                        onLabelChange={(newLabel) => handleChange(`componentsMetaData.input.${index}.label`, newLabel)}
                        onPlaceholderChange={(newPlaceholder) => handleChange(`componentsMetaData.input.${index}.placeholder`, newPlaceholder)}
                    />
                ))}
                <FrmBtnController
                    text={formState.componentsMetaData[0]?.button?.val || ''}
                    onTextChange={(newText) => handleChange('componentsMetaData.button.val', newText)}
                />
            </div>
        </>
    );
};

export default Contact;
