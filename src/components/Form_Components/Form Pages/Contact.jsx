import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { FrmQuestion, FrmQuestionController } from '../FrmQuestion';
import { FrmInput, FrmInputController } from '../FrmInput';
import { FrmBtn, FrmBtnController } from '../FrmBtn';
import useFormStore from '../../../app/FormStore';
import { FrmDesc, FrmDescController } from '../FrmDesc';

const Contact = ({ pageData }) => {
    const { formId } = useParams();
    const updateForm = useFormStore((state) => state.updateForm);
    const forms = useFormStore((state) => state.forms);

    const [formState, setFormState] = useState(() => ({
        ...pageData,
        componentsMetaData: {
            question: pageData.componentsMetaData?.question || { val: "Your question here", description: "" }, // Ensure 'val' is used
            input: pageData.componentsMetaData?.input || [],
            button: pageData.componentsMetaData?.button || { val: "Submit" }
        }
    }));

    useEffect(() => {
        setFormState(prevState => ({
            ...pageData,
            componentsMetaData: {
                question: pageData.componentsMetaData?.question || prevState.componentsMetaData.question,
                input: pageData.componentsMetaData?.input || prevState.componentsMetaData.input,
                button: pageData.componentsMetaData?.button || prevState.componentsMetaData.button
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
            current[lastKey] = value;

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

    const inputFields = formState.componentsMetaData.input || [];
    const currentForm = useFormStore(state => state.forms.find(form => form.formId === formId));

    return (
        <>
            <div className="p-4 pointer-events-none" id="viewport">
                <FrmQuestion 
                    text={formState.componentsMetaData.question?.val || ''} // Use 'val' for the question text
                    questionColor={currentForm?.design?.questionColor}
                />
                <FrmDesc text={formState.componentsMetaData.question?.description || ''} />
                <div className='flex flex-wrap space-x-4'>
                    {inputFields.map((input, index) => (
                        <FrmInput
                            key={index}
                            label={input?.label || ''}
                            placeholder={input?.placeholder || ''}
                            answerColor={currentForm?.design?.answerColor}
                        />
                    ))}
                </div>
                <FrmBtn 
                    text={formState.componentsMetaData.button?.val || ''} 
                    backgroundColor={currentForm?.design?.buttonColor} // Use design button color
                    textColor={currentForm?.design?.buttonTextColor} // Use design button text color
                />
            </div>
            <div id="controls" className="w-[27vw] p-4 h-[86.9vh] bg-white fixed top-[5vw] -right-10 flex flex-col space-y-4 overflow-y-auto">
                <FrmQuestionController
                    text={formState.componentsMetaData.question?.text || ''}
                    onTextChange={(newText) => handleChange('componentsMetaData.question.text', newText)}
                />
                <FrmDescController
                    text={formState.componentsMetaData.question?.description || ''}
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
                    text={formState.componentsMetaData.button?.val || ''}
                    onTextChange={(newText) => handleChange('componentsMetaData.button.val', newText)}
                />
            </div>
        </>
    );
};

export default Contact;