import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { FrmTitle, FrmTitleController } from '../FrmTitle';
import { FrmBtn, FrmBtnController } from '../FrmBtn';
import useFormStore from '../../../app/FormStore';
import { FrmDesc, FrmDescController } from '../FrmDesc';
import { availablePages } from '../../../utils/availablePagesData';

const ThankYou = ({ pageData }) => {
    const { formId } = useParams();
    const updateForm = useFormStore((state) => state.updateForm);
    const forms = useFormStore((state) => state.forms);

    const metadata = availablePages.find(page => page.pageName === "Thank You")?.componentsMetaData || {
        title: { val: "Thank you for your time", description: "" },
        button: { val: "Submit" }
    };

    const [formState, setFormState] = useState(() => ({
        ...pageData,
        componentsMetaData: {
            title: pageData.componentsMetaData?.title || metadata.title,
            button: pageData.componentsMetaData?.button || metadata.button
        }
    }));

    useEffect(() => {
        setFormState(prevState => ({
            ...pageData,
            componentsMetaData: {
                title: pageData.componentsMetaData?.title || prevState.componentsMetaData.title,
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
                current = current[keys[i]];
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

    if (!formState) {
        return <div>Loading...</div>;
    }

    const currentForm = forms.find(form => form.formId === formId);

    return (
        <>
            <div className="p-4 pointer-events-none" id="viewport">
                <FrmTitle text={formState.componentsMetaData.title?.val || ''} />
                <FrmDesc text={formState.componentsMetaData.title?.description || ''} />
                <FrmBtn 
                    text={formState.componentsMetaData.button?.val || ''} 
                    backgroundColor={currentForm?.design?.buttonColor} 
                    textColor={currentForm?.design?.buttonTextColor} 
                />
            </div>
            <div id="controls" className="w-[27vw] p-4 h-[86.9vh] bg-white fixed top-[5vw] -right-10 flex flex-col space-y-4 overflow-y-auto">
                <FrmTitleController
                    text={formState.componentsMetaData.title?.val || ''}
                    onTextChange={(newText) => handleChange('componentsMetaData.title.val', newText)}
                />
                <FrmDescController
                    text={formState.componentsMetaData.title?.description || ''}
                    onTextChange={(newText) => handleChange('componentsMetaData.title.description', newText)}
                />
                <FrmBtnController
                    text={formState.componentsMetaData.button?.val || ''}
                    onTextChange={(newText) => handleChange('componentsMetaData.button.val', newText)}
                />
            </div>
        </>
    );
};

export default ThankYou;
