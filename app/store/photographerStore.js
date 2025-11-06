import { create } from "zustand";

export const usePhotographerStore = create((set) => ({
    photographers: [],
    selectedPhotographer: null,
    setPhotographers: (data) => set({ photographers: data }),
    setSelectedPhotographer: (data) => set({ selectedPhotographer: data }),
}));
