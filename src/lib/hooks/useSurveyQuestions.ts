import { getSurveyQuestions } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";

export default function useSurveyQuestions(surveyId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["survey", surveyId, "questions"],
    queryFn: () => getSurveyQuestions(surveyId),
  });

  return { questions: data?.questions, isLoading };
}
