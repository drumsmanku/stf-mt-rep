import React, { useState, useCallback, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import { FrmQuestion, FrmQuestionController } from '../FrmQuestion';
import { FrmDesc, FrmDescController } from '../FrmDesc';
import { FrmBtn, FrmBtnController } from '../FrmBtn';
import SignBoard from '../SignBoard';
import useFormStore from "../../../app/FormStore";
import { availablePages } from "../../../utils/availablePagesData";

const Signature = ({ pageData }) => {
	const { formId } = useParams();
	const updateForm = useFormStore((state) => state.updateForm);
	const forms = useFormStore((state) => state.forms);
	const isInitialMount = useRef(true);

	const metadata = availablePages.find(page => page.pageName === "Signature")?.componentsMetaData || {
		question: { val: "Please sign here", description: "" },
		button: { val: "Next" }
	};

	const [formState, setFormState] = useState(() => ({
		...pageData,
		componentsMetaData: {
			question: pageData.componentsMetaData?.question || metadata.question,
			button: pageData.componentsMetaData?.button || metadata.button
		}
	}));

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
		} else {
			setFormState(prevState => ({
				...pageData,
				componentsMetaData: {
					question: pageData.componentsMetaData?.question || prevState.componentsMetaData.question,
					button: pageData.componentsMetaData?.button || prevState.componentsMetaData.button
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
			<div id="viewer" className="w-full px-20 space-y-4 pointer-events-none">
				<FrmQuestion 
					text={formState.componentsMetaData.question?.val || ''} 
					questionColor={currentForm?.design?.questionColor}
				/>
				<FrmDesc text={formState.componentsMetaData.question?.description || ''} />
				<SignBoard width={600} height={250} strokeColor="#000000" strokeWidth={2} />
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
				<FrmBtnController
					text={formState.componentsMetaData.button?.val || ''}
					onTextChange={(newText) => handleChange('componentsMetaData.button.val', newText)}
				/>
			</div>
		</>
	);
};

export default Signature;
