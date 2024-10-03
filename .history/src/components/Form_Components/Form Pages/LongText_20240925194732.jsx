import React, { useState, useCallback, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { FrmQuestion, FrmQuestionController } from "../FrmQuestion";
import { FrmTxtBox, FrmTxtBoxController } from "../FrmTxtBox";
import { FrmBtn, FrmBtnController } from "../FrmBtn";
import useFormStore from "../../../app/FormStore";
import { availablePages } from "../../../utils/availablePagesData";

const defaultMetadata = availablePages.find(page => page.pageName === "Long Text").componentsMetaData;

const LongText = ({ pageData }) => {
  const { formId } = useParams();
  const updateForm = useFormStore((state) => state.updateForm);
  const forms = useFormStore((state) => state.forms);

  const [formState, setFormState] = useState(() => ({
    ...pageData,
    componentsMetaData: {
      question: { 
        val: pageData?.componentsMetaData[0]?.question?.val || defaultMetadata.question.val,
        description: pageData?.componentsMetaData[0]?.question?.description || defaultMetadata.question.description
      },
      textBox: {
        value: pageData?.componentsMetaData[0]?.textBox?.value || "",
        maxVal: pageData?.componentsMetaData[0]?.textBox?.maxVal || defaultMetadata.textBox.maxVal,
        size: pageData?.componentsMetaData[0]?.textBox?.size || defaultMetadata.textBox.size,
      },
      button: { val: pageData?.componentsMetaData[0]?.button?.val || defaultMetadata.button.val }
    }
  }));

  useEffect(() => {
    setFormState(prevState => ({
      ...pageData,
      componentsMetaData: {
        question: { 
          val: pageData?.componentsMetaData[0]?.question?.val || defaultMetadata.question.val,
          description: pageData?.componentsMetaData[0]?.question?.description || defaultMetadata.question.description
        },
        textBox: {
          value: pageData?.componentsMetaData[0]?.textBox?.value || "",
          maxVal: pageData?.componentsMetaData[0]?.textBox?.maxVal || defaultMetadata.textBox.maxVal,
          size: pageData?.componentsMetaData[0]?.textBox?.size || defaultMetadata.textBox.size,
        },
        button: { val: pageData?.componentsMetaData[0]?.button?.val || defaultMetadata.button.val }
      }
    }));
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

  return (
    <>
      <div id="viewer" className="w-full px-20 space-y-4 pointer-events-none">
        <FrmQuestion text={formState.componentsMetaData[0]?.question?.val} />
        <FrmTxtBox
          value={formState.componentsMetaData[0]?.textBox?.value}
          maxVal={formState.componentsMetaData[0]?.textBox?.maxVal}
          size={formState.componentsMetaData[0]?.textBox?.size}
        />
        <FrmBtn text={formState.componentsMetaData[0]?.button?.val} />
      </div>
      <div id="controls" className="w-[27vw] p-4 h-[86.9vh] fixed bg-gray-100 bottom-0 -right-10 flex flex-col space-y-4 overflow-y-auto">
        <FrmQuestionController
          text={formState.componentsMetaData[0]?.question?.val}
          onTextChange={(newText) => handleChange('componentsMetaData.question.val', newText)}
        />
        <FrmTxtBoxController
          value={formState.componentsMetaData[0]?.textBox?.value}
          maxVal={formState.componentsMetaData[0]?.textBox?.maxVal}
          size={formState.componentsMetaData[0]?.textBox?.size}
          onValueChange={(newValue) => handleChange('componentsMetaData.textBox.value', newValue)}
          onMaxValChange={(newMaxVal) => handleChange('componentsMetaData.textBox.maxVal', newMaxVal)}
          onSizeChange={(newSize) => handleChange('componentsMetaData.textBox.size', newSize)}
        />
        <FrmBtnController
          text={formState.componentsMetaData[0]?.button?.val}
          onTextChange={(newText) => handleChange('componentsMetaData.button.val', newText)}
        />
      </div>
    </>
  );
};

export default LongText;
