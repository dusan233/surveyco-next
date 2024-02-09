import { getQuestionResults } from "@/app/actions";
import { useToast } from "@/components/ui/use-toast";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export const useQuestionResults = (surveyId: string, page: number) => {
  const { toast } = useToast();
  const { data, error, isFetching, status, isError } = useQuery({
    staleTime: 0,
    queryKey: ["survey", surveyId, "questions", "results", page],
    queryFn: () => getQuestionResults(surveyId, page),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const lastSuccessData = useRef(data);

  useEffect(() => {
    if (isError) {
      toast({ variant: "destructive", title: "Something went wrong!" });
    }
  }, [isError, toast]);

  useEffect(() => {
    if (data) lastSuccessData.current = data;
  }, [data]);

  const questionResults = data;
  return {
    questionResults,
    lastSuccessData,
    error,
    isFetching,
    status,
  };
};
