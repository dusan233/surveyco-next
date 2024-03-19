import { getSurveyPages } from "@/app/_actions/survey-actions";
import { useQuery } from "@tanstack/react-query";

export default function useSurveyPages(
  surveyId: string,
  options?: {
    refetchOnMount?: boolean;
    refetchOnWindowFocus?: boolean;
  }
) {
  const { data, isLoading, isError } = useQuery({
    staleTime: Infinity,
    gcTime: 1000 * 60 * 5 * 10,
    queryKey: ["survey", surveyId, "pages"],
    queryFn: () => getSurveyPages(surveyId),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    ...options,
  });

  return { surveyPages: data, isLoading, isError };
}
