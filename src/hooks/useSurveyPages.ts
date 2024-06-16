import { getSurveyPages } from "@/api/survey";
import { SurveyPage } from "@/types/survey";
import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

export default function useSurveyPages(
  surveyId: string,
  options?: Omit<
    UndefinedInitialDataOptions<SurveyPage[], Error, SurveyPage[], string[]>,
    "queryKey" | "queryFn"
  >
) {
  const { data, ...queryInfo } = useQuery({
    staleTime: Infinity,
    gcTime: Infinity,
    queryKey: ["survey", surveyId, "pages"],
    queryFn: () => getSurveyPages(surveyId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });

  return { surveyPages: data, ...queryInfo };
}
