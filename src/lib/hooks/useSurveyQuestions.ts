import { getSurveyQuestions } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";

export default function useSurveyQuestions(surveyId: string, page: number) {
  const { data, isLoading } = useQuery({
    queryKey: ["survey", surveyId, "questions", page],
    queryFn: () => getSurveyQuestions(surveyId, page),
  });

  return { questions: data?.questions, isLoading };
}
