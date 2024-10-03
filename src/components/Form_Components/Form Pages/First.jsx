import React, { useState, useCallback, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { FrmBtn, FrmBtnController } from "../FrmBtn";
import { FrmTitle, FrmTitleController } from "../FrmTitle";
import { FrmDesc, FrmDescController } from "../FrmDesc";
import { FrmAlnWrapper, FrmAlnWrapperController } from "../FrmAlnWrapper";
import useFormStore from "../../../app/FormStore";
import { availablePages } from "../../../utils/availablePagesData";

const defaultMetadata = availablePages.find(page => page.pageName === "Hello")?.componentsMetaData || {
  title: { val: "Hey there 😀", description: "Mind filling out this form?" },
  button: { val: "Let's Start" },
  alignment: { val: "center" }
};

const First = ({ pageData }) => {
  const { formId } = useParams();
  const updateForm = useFormStore((state) => state.updateForm);
  const forms = useFormStore((state) => state.forms);
  const currentForm = forms.find(f => f.formId === formId);

  const [formState, setFormState] = useState(() => ({
    ...pageData,
    componentsMetaData: {
      title: { 
        val: pageData?.componentsMetaData?.title?.val ?? defaultMetadata.title.val,
        description: pageData?.componentsMetaData?.title?.description ?? defaultMetadata.title.description
      },
      button: { 
        val: pageData?.componentsMetaData?.button?.val ?? defaultMetadata.button.val 
      },
      alignment: { 
        val: pageData?.componentsMetaData?.alignment?.val ?? defaultMetadata.alignment.val 
      }
    }
  }));

  useEffect(() => {
    setFormState(prevState => ({
      ...pageData,
      componentsMetaData: {
        title: { 
          val: pageData?.componentsMetaData?.title?.val ?? prevState.componentsMetaData.title.val,
          description: pageData?.componentsMetaData?.title?.description ?? prevState.componentsMetaData.title.description
        },
        button: { 
          val: pageData?.componentsMetaData?.button?.val ?? prevState.componentsMetaData.button.val 
        },
        alignment: { 
          val: pageData?.componentsMetaData?.alignment?.val ?? prevState.componentsMetaData.alignment.val 
        }
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
        <FrmAlnWrapper alignment={formState.componentsMetaData.alignment?.val}>
          {formState.componentsMetaData.title?.val && 
            <FrmTitle 
              text={formState.componentsMetaData.title.val} 
              color={currentForm?.design?.questionColor}
            />
          }
          {formState.componentsMetaData.title?.description && 
            <FrmDesc 
              text={formState.componentsMetaData.title.description} 
              color={currentForm?.design?.answerColor}
            />
          }
          <FrmBtn 
            text={formState.componentsMetaData.button?.val} 
            backgroundColor={currentForm?.design?.buttonColor}
            textColor={currentForm?.design?.buttonTextColor}
          />
        </FrmAlnWrapper>
      </div>
      <div id="controls" className="w-[27vw] bg-white p-4 h-[86.9vh] fixed bottom-0 -right-10 flex flex-col space-y-4 overflow-y-auto">
        <FrmTitleController
          text={formState.componentsMetaData.title?.val}
          onTextChange={(newText) => handleChange('componentsMetaData.title.val', newText)}
        />
        <FrmDescController
          text={formState.componentsMetaData.title?.description}
          onTextChange={(newDesc) => handleChange('componentsMetaData.title.description', newDesc)}
        />
        <FrmBtnController
          text={formState.componentsMetaData.button?.val}
          onTextChange={(newText) => handleChange('componentsMetaData.button.val', newText)}
        />
        <FrmAlnWrapperController
          alignment={formState.componentsMetaData.alignment?.val}
          onAlignmentChange={(newAlignment) => handleChange('componentsMetaData.alignment.val', newAlignment)}
        />
      </div>
    </>
  );
};

export default First;
