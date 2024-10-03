import React, { useState, useCallback, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import { FrmQuestion, FrmQuestionController } from "../FrmQuestion";
import { FrmDesc, FrmDescController } from "../FrmDesc";
import { FrmInput, FrmInputController } from "../FrmInput";
import { FrmBtn, FrmBtnController } from "../FrmBtn";
import useFormStore from "../../../app/FormStore";
import { availablePages } from "../../../utils/availablePagesData";

const defaultMetadata = availablePages.find(page => page.pageName === "Short Text")?.componentsMetaData || {
  question: { val: "Your question here", description: "" },
  input: [{ type: "text", label: "", placeholder: "Your answer here...", minVal: 0, maxVal: 30 }],
  button: { val: "Next" }
};

const ShortText = ({ pageData }) => {
  const { formId } = useParams();
  const updateForm = useFormStore((state) => state.updateForm);
  const forms = useFormStore((state) => state.forms);
  const isInitialMount = useRef(true);

  const [formState, setFormState] = useState(() => ({
    ...pageData,
    componentsMetaData: {
      question: { 
        val: pageData?.componentsMetaData?.question?.val ?? defaultMetadata.question.val,
        description: pageData?.componentsMetaData?.question?.description ?? defaultMetadata.question.description
      },
      input: Array.isArray(pageData?.componentsMetaData?.input) 
        ? pageData.componentsMetaData.input.map((input, index) => ({
            type: input?.type ?? defaultMetadata.input[0].type,
            label: input?.label ?? defaultMetadata.input[0].label,
            placeholder: input?.placeholder ?? defaultMetadata.input[0].placeholder,
            minVal: input?.minVal ?? defaultMetadata.input[0].minVal,
            maxVal: input?.maxVal ?? defaultMetadata.input[0].maxVal,
          }))
        : [{ ...defaultMetadata.input[0] }],
      button: { 
        val: pageData?.componentsMetaData?.button?.val ?? defaultMetadata.button.val 
      }
    }
  }));

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setFormState(prevState => ({
        ...pageData,
        componentsMetaData: {
          question: { 
            val: pageData?.componentsMetaData?.question?.val ?? prevState.componentsMetaData.question.val,
            description: pageData?.componentsMetaData?.question?.description ?? prevState.componentsMetaData.question.description
          },
          input: Array.isArray(pageData?.componentsMetaData?.input)
            ? pageData.componentsMetaData.input.map((input, index) => ({
                type: input?.type ?? prevState.componentsMetaData.input[index]?.type,
                label: input?.label ?? prevState.componentsMetaData.input[index]?.label,
                placeholder: input?.placeholder ?? prevState.componentsMetaData.input[index]?.placeholder,
                minVal: input?.minVal ?? prevState.componentsMetaData.input[index]?.minVal,
                maxVal: input?.maxVal ?? prevState.componentsMetaData.input[index]?.maxVal,
              }))
            : prevState.componentsMetaData.input,
          button: { 
            val: pageData?.componentsMetaData?.button?.val ?? prevState.componentsMetaData.button.val 
          }
        }
      }));
    }
  }, [pageData]);

  const handleChange = useCallback((path, value) => {
    setFormState(prevState => {
      const newState = JSON.parse(JSON.stringify(prevState));
      let current = newState;
      const keys = path.split('.');
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;

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
  const currentForm = useFormStore(state => state.forms.find(form => form.formId === formId));

  return (
    <>
      <div id="viewer" className="w-full px-20 space-y-4 pointer-events-none">
        {formState.componentsMetaData.question?.val && <FrmQuestion 
            text={formState.componentsMetaData.question.val} 
            questionColor={currentForm?.design?.questionColor}
        />}
        {formState.componentsMetaData.question?.description && <FrmDesc 
            text={formState.componentsMetaData.question.description} 
            textColor={currentForm?.design?.textColor}
        />}
        {formState.componentsMetaData.input && formState.componentsMetaData.input.map((input, index) => (
          <FrmInput
            key={index}
            text=""
            label={input?.label}
            placeholder={input?.placeholder}
            answerColor={currentForm?.design?.answerColor}
          />
        ))}
        <FrmBtn 
            text={formState.componentsMetaData.button?.val} 
            backgroundColor={currentForm?.design?.buttonColor}
            textColor={currentForm?.design?.buttonTextColor}
        />
      </div>
      <div id="controls" className="w-[27vw] p-4 h-[86.9vh] fixed bg-gray-100 bottom-0 -right-10 flex flex-col space-y-4 overflow-y-auto">
        <FrmQuestionController
          text={formState.componentsMetaData.question?.val}
          onTextChange={(newText) => handleChange('componentsMetaData.question.val', newText)}
        />
        <FrmDescController
          text={formState.componentsMetaData.question?.description}
          onTextChange={(newDesc) => handleChange('componentsMetaData.question.description', newDesc)}
        />
        {formState.componentsMetaData.input && formState.componentsMetaData.input.map((input, index) => (
          <FrmInputController
            key={index}
            label={input?.label}
            placeholder={input?.placeholder}
            onLabelChange={(newLabel) => handleChange(`componentsMetaData.input[${index}].label`, newLabel)}
            onPlaceholderChange={(newPlaceholder) => handleChange(`componentsMetaData.input[${index}].placeholder`, newPlaceholder)}
          />
        ))}
        <FrmBtnController
          text={formState.componentsMetaData.button?.val}
          onTextChange={(newText) => handleChange('componentsMetaData.button.val', newText)}
        />
      </div>
    </>
  );
};

export default ShortText;
