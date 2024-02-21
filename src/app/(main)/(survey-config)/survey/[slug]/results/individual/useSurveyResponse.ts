import { getSurveyResponse } from "@/app/actions";
import { useToast } from "@/components/ui/use-toast";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export default function useSurveyResponse(
  surveyId: string,
  responseId: string,
  pageId: string
) {
  const { toast } = useToast();
  const { data, isLoading, isFetching, isError } = useQuery({
    staleTime: 0,
    queryKey: ["survey", surveyId, "response", responseId, pageId],
    queryFn: () => getSurveyResponse(surveyId, responseId, pageId),
    placeholderData: keepPreviousData,
  });

  const lastSuccessData = useRef(data);

  useEffect(() => {
    if (isError && !isFetching) {
      toast({ variant: "destructive", title: "Something went wrong!" });
    }
  }, [isError, toast, isFetching]);

  useEffect(() => {
    if (data) lastSuccessData.current = data;
  }, [data]);

  return {
    surveyResponse: data?.surveyResponse,
    questions: data?.questions,
    questionResponses: data?.questionResponses,
    isLoading,
    isFetching,
    lastSuccessData,
    isError,
  };
}
