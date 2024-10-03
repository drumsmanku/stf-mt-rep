import {create} from "zustand";
import {persist} from "zustand/middleware";

const LightTheme = {
    backgroundColor: "#ffffff",
    questionColor: "#000000",
    answerColor: "#000000",
    buttonColor: "#000000",
    buttonTextColor: "#ffffff",
    starRatingColor: "#000000"
};

/*
    FormStore is a store that holds the forms data.
    // sample data
    forms: [
        {
            formId: uuidv4(),
            formName: string,
            pages: [
                {
                    pageId: uuidv4(),
                    pageName: string,
                    componentsMetaData: {
                    components: string[],
                    question: {
                        description: string,
                        text: string,
                    },
                    input: [
                        {
                            type: string,
                            label: string,
                            placeholder: string,
                        }
                    ],
                    button: {
                        val: string,
                    }
                },
            ]
        },
    ]
]
*/ 
const FormStore = (set) => ({
    forms: [],

    setForms: (forms) => set({ forms }),

    addForms: (newForm) => set((state) => {
        if (!state.forms.some(form => form.formId === newForm.formId)) {
            return { forms: [...state.forms, { ...newForm, design: LightTheme }] };
        }
        return state;
    }),

    removeForm: (formId) => set((state) => ({
        forms: state.forms.filter((form) => form.formId !== formId)
    })),

    updateFormPages: (formId, updatedPages) => set((state) => ({
        forms: state.forms.map((form) =>
            form.formId === formId
                ? {
                    ...form,
                    pages: form.pages.map(existingPage => {
                        const updatedPage = updatedPages.find(p => p.pageId === existingPage.pageId);
                        return updatedPage ? { ...existingPage, ...updatedPage } : existingPage;
                    })
                }
                : form
        )
    })),

    addPageToForm: (formId, newPage) => set((state) => ({
        forms: state.forms.map((form) =>
            form.formId === formId
                ? { ...form, pages: [...(form.pages || []), newPage] }
                : form
        )
    })),

    removeFormPage: (formId, pageId) => set((state) => ({
        forms: state.forms.map((form) =>
            form.formId === formId
                ? { ...form, pages: form.pages.filter((page) => page.pageId !== pageId) }
                : form
        )
    })),

    updateForm: (updatedForm) => set((state) => ({
        forms: state.forms.map((form) =>
            form.formId === updatedForm.formId ? updatedForm : form
        )
    })),

    updateFormDesign: (formId, designData) => set((state) => ({
        forms: state.forms.map((form) =>
            form.formId === formId
                ? { ...form, design: designData }
                : form
        )
    })),
});

const useFormStore = create(persist(FormStore, { name: "FormStore" }));
export default useFormStore;