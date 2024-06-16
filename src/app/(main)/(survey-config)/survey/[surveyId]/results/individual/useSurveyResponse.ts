import { getSurveyResponse } from "@/api/survey";
import { useLastSuccessData } from "@/hooks/useLastSuccessData";
import { useAuth } from "@clerk/nextjs";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useSurveyResponse(
  surveyId: string,
  responseId: string,
  pageId: string
) {
  const { getToken } = useAuth();
  const { data, ...queryInfo } = useQuery({
    staleTime: 0,
    queryKey: ["survey", surveyId, "response", responseId, pageId],
    queryFn: async () => {
      const accessToken = await getToken();
      return getSurveyResponse({ surveyId, responseId, pageId, accessToken });
    },
    placeholderData: keepPreviousData,
  });

  const { lastSuccessData } = useLastSuccessData(data);

  return {
    surveyResponse: data?.surveyResponse || lastSuccessData?.surveyResponse,
    questions: data?.questions || lastSuccessData?.questions,
    questionResponses:
      data?.questionResponses || lastSuccessData?.questionResponses,
    ...queryInfo,
  };
}
