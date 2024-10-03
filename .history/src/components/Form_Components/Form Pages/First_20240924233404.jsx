import React, { useState, useCallback, useEffect, useRef } from "react";
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
  const isInitialMount = useRef(true);

  const [formState, setFormState] = useState(() => ({
    ...pageData,
    componentsMetaData: {
      title: { 
        val: pageData?.componentsMetaData[0]?.title?.val ?? defaultMetadata.title.val,
        description: pageData?.componentsMetaData[0]?.title?.description ?? defaultMetadata.title.description
      },
      button: { 
        val: pageData?.componentsMetaData[0]?.button?.val ?? defaultMetadata.button.val 
      },
      alignment: { 
        val: pageData?.componentsMetaData[0]?.alignment?.val ?? defaultMetadata.alignment.val 
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
          title: { 
            val: pageData?.componentsMetaData[0]?.title?.val ?? prevState.componentsMetaData.title.val,
            description: pageData?.componentsMetaData[0]?.title?.description ?? prevState.componentsMetaData.title.description
          },
          button: { 
            val: pageData?.componentsMetaData[0]?.button?.val ?? prevState.componentsMetaData.button.val 
          },
          alignment: { 
            val: pageData?.componentsMetaData[0]?.alignment?.val ?? prevState.componentsMetaData.alignment.val 
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
        <FrmAlnWrapper alignment={formState.componentsMetaData[0]?.alignment?.val}>
          {formState.componentsMetaData[0]?.title?.val && <FrmTitle text={formState.componentsMetaData[0]?.title?.val} />}
          {formState.componentsMetaData[0]?.title?.description && <FrmDesc text={formState.componentsMetaData[0]?.title?.description} />}
          <FrmBtn text={formState.componentsMetaData[0]?.button?.val} />
        </FrmAlnWrapper>
      </div>
      <div id="controls" className="w-[27vw] p-4 h-[86.9vh] fixed bg-gray-100 bottom-0 -right-10 flex flex-col space-y-4 overflow-y-auto">
        <FrmTitleController
          text={formState.componentsMetaData[0]?.title?.val}
          onTextChange={(newText) => handleChange('componentsMetaData.title.val', newText)}
        />
        <FrmDescController
          text={formState.componentsMetaData[0]?.title?.description}
          onTextChange={(newDesc) => handleChange('componentsMetaData.title.description', newDesc)}
        />
        <FrmBtnController
          text={formState.componentsMetaData[0]?.button?.val}
          onTextChange={(newText) => handleChange('componentsMetaData.button.val', newText)}
        />
        <FrmAlnWrapperController
          alignment={formState.componentsMetaData[0]?.alignment?.val}
          onAlignmentChange={(newAlignment) => handleChange('componentsMetaData.alignment.val', newAlignment)}
        />
      </div>
    </>
  );
};

export default First;
