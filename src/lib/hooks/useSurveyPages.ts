import { getSurveyPages } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";

export default function useSurveyPages(surveyId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["survey", surveyId, "pages"],
    queryFn: () => getSurveyPages(surveyId),
  });

  return { surveyPages: data, isLoading };
}
