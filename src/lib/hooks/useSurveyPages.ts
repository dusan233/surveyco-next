import { getSurveyPages } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";

export default function useSurveyPages(
  surveyId: string,
  options?: {
    refetchOnMount: boolean;
    refetchOnWindowFocus: boolean;
  }
) {
  const { data, isLoading } = useQuery({
    queryKey: ["survey", surveyId, "pages"],
    queryFn: () => getSurveyPages(surveyId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });

  return { surveyPages: data, isLoading };
}
