import { getPageQuestionResults } from "@/api/survey";
import { useLastSuccessData } from "@/hooks/useLastSuccessData";
import { useAuth } from "@clerk/nextjs";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useQuestionResults = (surveyId: string, pageId: string) => {
  const { getToken } = useAuth();
  const { data, ...queryInfo } = useQuery({
    staleTime: 0,
    queryKey: ["survey", surveyId, "questions", "results", pageId],
    queryFn: async () => {
      const token = await getToken();
      return getPageQuestionResults({ surveyId, pageId, token });
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const { lastSuccessData } = useLastSuccessData(data);

  return {
    questionResults: data || lastSuccessData,
    ...queryInfo,
  };
};
