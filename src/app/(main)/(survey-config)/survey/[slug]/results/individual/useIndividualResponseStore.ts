import { create } from "zustand";

interface IndividualResponseState {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  setResponseData: ({ responseId }: { responseId: string }) => void;
  responseId: string;
}

export const useIndividualResponseStore = create<IndividualResponseState>()(
  (set) => ({
    showDialog: false,
    setShowDialog: (show: boolean) => set({ showDialog: show }),
    setResponseData: ({ responseId }) => set({ responseId }),
    responseId: "",
  })
);
