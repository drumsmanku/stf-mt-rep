import React, { useState, useCallback, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import { FrmQuestion, FrmQuestionController } from "../FrmQuestion";
import { FrmDesc, FrmDescController } from "../FrmDesc";
import { FrmOpt, FrmOptController } from "../FrmOpt";
import { FrmBtn, FrmBtnController } from "../FrmBtn";
import useFormStore from "../../../app/FormStore";
import { availablePages } from "../../../utils/availablePagesData";

const defaultMetadata = availablePages.find(page => page.pageName === "Single Option")?.componentsMetaData || {
  question: { val: "Which do you prefer", description: "" },
  option: [{ type: "checkbox", val: "Option 1" }, { type: "checkbox", val: "Option 2" }],
  button: { val: "Next" }
};

const normalizeOptions = (options) => {
  return options.map(opt => {
    if (typeof opt === 'object' && opt.val) {
      return { type: opt.type || "checkbox", val: opt.val };
    } else if (typeof opt === 'object') {
      return { type: "checkbox", val: Object.values(opt).join('') };
    } else {
      return { type: "checkbox", val: String(opt) };
    }
  });
};

const SingleOpt = ({ pageData }) => {
  const { formId } = useParams();
  const updateForm = useFormStore((state) => state.updateForm);
  const forms = useFormStore((state) => state.forms);
  const isInitialMount = useRef(true);

  const [formState, setFormState] = useState(() => ({
    ...pageData,
    componentsMetaData: {
      question: { 
        val: pageData?.componentsMetaData[0]?.question?.val ?? defaultMetadata.question.val,
        description: pageData?.componentsMetaData[0]?.question?.description ?? defaultMetadata.question.description
      },
      option: normalizeOptions(pageData?.componentsMetaData[0]?.option ?? defaultMetadata.option),
      button: { 
        val: pageData?.componentsMetaData[0]?.button?.val ?? defaultMetadata.button.val 
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
            val: pageData?.componentsMetaData[0]?.question?.val ?? prevState.componentsMetaData.question.val,
            description: pageData?.componentsMetaData[0]?.question?.description ?? prevState.componentsMetaData.question.description
          },
          option: normalizeOptions(pageData?.componentsMetaData[0]?.option ?? prevState.componentsMetaData.option),
          button: { 
            val: pageData?.componentsMetaData[0]?.button?.val ?? prevState.componentsMetaData.button.val 
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

  return (
    <>
      <div id="viewer" className="w-full px-20 space-y-4 pointer-events-none">
        {formState.componentsMetaData[0]?.question?.val && <FrmQuestion text={formState.componentsMetaData[0]?.question?.val} />}
        {formState.componentsMetaData[0]?.question?.description && <FrmDesc text={formState.componentsMetaData[0]?.question?.description} />}
        <FrmOpt options={formState.componentsMetaData[0]?.option} />
        <FrmBtn text={formState.componentsMetaData[0]?.button?.val} />
      </div>
      <div id="controls" className="w-[27vw] p-4 h-[86.9vh] fixed bg-gray-100 bottom-0 -right-10 flex flex-col space-y-4 overflow-y-auto">
        <FrmQuestionController
          text={formState.componentsMetaData[0]?.question?.val}
          onTextChange={(newText) => handleChange('componentsMetaData.question.val', newText)}
        />
        <FrmDescController
          text={formState.componentsMetaData[0]?.question?.description}
          onTextChange={(newDesc) => handleChange('componentsMetaData.question.description', newDesc)}
        />
        <FrmOptController
          options={formState.componentsMetaData[0]?.option}
          onOptionsChange={(newOptions) => handleChange('componentsMetaData.option', normalizeOptions(newOptions))}
        />
        <FrmBtnController
          text={formState.componentsMetaData[0]?.button?.val}
          onTextChange={(newText) => handleChange('componentsMetaData.button.val', newText)}
        />
      </div>
    </>
  );
};

export default SingleOpt;
