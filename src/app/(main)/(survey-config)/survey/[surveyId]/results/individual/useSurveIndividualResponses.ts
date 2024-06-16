import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSurveyResponses } from "@/api/survey";
import { useAuth } from "@clerk/nextjs";
import { SortObject } from "@/types/common";
import { useLastSuccessData } from "@/hooks/useLastSuccessData";

type UseSurveyResponsesParams = {
  surveyId: string;
  page: number;
  sort: SortObject;
};

export default function useSurveyIndividualResponses({
  sort,
  surveyId,
  page,
}: UseSurveyResponsesParams) {
  const { getToken } = useAuth();

  const { data, ...queryInfo } = useQuery({
    staleTime: 0,
    queryKey: ["survey", surveyId, "responses", page, sort],
    queryFn: async () => {
      const token = await getToken();
      return getSurveyResponses({
        surveyId,
        sort,
        page,
        token,
      });
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { lastSuccessData } = useLastSuccessData(data);

  return {
    responses: data?.data || lastSuccessData?.data,
    pageCount: data?.total_pages || lastSuccessData?.total_pages,
    ...queryInfo,
  };
}
