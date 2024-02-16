import { SurveyResponse } from "@/lib/types";
import { useIndividualResponseStore } from "./useIndividualResponseStore";

export default function useSurveyResponsesPagination(
  responses: SurveyResponse[],
  selectedResponseId: string
) {
  const setResponseData = useIndividualResponseStore(
    (state) => state.setResponseData
  );

  const handleNextResponse = () => {
    const currentResponseId = selectedResponseId;
    const currentResponseIndex = responses!.findIndex(
      (response) => response.id === currentResponseId
    );
    const lastItemIndex = responses!.length - 1;
    const nextResponseIndex =
      currentResponseIndex < lastItemIndex ? currentResponseIndex + 1 : -1;

    const nextResponseId = responses?.find(
      (_, index) => index === nextResponseIndex
    )?.id;

    if (nextResponseId) {
      setResponseData({ responseId: nextResponseId });
    }
  };

  const getCanPreviousResponse = () => {
    const currentResponseId = selectedResponseId;
    const currentResponseIndex = responses!.findIndex(
      (response) => response.id === currentResponseId
    );

    const previousResponseIndex =
      currentResponseIndex > 0 ? currentResponseIndex - 1 : -1;

    return previousResponseIndex !== -1;
  };

  const getCanNextResponse = () => {
    const currentResponseId = selectedResponseId;
    const currentResponseIndex = responses!.findIndex(
      (response) => response.id === currentResponseId
    );
    const lastItemIndex = responses!.length - 1;
    const nextResponseIndex =
      currentResponseIndex < lastItemIndex ? currentResponseIndex + 1 : -1;

    return nextResponseIndex !== -1;
  };

  const handlePreviousResponse = () => {
    const currentResponseId = selectedResponseId;
    const currentResponseIndex = responses!.findIndex(
      (response) => response.id === currentResponseId
    );

    const previousResponseIndex =
      currentResponseIndex > 0 ? currentResponseIndex - 1 : -1;
    const previousResponseId = responses?.find(
      (_, index) => index === previousResponseIndex
    )?.id;

    if (previousResponseId) {
      setResponseData({ responseId: previousResponseId });
    }
  };

  return {
    getCanNextResponse,
    getCanPreviousResponse,
    handleNextResponse,
    handlePreviousResponse,
  };
}
