import { getSurveyPages } from "@/api/survey";
import { useQuery } from "@tanstack/react-query";

export default function useSurveyPages(
  surveyId: string,
  options?: {
    refetchOnMount?: boolean;
    refetchOnWindowFocus?: boolean;
  }
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
