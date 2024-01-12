import { create } from "zustand";

interface IndividualResponseState {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  setResponseData: ({
    responseId,
    collectorId,
  }: {
    responseId: string;
    collectorId: string;
  }) => void;
  responseId: string;
  collectorId: string;
}

export const useIndividualResponseStore = create<IndividualResponseState>()(
  (set) => ({
    showDialog: false,
    setShowDialog: (show: boolean) => set({ showDialog: show }),
    setResponseData: ({ collectorId, responseId }) =>
      set({ collectorId, responseId }),
    responseId: "",
    collectorId: "",
  })
);
