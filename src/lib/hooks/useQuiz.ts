import { getSurvey } from "@/app/_actions/survey-actions";
import { useQuery } from "@tanstack/react-query";

export default function useSurvey(surveyId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["survey", surveyId],
    queryFn: () => getSurvey(surveyId),
  });

  return { survey: data, isLoading };
}
