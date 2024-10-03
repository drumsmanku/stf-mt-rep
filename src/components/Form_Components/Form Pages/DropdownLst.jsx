import React, { useState, useEffect, useCallback } from "react";
import { useParams } from 'react-router-dom';
import { FrmQuestion, FrmQuestionController } from "../FrmQuestion";
import { FrmDesc, FrmDescController } from "../FrmDesc";
import {FrmDrpdwn, FrmDrpdwnController} from "../FrmDrpdwn";
import { FrmBtn, FrmBtnController } from "../FrmBtn";
import useFormStore from "../../../app/FormStore";
import { availablePages } from "../../../utils/availablePagesData";

const DropdownLst = ({ pageData }) => {
  const { formId } = useParams();
  const updateForm = useFormStore((state) => state.updateForm);
  const forms = useFormStore((state) => state.forms);

  // Find the metadata for Dropdown List page
  const metadata = availablePages.find(page => page.pageName === "Dropdown List")?.componentsMetaData || {
    question: { val: "Please choose", description: "" },
    dropdown: { placeholder: "Please select an option", options: [] },
    button: { val: "Next" }
  };

  const [formState, setFormState] = useState(() => ({
    ...pageData,
    componentsMetaData: {
      question: pageData.componentsMetaData?.question || metadata.question,
      dropdown: pageData.componentsMetaData?.dropdown || metadata.dropdown,
      button: pageData.componentsMetaData?.button || metadata.button
    }
  }));

  useEffect(() => {
    setFormState(prevState => ({
      ...pageData,
      componentsMetaData: {
        question: pageData.componentsMetaData?.question || prevState.componentsMetaData.question,
        dropdown: pageData.componentsMetaData?.dropdown || prevState.componentsMetaData.dropdown,
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

  const currentForm = useFormStore(state => state.forms.find(form => form.formId === formId));

  return (
    <>
      <div id="viewer" className="w-full px-20 space-y-4 pointer-events-none">
        <FrmQuestion 
          text={formState.componentsMetaData.question?.val || ''} 
          questionColor={currentForm?.design?.questionColor}
        />
        <FrmDesc text={formState.componentsMetaData.question?.description || ''} />
        <FrmDrpdwn 
          placeholder={formState.componentsMetaData.dropdown?.placeholder || ''} 
          options={formState.componentsMetaData.dropdown?.options || []} 
        />
        <FrmBtn 
          text={formState.componentsMetaData.button?.val || ''} 
          backgroundColor={currentForm?.design?.buttonColor} 
          textColor={currentForm?.design?.buttonTextColor} 
        />
      </div>
      <div id="controls" className="w-[27vw] p-4 h-[86.9vh] fixed bg-gray-100 bottom-0 -right-10 flex flex-col space-y-4 overflow-y-auto">
        <FrmQuestionController
          text={formState.componentsMetaData.question?.val || ''}
          onTextChange={(newText) => handleChange('componentsMetaData.question.val', newText)}
        />
        <FrmDescController
          text={formState.componentsMetaData.question?.description || ''}
          onTextChange={(newDesc) => handleChange('componentsMetaData.question.description', newDesc)}
        />
        <FrmDrpdwnController
          placeholder={formState.componentsMetaData.dropdown?.placeholder || ''}
          options={formState.componentsMetaData.dropdown?.options || []}
          onOptionsChange={(newOptions) => handleChange('componentsMetaData.dropdown.options', newOptions)}
        />
        <FrmBtnController
          text={formState.componentsMetaData.button?.val || ''}
          onTextChange={(newText) => handleChange('componentsMetaData.button.val', newText)}
        />
      </div>
    </>
  );
};

export default DropdownLst;
