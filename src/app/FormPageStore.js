import { create } from "zustand";

const formPageStore = (set) => ({
    formPages: [],

    addPage: (page) => set((state) => ({
        formPages: [...state.formPages, page]
    })),

    removePage: (pageId) => set((state) => ({
        formPages: state.formPages.filter((page) => page.id !== pageId)
    })),
});

// creating the store
const useFormPageStore = create(formPageStore);

export default useFormPageStore;
